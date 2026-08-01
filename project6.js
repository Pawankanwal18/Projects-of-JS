/* ==========================================
   CRICKET QUIZ ARENA - JAVASCRIPT ENGINE
   ========================================== */

// --- QUESTION BANK ---
const QUESTION_BANK = [
    // --- IPL & T20 LEAGUE ---
    {
        category: 'ipl',
        difficulty: 'easy',
        question: "Which player holds the record for the highest individual score in an IPL match (175*)?",
        options: ["Chris Gayle", "AB de Villiers", "Virat Kohli", "KL Rahul"],
        answer: 0,
        explanation: "Chris Gayle smashed 175* off 66 balls for Royal Challengers Bangalore against Pune Warriors India in 2013."
    },
    {
        category: 'ipl',
        difficulty: 'medium',
        question: "Which team won the inaugural IPL tournament in 2008?",
        options: ["Chennai Super Kings", "Rajasthan Royals", "Mumbai Indians", "Kolkata Knight Riders"],
        answer: 1,
        explanation: "Rajasthan Royals, captained by Shane Warne, won the inaugural IPL season in 2008 by defeating CSK in the final."
    },
    {
        category: 'ipl',
        difficulty: 'medium',
        question: "Who is the leading run-scorer in the history of the Indian Premier League?",
        options: ["Shikhar Dhawan", "David Warner", "Virat Kohli", "Rohit Sharma"],
        answer: 2,
        explanation: "Virat Kohli is the highest run-getter in IPL history, crossing over 7,500 runs."
    },
    {
        category: 'ipl',
        difficulty: 'hard',
        question: "Who was the first bowler to take a hat-trick in IPL history?",
        options: ["Amit Mishra", "Laxmipathy Balaji", "Yuvraj Singh", "Sunil Narine"],
        answer: 1,
        explanation: "Laxmipathy Balaji achieved the first-ever IPL hat-trick while playing for Chennai Super Kings against KXIP in 2008."
    },
    {
        category: 'ipl',
        difficulty: 'easy',
        question: "Which franchise has won the most IPL titles along with Mumbai Indians (5 titles)?",
        options: ["Kolkata Knight Riders", "Chennai Super Kings", "Sunrisers Hyderabad", "Gujarat Titans"],
        answer: 1,
        explanation: "Chennai Super Kings (CSK) led by MS Dhoni won 5 IPL trophies (2010, 2011, 2018, 2021, 2023)."
    },

    // --- WORLD CUP HISTORY ---
    {
        category: 'worldcup',
        difficulty: 'easy',
        question: "Which country won the first-ever ICC Men's Cricket World Cup in 1975?",
        options: ["Australia", "England", "West Indies", "India"],
        answer: 2,
        explanation: "West Indies, captained by Clive Lloyd, won the first Cricket World Cup in 1975 at Lord's, defeating Australia."
    },
    {
        category: 'worldcup',
        difficulty: 'medium',
        question: "Who scored the famous 183 runs in the 1983 World Cup against Zimbabwe to save India?",
        options: ["Sunil Gavaskar", "Kapil Dev", "Mohinder Amarnath", "Kris Srikkanth"],
        answer: 1,
        explanation: "Kapil Dev played an iconic 175* (often remembered with his 183 in finals total context) against Zimbabwe at Tunbridge Wells."
    },
    {
        category: 'worldcup',
        difficulty: 'medium',
        question: "Which bowler took a hat-trick in the 2019 ICC World Cup against Afghanistan?",
        options: ["Jasprit Bumrah", "Mohammed Shami", "Mitchell Starc", "Trent Boult"],
        answer: 1,
        explanation: "Mohammed Shami took a crucial last-over hat-trick against Afghanistan to secure victory for India in 2019."
    },
    {
        category: 'worldcup',
        difficulty: 'hard',
        question: "Who holds the record for the most centuries (7) in ICC Men's Cricket World Cup history?",
        options: ["Sachin Tendulkar", "Rohit Sharma", "David Warner", "Kumar Sangakkara"],
        answer: 1,
        explanation: "Rohit Sharma holds the record for the most World Cup centuries (7), surpassing Sachin Tendulkar's 6 centuries."
    },
    {
        category: 'worldcup',
        difficulty: 'easy',
        question: "In which year did India win its second 50-over World Cup trophy?",
        options: ["2007", "2011", "2015", "2019"],
        answer: 1,
        explanation: "India defeated Sri Lanka in the final at Wankhede Stadium, Mumbai, on April 2, 2011, under MS Dhoni."
    },

    // --- LEGENDS & RECORDS ---
    {
        category: 'legends',
        difficulty: 'easy',
        question: "Who is known as the 'Master Blaster' and has scored 100 international centuries?",
        options: ["Brian Lara", "Ricky Ponting", "Sachin Tendulkar", "Jacques Kallis"],
        answer: 2,
        explanation: "Sachin Tendulkar scored 51 Test centuries and 49 ODI centuries, making him the only player with 100 international hundreds."
    },
    {
        category: 'legends',
        difficulty: 'hard',
        question: "Which batsman holds the record for the highest individual score in Test cricket (400*)?",
        options: ["Matthew Hayden", "Brian Lara", "Virender Sehwag", "Don Bradman"],
        answer: 1,
        explanation: "Brian Lara scored 400 not out against England at Antigua in 2004, which remains the highest score in Test cricket."
    },
    {
        category: 'legends',
        difficulty: 'medium',
        question: "Who is the highest wicket-taker in Test cricket history with 800 wickets?",
        options: ["Shane Warne", "Muttiah Muralitharan", "James Anderson", "Anil Kumble"],
        answer: 1,
        explanation: "Sri Lanka's Muttiah Muralitharan took 800 wickets in 133 Test matches."
    },
    {
        category: 'legends',
        difficulty: 'easy',
        question: "Sir Donald Bradman retired with what legendary career Test batting average?",
        options: ["88.50", "95.40", "99.94", "102.10"],
        answer: 2,
        explanation: "Don Bradman finished his career with a unbelievable average of 99.94, needing just 4 runs in his final innings for a 100 average."
    },
    {
        category: 'legends',
        difficulty: 'medium',
        question: "Who was the first batsman to score a double century (200*) in Men's ODI cricket?",
        options: ["Virender Sehwag", "Chris Gayle", "Sachin Tendulkar", "Rohit Sharma"],
        answer: 2,
        explanation: "Sachin Tendulkar scored 200* against South Africa in Gwalior on February 24, 2010."
    }
];

// --- AUDIO SYNTHESIZER (WEB AUDIO API) ---
class QuizAudio {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    initCtx() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playCheerSound() {
        if (!this.enabled) return;
        this.initCtx();
        // Play rising triad note chord (cheer/boundary)
        const notes = [261.63, 329.63, 392.00, 523.25];
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);
            
            gain.gain.setValueAtTime(0.15, this.ctx.currentTime + idx * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.4);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(this.ctx.currentTime + idx * 0.08);
            osc.stop(this.ctx.currentTime + idx * 0.08 + 0.4);
        });
    }

    playWicketSound() {
        if (!this.enabled) return;
        this.initCtx();
        // Low crashing sound for wicket
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.35);

        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.35);
    }

    playTimerTick() {
        if (!this.enabled) return;
        this.initCtx();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
    }

    playVictorySound() {
        if (!this.enabled) return;
        this.initCtx();
        const melody = [392, 523.25, 659.25, 783.99];
        melody.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.15);
            gain.gain.setValueAtTime(0.2, this.ctx.currentTime + i * 0.15);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.15 + 0.5);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(this.ctx.currentTime + i * 0.15);
            osc.stop(this.ctx.currentTime + i * 0.15 + 0.5);
        });
    }
}

const soundEngine = new QuizAudio();

// --- GAME STATE CLASS ---
class CricketQuizEngine {
    constructor() {
        this.playerName = "Cricket Fan";
        this.category = "all";
        this.difficulty = "medium";
        this.timePerQuestion = 15;

        this.questions = [];
        this.currentIdx = 0;
        this.runs = 0;
        this.wickets = 0;
        this.streak = 0;
        this.maxStreak = 0;
        this.correctCount = 0;
        
        this.timer = null;
        this.timeLeft = 15;

        this.userAnswers = []; // Records ball summary
        this.highScore = parseInt(localStorage.getItem('cricket_quiz_highscore') || '0');
    }

    init() {
        this.bindEvents();
        this.updateHighScoreDisplay();
    }

    bindEvents() {
        // Sound toggle button
        document.getElementById('sound-btn').addEventListener('click', () => {
            soundEngine.enabled = !soundEngine.enabled;
            const icon = document.getElementById('sound-icon');
            if (soundEngine.enabled) {
                icon.className = 'fa-solid fa-volume-high';
            } else {
                icon.className = 'fa-solid fa-volume-xmark';
            }
        });

        // Start Match Button
        document.getElementById('start-btn').addEventListener('click', () => this.startMatch());

        // Next Ball Button
        document.getElementById('next-btn').addEventListener('click', () => this.nextBall());

        // Replay & Main Menu Buttons
        document.getElementById('replay-btn').addEventListener('click', () => this.startMatch());
        document.getElementById('menu-btn').addEventListener('click', () => this.showScreen('start-screen'));
    }

    updateHighScoreDisplay() {
        document.getElementById('best-score-display').textContent = `${this.highScore} Runs`;
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    }

    startMatch() {
        const nameInput = document.getElementById('player-name').value.trim();
        this.playerName = nameInput || "Cricket Fan";
        this.category = document.getElementById('quiz-category').value;
        this.difficulty = document.getElementById('quiz-difficulty').value;

        // Set time limit based on pitch condition
        if (this.difficulty === 'easy') this.timePerQuestion = 20;
        else if (this.difficulty === 'medium') this.timePerQuestion = 15;
        else if (this.difficulty === 'hard') this.timePerQuestion = 10;

        // Prepare Questions
        let filtered = QUESTION_BANK;
        if (this.category !== 'all') {
            filtered = QUESTION_BANK.filter(q => q.category === this.category);
            // If category doesn't have 10, fallback fill with other questions
            if (filtered.length < 10) {
                const rest = QUESTION_BANK.filter(q => q.category !== this.category);
                filtered = [...filtered, ...rest];
            }
        }

        // Shuffle questions
        this.questions = [...filtered].sort(() => 0.5 - Math.random()).slice(0, 10);
        
        // Reset match stats
        this.currentIdx = 0;
        this.runs = 0;
        this.wickets = 0;
        this.streak = 0;
        this.maxStreak = 0;
        this.correctCount = 0;
        this.userAnswers = [];

        this.showScreen('quiz-screen');
        this.loadQuestion();
    }

    loadQuestion() {
        // Clear previous state & timers
        clearInterval(this.timer);
        document.getElementById('explanation-box').classList.add('hidden');
        document.getElementById('next-btn').classList.add('hidden');

        const currentQ = this.questions[this.currentIdx];

        // Update HUD
        document.getElementById('hud-runs').textContent = this.runs;
        document.getElementById('hud-wickets').textContent = this.wickets;
        document.getElementById('hud-ball').textContent = this.currentIdx + 1;
        document.getElementById('hud-streak').textContent = this.streak;
        
        // Update Progress Bar
        const progressPct = ((this.currentIdx + 1) / 10) * 100;
        document.getElementById('quiz-progress-bar').style.width = `${progressPct}%`;

        // Category & Difficulty Tags
        const catMap = { all: "All-Rounder", ipl: "IPL & T20", worldcup: "World Cup", legends: "Test Legends" };
        document.getElementById('question-category-tag').textContent = catMap[currentQ.category] || "Cricket";
        
        const diffTag = document.getElementById('question-difficulty-tag');
        diffTag.textContent = currentQ.difficulty.toUpperCase();
        diffTag.className = `difficulty-tag ${currentQ.difficulty}`;

        // Question Text
        document.getElementById('question-text').textContent = currentQ.question;

        // Render Option Buttons
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';
        const prefixes = ['A', 'B', 'C', 'D'];

        currentQ.options.forEach((optText, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `
                <span class="opt-prefix">${prefixes[index]}</span>
                <span class="opt-text">${optText}</span>
                <i class="fa-solid opt-icon"></i>
            `;
            btn.addEventListener('click', () => this.handleAnswer(index, false));
            optionsContainer.appendChild(btn);
        });

        // Start Countdown Timer
        this.startTimer();
    }

    startTimer() {
        this.timeLeft = this.timePerQuestion;
        const timerText = document.getElementById('hud-timer');
        const progressPath = document.getElementById('timer-progress');

        timerText.textContent = this.timeLeft;
        progressPath.setAttribute('stroke-dasharray', '100, 100');
        progressPath.classList.remove('warning', 'danger');

        this.timer = setInterval(() => {
            this.timeLeft--;
            timerText.textContent = this.timeLeft;

            // Calculate SVG progress ring percentage
            const pct = (this.timeLeft / this.timePerQuestion) * 100;
            progressPath.setAttribute('stroke-dasharray', `${pct}, 100`);

            // Color warnings
            if (this.timeLeft <= 5) {
                progressPath.className = 'circle-progress danger';
                soundEngine.playTimerTick();
            } else if (this.timeLeft <= 8) {
                progressPath.className = 'circle-progress warning';
            }

            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.handleAnswer(-1, true); // Timeout = Wrong answer
            }
        }, 1000);
    }

    handleAnswer(selectedIndex, isTimeout) {
        clearInterval(this.timer);

        const currentQ = this.questions[this.currentIdx];
        const optionBtns = document.querySelectorAll('.option-btn');
        optionBtns.forEach(btn => btn.disabled = true);

        const isCorrect = selectedIndex === currentQ.answer;

        // Record for match summary
        this.userAnswers.push({
            question: currentQ.question,
            selected: selectedIndex >= 0 ? currentQ.options[selectedIndex] : "Time Out ⏱️",
            correct: currentQ.options[currentQ.answer],
            isCorrect: isCorrect,
            explanation: currentQ.explanation
        });

        if (isCorrect) {
            // Calculate Runs Scored: 4 base + speed bonus + streak bonus
            let earnedRuns = 4;
            if (this.timeLeft >= Math.floor(this.timePerQuestion * 0.6)) {
                earnedRuns += 2; // Speed bonus (+2)
            }
            this.streak++;
            if (this.streak >= 3) {
                earnedRuns *= 2; // Streak double multiplier!
            }
            if (this.streak > this.maxStreak) this.maxStreak = this.streak;

            this.runs += earnedRuns;
            this.correctCount++;

            // Highlight Correct Option
            if (selectedIndex >= 0) {
                optionBtns[selectedIndex].classList.add('correct');
                optionBtns[selectedIndex].querySelector('.opt-icon').className = 'fa-solid fa-circle-check opt-icon';
            }

            soundEngine.playCheerSound();
        } else {
            // Wicket Lost
            this.wickets++;
            this.streak = 0;

            if (selectedIndex >= 0) {
                optionBtns[selectedIndex].classList.add('wrong');
                optionBtns[selectedIndex].querySelector('.opt-icon').className = 'fa-solid fa-circle-xmark opt-icon';
            }
            
            // Highlight actual correct option
            optionBtns[currentQ.answer].classList.add('correct');
            optionBtns[currentQ.answer].querySelector('.opt-icon').className = 'fa-solid fa-circle-check opt-icon';

            soundEngine.playWicketSound();
        }

        // Update HUD display
        document.getElementById('hud-runs').textContent = this.runs;
        document.getElementById('hud-wickets').textContent = this.wickets;
        document.getElementById('hud-streak').textContent = this.streak;

        // Display Commentary & Explanation
        const expBox = document.getElementById('explanation-box');
        const expTitle = document.getElementById('explanation-title');
        const expText = document.getElementById('explanation-text');

        if (isCorrect) {
            expTitle.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--primary-green);"></i> BOUNDARY! +${this.runs} RUNS`;
        } else if (isTimeout) {
            expTitle.innerHTML = `<i class="fa-solid fa-clock" style="color: var(--accent-red);"></i> TIME OUT! OUT (TIMED OUT)`;
        } else {
            expTitle.innerHTML = `<i class="fa-solid fa-circle-xmark" style="color: var(--accent-red);"></i> WICKET! BOWLED OUT`;
        }

        expText.textContent = currentQ.explanation;
        expBox.classList.remove('hidden');

        // Show Next Button
        const nextBtn = document.getElementById('next-btn');
        if (this.currentIdx < 9) {
            nextBtn.innerHTML = `Next Ball <i class="fa-solid fa-arrow-right"></i>`;
        } else {
            nextBtn.innerHTML = `Finish Match <i class="fa-solid fa-trophy"></i>`;
        }
        nextBtn.classList.remove('hidden');
    }

    nextBall() {
        this.currentIdx++;
        if (this.currentIdx < 10) {
            this.loadQuestion();
        } else {
            this.showScorecard();
        }
    }

    showScorecard() {
        this.showScreen('result-screen');
        soundEngine.playVictorySound();

        // Calculate statistics
        const accuracy = Math.round((this.correctCount / 10) * 100);
        // Strike Rate: (Runs / 10 balls) * 100
        const strikeRate = Math.round((this.runs / 10) * 100);

        document.getElementById('result-subtitle').textContent = `Innings completed by ${this.playerName}`;
        document.getElementById('final-runs').textContent = this.runs;
        document.getElementById('final-wickets').textContent = `${this.wickets}/10`;
        document.getElementById('final-strike-rate').textContent = `${strikeRate}`;
        document.getElementById('final-accuracy').textContent = `${accuracy}%`;

        // Check High Score
        const highScoreTag = document.getElementById('new-high-score-tag');
        if (this.runs > this.highScore) {
            this.highScore = this.runs;
            localStorage.setItem('cricket_quiz_highscore', this.runs.toString());
            highScoreTag.classList.remove('hidden');
            this.updateHighScoreDisplay();
        } else {
            highScoreTag.classList.add('hidden');
        }

        // Title and Trophy based on performance
        const resultTitle = document.getElementById('result-title');
        const resultTrophy = document.getElementById('result-trophy');

        if (this.runs >= 45) {
            resultTitle.textContent = "🏆 CHAMPION INNINGS!";
            resultTrophy.className = "fa-solid fa-trophy trophy-gold";
        } else if (this.runs >= 28) {
            resultTitle.textContent = "🏅 SOLID HALF-CENTURY!";
            resultTrophy.className = "fa-solid fa-award trophy-gold";
        } else if (this.runs >= 15) {
            resultTitle.textContent = "🏏 DECENT BATTING KNOCK!";
            resultTrophy.className = "fa-solid fa-baseball-bat-ball trophy-gold";
        } else {
            resultTitle.textContent = "🦆 DUCK OUT - NEED PRACTICE!";
            resultTrophy.className = "fa-solid fa-shield-halved trophy-gold";
        }

        // Render Review List
        const reviewList = document.getElementById('review-list');
        reviewList.innerHTML = '';

        this.userAnswers.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = `review-item ${item.isCorrect ? 'correct-item' : 'wrong-item'}`;
            div.innerHTML = `
                <div class="review-q-title">Ball ${index + 1}: ${item.question}</div>
                <div class="review-ans">
                    Your Answer: <span class="user-val ${item.isCorrect ? 'correct-text' : 'wrong-text'}">${item.selected}</span> 
                    ${!item.isCorrect ? `| Correct: <span class="user-val correct-text">${item.correct}</span>` : ''}
                </div>
            `;
            reviewList.appendChild(div);
        });
    }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    const game = new CricketQuizEngine();
    game.init();
});
