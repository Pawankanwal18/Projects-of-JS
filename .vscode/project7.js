/* ============================================
   CELESTIA — Astrology App JavaScript
   ============================================ */

// ---- Zodiac Data ----
const zodiacSigns = [
    {
        name: "Aries",
        symbol: "♈",
        emoji: "🐏",
        dates: "Mar 21 – Apr 19",
        startMonth: 3, startDay: 21, endMonth: 4, endDay: 19,
        element: "fire",
        modality: "Cardinal",
        planet: "Mars",
        description: "Aries, the first sign of the zodiac, is a fiery trailblazer ruled by Mars. Bold, ambitious, and fearless, Aries dives headfirst into challenges. Their competitive nature drives them to be pioneers, leaders, and innovators. With boundless energy and infectious enthusiasm, they inspire everyone around them.",
        strengths: ["Courageous", "Determined", "Confident", "Enthusiastic", "Optimistic"],
        weaknesses: ["Impatient", "Impulsive", "Short-tempered", "Aggressive"],
        compatibility: ["Leo", "Sagittarius", "Gemini", "Aquarius"],
        luckyNumbers: [1, 8, 17],
        luckyColor: "Red"
    },
    {
        name: "Taurus",
        symbol: "♉",
        emoji: "🐂",
        dates: "Apr 20 – May 20",
        startMonth: 4, startDay: 20, endMonth: 5, endDay: 20,
        element: "earth",
        modality: "Fixed",
        planet: "Venus",
        description: "Taurus embodies stability, sensuality, and determination. Ruled by Venus, they have an unmatched appreciation for beauty, comfort, and luxury. Patient yet persistent, a Taurus will move mountains — slowly and deliberately. They are the bedrock of reliability and loyalty in any relationship.",
        strengths: ["Reliable", "Patient", "Practical", "Devoted", "Responsible"],
        weaknesses: ["Stubborn", "Possessive", "Uncompromising", "Materialistic"],
        compatibility: ["Virgo", "Capricorn", "Cancer", "Pisces"],
        luckyNumbers: [2, 6, 9],
        luckyColor: "Green"
    },
    {
        name: "Gemini",
        symbol: "♊",
        emoji: "👯",
        dates: "May 21 – Jun 20",
        startMonth: 5, startDay: 21, endMonth: 6, endDay: 20,
        element: "air",
        modality: "Mutable",
        planet: "Mercury",
        description: "Gemini, the twins of the zodiac, are endlessly curious and wonderfully expressive. Ruled by Mercury, they're quick-witted communicators who can adapt to any situation. Their dual nature means they're versatile, outgoing, and intellectually driven — always seeking new experiences and knowledge.",
        strengths: ["Gentle", "Affectionate", "Curious", "Adaptable", "Quick learner"],
        weaknesses: ["Nervous", "Inconsistent", "Indecisive", "Restless"],
        compatibility: ["Libra", "Aquarius", "Aries", "Leo"],
        luckyNumbers: [5, 7, 14],
        luckyColor: "Yellow"
    },
    {
        name: "Cancer",
        symbol: "♋",
        emoji: "🦀",
        dates: "Jun 21 – Jul 22",
        startMonth: 6, startDay: 21, endMonth: 7, endDay: 22,
        element: "water",
        modality: "Cardinal",
        planet: "Moon",
        description: "Cancer is the nurturer of the zodiac, deeply intuitive and sentimental. Ruled by the Moon, they are profoundly connected to their emotions and to the people they love. Their protective shell hides an ocean of warmth, empathy, and fierce loyalty. Home and family are everything to a Cancer.",
        strengths: ["Tenacious", "Imaginative", "Loyal", "Emotional", "Sympathetic"],
        weaknesses: ["Moody", "Pessimistic", "Suspicious", "Manipulative"],
        compatibility: ["Scorpio", "Pisces", "Taurus", "Virgo"],
        luckyNumbers: [2, 3, 15],
        luckyColor: "Silver"
    },
    {
        name: "Leo",
        symbol: "♌",
        emoji: "🦁",
        dates: "Jul 23 – Aug 22",
        startMonth: 7, startDay: 23, endMonth: 8, endDay: 22,
        element: "fire",
        modality: "Fixed",
        planet: "Sun",
        description: "Leo, the lion, commands the zodiac with warmth, generosity, and theatrical flair. Ruled by the Sun itself, Leos radiate confidence and charisma. They are natural-born leaders who thrive in the spotlight, yet their golden hearts make them fiercely protective and incredibly generous to those they love.",
        strengths: ["Creative", "Passionate", "Generous", "Warm-hearted", "Cheerful"],
        weaknesses: ["Arrogant", "Stubborn", "Self-centered", "Inflexible"],
        compatibility: ["Aries", "Sagittarius", "Gemini", "Libra"],
        luckyNumbers: [1, 3, 10],
        luckyColor: "Gold"
    },
    {
        name: "Virgo",
        symbol: "♍",
        emoji: "👼",
        dates: "Aug 23 – Sep 22",
        startMonth: 8, startDay: 23, endMonth: 9, endDay: 22,
        element: "earth",
        modality: "Mutable",
        planet: "Mercury",
        description: "Virgo approaches the world with a keen analytical mind and a deep sense of purpose. Ruled by Mercury, they are meticulous, practical, and incredibly attentive to detail. Behind their reserved exterior lies a caring soul dedicated to service and self-improvement — always striving for perfection.",
        strengths: ["Loyal", "Analytical", "Kind", "Hardworking", "Practical"],
        weaknesses: ["Shy", "Worried", "Overly critical", "Perfectionist"],
        compatibility: ["Taurus", "Capricorn", "Cancer", "Scorpio"],
        luckyNumbers: [5, 14, 23],
        luckyColor: "Navy Blue"
    },
    {
        name: "Libra",
        symbol: "♎",
        emoji: "⚖️",
        dates: "Sep 23 – Oct 22",
        startMonth: 9, startDay: 23, endMonth: 10, endDay: 22,
        element: "air",
        modality: "Cardinal",
        planet: "Venus",
        description: "Libra seeks harmony, balance, and beauty in all things. Ruled by Venus, they are natural diplomats with an innate sense of justice and fairness. Charming and sociable, Libras effortlessly create peace and forge meaningful connections. Their aesthetic sensibility makes them drawn to art, culture, and elegant living.",
        strengths: ["Cooperative", "Diplomatic", "Gracious", "Fair-minded", "Social"],
        weaknesses: ["Indecisive", "Avoids confrontation", "Self-pity", "People-pleasing"],
        compatibility: ["Gemini", "Aquarius", "Leo", "Sagittarius"],
        luckyNumbers: [4, 6, 13],
        luckyColor: "Pink"
    },
    {
        name: "Scorpio",
        symbol: "♏",
        emoji: "🦂",
        dates: "Oct 23 – Nov 21",
        startMonth: 10, startDay: 23, endMonth: 11, endDay: 21,
        element: "water",
        modality: "Fixed",
        planet: "Pluto",
        description: "Scorpio is the most intense and magnetic sign of the zodiac. Ruled by Pluto, they possess a depth of emotion and a power of will that is truly extraordinary. Passionate, strategic, and fiercely loyal, Scorpios navigate life with unmatched determination. They seek truth and transformation in everything.",
        strengths: ["Resourceful", "Brave", "Passionate", "Stubborn", "True friend"],
        weaknesses: ["Distrusting", "Jealous", "Secretive", "Violent"],
        compatibility: ["Cancer", "Pisces", "Virgo", "Capricorn"],
        luckyNumbers: [8, 11, 18],
        luckyColor: "Crimson"
    },
    {
        name: "Sagittarius",
        symbol: "♐",
        emoji: "🏹",
        dates: "Nov 22 – Dec 21",
        startMonth: 11, startDay: 22, endMonth: 12, endDay: 21,
        element: "fire",
        modality: "Mutable",
        planet: "Jupiter",
        description: "Sagittarius, the archer, is the zodiac's eternal explorer. Ruled by expansive Jupiter, they are adventurous, optimistic, and philosophical. With an insatiable thirst for knowledge and new experiences, Sagittarians roam the world with open hearts and curious minds, spreading joy and wisdom wherever they go.",
        strengths: ["Generous", "Idealistic", "Great sense of humor", "Adventurous"],
        weaknesses: ["Promises more than can deliver", "Impatient", "Tactless"],
        compatibility: ["Aries", "Leo", "Libra", "Aquarius"],
        luckyNumbers: [3, 7, 9],
        luckyColor: "Purple"
    },
    {
        name: "Capricorn",
        symbol: "♑",
        emoji: "🐐",
        dates: "Dec 22 – Jan 19",
        startMonth: 12, startDay: 22, endMonth: 1, endDay: 19,
        element: "earth",
        modality: "Cardinal",
        planet: "Saturn",
        description: "Capricorn is the ambitious mountain goat, climbing steadily toward the summit. Ruled by Saturn, they embody discipline, responsibility, and self-control. Patient and strategic, Capricorns build empires brick by brick. Behind their serious exterior lies a dry wit and a deeply loyal, caring nature.",
        strengths: ["Responsible", "Disciplined", "Self-control", "Good managers"],
        weaknesses: ["Know-it-all", "Unforgiving", "Condescending", "Expecting the worst"],
        compatibility: ["Taurus", "Virgo", "Scorpio", "Pisces"],
        luckyNumbers: [4, 8, 13],
        luckyColor: "Brown"
    },
    {
        name: "Aquarius",
        symbol: "♒",
        emoji: "🏺",
        dates: "Jan 20 – Feb 18",
        startMonth: 1, startDay: 20, endMonth: 2, endDay: 18,
        element: "air",
        modality: "Fixed",
        planet: "Uranus",
        description: "Aquarius is the visionary humanitarian of the zodiac. Ruled by Uranus, they are independent, innovative, and deeply committed to making the world a better place. Eccentric and original, Aquarians march to their own drumbeat, challenging conventions and championing progressive ideals with unwavering conviction.",
        strengths: ["Progressive", "Original", "Independent", "Humanitarian"],
        weaknesses: ["Runs from emotional expression", "Temperamental", "Uncompromising"],
        compatibility: ["Gemini", "Libra", "Aries", "Sagittarius"],
        luckyNumbers: [4, 7, 11],
        luckyColor: "Turquoise"
    },
    {
        name: "Pisces",
        symbol: "♓",
        emoji: "🐟",
        dates: "Feb 19 – Mar 20",
        startMonth: 2, startDay: 19, endMonth: 3, endDay: 20,
        element: "water",
        modality: "Mutable",
        planet: "Neptune",
        description: "Pisces, the dreamer, swims through the mystical waters of the subconscious. Ruled by Neptune, they are the most intuitive, empathetic, and artistic sign. Pisces absorbs the emotions of everyone around them, channeling this deep sensitivity into creativity, compassion, and a profound spiritual awareness.",
        strengths: ["Compassionate", "Artistic", "Intuitive", "Gentle", "Wise"],
        weaknesses: ["Fearful", "Overly trusting", "Sad", "Desire to escape reality"],
        compatibility: ["Cancer", "Scorpio", "Taurus", "Capricorn"],
        luckyNumbers: [3, 9, 12],
        luckyColor: "Sea Green"
    }
];

// ---- Horoscope Readings Pool ----
const horoscopeReadings = [
    "The stars align in your favor today. A powerful cosmic energy surrounds you, urging you to take bold action on a long-held dream. Trust your instincts — the universe is conspiring in your support. An unexpected conversation may reveal a hidden opportunity that changes your perspective entirely.",
    "Today brings a wave of creative inspiration. The celestial alignment encourages you to explore new artistic endeavors and express yourself authentically. Relationships deepen as you share your true feelings. Financial decisions should be approached with patience — the right moment is coming soon.",
    "A shift in planetary energy invites deep introspection today. Take time to reflect on your recent journey and acknowledge how far you've come. A meaningful connection with someone from your past may resurface, bringing closure or a beautiful new chapter. Stay open to transformation.",
    "The Moon's influence amplifies your intuition today. Pay attention to subtle signs and synchronicities — the cosmos is speaking to you through small moments. A professional opportunity aligns with your core values. Embrace vulnerability in your relationships; it will strengthen your bonds.",
    "Jupiter's benevolent gaze shines upon your path today. Expansion and growth are the themes — whether in career, education, or personal development. A mentor figure may offer wisdom that reshapes your approach. Celebrate small victories, for they are stepping stones to grand achievements.",
    "Venus graces your chart with warmth and beauty today. Romantic energies are heightened, making it an ideal time for heartfelt conversations and new connections. Self-care rituals bring profound healing. Your natural charm opens doors — use it wisely and with genuine intention.",
    "Mercury retrograde's shadow lifts, clearing communication channels. Express yourself clearly today — your words carry extra weight and resonance. A creative project that stalled begins to flow again. Old misunderstandings can be resolved through honest, compassionate dialogue.",
    "The cosmic tides pull you toward adventure today. Break free from routine and explore uncharted territory — whether physically, mentally, or spiritually. A chance encounter could lead to a significant friendship. Trust the journey, even when the destination isn't yet visible.",
    "Saturn's presence encourages structure and discipline today. Focus your energy on building solid foundations for your future. Hard work done now will yield rewards beyond expectations. A quiet evening of reflection reveals insights about your deepest desires and true purpose.",
    "Today's celestial configuration sparks innovation. Your unique perspective is needed — don't be afraid to challenge the status quo. A technology-related breakthrough or idea could be significant. Collaborate with like-minded souls; together you can manifest extraordinary visions.",
    "The stars whisper of abundance flowing your way. An attitude of gratitude amplifies this cosmic gift. Family bonds strengthen through shared memories and laughter. A health-related insight leads to positive lifestyle changes. Trust that the universe provides exactly what you need.",
    "Neptune's dreamy influence colors your day with imagination and wonder. Pay attention to your dreams — they carry messages from your higher self. Artistic pursuits flourish under this energy. Be mindful of boundaries, as your empathic nature absorbs others' emotions easily."
];

// ---- Compatibility Data ----
const compatibilityData = {
    same: { score: 75, verdict: "Mirror Souls", desc: "Two of the same sign create an intense, deeply understanding bond. You reflect each other's strengths and challenges, creating a relationship that's both comfortable and growth-inspiring." },
    fire_fire: { score: 88, verdict: "Blazing Passion", desc: "Two fire signs create an explosion of energy, excitement, and passion. Your shared enthusiasm lights up every room. Just remember to leave space for the flames to breathe." },
    earth_earth: { score: 85, verdict: "Solid Foundation", desc: "Two earth signs build an unshakable partnership rooted in loyalty, stability, and shared values. Together you create a sanctuary of comfort, trust, and lasting devotion." },
    air_air: { score: 82, verdict: "Intellectual Spark", desc: "Two air signs create a meeting of brilliant minds. Your conversations flow endlessly, and your shared curiosity fuels a dynamic, ever-evolving connection full of ideas and inspiration." },
    water_water: { score: 90, verdict: "Ocean of Emotion", desc: "Two water signs dive into the deepest waters of emotion and intimacy. Your connection is profoundly spiritual and intuitive. You understand each other's feelings without a single word spoken." },
    fire_air: { score: 92, verdict: "Cosmic Chemistry", desc: "Fire and Air create magic together! Air fans the flames of Fire's passion while Fire gives Air warmth and direction. This dynamic duo inspires each other to reach extraordinary heights." },
    fire_earth: { score: 60, verdict: "Grounding Force", desc: "Fire's spontaneity meets Earth's stability in a push-pull dance. With patience and understanding, Fire learns the value of planning while Earth discovers the beauty of taking risks." },
    fire_water: { score: 55, verdict: "Steam & Passion", desc: "Fire and Water create powerful steam — intense but volatile. When balanced, Water tempers Fire's aggression while Fire warms Water's depths. This pairing requires mutual respect and patience." },
    earth_air: { score: 58, verdict: "Wind & Stone", desc: "Earth and Air may seem worlds apart, but they offer what the other needs. Air brings fresh perspectives to Earth's grounded nature, while Earth provides stability for Air's restless spirit." },
    earth_water: { score: 88, verdict: "Garden of Love", desc: "Earth and Water nurture each other beautifully — like rain on fertile soil. Water nourishes Earth's ambitions while Earth gives Water a safe container for their deep emotions. A naturally harmonious match." },
    air_water: { score: 62, verdict: "Misty Horizons", desc: "Air and Water create a misty, ethereal connection. Communication styles differ — Air intellectualizes while Water feels deeply. When they meet in the middle, they create something truly unique and beautiful." }
};

// ---- Initialize App ----
document.addEventListener("DOMContentLoaded", () => {
    initStarfield();
    initZodiacWheel();
    initSignsGrid();
    initHoroscopeSelector();
    initCompatibility();
    initNavigation();
    initScrollReveal();
    initFinderForm();
});

// ---- Starfield ----
function initStarfield() {
    const canvas = document.getElementById("starsCanvas");
    const ctx = canvas.getContext("2d");
    let stars = [];
    const STAR_COUNT = 200;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createStars() {
        stars = [];
        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.8 + 0.2,
                twinkleSpeed: Math.random() * 0.02 + 0.005,
                twinkleOffset: Math.random() * Math.PI * 2
            });
        }
    }

    function draw(time) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.4 + 0.6;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }

    resize();
    createStars();
    requestAnimationFrame(draw);

    window.addEventListener("resize", () => {
        resize();
        createStars();
    });
}

// ---- Zodiac Wheel ----
function initZodiacWheel() {
    const wheel = document.getElementById("zodiacWheel");
    const radius = wheel.offsetWidth / 2 - 25;

    zodiacSigns.forEach((sign, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        const el = document.createElement("div");
        el.className = "wheel-sign";
        el.textContent = sign.symbol;
        el.title = sign.name;
        el.style.transform = `translate(${x - 12}px, ${y - 12}px)`;
        wheel.appendChild(el);
    });
}

// ---- Signs Grid ----
function initSignsGrid() {
    const grid = document.getElementById("signsGrid");

    zodiacSigns.forEach((sign, index) => {
        const card = document.createElement("div");
        card.className = "sign-card reveal";
        card.dataset.element = sign.element;
        card.style.transitionDelay = `${index * 0.05}s`;
        card.innerHTML = `
            <div class="sign-card-symbol">${sign.symbol}</div>
            <div class="sign-card-name">${sign.name}</div>
            <div class="sign-card-dates">${sign.dates}</div>
            <span class="sign-card-element element-${sign.element}">${sign.element}</span>
        `;
        card.addEventListener("click", () => openSignModal(sign));
        grid.appendChild(card);
    });

    // Element filters
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.dataset.filter;
            document.querySelectorAll(".sign-card").forEach(card => {
                if (filter === "all" || card.dataset.element === filter) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            });
        });
    });
}

// ---- Sign Modal ----
function openSignModal(sign) {
    const modal = document.getElementById("signModal");
    const body = document.getElementById("modalBody");

    body.innerHTML = `
        <div class="modal-header">
            <div class="modal-symbol">${sign.symbol}</div>
            <div class="modal-sign-name">${sign.name}</div>
            <div class="modal-dates">${sign.dates}</div>
        </div>
        <div class="modal-stats">
            <div class="modal-stat">
                <div class="modal-stat-label">Element</div>
                <div class="modal-stat-value">${sign.element.charAt(0).toUpperCase() + sign.element.slice(1)} ${getElementEmoji(sign.element)}</div>
            </div>
            <div class="modal-stat">
                <div class="modal-stat-label">Modality</div>
                <div class="modal-stat-value">${sign.modality}</div>
            </div>
            <div class="modal-stat">
                <div class="modal-stat-label">Ruling Planet</div>
                <div class="modal-stat-value">${sign.planet}</div>
            </div>
        </div>
        <div class="modal-description">${sign.description}</div>
        <div class="modal-traits">
            <h3>✦ Strengths</h3>
            <div class="trait-tags">
                ${sign.strengths.map(t => `<span class="trait-tag positive">${t}</span>`).join("")}
            </div>
        </div>
        <div class="modal-traits">
            <h3>✦ Challenges</h3>
            <div class="trait-tags">
                ${sign.weaknesses.map(t => `<span class="trait-tag negative">${t}</span>`).join("")}
            </div>
        </div>
        <div class="modal-traits">
            <h3>✦ Best Matches</h3>
            <div class="trait-tags">
                ${sign.compatibility.map(c => {
                    const matchSign = zodiacSigns.find(s => s.name === c);
                    return `<span class="trait-tag">${matchSign.symbol} ${c}</span>`;
                }).join("")}
            </div>
        </div>
        <div class="modal-stats" style="margin-top:20px">
            <div class="modal-stat">
                <div class="modal-stat-label">Lucky Numbers</div>
                <div class="modal-stat-value">${sign.luckyNumbers.join(", ")}</div>
            </div>
            <div class="modal-stat">
                <div class="modal-stat-label">Lucky Color</div>
                <div class="modal-stat-value">${sign.luckyColor}</div>
            </div>
            <div class="modal-stat">
                <div class="modal-stat-label">Symbol</div>
                <div class="modal-stat-value">${sign.emoji}</div>
            </div>
        </div>
    `;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    document.getElementById("signModal").classList.remove("active");
    document.body.style.overflow = "";
}

document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("signModal").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeModal();
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});

function getElementEmoji(element) {
    const map = { fire: "🔥", earth: "🌍", air: "💨", water: "💧" };
    return map[element] || "";
}

// ---- Horoscope Selector ----
function initHoroscopeSelector() {
    const selector = document.getElementById("horoscopeSelector");

    zodiacSigns.forEach((sign, index) => {
        const btn = document.createElement("button");
        btn.className = "horoscope-sign-btn";
        btn.dataset.name = sign.name;
        btn.textContent = sign.symbol;
        btn.addEventListener("click", () => {
            document.querySelectorAll(".horoscope-sign-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            showHoroscope(sign, index);
        });
        selector.appendChild(btn);
    });
}

function showHoroscope(sign, index) {
    const display = document.getElementById("horoscopeDisplay");
    const reading = horoscopeReadings[index % horoscopeReadings.length];

    // Generate pseudo-random meters based on sign index + current date
    const today = new Date();
    const seed = today.getDate() + index;
    const love = 50 + ((seed * 17) % 50);
    const career = 50 + ((seed * 23) % 50);
    const health = 50 + ((seed * 31) % 50);
    const luck = 50 + ((seed * 13) % 50);

    const todayStr = today.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

    display.innerHTML = `
        <div class="horoscope-card">
            <div class="horoscope-card-header">
                <div class="horoscope-card-symbol">${sign.symbol}</div>
                <div class="horoscope-card-info">
                    <h3>${sign.name} Daily Horoscope</h3>
                    <div class="horoscope-card-date">${todayStr}</div>
                </div>
            </div>
            <p class="horoscope-text">"${reading}"</p>
            <div class="horoscope-meters">
                <div class="meter-item">
                    <div class="meter-label">Love</div>
                    <div class="meter-bar"><div class="meter-fill" style="width: 0%;" data-width="${love}%"></div></div>
                    <div class="meter-value">${love}%</div>
                </div>
                <div class="meter-item">
                    <div class="meter-label">Career</div>
                    <div class="meter-bar"><div class="meter-fill" style="width: 0%;" data-width="${career}%"></div></div>
                    <div class="meter-value">${career}%</div>
                </div>
                <div class="meter-item">
                    <div class="meter-label">Health</div>
                    <div class="meter-bar"><div class="meter-fill" style="width: 0%;" data-width="${health}%"></div></div>
                    <div class="meter-value">${health}%</div>
                </div>
                <div class="meter-item">
                    <div class="meter-label">Luck</div>
                    <div class="meter-bar"><div class="meter-fill" style="width: 0%;" data-width="${luck}%"></div></div>
                    <div class="meter-value">${luck}%</div>
                </div>
            </div>
        </div>
    `;

    // Animate meter fills
    setTimeout(() => {
        document.querySelectorAll(".meter-fill").forEach(fill => {
            fill.style.width = fill.dataset.width;
        });
    }, 100);
}

// ---- Compatibility ----
function initCompatibility() {
    const select1 = document.getElementById("sign1");
    const select2 = document.getElementById("sign2");

    zodiacSigns.forEach(sign => {
        const opt1 = new Option(`${sign.symbol} ${sign.name}`, sign.name);
        const opt2 = new Option(`${sign.symbol} ${sign.name}`, sign.name);
        select1.appendChild(opt1);
        select2.appendChild(opt2);
    });

    select1.addEventListener("change", () => updateSignDisplay("sign1"));
    select2.addEventListener("change", () => updateSignDisplay("sign2"));

    document.getElementById("checkCompatBtn").addEventListener("click", checkCompatibility);
}

function updateSignDisplay(selectId) {
    const select = document.getElementById(selectId);
    const display = document.getElementById(selectId + "Display");
    const sign = zodiacSigns.find(s => s.name === select.value);
    display.textContent = sign ? sign.symbol : "?";
    if (sign) {
        display.style.borderColor = "rgba(168, 85, 247, 0.4)";
        display.style.boxShadow = "0 0 20px rgba(168, 85, 247, 0.15)";
    }
}

function checkCompatibility() {
    const name1 = document.getElementById("sign1").value;
    const name2 = document.getElementById("sign2").value;

    if (!name1 || !name2) {
        alert("Please select both zodiac signs!");
        return;
    }

    const sign1 = zodiacSigns.find(s => s.name === name1);
    const sign2 = zodiacSigns.find(s => s.name === name2);

    let key;
    if (sign1.name === sign2.name) {
        key = "same";
    } else {
        const elements = [sign1.element, sign2.element].sort();
        key = elements[0] + "_" + elements[1];
    }

    const data = compatibilityData[key];
    const resultDiv = document.getElementById("compatResult");

    // Generate aspect scores
    const seed = name1.length + name2.length;
    const romance = 40 + ((seed * 19) % 55);
    const communication = 40 + ((seed * 29) % 55);
    const trust = 40 + ((seed * 37) % 55);
    const values = 40 + ((seed * 43) % 55);

    const circumference = 2 * Math.PI * 58;
    const offset = circumference - (data.score / 100) * circumference;

    resultDiv.innerHTML = `
        <div class="compat-result-card">
            <div class="compat-score-ring">
                <svg width="140" height="140" viewBox="0 0 140 140">
                    <defs>
                        <linearGradient id="compatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#f5c842"/>
                            <stop offset="50%" stop-color="#ec4899"/>
                            <stop offset="100%" stop-color="#a855f7"/>
                        </linearGradient>
                    </defs>
                    <circle class="compat-score-bg" cx="70" cy="70" r="58"/>
                    <circle class="compat-score-fill" cx="70" cy="70" r="58"
                        stroke-dasharray="${circumference}"
                        stroke-dashoffset="${circumference}"
                        data-offset="${offset}"/>
                </svg>
                <div class="compat-score-text">${data.score}%</div>
            </div>
            <div class="compat-verdict">${data.verdict}</div>
            <p class="compat-desc">${data.desc}</p>
            <div class="compat-aspects">
                <div class="compat-aspect">
                    <div class="compat-aspect-label">💕 Romance</div>
                    <div class="compat-aspect-bar"><div class="compat-aspect-fill" style="width:0%" data-width="${romance}%"></div></div>
                    <div class="compat-aspect-value">${romance}%</div>
                </div>
                <div class="compat-aspect">
                    <div class="compat-aspect-label">💬 Communication</div>
                    <div class="compat-aspect-bar"><div class="compat-aspect-fill" style="width:0%" data-width="${communication}%"></div></div>
                    <div class="compat-aspect-value">${communication}%</div>
                </div>
                <div class="compat-aspect">
                    <div class="compat-aspect-label">🤝 Trust</div>
                    <div class="compat-aspect-bar"><div class="compat-aspect-fill" style="width:0%" data-width="${trust}%"></div></div>
                    <div class="compat-aspect-value">${trust}%</div>
                </div>
                <div class="compat-aspect">
                    <div class="compat-aspect-label">💎 Shared Values</div>
                    <div class="compat-aspect-bar"><div class="compat-aspect-fill" style="width:0%" data-width="${values}%"></div></div>
                    <div class="compat-aspect-value">${values}%</div>
                </div>
            </div>
        </div>
    `;

    // Animate
    setTimeout(() => {
        const fill = resultDiv.querySelector(".compat-score-fill");
        fill.style.strokeDashoffset = fill.dataset.offset;
        resultDiv.querySelectorAll(".compat-aspect-fill").forEach(bar => {
            bar.style.width = bar.dataset.width;
        });
    }, 100);
}

// ---- Finder Form ----
function initFinderForm() {
    document.getElementById("findSignBtn").addEventListener("click", () => {
        const dateInput = document.getElementById("birthDate").value;
        if (!dateInput) {
            alert("Please select your birth date!");
            return;
        }

        const date = new Date(dateInput);
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const sign = findZodiacSign(month, day);
        if (sign) showFinderResult(sign);
    });
}

function findZodiacSign(month, day) {
    return zodiacSigns.find(sign => {
        if (sign.startMonth === sign.endMonth) {
            return month === sign.startMonth && day >= sign.startDay && day <= sign.endDay;
        }
        if (sign.startMonth < sign.endMonth) {
            return (month === sign.startMonth && day >= sign.startDay) ||
                   (month === sign.endMonth && day <= sign.endDay);
        }
        // Capricorn wraps around Dec-Jan
        return (month === sign.startMonth && day >= sign.startDay) ||
               (month === sign.endMonth && day <= sign.endDay);
    });
}

function showFinderResult(sign) {
    const result = document.getElementById("finderResult");
    result.innerHTML = `
        <div class="sign-reveal">
            <div class="sign-reveal-symbol">${sign.symbol}</div>
            <div class="sign-reveal-name">${sign.name}</div>
            <div class="sign-reveal-dates">${sign.dates}</div>
            <div class="sign-reveal-element element-${sign.element}" style="margin-bottom:16px;">
                ${getElementEmoji(sign.element)} ${sign.element.charAt(0).toUpperCase() + sign.element.slice(1)} Sign
            </div>
            <p class="sign-reveal-desc">${sign.description}</p>
        </div>
    `;
}

// ---- Navigation ----
function initNavigation() {
    const navbar = document.getElementById("navbar");
    const toggle = document.getElementById("navToggle");
    const links = document.querySelector(".nav-links");

    // Scroll effect
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    });

    // Mobile toggle
    toggle.addEventListener("click", () => {
        links.classList.toggle("active");
    });

    // Close on link click
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            links.classList.remove("active");
        });
    });

    // Active link highlight
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) {
                current = section.getAttribute("id");
            }
        });
        document.querySelectorAll(".nav-links a").forEach(a => {
            a.classList.toggle("active", a.getAttribute("href") === "#" + current);
        });
    });
}

// ---- Scroll Reveal ----
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}
