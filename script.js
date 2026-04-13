document.addEventListener('DOMContentLoaded', () => {
    const startQuizBtn = document.getElementById('startQuiz');
    const quizModal = document.getElementById('quizModal');
    const closeBtn = document.querySelector('.close');
    const nameInput = document.getElementById('nameInput');
    const submitNameBtn = document.getElementById('submitName');
    const userNameInput = document.getElementById('userName');
    const quizContent = document.getElementById('quizContent');
    const videoContainer = document.getElementById('videoContainer');
    const quizVideo = document.getElementById('quizVideo');
    const videoSource = document.getElementById('videoSource');
    const questionArea = document.getElementById('questionArea');
    const questionText = document.getElementById('questionText');
    const options = document.querySelectorAll('.option');
    const certificate = document.getElementById('certificate');
    const certName = document.getElementById('certName');
    const correctCount = document.getElementById('correctCount');
    const incorrectCount = document.getElementById('incorrectCount');
    const restartQuizBtn = document.getElementById('restartQuiz');

    let userName = '';
    let currentVideoIndex = 0;
    let currentQuestionIndex = 0;
    let score = 0;
    let totalQuestions = 0;

    // Quiz data
    const quizData = [
        {
            video: 'vid1.mp4', // Placeholder, replace with actual path
            questions: [
                { question: "What color is the shirt?", options: ["yellow", "orange", "green", "white"], correct: 0 },
                { question: "What color is the jacket?", options: ["red", "pink", "maroon", "purple"], correct: 0 },
                { question: "What color are the pants?", options: ["blue", "navy", "green", "black"], correct: 0 },
                { question: "What color are the shoes?", options: ["brown", "black", "tan", "gray"], correct: 0 },
                { question: "What color are the socks?", options: ["black", "gray", "white", "blue"], correct: 0 }
            ]
        },
        {
            video: 'vid2.mp4',
            questions: [
                { question: "What color is the shirt?", options: ["blue", "navy", "purple", "green"], correct: 0 },
                { question: "What color is the skirt?", options: ["purple", "pink", "violet", "blue"], correct: 0 },
                { question: "What color are the shoes?", options: ["black", "brown", "gray", "white"], correct: 0 },
                { question: "What color are the socks?", options: ["white", "gray", "beige", "black"], correct: 0 }
            ]
        },
        {
            video: 'vid3.mp4',
            questions: [
                { question: "What color is the shirt?", options: ["bright green", "dark green", "lime", "yellow"], correct: 0 },
                { question: "What color are the pants?", options: ["dark red", "maroon", "burgundy", "brown"], correct: 0 },
                { question: "What color are the shoes?", options: ["gray", "silver", "black", "white"], correct: 0 },
                { question: "What color are the socks?", options: ["white", "gray", "beige", "black"], correct: 0 }
            ]
        },
        {
            video: 'vid4.mp4',
            questions: [
                { question: "What color is the dress?", options: ["gold", "yellow", "bronze", "silver"], correct: 0 },
                { question: "What color are the shoes?", options: ["silver", "gray", "white", "gold"], correct: 0 }
            ]
        }
    ];

    // Calculate total questions
    quizData.forEach(video => totalQuestions += video.questions.length);

    // Start quiz
    startQuizBtn.addEventListener('click', () => {
        quizModal.style.display = 'block';
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        quizModal.style.display = 'none';
        resetQuiz();
    });

    // Submit name
    submitNameBtn.addEventListener('click', () => {
        userName = userNameInput.value.trim();
        if (userName) {
            nameInput.style.display = 'none';
            quizContent.style.display = 'block';
            loadVideo();
        }
    });

    // Option click
    options.forEach(option => {
        option.addEventListener('click', (e) => {
            const selected = parseInt(e.target.dataset.index);
            const currentQ = quizData[currentVideoIndex].questions[currentQuestionIndex];
            if (selected === currentQ.correct) {
                score++;
            }
            nextQuestion();
        });
    });

    // Restart quiz
    restartQuizBtn.addEventListener('click', () => {
        resetQuiz();
        quizModal.style.display = 'none';
    });

    function loadVideo() {
        videoSource.src = quizData[currentVideoIndex].video;
        quizVideo.load();
        currentQuestionIndex = 0;
        showQuestion();
    }

    function showQuestion() {
        const currentQ = quizData[currentVideoIndex].questions[currentQuestionIndex];
        questionText.textContent = currentQ.question;
        options.forEach((option, index) => {
            option.textContent = currentQ.options[index];
        });
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData[currentVideoIndex].questions.length) {
            showQuestion();
        } else {
            nextVideo();
        }
    }

    function nextVideo() {
        currentVideoIndex++;
        if (currentVideoIndex < quizData.length) {
            loadVideo();
        } else {
            showCertificate();
        }
    }

    function showCertificate() {
        questionArea.style.display = 'none';
        videoContainer.style.display = 'none';
        certificate.style.display = 'block';
        certName.textContent = userName;
        correctCount.textContent = score;
        incorrectCount.textContent = totalQuestions - score;
    }

    function resetQuiz() {
        userName = '';
        currentVideoIndex = 0;
        currentQuestionIndex = 0;
        score = 0;
        userNameInput.value = '';
        nameInput.style.display = 'block';
        quizContent.style.display = 'none';
        questionArea.style.display = 'block';
        videoContainer.style.display = 'block';
        certificate.style.display = 'none';
    }
});