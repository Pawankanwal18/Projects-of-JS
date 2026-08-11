// ============================================================
// QuickBite — Main Application Script
// SPA routing, cart management, search, filters, auth, interactions
// ============================================================

(function () {
  "use strict";

  // ============================================================
  // STATE & CONSTANTS
  // ============================================================
  const DELIVERY_FEE = 40;
  const GST_RATE = 0.05;

  let currentView = "home";
  let currentRestaurantId = null;
  let appliedCoupon = null; // { code, discount, label }

  let activeFilters = {
    veg: false,
    rating: false,
    "price-low": false,
    "price-mid": false,
    time: false,
    sort: "relevance",
    search: "",
    cuisine: "",
  };

  // ============================================================
  // DOM REFS
  // ============================================================
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const views = {
    home: $("#home-view"),
    listing: $("#listing-view"),
    restaurant: $("#restaurant-view"),
    checkout: $("#checkout-view"),
    confirmation: $("#confirmation-view"),
  };

  // ============================================================
  // USER & AUTH (localStorage)
  // ============================================================
  function getUser() {
    try {
      return JSON.parse(localStorage.getItem("qb_user"));
    } catch {
      return null;
    }
  }

  function saveUser(user) {
    localStorage.setItem("qb_user", JSON.stringify(user));
    updateLoginUI();
  }

  function logoutUser() {
    localStorage.removeItem("qb_user");
    updateLoginUI();
    closeProfileModal();
    showToast("Logged out successfully. See you soon! 👋");
  }

  function updateLoginUI() {
    const user = getUser();
    const loginBtn = $("#login-btn");

    if (user) {
      const displayName = user.name ? user.name.split(" ")[0] : "User";
      loginBtn.innerHTML = `👤 <span class="btn-text">${displayName}</span>`;
      loginBtn.className = "header-btn user-btn";
      loginBtn.setAttribute("aria-label", `My Account (${user.name})`);
    } else {
      loginBtn.innerHTML = '👤 <span class="btn-text">Login</span>';
      loginBtn.className = "header-btn login-btn";
      loginBtn.setAttribute("aria-label", "Login or Sign up");
    }
  }

  function openLoginModal(tab = "login") {
    // If already logged in, show Profile Modal instead
    if (getUser()) {
      openProfileModal();
      return;
    }

    switchLoginTab(tab);
    clearLoginErrors();
    $("#login-overlay").classList.add("open");
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      const input = tab === "signup" ? $("#login-name") : $("#login-email");
      if (input) input.focus();
    }, 120);
  }

  function closeLoginModal() {
    $("#login-overlay").classList.remove("open");
    document.body.style.overflow = "";
  }

  function switchLoginTab(tab) {
    const tabLogin = $("#tab-login");
    const tabSignup = $("#tab-signup");
    const nameGroup = $("#fg-login-name");
    const submitBtn = $("#login-submit-btn");
    const title = $("#login-modal-title");

    if (tab === "signup") {
      tabSignup.classList.add("active");
      tabSignup.setAttribute("aria-selected", "true");
      tabLogin.classList.remove("active");
      tabLogin.setAttribute("aria-selected", "false");
      nameGroup.style.display = "block";
      submitBtn.textContent = "Create Account";
      title.textContent = "Create Account 🎉";
    } else {
      tabLogin.classList.add("active");
      tabLogin.setAttribute("aria-selected", "true");
      tabSignup.classList.remove("active");
      tabSignup.setAttribute("aria-selected", "false");
      nameGroup.style.display = "none";
      submitBtn.textContent = "Login";
      title.textContent = "Welcome Back 👋";
    }
    clearLoginErrors();
  }

  function clearLoginErrors() {
    ["#fg-login-name", "#fg-login-email", "#fg-login-pass"].forEach((sel) => {
      const el = $(sel);
      if (el) el.classList.remove("error");
    });
  }

  // ============================================================
  // USER PROFILE MODAL
  // ============================================================
  function openProfileModal() {
    const user = getUser();
    if (!user) {
      openLoginModal();
      return;
    }

    const name = user.name || "Foodie";
    const email = user.email || "user@quickbite.in";
    const initial = name.charAt(0).toUpperCase();

    $("#profile-name").textContent = name;
    $("#profile-email").textContent = email;
    $("#profile-avatar").textContent = initial;
    $("#profile-favs-count").textContent = getFavorites().length;
    $("#profile-cart-count").textContent = getCart().items.length;
    $("#profile-address-subtext").textContent = $("#current-location").textContent;

    $("#profile-overlay").classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeProfileModal() {
    $("#profile-overlay").classList.remove("open");
    document.body.style.overflow = "";
  }

  // ============================================================
  // FAVORITES (localStorage)
  // ============================================================
  function getFavorites() {
    try {
      return JSON.parse(localStorage.getItem("qb_favorites")) || [];
    } catch {
      return [];
    }
  }

  function toggleFavorite(restId) {
    let favs = getFavorites();
    const id = parseInt(restId);
    if (favs.includes(id)) {
      favs = favs.filter((item) => item !== id);
      showToast("Removed from favorites 🤍");
    } else {
      favs.push(id);
      showToast("Added to favorites ❤️");
    }
    localStorage.setItem("qb_favorites", JSON.stringify(favs));
    $$(`.card-fav-btn[data-id="${id}"]`).forEach((btn) => {
      btn.textContent = favs.includes(id) ? "❤️" : "🤍";
    });
  }

  // ============================================================
  // CART (localStorage)
  // ============================================================
  function getCart() {
    try {
      return JSON.parse(localStorage.getItem("qb_cart")) || { restaurantId: null, restaurantName: "", items: [] };
    } catch {
      return { restaurantId: null, restaurantName: "", items: [] };
    }
  }

  function saveCart(cart) {
    localStorage.setItem("qb_cart", JSON.stringify(cart));
    updateCartUI();
  }

  function clearCart() {
    appliedCoupon = null;
    saveCart({ restaurantId: null, restaurantName: "", items: [] });
  }

  function addToCart(restaurantId, restaurantName, item) {
    // Require login before adding to cart
    if (!getUser()) {
      showToast("Please login to add items to your cart");
      openLoginModal("login");
      return;
    }

    let cart = getCart();

    // If cart has items from a different restaurant, prompt to replace
    if (cart.items.length > 0 && cart.restaurantId !== restaurantId) {
      if (!confirm(`Your cart has items from "${cart.restaurantName}". Do you want to clear it and add items from "${restaurantName}"?`)) {
        return;
      }
      cart = { restaurantId: null, restaurantName: "", items: [] };
    }

    cart.restaurantId = restaurantId;
    cart.restaurantName = restaurantName;

    const existing = cart.items.find((i) => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.items.push({ ...item, quantity: 1 });
    }

    saveCart(cart);
    showToast(`${item.name} added to cart ✨`);
    bumpCartBadge();
  }

  function updateCartItemQty(itemId, delta) {
    const cart = getCart();
    const item = cart.items.find((i) => i.id === itemId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      cart.items = cart.items.filter((i) => i.id !== itemId);
    }

    if (cart.items.length === 0) {
      cart.restaurantId = null;
      cart.restaurantName = "";
      appliedCoupon = null;
    }

    saveCart(cart);
  }

  function getCartTotals() {
    const cart = getCart();
    const subtotal = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const isFreeDel = appliedCoupon && appliedCoupon.code === "FREEDEL";
    const delivery = cart.items.length > 0 ? (isFreeDel ? 0 : DELIVERY_FEE) : 0;
    
    let discount = 0;
    if (appliedCoupon && subtotal > 0) {
      if (appliedCoupon.code === "WELCOME60") discount = Math.min(Math.round(subtotal * 0.6), 120);
      else if (appliedCoupon.code === "FLAT100") discount = subtotal >= 499 ? 100 : (subtotal >= 200 ? 50 : 0);
      else if (appliedCoupon.code === "BOGO") discount = Math.round(subtotal * 0.2);
    }

    const discountedSubtotal = Math.max(0, subtotal - discount);
    const tax = Math.round(discountedSubtotal * GST_RATE);
    const total = Math.max(0, discountedSubtotal + delivery + tax);
    const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);
    return { subtotal, delivery, discount, tax, total, itemCount, appliedCoupon };
  }

  function getItemQtyInCart(itemId) {
    const cart = getCart();
    const item = cart.items.find((i) => i.id === itemId);
    return item ? item.quantity : 0;
  }

  // ============================================================
  // CURRENCY FORMATTER
  // ============================================================
  function formatPrice(amount) {
    return "₹" + amount.toLocaleString("en-IN");
  }

  // ============================================================
  // TOAST NOTIFICATIONS
  // ============================================================
  let toastTimeout = null;
  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  // ============================================================
  // CART BADGE BUMP
  // ============================================================
  function bumpCartBadge() {
    const badge = $("#cart-badge");
    badge.classList.remove("bump");
    void badge.offsetWidth; // Reflow
    badge.classList.add("bump");
  }

  // ============================================================
  // SPA ROUTING
  // ============================================================
  function showView(viewName) {
    Object.values(views).forEach((v) => v.classList.remove("active"));
    if (views[viewName]) {
      views[viewName].classList.add("active");
      currentView = viewName;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Show/hide sticky cart bar only on restaurant view
    const stickyBar = $("#sticky-cart-bar");
    if (viewName === "restaurant" && getCart().items.length > 0) {
      stickyBar.classList.add("show");
    } else {
      stickyBar.classList.remove("show");
    }

    // Show/hide mobile search & footer
    const mobileSearch = $("#mobile-search");
    const footer = $(".footer");
    if (viewName === "home" || viewName === "listing") {
      mobileSearch.style.display = "";
      footer.style.display = "";
    } else {
      mobileSearch.style.display = "none";
      if (viewName === "confirmation") {
        footer.style.display = "";
      } else {
        footer.style.display = "none";
      }
    }
  }

  function navigateTo(route) {
    window.location.hash = route;
  }

  function handleRoute() {
    const hash = window.location.hash.slice(1) || "home";
    const parts = hash.split("/");

    switch (parts[0]) {
      case "home":
        showView("home");
        break;
      case "listing":
        showView("listing");
        renderListingView();
        break;
      case "restaurant":
        if (parts[1]) {
          currentRestaurantId = parseInt(parts[1]);
          showView("restaurant");
          renderRestaurantView(currentRestaurantId);
        }
        break;
      case "checkout":
        showView("checkout");
        renderCheckoutView();
        break;
      case "confirmation":
        showView("confirmation");
        break;
      case "login":
        openLoginModal("login");
        break;
      case "signup":
        openLoginModal("signup");
        break;
      default:
        showView("home");
    }
  }

  window.addEventListener("hashchange", handleRoute);

  // ============================================================
  // RATING CLASS HELPER
  // ============================================================
  function ratingClass(r) {
    if (r >= 4.0) return "high";
    if (r >= 3.5) return "medium";
    return "low";
  }

  // ============================================================
  // RESTAURANT CARD HTML
  // ============================================================
  const discountOffers = [
    "🔥 50% OFF up to ₹100",
    "🚀 Free Delivery on ₹199+",
    "🎉 Flat ₹120 OFF",
    "✨ 20% OFF with code BOGO",
    "⭐ Chef's Special Deal",
    "💥 60% OFF on 1st Order",
    "🍔 Flat ₹80 OFF",
    "🍕 Buy 1 Get 1 Free",
  ];

  function restaurantCardHTML(r) {
    const offer = discountOffers[(r.id - 1) % discountOffers.length];
    const isFav = getFavorites().includes(r.id);

    return `
      <article class="restaurant-card" data-id="${r.id}" tabindex="0" role="button" aria-label="View ${r.name}">
        <div class="rest-card-img">
          <div class="card-top-badges">
            <span class="card-discount-badge">${offer}</span>
            <button class="card-fav-btn" data-id="${r.id}" type="button" aria-label="Save ${r.name} to favorites">${isFav ? "❤️" : "🤍"}</button>
          </div>
          <img src="${r.image}" alt="${r.name} — ${r.cuisine.join(", ")}" loading="lazy" width="600" height="375">
        </div>
        <div class="rest-card-body">
          <div class="rest-card-header">
            <h3 class="rest-card-name">${r.name}</h3>
            <div class="rest-card-rating ${ratingClass(r.rating)}">⭐ ${r.rating}</div>
          </div>
          <p class="rest-card-cuisine">${r.cuisine.join(", ")}</p>
          <div class="rest-card-meta">
            <span>🕐 ${r.deliveryTime}</span>
            <span>💰 ${formatPrice(r.priceForTwo)} for two</span>
            ${r.isPureVeg ? '<span class="pure-veg-tag">🟢 Pure Veg</span>' : ""}
          </div>
        </div>
      </article>
    `;
  }

  // ============================================================
  // RENDER: HOME VIEW
  // ============================================================
  function renderHomeView() {
    // Cuisine categories
    const categoriesContainer = $("#categories-scroll");
    categoriesContainer.innerHTML = cuisineCategories
      .map(
        (cat) => `
      <div class="category-chip" data-cuisine="${cat.id}" role="listitem" tabindex="0" aria-label="${cat.name}">
        <span class="cat-icon">${cat.icon}</span>
        <span class="cat-name">${cat.name}</span>
      </div>
    `
      )
      .join("");

    // Promo carousel
    const carouselContainer = $("#promo-carousel");
    carouselContainer.innerHTML = promoBanners
      .map(
        (promo) => `
      <div class="promo-card" data-code="${promo.code}" style="background: ${promo.gradient}" role="group" aria-label="Promo: ${promo.title}">
        <div class="promo-emoji">${promo.emoji}</div>
        <div class="promo-title">${promo.title}</div>
        <div class="promo-subtitle">${promo.subtitle}</div>
        <span class="promo-code" data-code="${promo.code}">🏷️ ${promo.code} <small style="opacity:0.85;margin-left:4px;">(Copy)</small></span>
      </div>
    `
      )
      .join("");

    // Promo dots
    const dotsContainer = $("#promo-dots");
    dotsContainer.innerHTML = promoBanners
      .map((_, i) => `<button class="promo-dot ${i === 0 ? "active" : ""}" data-index="${i}" role="tab" aria-label="Go to slide ${i + 1}"></button>`)
      .join("");

    // Restaurant grid
    const gridContainer = $("#home-restaurant-grid");
    gridContainer.innerHTML = restaurants.map(restaurantCardHTML).join("");

    // Attach click handlers to cards
    attachCardListeners(gridContainer);

    // Setup intersection observer for fade-in
    observeCards(gridContainer);

    // Setup carousel auto-advance
    setupCarousel();

    // Setup category chip clicks
    setupCategoryChips();
  }

  // ============================================================
  // RENDER: LISTING VIEW
  // ============================================================
  function renderListingView() {
    let filtered = [...restaurants];
    const f = activeFilters;

    // Search filter
    if (f.search) {
      const q = f.search.toLowerCase();
      filtered = filtered.filter((r) => {
        const nameMatch = r.name.toLowerCase().includes(q);
        const cuisineMatch = r.cuisine.some((c) => c.toLowerCase().includes(q));
        const dishMatch = r.menu.some((cat) => cat.items.some((item) => item.name.toLowerCase().includes(q)));
        return nameMatch || cuisineMatch || dishMatch;
      });
    }

    // Cuisine filter
    if (f.cuisine) {
      const cuisineName = cuisineCategories.find((c) => c.id === f.cuisine)?.name?.toLowerCase();
      if (cuisineName) {
        filtered = filtered.filter((r) => r.cuisine.some((c) => c.toLowerCase().includes(cuisineName)));
      }
    }

    // Pure veg
    if (f.veg) filtered = filtered.filter((r) => r.isPureVeg);

    // Rating 4.0+
    if (f.rating) filtered = filtered.filter((r) => r.rating >= 4.0);

    // Price range
    if (f["price-low"]) filtered = filtered.filter((r) => r.priceForTwo < 300);
    if (f["price-mid"]) filtered = filtered.filter((r) => r.priceForTwo >= 300 && r.priceForTwo <= 600);

    // Delivery time < 30 min
    if (f.time) filtered = filtered.filter((r) => r.deliveryMinutes < 30);

    // Sort
    switch (f.sort) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "delivery":
        filtered.sort((a, b) => a.deliveryMinutes - b.deliveryMinutes);
        break;
      case "cost-low":
        filtered.sort((a, b) => a.priceForTwo - b.priceForTwo);
        break;
      case "cost-high":
        filtered.sort((a, b) => b.priceForTwo - a.priceForTwo);
        break;
    }

    // Update sort select value
    const sortSelect = $("#sort-select");
    if (sortSelect) sortSelect.value = f.sort;

    // Title
    let title = "All Restaurants";
    if (f.search) title = `Results for "${f.search}"`;
    else if (f.cuisine) {
      const cat = cuisineCategories.find((c) => c.id === f.cuisine);
      title = cat ? `${cat.icon} ${cat.name} Restaurants` : "Restaurants";
    }
    $("#listing-title").textContent = title;
    $("#listing-count").textContent = `${filtered.length} restaurant${filtered.length !== 1 ? "s" : ""} available`;

    // Render grid
    const grid = $("#listing-restaurant-grid");
    const empty = $("#listing-empty");

    if (filtered.length === 0) {
      grid.innerHTML = "";
      empty.classList.remove("hidden");
    } else {
      empty.classList.add("hidden");
      grid.innerHTML = filtered.map(restaurantCardHTML).join("");
      attachCardListeners(grid);
      observeCards(grid);
    }

    // Update filter chip active states
    $$(".filter-chip[data-filter]").forEach((chip) => {
      const key = chip.dataset.filter;
      chip.classList.toggle("active", !!activeFilters[key]);
    });

    // Check if any filter is active
    const hasActiveFilter = f.veg || f.rating || f["price-low"] || f["price-mid"] || f.time || f.sort !== "relevance" || f.cuisine;
    const clearBtn = $("#filter-clear");
    if (clearBtn) {
      clearBtn.classList.toggle("hidden", !hasActiveFilter);
    }
  }

  // ============================================================
  // RENDER: RESTAURANT DETAIL VIEW
  // ============================================================
  function renderRestaurantView(id) {
    const r = restaurants.find((rest) => rest.id === id);
    if (!r) return navigateTo("home");

    // Cover image
    const coverImg = $("#rest-cover-img");
    coverImg.src = r.coverImage;
    coverImg.alt = `${r.name} cover photo`;

    // Info section
    const info = $("#rest-detail-info");
    info.innerHTML = `
      <h1 class="rest-detail-name">${r.name}</h1>
      <p class="rest-detail-cuisine">${r.cuisine.join(", ")}</p>
      <div class="rest-detail-meta">
        <span class="rest-meta-item">
          <span class="rest-card-rating ${ratingClass(r.rating)}">⭐ ${r.rating}</span>
        </span>
        <span class="rest-meta-item"><span class="meta-icon">🕐</span> ${r.deliveryTime}</span>
        <span class="rest-meta-item"><span class="meta-icon">💰</span> ${formatPrice(r.priceForTwo)} for two</span>
        ${r.isPureVeg ? '<span class="pure-veg-tag" style="margin-left: 8px;">🟢 Pure Veg</span>' : ""}
      </div>
      <p class="rest-detail-address">📍 ${r.address}</p>
    `;

    // Menu
    const menuSection = $("#menu-section");
    menuSection.innerHTML = r.menu
      .map(
        (cat) => `
      <div class="menu-category" data-category="${cat.category}">
        <div class="menu-category-header" role="button" tabindex="0" aria-expanded="true">
          <span>
            <span class="menu-category-title">${cat.category}</span>
            <span class="menu-category-count">${cat.items.length} items</span>
          </span>
          <span class="menu-category-chevron">▼</span>
        </div>
        <div class="menu-items-list" style="max-height: ${cat.items.length * 200}px;">
          ${cat.items.map((item) => menuItemHTML(r.id, r.name, item)).join("")}
        </div>
      </div>
    `
      )
      .join("");

    // Collapse/expand category headers
    menuSection.querySelectorAll(".menu-category-header").forEach((header) => {
      header.addEventListener("click", () => {
        const cat = header.closest(".menu-category");
        cat.classList.toggle("collapsed");
        header.setAttribute("aria-expanded", !cat.classList.contains("collapsed"));
      });
    });

    // Update sticky cart bar
    updateStickyCartBar();
  }

  function menuItemHTML(restId, restName, item) {
    const qty = getItemQtyInCart(item.id);
    const vegClass = item.isVeg ? "" : "nonveg";
    const vegLabel = item.isVeg ? "Veg" : "Non-Veg";

    return `
      <div class="menu-item" data-item-id="${item.id}">
        <div class="menu-item-info">
          <div class="veg-badge">
            <span class="veg-dot ${vegClass}" aria-label="${vegLabel}"></span>
            <span>${vegLabel}</span>
          </div>
          <h4 class="menu-item-name">${item.name}</h4>
          <p class="menu-item-price">${formatPrice(item.price)}</p>
          <p class="menu-item-desc">${item.description}</p>
        </div>
        <div class="menu-item-img">
          <img src="${item.image}" alt="${item.name}" loading="lazy" width="300" height="300">
          ${
            qty === 0
              ? `<button class="add-btn" data-rest-id="${restId}" data-rest-name="${restName}" data-item='${JSON.stringify(item).replace(/'/g, "&#39;")}' aria-label="Add ${item.name} to cart">ADD +</button>`
              : `<div class="qty-stepper" data-item-id="${item.id}">
                  <button class="qty-minus" aria-label="Decrease quantity">−</button>
                  <span class="qty-value">${qty}</span>
                  <button class="qty-plus" aria-label="Increase quantity">+</button>
                </div>`
          }
        </div>
      </div>
    `;
  }

  // ============================================================
  // RENDER: CHECKOUT VIEW
  // ============================================================
  function renderCheckoutView() {
    const cart = getCart();
    const totals = getCartTotals();
    const user = getUser();

    if (cart.items.length === 0) {
      navigateTo("home");
      return;
    }

    // Auto-fill user details if logged in and fields are blank
    if (user) {
      const nameInput = $("#checkout-name");
      const phoneInput = $("#checkout-phone");
      if (nameInput && !nameInput.value) nameInput.value = user.name || "";
      if (phoneInput && !phoneInput.value) {
        // If email has digits, or use sample phone
        if (/^\d{10}$/.test(user.email)) phoneInput.value = user.email;
        else phoneInput.value = "9876543210";
      }
    }

    const summary = $("#checkout-summary");
    summary.innerHTML = `
      ${cart.items
        .map(
          (item) => `
        <div class="summary-item">
          <span>
            <span class="veg-dot ${item.isVeg ? "" : "nonveg"}" style="width:12px;height:12px;display:inline-flex;vertical-align:middle;margin-right:6px;">
              <span style="width:5px;height:5px;"></span>
            </span>
            ${item.name} <span class="item-qty" style="color:var(--text-muted);font-weight:600;">× ${item.quantity}</span>
          </span>
          <span style="font-weight:700;">${formatPrice(item.price * item.quantity)}</span>
        </div>
      `
        )
        .join("")}
      <div style="border-top: 1px dashed var(--border); margin-top: 14px; padding-top: 14px;">
        <div class="summary-item"><span>Subtotal</span><span>${formatPrice(totals.subtotal)}</span></div>
        ${totals.discount > 0 ? `<div class="summary-item" style="color:var(--veg);font-weight:700;"><span>Promo Discount</span><span>-${formatPrice(totals.discount)}</span></div>` : ""}
        <div class="summary-item"><span>Delivery Fee</span><span>${totals.delivery === 0 ? '<span style="color:var(--veg);font-weight:700;">FREE</span>' : formatPrice(totals.delivery)}</span></div>
        <div class="summary-item"><span>GST (5%)</span><span>${formatPrice(totals.tax)}</span></div>
        <div class="summary-item" style="font-weight:800; font-size:17px; margin-top:10px; padding-top:10px; border-top:2px solid var(--text-main);">
          <span>Total Payable</span><span style="color:var(--primary);">${formatPrice(totals.total)}</span>
        </div>
      </div>
    `;
  }

  // ============================================================
  // RENDER: CONFIRMATION VIEW
  // ============================================================
  function renderConfirmation(orderData) {
    const card = $("#confirmation-card");
    card.innerHTML = `
      <div class="order-id">Order #${orderData.orderId}</div>
      <div class="order-eta">🚀 Estimated Delivery: <strong>${orderData.eta}</strong></div>
      <div class="confirmation-items">
        ${orderData.items
          .map(
            (item) => `
          <div class="conf-item">
            <span>${item.name} × ${item.quantity}</span>
            <span style="font-weight:600;">${formatPrice(item.price * item.quantity)}</span>
          </div>
        `
          )
          .join("")}
        <div class="conf-item" style="font-weight:800; font-size:16px; margin-top:14px; padding-top:10px; border-top:1.5px solid var(--border-light);">
          <span>Total Paid</span>
          <span style="color:var(--success);">${formatPrice(orderData.total)}</span>
        </div>
      </div>
    `;
  }

  // ============================================================
  // CART UI UPDATES
  // ============================================================
  function updateCartUI() {
    const cart = getCart();
    const totals = getCartTotals();

    // Badge
    const badge = $("#cart-badge");
    if (totals.itemCount > 0) {
      badge.textContent = totals.itemCount;
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }

    // Cart drawer content
    const listEl = $("#cart-items-list");
    const billEl = $("#cart-bill");
    const checkoutBtn = $("#cart-checkout-btn");
    const restNameEl = $("#cart-rest-name");
    const couponBox = $("#cart-coupon-box");

    if (cart.items.length === 0) {
      listEl.innerHTML = `
        <div class="cart-empty">
          <div class="empty-icon">🛒</div>
          <h3 class="empty-title">Your cart is empty</h3>
          <p class="empty-text">Good food is always cooking! Add some delicious dishes to get started.</p>
        </div>
      `;
      billEl.classList.add("hidden");
      checkoutBtn.classList.add("hidden");
      restNameEl.classList.add("hidden");
      if (couponBox) couponBox.classList.add("hidden");
    } else {
      restNameEl.textContent = `📍 Ordering from: ${cart.restaurantName}`;
      restNameEl.classList.remove("hidden");
      if (couponBox) couponBox.classList.remove("hidden");

      listEl.innerHTML = cart.items
        .map(
          (item) => `
        <div class="cart-item" data-item-id="${item.id}">
          <div class="cart-item-info">
            <div class="cart-item-name">
              <span class="veg-dot ${item.isVeg ? "" : "nonveg"}" style="width:13px;height:13px;" aria-label="${item.isVeg ? "Veg" : "Non-Veg"}">
                <span style="width:6px;height:6px;"></span>
              </span>
              ${item.name}
            </div>
            <div class="cart-item-price">${formatPrice(item.price)} each</div>
          </div>
          <div class="cart-item-controls">
            <div class="cart-qty-stepper">
              <button class="qty-minus" data-item-id="${item.id}" aria-label="Decrease quantity of ${item.name}">−</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-plus" data-item-id="${item.id}" aria-label="Increase quantity of ${item.name}">+</button>
            </div>
            <span class="cart-item-total">${formatPrice(item.price * item.quantity)}</span>
          </div>
        </div>
      `
        )
        .join("");

      // Bill details
      $("#bill-subtotal").textContent = formatPrice(totals.subtotal);
      $("#bill-delivery").textContent = totals.delivery === 0 ? "FREE" : formatPrice(totals.delivery);
      $("#bill-tax").textContent = formatPrice(totals.tax);
      $("#bill-total").textContent = formatPrice(totals.total);

      // Check for discount row
      let discountRow = $("#bill-discount-row");
      if (totals.discount > 0) {
        if (!discountRow) {
          discountRow = document.createElement("div");
          discountRow.id = "bill-discount-row";
          discountRow.className = "cart-bill-row";
          discountRow.style.color = "var(--veg)";
          discountRow.style.fontWeight = "700";
          billEl.insertBefore(discountRow, $("#bill-delivery").parentElement);
        }
        discountRow.innerHTML = `<span>Coupon (${appliedCoupon.code})</span><span>-${formatPrice(totals.discount)}</span>`;
      } else if (discountRow) {
        discountRow.remove();
      }

      billEl.classList.remove("hidden");
      checkoutBtn.classList.remove("hidden");
    }

    // Update sticky cart bar
    updateStickyCartBar();

    // If on restaurant view, re-render add/qty buttons
    if (currentView === "restaurant") {
      updateMenuItemButtons();
    }
  }

  function updateMenuItemButtons() {
    const menuSection = $("#menu-section");
    if (!menuSection) return;

    menuSection.querySelectorAll(".menu-item").forEach((el) => {
      const itemId = parseInt(el.dataset.itemId);
      const qty = getItemQtyInCart(itemId);
      const imgContainer = el.querySelector(".menu-item-img");
      const existingBtn = imgContainer.querySelector(".add-btn");
      const existingStepper = imgContainer.querySelector(".qty-stepper");

      if (qty === 0 && existingStepper) {
        existingStepper.remove();
        const rest = restaurants.find((r) => r.id === currentRestaurantId);
        if (!rest) return;
        let item = null;
        for (const cat of rest.menu) {
          item = cat.items.find((i) => i.id === itemId);
          if (item) break;
        }
        if (!item) return;
        const btn = document.createElement("button");
        btn.className = "add-btn";
        btn.dataset.restId = rest.id;
        btn.dataset.restName = rest.name;
        btn.dataset.item = JSON.stringify(item);
        btn.setAttribute("aria-label", `Add ${item.name} to cart`);
        btn.textContent = "ADD +";
        imgContainer.appendChild(btn);
      } else if (qty > 0 && existingBtn) {
        existingBtn.remove();
        const stepper = document.createElement("div");
        stepper.className = "qty-stepper";
        stepper.dataset.itemId = itemId;
        stepper.innerHTML = `
          <button class="qty-minus" aria-label="Decrease quantity">−</button>
          <span class="qty-value">${qty}</span>
          <button class="qty-plus" aria-label="Increase quantity">+</button>
        `;
        imgContainer.appendChild(stepper);
      } else if (qty > 0 && existingStepper) {
        existingStepper.querySelector(".qty-value").textContent = qty;
      }
    });
  }

  function updateStickyCartBar() {
    const cart = getCart();
    const totals = getCartTotals();
    const bar = $("#sticky-cart-bar");

    if (currentView === "restaurant" && totals.itemCount > 0) {
      $("#sticky-items-count").textContent = `${totals.itemCount} item${totals.itemCount !== 1 ? "s" : ""}`;
      $("#sticky-total").textContent = formatPrice(totals.total);
      bar.classList.add("show");
    } else {
      bar.classList.remove("show");
    }
  }

  // ============================================================
  // CART DRAWER
  // ============================================================
  function openCartDrawer() {
    $("#cart-overlay").classList.add("open");
    $("#cart-drawer").classList.add("open");
    document.body.style.overflow = "hidden";
    setTimeout(() => $("#cart-close-btn").focus(), 100);
  }

  function closeCartDrawer() {
    $("#cart-overlay").classList.remove("open");
    $("#cart-drawer").classList.remove("open");
    document.body.style.overflow = "";
  }

  // ============================================================
  // LOCATION DROPDOWN
  // ============================================================
  function renderLocationDropdown() {
    const list = $("#location-list");
    list.innerHTML = cities
      .map(
        (city) => `
      <div class="city-group">
        <div class="city-name">${city.name}</div>
        ${city.areas.map((area) => `<button class="area-btn" data-area="${area}, ${city.name}" type="button">${area}</button>`).join("")}
      </div>
    `
      )
      .join("");
  }

  function toggleLocationDropdown(show) {
    const dropdown = $("#location-dropdown");
    const btn = $("#location-btn");
    if (show === undefined) show = !dropdown.classList.contains("open");
    dropdown.classList.toggle("open", show);
    btn.setAttribute("aria-expanded", show);
  }

  // ============================================================
  // PROMO CAROUSEL
  // ============================================================
  let carouselInterval = null;
  function setupCarousel() {
    const carousel = $("#promo-carousel");
    const dots = $$("#promo-dots .promo-dot");
    let current = 0;

    function goToSlide(index) {
      const cards = carousel.querySelectorAll(".promo-card");
      if (cards.length === 0) return;
      current = index;
      const card = cards[current];
      carousel.scrollTo({ left: card.offsetLeft - 16, behavior: "smooth" });
      dots.forEach((d, i) => d.classList.toggle("active", i === current));
    }

    clearInterval(carouselInterval);
    carouselInterval = setInterval(() => {
      current = (current + 1) % promoBanners.length;
      goToSlide(current);
    }, 5000);

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        clearInterval(carouselInterval);
        goToSlide(parseInt(dot.dataset.index));
        carouselInterval = setInterval(() => {
          current = (current + 1) % promoBanners.length;
          goToSlide(current);
        }, 5000);
      });
    });

    carousel.addEventListener("scroll", () => {
      const cards = carousel.querySelectorAll(".promo-card");
      const scrollLeft = carousel.scrollLeft;
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft - scrollLeft - 16);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      if (closest !== current) {
        current = closest;
        dots.forEach((d, i) => d.classList.toggle("active", i === current));
      }
    });
  }

  // ============================================================
  // CUISINE CATEGORY CHIPS
  // ============================================================
  function setupCategoryChips() {
    const chips = $$("#categories-scroll .category-chip");
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const cuisine = chip.dataset.cuisine;
        activeFilters.cuisine = cuisine;
        activeFilters.search = "";
        navigateTo("listing");
      });
      chip.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          chip.click();
        }
      });
    });
  }

  // ============================================================
  // SEARCH
  // ============================================================
  let searchDebounce = null;
  function handleSearch(query) {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      activeFilters.search = query.trim();
      activeFilters.cuisine = "";
      if (query.trim().length > 0) {
        navigateTo("listing");
      } else if (currentView === "listing") {
        renderListingView();
      }
    }, 300);
  }

  // ============================================================
  // FILTERS
  // ============================================================
  function setupFilters() {
    // Toggle filter chips
    $$(".filter-chip[data-filter]").forEach((chip) => {
      chip.addEventListener("click", () => {
        const key = chip.dataset.filter;
        activeFilters[key] = !activeFilters[key];
        renderListingView();
      });
    });

    // Clear filters button
    const clearBtn = $("#filter-clear");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        activeFilters = {
          veg: false,
          rating: false,
          "price-low": false,
          "price-mid": false,
          time: false,
          sort: "relevance",
          search: "",
          cuisine: "",
        };
        $("#header-search-input").value = "";
        $("#mobile-search-input").value = "";
        renderListingView();
        showToast("Filters reset to default");
      });
    }

    // Sort select
    $("#sort-select").addEventListener("change", (e) => {
      activeFilters.sort = e.target.value;
      renderListingView();
    });
  }

  // ============================================================
  // INTERSECTION OBSERVER (Fade-in on scroll)
  // ============================================================
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "30px" }
  );

  function observeCards(container) {
    container.querySelectorAll(".restaurant-card").forEach((card) => {
      cardObserver.observe(card);
    });
  }

  // ============================================================
  // CARD CLICK LISTENERS
  // ============================================================
  function attachCardListeners(container) {
    container.querySelectorAll(".restaurant-card").forEach((card) => {
      const handler = (e) => {
        // If clicked on favorite button, don't open restaurant
        if (e.target.closest(".card-fav-btn")) return;
        navigateTo(`restaurant/${card.dataset.id}`);
      };
      card.addEventListener("click", handler);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          if (e.target.closest(".card-fav-btn")) return;
          e.preventDefault();
          handler(e);
        }
      });
    });
  }

  // ============================================================
  // CHECKOUT VALIDATION & ORDER PLACEMENT
  // ============================================================
  function validateCheckout() {
    let valid = true;

    const name = $("#checkout-name").value.trim();
    const phone = $("#checkout-phone").value.trim();
    const address = $("#checkout-address").value.trim();
    const pincode = $("#checkout-pincode").value.trim();

    // Name
    if (name.length < 2) {
      $("#fg-name").classList.add("error");
      valid = false;
    } else {
      $("#fg-name").classList.remove("error");
    }

    // Phone
    if (!/^\d{10}$/.test(phone)) {
      $("#fg-phone").classList.add("error");
      valid = false;
    } else {
      $("#fg-phone").classList.remove("error");
    }

    // Address
    if (address.length < 5) {
      $("#fg-address").classList.add("error");
      valid = false;
    } else {
      $("#fg-address").classList.remove("error");
    }

    // Pincode
    if (!/^\d{6}$/.test(pincode)) {
      $("#fg-pincode").classList.add("error");
      valid = false;
    } else {
      $("#fg-pincode").classList.remove("error");
    }

    return valid;
  }

  function placeOrder() {
    // Final login check before placing order
    if (!getUser()) {
      showToast("Please login to place your order");
      openLoginModal("login");
      return;
    }

    if (!validateCheckout()) {
      showToast("Please fill all required fields correctly");
      return;
    }

    const cart = getCart();
    const totals = getCartTotals();

    const orderData = {
      orderId: "QB" + Date.now().toString().slice(-8),
      eta: "25-35 mins",
      items: cart.items,
      total: totals.total,
    };

    renderConfirmation(orderData);
    clearCart();

    // Clear form
    $("#checkout-form").reset();
    $$(".form-group").forEach((fg) => fg.classList.remove("error"));

    navigateTo("confirmation");
    showToast("Order placed successfully! 🎉 Delicious food incoming!");
  }

  // ============================================================
  // PAYMENT OPTION SELECTION
  // ============================================================
  function setupPaymentOptions() {
    const options = $$("#payment-options .payment-option");
    options.forEach((opt) => {
      opt.addEventListener("click", () => {
        options.forEach((o) => o.classList.remove("selected"));
        opt.classList.add("selected");
        opt.querySelector('input[type="radio"]').checked = true;
      });
    });
  }

  // ============================================================
  // LOGIN / SIGNUP / PROFILE SETUP
  // ============================================================
  function setupAuth() {
    // Tab switching
    $("#tab-login").addEventListener("click", () => switchLoginTab("login"));
    $("#tab-signup").addEventListener("click", () => switchLoginTab("signup"));

    // Form submit
    const loginForm = $("#login-form");
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      clearLoginErrors();

      const activeTab = $("#tab-signup").classList.contains("active") ? "signup" : "login";
      const nameInput = $("#login-name").value.trim();
      const emailInput = $("#login-email").value.trim();
      const passInput = $("#login-password").value.trim();

      let hasError = false;

      if (activeTab === "signup" && nameInput.length < 2) {
        $("#fg-login-name").classList.add("error");
        hasError = true;
      }

      if (!emailInput || emailInput.length < 3) {
        $("#fg-login-email").classList.add("error");
        hasError = true;
      }

      if (!passInput || passInput.length < 4) {
        $("#fg-login-pass").classList.add("error");
        hasError = true;
      }

      if (hasError) return;

      const name = activeTab === "signup" && nameInput ? nameInput : (emailInput.includes("@") ? emailInput.split("@")[0] : "Pawan");
      saveUser({ name, email: emailInput, loggedIn: true });
      closeLoginModal();
      loginForm.reset();
      showToast(`Welcome${activeTab === "signup" ? "" : " back"}, ${name}! 🎉`);
    });

    // 1-Click Demo Login Button
    $("#demo-user-btn").addEventListener("click", () => {
      saveUser({ name: "Pawan", email: "pawan@quickbite.in", loggedIn: true });
      closeLoginModal();
      loginForm.reset();
      showToast("Logged in as Pawan (Demo Account) ⚡");
    });

    // Profile Modal Navigation & Logout
    $("#profile-logout-btn").addEventListener("click", logoutUser);

    $("#profile-favs-btn").addEventListener("click", () => {
      closeProfileModal();
      navigateTo("listing");
      showToast("Showing your favorite restaurants ❤️");
    });

    $("#profile-cart-btn").addEventListener("click", () => {
      closeProfileModal();
      openCartDrawer();
    });

    $("#profile-orders-btn").addEventListener("click", () => {
      closeProfileModal();
      toggleLocationDropdown(true);
    });
  }

  // ============================================================
  // GEOLOCATION
  // ============================================================
  function useGeolocation() {
    if (!navigator.geolocation) {
      showToast("Geolocation is not supported by your browser");
      return;
    }

    showToast("Detecting your location...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        $("#current-location").textContent = "Current Location (GPS)";
        toggleLocationDropdown(false);
        showToast("Location detected successfully! 📍");
      },
      (err) => {
        showToast("Could not detect location. Please select manually.");
      },
      { timeout: 5000 }
    );
  }

  // ============================================================
  // COUPON CODE APPLICATION
  // ============================================================
  function setupCouponApplication() {
    const applyBtn = $("#cart-coupon-btn");
    const input = $("#cart-coupon-input");

    if (!applyBtn || !input) return;

    const applyHandler = () => {
      const code = input.value.trim().toUpperCase();
      if (!code) {
        showToast("Please enter a coupon code");
        return;
      }

      if (code === "WELCOME60") {
        appliedCoupon = { code: "WELCOME60", label: "60% OFF up to ₹120" };
        showToast("Coupon WELCOME60 applied! 🎉");
      } else if (code === "FLAT100") {
        appliedCoupon = { code: "FLAT100", label: "Flat ₹100 OFF" };
        showToast("Coupon FLAT100 applied! 💥");
      } else if (code === "FREEDEL") {
        appliedCoupon = { code: "FREEDEL", label: "Free Delivery" };
        showToast("Free Delivery coupon applied! 🚀");
      } else if (code === "BOGO") {
        appliedCoupon = { code: "BOGO", label: "20% OFF" };
        showToast("Coupon BOGO applied! 🍟");
      } else {
        showToast("Invalid coupon code. Try WELCOME60, FLAT100, FREEDEL");
        return;
      }

      input.value = "";
      updateCartUI();
    };

    applyBtn.addEventListener("click", applyHandler);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") applyHandler();
    });
  }

  // ============================================================
  // EVENT DELEGATION
  // ============================================================
  document.addEventListener("click", (e) => {
    const target = e.target;

    // --- Favorite Wishlist Button ---
    const favBtn = target.closest(".card-fav-btn");
    if (favBtn) {
      e.stopPropagation();
      toggleFavorite(favBtn.dataset.id);
      return;
    }

    // --- Promo Code Copy on Carousel ---
    const promoCard = target.closest(".promo-card");
    if (promoCard) {
      const code = promoCard.dataset.code;
      if (code) {
        navigator.clipboard?.writeText(code);
        showToast(`Promo code "${code}" copied! 🎉`);
        return;
      }
    }

    // --- ADD button on menu item ---
    if (target.classList.contains("add-btn")) {
      e.stopPropagation();
      const restId = parseInt(target.dataset.restId);
      const restName = target.dataset.restName;
      const item = JSON.parse(target.dataset.item);
      addToCart(restId, restName, item);
      return;
    }

    // --- QTY STEPPER (menu item) ---
    if (target.classList.contains("qty-plus") && target.closest(".qty-stepper")) {
      e.stopPropagation();
      const itemId = parseInt(target.closest(".qty-stepper").dataset.itemId);
      updateCartItemQty(itemId, 1);
      return;
    }
    if (target.classList.contains("qty-minus") && target.closest(".qty-stepper")) {
      e.stopPropagation();
      const itemId = parseInt(target.closest(".qty-stepper").dataset.itemId);
      updateCartItemQty(itemId, -1);
      return;
    }

    // --- QTY STEPPER (cart drawer) ---
    if (target.classList.contains("qty-plus") && target.closest(".cart-qty-stepper")) {
      const itemId = parseInt(target.dataset.itemId);
      updateCartItemQty(itemId, 1);
      return;
    }
    if (target.classList.contains("qty-minus") && target.closest(".cart-qty-stepper")) {
      const itemId = parseInt(target.dataset.itemId);
      updateCartItemQty(itemId, -1);
      return;
    }

    // --- Area button in location dropdown ---
    if (target.classList.contains("area-btn")) {
      $("#current-location").textContent = target.dataset.area;
      toggleLocationDropdown(false);
      showToast(`Location set to ${target.dataset.area}`);
      return;
    }
  });

  // ============================================================
  // HEADER SCROLL SHADOW
  // ============================================================
  window.addEventListener("scroll", () => {
    const header = $("#header");
    header.classList.toggle("scrolled", window.scrollY > 10);
  });

  // ============================================================
  // INIT — Wire up everything
  // ============================================================
  function init() {
    // Render initial home view
    renderHomeView();
    renderLocationDropdown();
    updateCartUI();
    updateLoginUI();
    setupFilters();
    setupPaymentOptions();
    setupAuth();
    setupCouponApplication();

    // --- Logo => Home ---
    const logoHandler = () => {
      activeFilters = { veg: false, rating: false, "price-low": false, "price-mid": false, time: false, sort: "relevance", search: "", cuisine: "" };
      $("#header-search-input").value = "";
      $("#mobile-search-input").value = "";
      navigateTo("home");
    };
    $("#logo-btn").addEventListener("click", logoHandler);
    $("#logo-btn").addEventListener("keydown", (e) => {
      if (e.key === "Enter") logoHandler();
    });

    // --- Location dropdown ---
    $("#location-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      toggleLocationDropdown();
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest("#location-dropdown") && !e.target.closest("#location-btn")) {
        toggleLocationDropdown(false);
      }
    });

    // --- Geolocation ---
    $("#geo-btn").addEventListener("click", useGeolocation);

    // --- Search inputs ---
    $("#header-search-input").addEventListener("input", (e) => {
      handleSearch(e.target.value);
      $("#mobile-search-input").value = e.target.value;
    });
    $("#mobile-search-input").addEventListener("input", (e) => {
      handleSearch(e.target.value);
      $("#header-search-input").value = e.target.value;
    });

    // --- Cart button ---
    $("#cart-btn").addEventListener("click", openCartDrawer);
    $("#cart-close-btn").addEventListener("click", closeCartDrawer);
    $("#cart-overlay").addEventListener("click", closeCartDrawer);

    // --- Sticky cart bar ---
    $("#sticky-view-cart-btn").addEventListener("click", openCartDrawer);

    // --- Cart checkout ---
    $("#cart-checkout-btn").addEventListener("click", () => {
      if (!getUser()) {
        closeCartDrawer();
        showToast("Please login to proceed to checkout");
        openLoginModal("login");
        return;
      }
      closeCartDrawer();
      navigateTo("checkout");
    });

    // --- Login / Profile Button ---
    $("#login-btn").addEventListener("click", () => {
      if (getUser()) {
        openProfileModal();
      } else {
        openLoginModal("login");
      }
    });

    // Close buttons for modals
    $("#login-close-btn").addEventListener("click", closeLoginModal);
    $("#login-overlay").addEventListener("click", (e) => {
      if (e.target === $("#login-overlay")) closeLoginModal();
    });

    $("#profile-close-btn").addEventListener("click", closeProfileModal);
    $("#profile-overlay").addEventListener("click", (e) => {
      if (e.target === $("#profile-overlay")) closeProfileModal();
    });

    // --- Restaurant back button ---
    $("#rest-back-btn").addEventListener("click", () => {
      window.history.back();
    });

    // --- Place Order ---
    $("#place-order-btn").addEventListener("click", placeOrder);

    // --- Confirmation home button ---
    $("#conf-home-btn").addEventListener("click", () => navigateTo("home"));

    // --- Keyboard: Escape to close modals ---
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if ($("#cart-drawer").classList.contains("open")) closeCartDrawer();
        if ($("#login-overlay").classList.contains("open")) closeLoginModal();
        if ($("#profile-overlay").classList.contains("open")) closeProfileModal();
        if ($("#location-dropdown").classList.contains("open")) toggleLocationDropdown(false);
      }
    });

    // --- Handle initial route ---
    handleRoute();

    // --- Dismiss Loading Screen Animation ---
    dismissPageLoader();
  }

  // ============================================================
  // PAGE LOADER DISMISSAL
  // ============================================================
  function dismissPageLoader() {
    const loader = $("#page-loader");
    if (!loader) return;
    setTimeout(() => {
      loader.classList.add("loaded");
      setTimeout(() => {
        if (loader.parentNode) loader.remove();
      }, 600);
    }, 850);
  }

  // Start the app
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
