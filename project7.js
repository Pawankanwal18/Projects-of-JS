// ============================================
// ASTRO NOVA — Full Interactive JavaScript
// ============================================

// ─── Zodiac Database ───
const ZODIAC_DATA = {
  aries:       { symbol: '♈', name: 'Aries',       dates: 'Mar 21 – Apr 19',  element: 'Fire',  elementClass: 'fire',  planet: 'Mars',    quality: 'Cardinal', lucky: '9, 18, 27',   color: 'Red',       compat: 'Leo, Sagittarius',    traits: ['Courageous', 'Energetic', 'Confident', 'Passionate', 'Pioneering'], message: 'Your fearless spirit is your greatest gift. The universe is aligning new opportunities that demand your boldness — step forward and lead the way.' },
  taurus:      { symbol: '♉', name: 'Taurus',      dates: 'Apr 20 – May 20',  element: 'Earth', elementClass: 'earth', planet: 'Venus',   quality: 'Fixed',    lucky: '6, 15, 24',   color: 'Green',     compat: 'Virgo, Capricorn',    traits: ['Reliable', 'Patient', 'Devoted', 'Sensual', 'Grounded'],           message: 'Your steady nature builds empires. Trust the process, nurture your roots, and watch as abundance flows naturally into your life.' },
  gemini:      { symbol: '♊', name: 'Gemini',      dates: 'May 21 – Jun 20',  element: 'Air',   elementClass: 'air',   planet: 'Mercury', quality: 'Mutable',  lucky: '5, 14, 23',   color: 'Yellow',    compat: 'Libra, Aquarius',     traits: ['Versatile', 'Curious', 'Witty', 'Expressive', 'Social'],           message: 'Your dual nature is a superpower. Every conversation is a doorway — stay curious and let your adaptability carry you to new heights.' },
  cancer:      { symbol: '♋', name: 'Cancer',      dates: 'Jun 21 – Jul 22',  element: 'Water', elementClass: 'water', planet: 'Moon',    quality: 'Cardinal', lucky: '2, 11, 20',   color: 'Silver',    compat: 'Scorpio, Pisces',     traits: ['Intuitive', 'Nurturing', 'Protective', 'Loyal', 'Imaginative'],    message: 'Your emotional depth is your compass. The moon whispers that healing and deeper connections await — open your heart to receive them.' },
  leo:         { symbol: '♌', name: 'Leo',         dates: 'Jul 23 – Aug 22',  element: 'Fire',  elementClass: 'fire',  planet: 'Sun',     quality: 'Fixed',    lucky: '1, 10, 19',   color: 'Gold',      compat: 'Aries, Sagittarius',  traits: ['Charismatic', 'Creative', 'Generous', 'Loyal', 'Dramatic'],        message: 'Your radiant light inspires everyone around you. The stars are amplifying your creative force — shine without reservation.' },
  virgo:       { symbol: '♍', name: 'Virgo',       dates: 'Aug 23 – Sep 22',  element: 'Earth', elementClass: 'earth', planet: 'Mercury', quality: 'Mutable',  lucky: '5, 14, 23',   color: 'Navy Blue', compat: 'Taurus, Capricorn',   traits: ['Analytical', 'Practical', 'Diligent', 'Modest', 'Perfectionist'], message: 'Your attention to detail is a cosmic gift. The universe rewards precision — trust your instincts to refine and perfect your path.' },
  libra:       { symbol: '♎', name: 'Libra',       dates: 'Sep 23 – Oct 22',  element: 'Air',   elementClass: 'air',   planet: 'Venus',   quality: 'Cardinal', lucky: '6, 15, 24',   color: 'Pink',      compat: 'Gemini, Aquarius',    traits: ['Diplomatic', 'Graceful', 'Fair', 'Harmonious', 'Romantic'],        message: 'Your gift for balance brings peace to chaos. The stars are aligning partnerships that mirror your highest values — embrace harmony.' },
  scorpio:     { symbol: '♏', name: 'Scorpio',     dates: 'Oct 23 – Nov 21',  element: 'Water', elementClass: 'water', planet: 'Pluto',   quality: 'Fixed',    lucky: '8, 17, 26',   color: 'Crimson',   compat: 'Cancer, Pisces',      traits: ['Intense', 'Resourceful', 'Magnetic', 'Strategic', 'Transformative'], message: 'Your depth of feeling transforms everything it touches. A powerful rebirth is near — surrender to the transformation ahead.' },
  sagittarius: { symbol: '♐', name: 'Sagittarius', dates: 'Nov 22 – Dec 21',  element: 'Fire',  elementClass: 'fire',  planet: 'Jupiter', quality: 'Mutable',  lucky: '3, 12, 21',   color: 'Purple',    compat: 'Aries, Leo',          traits: ['Adventurous', 'Optimistic', 'Philosophical', 'Free-spirited', 'Honest'], message: 'Your quest for truth is a beacon of light. The cosmos is expanding your horizons — aim your arrow high and trust the journey.' },
  capricorn:   { symbol: '♑', name: 'Capricorn',   dates: 'Dec 22 – Jan 19',  element: 'Earth', elementClass: 'earth', planet: 'Saturn',  quality: 'Cardinal', lucky: '4, 13, 22',   color: 'Brown',     compat: 'Taurus, Virgo',       traits: ['Ambitious', 'Disciplined', 'Responsible', 'Strategic', 'Wise'],    message: 'Your determination moves mountains. Saturn is rewarding your patience and discipline — the summit is closer than you think.' },
  aquarius:    { symbol: '♒', name: 'Aquarius',    dates: 'Jan 20 – Feb 18',  element: 'Air',   elementClass: 'air',   planet: 'Uranus',  quality: 'Fixed',    lucky: '7, 16, 25',   color: 'Turquoise', compat: 'Gemini, Libra',       traits: ['Innovative', 'Independent', 'Humanitarian', 'Visionary', 'Unique'], message: 'Your unconventional thinking changes the world. The cosmos is electrifying your ideas — embrace your uniqueness and innovate boldly.' },
  pisces:      { symbol: '♓', name: 'Pisces',      dates: 'Feb 19 – Mar 20',  element: 'Water', elementClass: 'water', planet: 'Neptune', quality: 'Mutable',  lucky: '3, 12, 21',   color: 'Sea Green', compat: 'Cancer, Scorpio',     traits: ['Compassionate', 'Artistic', 'Intuitive', 'Dreamy', 'Empathetic'],  message: 'Your imagination is a portal to infinite possibility. Neptune blesses your creativity — trust your visions and let art guide you.' }
};

// ─── Get Zodiac Sign from Date ───
function getZodiacSign(month, day) {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'aquarius';
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'pisces';
  return 'aries';
}

// ─── Starfield Canvas ───
function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createStars() {
    stars = [];
    const count = Math.floor((width * height) / 6000);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.3,
        speed: Math.random() * 0.15 + 0.02,
        opacity: Math.random() * 0.6 + 0.2,
        pulse: Math.random() * Math.PI * 2
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Background gradient
    const gradient = ctx.createRadialGradient(width * 0.7, height * 0.1, 0, width * 0.5, height * 0.5, Math.max(width, height));
    gradient.addColorStop(0, 'rgba(124, 92, 191, 0.06)');
    gradient.addColorStop(0.4, 'rgba(212, 165, 90, 0.03)');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Stars
    stars.forEach(star => {
      star.pulse += 0.008;
      star.y += star.speed;
      if (star.y > height + 5) {
        star.y = -5;
        star.x = Math.random() * width;
      }
      const flicker = Math.sin(star.pulse) * 0.3 + 0.7;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240, 214, 160, ${star.opacity * flicker})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  resize();
  createStars();
  draw();
  window.addEventListener('resize', () => { resize(); createStars(); });
}

// ─── Live Date ───
function updateLiveDate() {
  const el = document.getElementById('live-date');
  if (!el) return;
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  el.textContent = now.toLocaleDateString('en-US', options);
}

// ─── Scroll Reveal ───
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ─── Sticky Header Scroll Effect ───
function initHeaderScroll() {
  const topbar = document.getElementById('topbar');
  if (!topbar) return;
  window.addEventListener('scroll', () => {
    topbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ─── Active Nav Link ───
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ─── Mobile Hamburger ───
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
  });

  // Close nav on link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
    });
  });
}

// ─── Toast Notification ───
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMessage');
  if (!toast || !toastMsg) return;
  toastMsg.textContent = message;
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 3500);
}

// ─── Form Validation & Submission ───
function initForm() {
  const form = document.getElementById('birthChartForm');
  if (!form) return;

  const firstNameInput = document.getElementById('firstName');
  const surnameInput = document.getElementById('surname');
  const dobInput = document.getElementById('dob');
  const submitBtn = document.getElementById('submitBtn');

  // Real-time validation
  function validateField(input, errorId, validator) {
    const errorEl = document.getElementById(errorId);
    input.addEventListener('input', () => {
      const result = validator(input.value.trim());
      if (result) {
        input.classList.add('input-error');
        errorEl.textContent = result;
      } else {
        input.classList.remove('input-error');
        errorEl.textContent = '';
      }
    });

    input.addEventListener('blur', () => {
      const result = validator(input.value.trim());
      if (result) {
        input.classList.add('input-error');
        errorEl.textContent = result;
      }
    });
  }

  validateField(firstNameInput, 'firstNameError', (val) => {
    if (!val) return 'First name is required';
    if (val.length < 2) return 'Must be at least 2 characters';
    if (!/^[a-zA-Z\s'-]+$/.test(val)) return 'Only letters, spaces, hyphens allowed';
    return '';
  });

  validateField(surnameInput, 'surnameError', (val) => {
    if (!val) return 'Surname is required';
    if (val.length < 2) return 'Must be at least 2 characters';
    if (!/^[a-zA-Z\s'-]+$/.test(val)) return 'Only letters, spaces, hyphens allowed';
    return '';
  });

  validateField(dobInput, 'dobError', (val) => {
    if (!val) return 'Date of birth is required';
    const date = new Date(val);
    const today = new Date();
    if (date > today) return 'Date cannot be in the future';
    const age = today.getFullYear() - date.getFullYear();
    if (age > 150) return 'Please enter a valid date';
    return '';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = firstNameInput.value.trim();
    const surname = surnameInput.value.trim();
    const dob = dobInput.value;

    // Final validation
    let hasError = false;

    if (!firstName || firstName.length < 2) {
      document.getElementById('firstNameError').textContent = 'Please enter a valid first name';
      firstNameInput.classList.add('input-error');
      hasError = true;
    }

    if (!surname || surname.length < 2) {
      document.getElementById('surnameError').textContent = 'Please enter a valid surname';
      surnameInput.classList.add('input-error');
      hasError = true;
    }

    if (!dob) {
      document.getElementById('dobError').textContent = 'Please select your date of birth';
      dobInput.classList.add('input-error');
      hasError = true;
    }

    if (hasError) return;

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Simulate a brief loading animation
    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      generateResult(firstName, surname, dob);
    }, 1200);
  });
}

// ─── Generate & Display Result ───
function generateResult(firstName, surname, dob) {
  const date = new Date(dob);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const signKey = getZodiacSign(month, day);
  const data = ZODIAC_DATA[signKey];

  if (!data) return;

  // Fill result section
  document.getElementById('resultIcon').textContent = data.symbol;
  document.getElementById('resultName').textContent = `${capitalize(firstName)} ${capitalize(surname)}`;
  document.getElementById('resultSymbol').textContent = data.symbol;
  document.getElementById('resultSign').textContent = data.name;
  document.getElementById('resultDates').textContent = data.dates;

  const elementBadge = document.getElementById('resultElement');
  elementBadge.textContent = `${data.element} Sign`;
  elementBadge.className = `result-element-badge ${data.elementClass}`;

  document.getElementById('resultPlanet').textContent = data.planet;
  document.getElementById('resultElementName').textContent = data.element;
  document.getElementById('resultQuality').textContent = data.quality;
  document.getElementById('resultLucky').textContent = data.lucky;
  document.getElementById('resultColor').textContent = data.color;
  document.getElementById('resultCompat').textContent = data.compat;

  // Traits
  const traitsList = document.getElementById('resultTraits');
  traitsList.innerHTML = '';
  data.traits.forEach(trait => {
    const span = document.createElement('span');
    span.className = 'trait-tag';
    span.textContent = trait;
    traitsList.appendChild(span);
  });

  // Message with personalized name
  document.getElementById('resultMessage').textContent = `Dear ${capitalize(firstName)}, ${data.message}`;

  // Energy bars with random but seeded values
  const seed = firstName.length + surname.length + day + month;
  const love = 60 + ((seed * 7) % 35);
  const career = 55 + ((seed * 13) % 40);
  const health = 50 + ((seed * 11) % 45);
  const luck = 45 + ((seed * 17) % 50);

  document.getElementById('barLovePercent').textContent = `${love}%`;
  document.getElementById('barCareerPercent').textContent = `${career}%`;
  document.getElementById('barHealthPercent').textContent = `${health}%`;
  document.getElementById('barLuckPercent').textContent = `${luck}%`;

  // Show the result section
  const resultSection = document.getElementById('resultSection');
  resultSection.classList.add('visible');

  // Animate bars after a small delay
  setTimeout(() => {
    document.getElementById('barLove').style.width = `${love}%`;
    document.getElementById('barCareer').style.width = `${career}%`;
    document.getElementById('barHealth').style.width = `${health}%`;
    document.getElementById('barLuck').style.width = `${luck}%`;
  }, 400);

  // Scroll to result
  resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  showToast(`✨ ${capitalize(firstName)}'s cosmic blueprint revealed!`);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// ─── Result Close & Try Again ───
function initResultControls() {
  const closeBtn = document.getElementById('resultClose');
  const tryAgainBtn = document.getElementById('tryAgainBtn');
  const resultSection = document.getElementById('resultSection');

  function hideResult() {
    if (!resultSection) return;
    resultSection.classList.remove('visible');

    // Reset bars
    ['barLove', 'barCareer', 'barHealth', 'barLuck'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.width = '0%';
    });

    // Scroll back to form
    const formSection = document.getElementById('birth-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Reset form
    const form = document.getElementById('birthChartForm');
    if (form) form.reset();

    // Clear errors
    document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
  }

  if (closeBtn) closeBtn.addEventListener('click', hideResult);
  if (tryAgainBtn) tryAgainBtn.addEventListener('click', hideResult);
}

// ─── Newsletter Form ───
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value.trim();
    if (email) {
      showToast('🌟 Successfully subscribed to cosmic updates!');
      form.reset();
    }
  });
}

// ─── Smooth Scroll for Anchor Links ───
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ─── Orbit Parallax on Mouse ───
function initOrbitParallax() {
  const orb = document.querySelector('.orbit-system');
  if (!orb) return;
  
  window.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 6;
    const y = (event.clientY / window.innerHeight - 0.5) * -6;
    orb.style.transform = `rotate(${orb.style.transform ? '' : '0deg'}) perspective(600px) rotateX(${y}deg) rotateY(${x}deg)`;
  });
}

// ─── Initialize Everything ───
document.addEventListener('DOMContentLoaded', () => {
  initStarfield();
  updateLiveDate();
  initReveal();
  initHeaderScroll();
  initActiveNav();
  initHamburger();
  initForm();
  initResultControls();
  initNewsletter();
  initSmoothScroll();
  initOrbitParallax();
});
