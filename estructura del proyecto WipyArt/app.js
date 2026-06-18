// 1. ORGANIZAMOS EL BANCO DE PREGUNTAS POR CATEGORÍAS (Se agregaron las obras de tu documento)
const bancoCategorias = {

    clasico: [
        {
            image: "assets/monalisa.jpg.jpg", // Tu ruta original
            options: ["LA MONA LISA", "LA JOVEN DE LA PERLA", "RETRATO FEMENINO", "LA ULTIMA CENA"],
            correct: "LA MONA LISA",
            author: "Leonardo da Vinci • 1503-1519"
        },
        {
            image: "assets/17.jpg.jpg", // Tu ruta original
            options: ["LA NOCHE ESTRELLADA", "EL GRITO", "NOCHE Y DIA", "CIELO ESTRELLADO"],
            correct: "LA NOCHE ESTRELLADA",
            author: "Vincent van Gogh • 1889"
        },
        {
            image: "assets/la ultima cena.jpg.jpg", // Asegúrate de poner el nombre exacto de tu JPG
            options: ["LA ULTIMA CENA", "EL LAVATORIO", "LA TRINIDAD", "LAS BODAS DE CANÁ"],
            correct: "LA ULTIMA CENA",
            author: "Leonardo da Vinci • 1495-1498"
        },
        {
            image: "assets/la creacion de adan.jpg.jpg", // Asegúrate de poner el nombre exacto de tu JPG
            options: ["EL JUICIO FINAL", "LA CREACION DE ADAN", "EL BUEN PASTOR", "EL MOISÉS"],
            correct: "LA CREACION DE ADAN",
            author: "Miguel Ángel • 1511"
        },
        {
            image: "assets/el grito de munch.jpg.jpg", // Asegúrate de poner el nombre exacto de tu JPG
            options: ["EL GRITO", "LA TORMENTA", "ANSIEDAD", "ATARDECER ROJO"],
            correct: "EL GRITO",
            author: "Edvard Munch • 1893"
        }
    ],
 moderno: [
        {
            image: "assets/guernica.jpg.jpg", // Tu ruta original de Guernica
            options: ["LAS MENINAS", "EL GRITO", "GUERNICA", "DEVASTACION"],
            correct: "GUERNICA",
            author: "Pablo Picasso • 1937"
        },
        {
            image: "assets/la persistencia de la memoria.jpg.jpg", // Asegúrate de poner el nombre exacto de tu JPG
            options: ["RELOJES BLANDOS", "LA PERSISTENCIA DE LA MEMORIA", "EL SUEÑO", "PAISAJE SURREALISTA"],
            correct: "LA PERSISTENCIA DE LA MEMORIA",
            author: "Salvador Dalí • 1931"
        },
        {
            image: "assets/las señoritas de avignon.jpg.jpg", // Asegúrate de poner el nombre exacto de tu JPG
            options: ["LAS SEÑORITAS DE AVIGNON", "DESNUDOS CUBISTAS", "MUJERES DE ARGEL", "LA DANZA"],
            correct: "LAS SEÑORITAS DE AVIGNON",
            author: "Pablo Picasso • 1907"
        },
        {
            image: "assets/diptico de marilyn.jpg.jpg", // Asegúrate de poner el nombre exacto de tu JPG
            options: ["SOPA CAMPBELL", "MARILYN REPETIDA", "DIPTICO DE MARILYN", "ARTE POP POP"],
            correct: "DIPTICO DE MARILYN",
            author: "Andy Warhol • 1962"
        },
        {
            image: "assets/composicion en rojo, azul y amarillo.jpg.jpg", // Asegúrate de poner el nombre exacto de tu JPG
            options: ["LÍNEAS Y COLORES", "COMPOSICION EN ROJO AZUL Y AMARILLO", "CUADRANTE RECTANGULAR", "ABSTRACCION GEOMETRICA"],
            correct: "COMPOSICION EN ROJO AZUL Y AMARILLO",
            author: "Piet Mondrian • 1930"
        }
    ],
urbano: [
        {
            image: "assets/el hombre en el cruce de caminos.jpg.jpg", // Asegúrate de poner el nombre exacto de tu JPG
            options: ["EL HOMBRE CONTROLADOR DEL UNIVERSO", "SUEÑO DE UNA TARDE DOMINICAL", "LA MARCHA DE LA HUMANIDAD", "EL HOMBRE EN EL CRUCE DE CAMINOS"],
            correct: "EL HOMBRE EN EL CRUCE DE CAMINOS",
            author: "Diego Rivera • 1934"
        },
        {
            image: "assets/del porfirismo a la revolucion.jpg.jpg", // Asegúrate de poner el nombre exacto de tu JPG
            options: ["DEL PORFIRISMO A LA REVOLUCION", "NUEVA DEMOCRACIA", "LOS ELEMENTOS", "EPICEYA"],
            correct: "DEL PORFIRISMO A LA REVOLUCION",
            author: "David Alfaro Siqueiros • 1957-1966"
        },
        {
            image: "assets/crack is wack.jpg.jpg", // Asegúrate de poner el nombre exacto de tu JPG
            options: ["MURAL DE FILADELFIA", "CRACK IS WACK", "DANCE FOR LIFE", "ICONOS URBANOS"],
            correct: "CRACK IS WACK",
            author: "Keith Haring • 1986"
        },
        {
            image: "assets/el lanzador de flores.jpg.jpg", // Asegúrate de poner el nombre exacto de tu JPG
            options: ["EL LANZADOR DE FLORES", "AMOR EN EL AIRE", "GRAFITI DE LA PAZ", "MANIFESTANTE URBANO"],
            correct: "EL LANZADOR DE FLORES",
            author: "Banksy • 2003"
        },
        {
            image: "assets/etnias.jpg.jpg", // Asegúrate de poner el nombre exacto de tu JPG
            options: ["TODOS SOMOS UNO", "ETNIAS", "ROSTROS DEL MUNDO", "CULTURAS NATIVAS"],
            correct: "ETNIAS",
            author: "Eduardo Kobra • 2016"
        }
    ]
};

// Bandeja temporal que guardará las 5 preguntas activas de la sesión
let questions = []; 

let currentQuestionIndex = 0;
let score = 0;
let correctAnswersCount = 0;
let streak = 0;
let timeLeft = 15; 
let timerInterval;

// Elementos del DOM (Agregamos la nueva pantalla intermedia)
const startScreen = document.getElementById("start-screen");
const categoryScreen = document.getElementById("category-screen");
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

// EVENTOS DE NAVEGACIÓN
document.getElementById("start-btn").addEventListener("click", goToCategories);
document.getElementById("restart-btn").addEventListener("click", restartGame);
document.getElementById("home-btn").addEventListener("click", goToHome);

// Paso 1: Al dar "Empezar", va al menú de categorías
function goToCategories() {
    startScreen.classList.add("hidden");
    categoryScreen.classList.remove("hidden");
}

// Paso 2: Escucha los botones de categoría, prepara el mazo de preguntas e inicia
document.querySelectorAll('.btn-category').forEach(boton => {
    boton.addEventListener('click', (e) => {
        // Encontrar el atributo data-cat (clasico, moderno, urbano, aleatorio)
        const categoriaSeleccionada = e.currentTarget.getAttribute('data-cat');
        
        prepararPreguntasDePartida(categoriaSeleccionada);
        
        categoryScreen.classList.add("hidden");
        quizScreen.classList.remove("hidden");
        
        startGame();
    });
});

// Función Inteligente: Genera el mazo de preguntas según la elección
function prepararPreguntasDePartida(categoria) {
    if (categoria === 'aleatorio') {
        // Juntamos absolutamente todas las obras de los tres grupos
        let todasLasObras = [
            ...bancoCategorias.clasico,
            ...bancoCategorias.moderno,
            ...bancoCategorias.urbano
        ];
        
        // Algoritmo de barajado aleatorio rápido
        todasLasObras.sort(() => Math.random() - 0.5);
        
        // Extrae un máximo de 5 obras combinadas para la partida
        questions = todasLasObras.slice(0, 5);
    } else {
        // Si es una fija, clona el arreglo correspondiente
        questions = [...bancoCategorias[categoria]];
    }
}

function startGame() {
    endScreen.classList.add("hidden");
    
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

    // Aquí lee dinámicamente de la bandeja temporal 'questions'
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
    // Al reiniciar, lo devuelve a categorías para que vuelva a escoger modo
    endScreen.classList.add("hidden");
    categoryScreen.classList.remove("hidden");
}

function goToHome() {
    endScreen.classList.add("hidden");
    quizScreen.classList.add("hidden");
    categoryScreen.classList.add("hidden"); // Asegura ocultar categorías
    startScreen.classList.remove("hidden");
}