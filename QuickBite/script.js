// ============================================================
// QuickBite — Main Application Script
// SPA routing, cart management, search, filters, interactions
// ============================================================

(function () {
  "use strict";

  // ============================================================
  // STATE
  // ============================================================
  const DELIVERY_FEE = 40;
  const GST_RATE = 0.05;

  let currentView = "home";
  let currentRestaurantId = null;
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
    saveCart({ restaurantId: null, restaurantName: "", items: [] });
  }

  function addToCart(restaurantId, restaurantName, item) {
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
    showToast(`${item.name} added to cart`);
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
    }

    saveCart(cart);
  }

  function getCartTotals() {
    const cart = getCart();
    const subtotal = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const delivery = cart.items.length > 0 ? DELIVERY_FEE : 0;
    const tax = Math.round(subtotal * GST_RATE);
    const total = subtotal + delivery + tax;
    const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);
    return { subtotal, delivery, tax, total, itemCount };
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
  // TOAST
  // ============================================================
  let toastTimeout = null;
  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove("show"), 2500);
  }

  // ============================================================
  // CART BADGE BUMP
  // ============================================================
  function bumpCartBadge() {
    const badge = $("#cart-badge");
    badge.classList.remove("bump");
    void badge.offsetWidth; // reflow trigger
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
  function restaurantCardHTML(r) {
    return `
      <article class="restaurant-card" data-id="${r.id}" tabindex="0" role="button" aria-label="View ${r.name}">
        <div class="rest-card-img">
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
      <div class="promo-card" style="background: ${promo.gradient}" role="group" aria-label="Promo: ${promo.title}">
        <div class="promo-emoji">${promo.emoji}</div>
        <div class="promo-title">${promo.title}</div>
        <div class="promo-subtitle">${promo.subtitle}</div>
        <span class="promo-code">Use code: ${promo.code}</span>
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

    // Title
    let title = "Restaurants";
    if (f.search) title = `Results for "${f.search}"`;
    else if (f.cuisine) {
      const cat = cuisineCategories.find((c) => c.id === f.cuisine);
      title = cat ? `${cat.icon} ${cat.name} Restaurants` : "Restaurants";
    }
    $("#listing-title").textContent = title;
    $("#listing-count").textContent = `${filtered.length} restaurant${filtered.length !== 1 ? "s" : ""} found`;

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
            <span class="menu-category-count">(${cat.items.length})</span>
          </span>
          <span class="menu-category-chevron">▼</span>
        </div>
        <div class="menu-items-list" style="max-height: ${cat.items.length * 180}px;">
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
              ? `<button class="add-btn" data-rest-id="${restId}" data-rest-name="${restName}" data-item='${JSON.stringify(item).replace(/'/g, "&#39;")}' aria-label="Add ${item.name} to cart">ADD</button>`
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

    if (cart.items.length === 0) {
      navigateTo("home");
      return;
    }

    const summary = $("#checkout-summary");
    summary.innerHTML = `
      ${cart.items
        .map(
          (item) => `
        <div class="summary-item">
          <span>
            <span class="veg-dot ${item.isVeg ? "" : "nonveg"}" style="width:10px;height:10px;display:inline-flex;vertical-align:middle;margin-right:4px;">
              <span style="width:5px;height:5px;"></span>
            </span>
            ${item.name} <span class="item-qty">× ${item.quantity}</span>
          </span>
          <span>${formatPrice(item.price * item.quantity)}</span>
        </div>
      `
        )
        .join("")}
      <div style="border-top: 1px dashed var(--border); margin-top: 12px; padding-top: 12px;">
        <div class="summary-item"><span>Subtotal</span><span>${formatPrice(totals.subtotal)}</span></div>
        <div class="summary-item"><span>Delivery Fee</span><span>${formatPrice(totals.delivery)}</span></div>
        <div class="summary-item"><span>GST (5%)</span><span>${formatPrice(totals.tax)}</span></div>
        <div class="summary-item" style="font-weight:700; font-size:16px; margin-top:8px; padding-top:8px; border-top:2px solid var(--text);">
          <span>Total</span><span>${formatPrice(totals.total)}</span>
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
      <div class="order-eta">🕐 Estimated delivery: ${orderData.eta}</div>
      <div class="confirmation-items">
        ${orderData.items
          .map(
            (item) => `
          <div class="conf-item">
            <span>${item.name} × ${item.quantity}</span>
            <span>${formatPrice(item.price * item.quantity)}</span>
          </div>
        `
          )
          .join("")}
        <div class="conf-item" style="font-weight:700; margin-top:12px; padding-top:8px; border-top:1px solid var(--border);">
          <span>Total Paid</span>
          <span>${formatPrice(orderData.total)}</span>
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

    if (cart.items.length === 0) {
      listEl.innerHTML = `
        <div class="cart-empty">
          <div class="empty-icon">🛒</div>
          <h3 class="empty-title">Your cart is empty</h3>
          <p class="empty-text">Looks like you haven't added anything to your cart yet.</p>
        </div>
      `;
      billEl.classList.add("hidden");
      checkoutBtn.classList.add("hidden");
      restNameEl.classList.add("hidden");
    } else {
      restNameEl.textContent = `From: ${cart.restaurantName}`;
      restNameEl.classList.remove("hidden");

      listEl.innerHTML = cart.items
        .map(
          (item) => `
        <div class="cart-item" data-item-id="${item.id}">
          <div class="cart-item-info">
            <div class="cart-item-name">
              <span class="veg-dot ${item.isVeg ? "" : "nonveg"}" style="width:12px;height:12px;" aria-label="${item.isVeg ? "Veg" : "Non-Veg"}">
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

      // Bill
      $("#bill-subtotal").textContent = formatPrice(totals.subtotal);
      $("#bill-delivery").textContent = formatPrice(totals.delivery);
      $("#bill-tax").textContent = formatPrice(totals.tax);
      $("#bill-total").textContent = formatPrice(totals.total);
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
        // Remove stepper, add button
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
        btn.textContent = "ADD";
        imgContainer.appendChild(btn);
      } else if (qty > 0 && existingBtn) {
        // Remove button, add stepper
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
    // Focus trap start
    setTimeout(() => $("#cart-close-btn").focus(), 100);
  }

  function closeCartDrawer() {
    $("#cart-overlay").classList.remove("open");
    $("#cart-drawer").classList.remove("open");
    document.body.style.overflow = "";
  }

  // ============================================================
  // LOGIN MODAL
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
    showToast("Logged out successfully");
  }

  function updateLoginUI() {
    const user = getUser();
    const loginBtn = $("#login-btn");

    if (user) {
      loginBtn.innerHTML = `👤 <span class="btn-text">${user.name}</span>`;
      loginBtn.className = "header-btn user-btn";
      loginBtn.setAttribute("aria-label", `Logged in as ${user.name}`);
    } else {
      loginBtn.innerHTML = '👤 <span class="btn-text">Login</span>';
      loginBtn.className = "header-btn login-btn";
      loginBtn.setAttribute("aria-label", "Login or Sign up");
    }
  }

  function openLoginModal() {
    const user = getUser();
    if (user) {
      if (confirm(`Logged in as ${user.name}. Do you want to log out?`)) {
        logoutUser();
      }
      return;
    }
    $("#login-overlay").classList.add("open");
    document.body.style.overflow = "hidden";
    setTimeout(() => $("#login-email").focus(), 100);
  }

  function closeLoginModal() {
    $("#login-overlay").classList.remove("open");
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

    // Auto advance
    clearInterval(carouselInterval);
    carouselInterval = setInterval(() => {
      current = (current + 1) % promoBanners.length;
      goToSlide(current);
    }, 5000);

    // Dot clicks
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        clearInterval(carouselInterval);
        goToSlide(parseInt(dot.dataset.index));
        // Restart auto after click
        carouselInterval = setInterval(() => {
          current = (current + 1) % promoBanners.length;
          goToSlide(current);
        }, 5000);
      });
    });

    // Update dots on scroll
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
    { threshold: 0.1, rootMargin: "20px" }
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
      const handler = () => navigateTo(`restaurant/${card.dataset.id}`);
      card.addEventListener("click", handler);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handler();
        }
      });
    });
  }

  // ============================================================
  // EVENT DELEGATION (for dynamic elements)
  // ============================================================
  document.addEventListener("click", (e) => {
    const target = e.target;

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
    if (!validateCheckout()) {
      showToast("Please fill all required fields correctly");
      return;
    }

    const cart = getCart();
    const totals = getCartTotals();

    const orderData = {
      orderId: "QB" + Date.now().toString().slice(-8),
      eta: "30-40 mins",
      items: cart.items,
      total: totals.total,
    };

    renderConfirmation(orderData);
    clearCart();

    // Clear form
    $("#checkout-form").reset();
    $$(".form-group").forEach((fg) => fg.classList.remove("error"));

    navigateTo("confirmation");
    showToast("Order placed successfully! 🎉");
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
  // LOGIN TABS
  // ============================================================
  function setupLoginTabs() {
    const tabs = $$(".login-tabs .login-tab");
    const nameGroup = $("#login-name-group");
    const submitBtn = $("#login-submit-btn");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => {
          t.classList.remove("active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");

        if (tab.dataset.tab === "signup") {
          nameGroup.style.display = "block";
          submitBtn.textContent = "Sign Up";
        } else {
          nameGroup.style.display = "none";
          submitBtn.textContent = "Login";
        }
      });
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
        // Mock: just set a generic location
        $("#current-location").textContent = "Current Location";
        toggleLocationDropdown(false);
        showToast("Location detected successfully!");
      },
      (err) => {
        showToast("Could not detect location. Please select manually.");
      },
      { timeout: 5000 }
    );
  }

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
    setupLoginTabs();

    // --- Logo => Home ---
    const logoHandler = () => {
      activeFilters = { veg: false, rating: false, "price-low": false, "price-mid": false, time: false, sort: "relevance", search: "", cuisine: "" };
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
      // Sync mobile input
      $("#mobile-search-input").value = e.target.value;
    });
    $("#mobile-search-input").addEventListener("input", (e) => {
      handleSearch(e.target.value);
      // Sync desktop input
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
      closeCartDrawer();
      navigateTo("checkout");
    });

    // --- Login ---
    $("#login-btn").addEventListener("click", openLoginModal);
    $("#login-close-btn").addEventListener("click", closeLoginModal);
    $("#login-overlay").addEventListener("click", (e) => {
      if (e.target === $("#login-overlay")) closeLoginModal();
    });

    // --- Login submit ---
    $("#login-submit-btn").addEventListener("click", () => {
      const email = $("#login-email").value.trim();
      const nameInput = $("#login-name").value.trim();
      const activeTab = $(".login-tab.active").dataset.tab;

      if (!email) {
        showToast("Please enter your email or phone");
        return;
      }

      const name = activeTab === "signup" && nameInput ? nameInput : email.split("@")[0] || "User";
      saveUser({ name, email, loggedIn: true });
      closeLoginModal();
      showToast(`Welcome${activeTab === "signup" ? "" : " back"}, ${name}! 🎉`);
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
        if ($("#location-dropdown").classList.contains("open")) toggleLocationDropdown(false);
      }
    });

    // --- Handle initial route ---
    handleRoute();
  }

  // Start the app
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
