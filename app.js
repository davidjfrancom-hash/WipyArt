const questions = [
    {
        image: "assets/17.jpg.jpg", 
        options: ["LA NOCHE ESTRELLADA", "EL GRITO", "NOCHE Y DIA", "CIELO ESTRELLADO"],
        correct: "LA NOCHE ESTRELLADA",
        author: "Vincent van Gogh • 1889"
    },
    {
        image: "assets/18.jpg.jpg",
        options: ["LAS MENINAS", "EL GRITO", "GUERNICA", "DEVASTACION"],
        correct: "GUERNICA",
        author: "Pablo Picasso • 1937"
    },
    {
        image: "assets/monalisa.jpg.jpg",
        options: ["LA MONA LISA", "LA JOVEN DE LA PERLA", "RETRATO FEMENINO", "LA ULTIMA CENA"],
        correct: "LA MONA LISA",
        author: "Leonardo da Vinci • 1503-1519"
    },
    {
        image: "assets/19.jpg.jpg",
        options: ["MURAL URBANO", "GRAFITI INSU", "MANOS DEL ARTE", "STREET ART MARACAY"],
        correct: "GRAFITI INSU",
        author: "Insu • Arte Urbano"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let correctAnswersCount = 0;
let streak = 0;
let timeLeft = 15; 
let timerInterval;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const endScreen = document.getElementById("end-screen");

const artImage = document.getElementById("art-image");
const artMeta = document.getElementById("art-meta");
const metaTitle = document.getElementById("meta-title");
const metaAuthor = document.getElementById("meta-author");
const optionsContainer = document.getElementById("options-container");
const feedbackContainer = document.getElementById("feedback-container");
const progressBar = document.getElementById("progress-bar");

const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const currentIdxDisplay = document.getElementById("current-idx");
const streakBadge = document.getElementById("streak-badge");
const streakCount = document.getElementById("streak-count");

document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("restart-btn").addEventListener("click", restartGame);
document.getElementById("home-btn").addEventListener("click", goToHome);

function startGame() {
    startScreen.classList.add("hidden");
    endScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    
    currentQuestionIndex = 0;
    score = 0;
    correctAnswersCount = 0;
    streak = 0;
    
    scoreDisplay.textContent = score;
    streakBadge.classList.add("hidden");
    
    loadQuestion();
}

function loadQuestion() {
    optionsContainer.classList.remove("hidden");
    feedbackContainer.classList.add("hidden");
    artMeta.classList.add("hidden");
    artImage.classList.add("pixelated");
    
    timeLeft = 15;
    timerDisplay.textContent = timeLeft;
    progressBar.style.width = "100%";
    progressBar.style.backgroundColor = "var(--primary-green)";
    currentIdxDisplay.textContent = currentQuestionIndex + 1;

    let q = questions[currentQuestionIndex];
    artImage.src = q.image;

    optionsContainer.innerHTML = "";
    const letters = ["A", "B", "C", "D"];
    q.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.classList.add("option-btn");
        button.innerHTML = `<div class="btn-circle">${letters[index]}</div><span class="option-text-span">${option}</span>`;
        button.addEventListener("click", () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });

    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 100); 
}

function updateTimer() {
    timeLeft -= 0.1;
    if (timeLeft < 0) timeLeft = 0;
    
    timerDisplay.textContent = Math.ceil(timeLeft);
    const percentage = (timeLeft / 15) * 100;
    progressBar.style.width = `${percentage}%`;

    if (timeLeft > 7) {
        progressBar.style.backgroundColor = "var(--primary-green)";
    } else if (timeLeft <= 7 && timeLeft > 3) {
        progressBar.style.backgroundColor = "var(--accent-yellow)"; 
    } else if (timeLeft <= 3) {
        progressBar.style.backgroundColor = "var(--primary-red)"; 
    }

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        handleTimeout();
    }
}

function checkAnswer(selectedOption) {
    clearInterval(timerInterval);
    let q = questions[currentQuestionIndex];
    
    optionsContainer.classList.add("hidden");
    feedbackContainer.classList.remove("hidden");
    artMeta.classList.remove("hidden");
    artImage.classList.remove("pixelated");
    
    metaTitle.textContent = q.correct;
    metaAuthor.textContent = q.author;

    const feedbackIcon = document.getElementById("feedback-icon");
    const feedbackStatus = document.getElementById("feedback-status");
    const feedbackSubtext = document.getElementById("feedback-subtext");

    if (selectedOption === q.correct) {
        correctAnswersCount++;
        streak++;
        const bonus = streak > 1 ? streak * 50 : 0;
        score += 350 + bonus; 
        scoreDisplay.textContent = score;

        if (streak >= 2) {
            streakBadge.classList.remove("hidden");
            streakCount.textContent = streak;
            feedbackSubtext.textContent = `🔥 RACHA DE ${streak}!`;
        } else {
            feedbackSubtext.textContent = "¡EXCELENTE ELECCIÓN!";
        }

        feedbackIcon.textContent = "⭐";
        feedbackStatus.textContent = "¡CORRECTO!";
        feedbackContainer.className = "feedback-layout status-correct";
    } else {
        streak = 0;
        streakBadge.classList.add("hidden");
        feedbackIcon.textContent = "❌";
        feedbackStatus.textContent = "¡INCORRECTO!";
        feedbackSubtext.textContent = `ERA: ${q.correct}`;
        feedbackContainer.className = "feedback-layout status-incorrect";
    }

    nextQuestion();
}

function handleTimeout() {
    let q = questions[currentQuestionIndex];
    streak = 0;
    streakBadge.classList.add("hidden");

    optionsContainer.classList.add("hidden");
    feedbackContainer.classList.remove("hidden");
    artMeta.classList.remove("hidden");
    artImage.classList.remove("pixelated");

    metaTitle.textContent = q.correct;
    metaAuthor.textContent = q.author;

    document.getElementById("feedback-icon").textContent = "⏰";
    document.getElementById("feedback-status").textContent = "¡TIEMPO!";
    document.getElementById("feedback-subtext").textContent = "RELOJ EN CERO";
    feedbackContainer.className = "feedback-layout status-incorrect";

    nextQuestion();
}

function nextQuestion() {
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showEndScreen();
        }
    }, 3200); 
}

function showEndScreen() {
    quizScreen.classList.add("hidden");
    endScreen.classList.remove("hidden");

    const totalQuestions = questions.length;
    const precision = Math.round((correctAnswersCount / totalQuestions) * 100);

    document.getElementById("final-score").textContent = score;
    document.getElementById("final-correct").textContent = `${correctAnswersCount}/${totalQuestions}`;
    document.getElementById("final-precision").textContent = `${precision}%`;
}

function restartGame() {
    startGame();
}

function goToHome() {
    endScreen.classList.add("hidden");
    quizScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
}