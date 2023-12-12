let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },
    {
        "question": "Was bedeutet das HTML Tag &lt;a&gt;?",
        "answer_1": "Text Fett",
        "answer_2": "Container",
        "answer_3": "Ein Link",
        "answer_4": "Kursiv",
        "right_answer": 3
    },
    {
        "question": "Wie bindet man eine Website in eine Website ein?",
        "answer_1": "&lt;iframe&gt;, &lt;frame&gt;, and &lt;frameset&gt;",
        "answer_2": "&lt;iframe&gt;",
        "answer_3": "&lt;frame&gt;",
        "answer_4": "&lt;frameset&gt;",
        "right_answer": 2
    },
    {
        "question": "Wie stellt man Text am BESTEN fett dar?",
        "answer_1": "&lt;strong&gt;",
        "answer_2": "css nutzen",
        "answer_3": "&lt;bold&gt;",
        "answer_4": "&lt;b&gt;",
        "right_answer": 1
    },
    {
        "question": "Welches Atribut kann man NICHT für Textarea verwenden?",
        "answer_1": "readonly",
        "answer_2": "max",
        "answer_3": "from",
        "answer_4": "spellcheck",
        "right_answer": 1
    },
    {
        "question": "Wie wählst du alle Elemente vom Typ&lt;a&gt; mit dem attribut title aus.?",
        "answer_1": "a[title]{...}",
        "answer_2": "a > title {...}",
        "answer_3": "a.title {...}",
        "answer_4": "a=title {...}",
        "right_answer": 1
    },
    {
        "question": "Wie definiert man in JavaScript eine Variable?",
        "answer_1": "let 100 = rate;",
        "answer_2": "100 = let rate;",
        "answer_3": "rate = 100;",
        "answer_4": "let rate = 100;",
        "right_answer": 4
    }
];

let currentQuestion = 0;
let right_answers = 0;
let question = questions[currentQuestion];

let RIGHTSOUND = new Audio('audio/right.mp3');
let FAILSOUND = new Audio('audio/fail.mp3');

function init() {
    document.getElementById('question_counter').innerHTML = questions.length;
    show_question();
}

function show_question() {
    if (gameIsOver()) {
        showEndScreen();
    }
    else {
        showNextQuestion();
        ProgrsBarCalculation();
    }
}


function gameIsOver(){
    return currentQuestion >= questions.length;
}


function showEndScreen() {
    document.getElementById('endscreen-body').classList.remove('d-none');
    document.getElementById('question-body').classList.add('d-none');
    document.getElementById('final-questions').innerHTML = questions.length;
    document.getElementById('right_answers').innerHTML = right_answers;
    document.getElementById('header-img').src = './img/trophy.png';
    ProgrsBarCalculation();
}


function showNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('current-counter').innerHTML = currentQuestion + 1;
    document.getElementById('question').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function answer(selectedQuestionNumer) {
    let question = questions[currentQuestion];
    if (rightAnswerSelected(selectedQuestionNumer,question)) {
        document.getElementById(selectedQuestionNumer).parentNode.classList.add('bg-success');
        RIGHTSOUND.play();
        right_answers++;
    }
    else {
        document.getElementById(selectedQuestionNumer).parentNode.classList.add('bg-danger');
        document.getElementById(`answer_${questions[currentQuestion]['right_answer']}`).parentNode.classList.add('bg-success');
        FAILSOUND.play();
    }
    document.getElementById('next-button').disabled = false;
}


function rightAnswerSelected(selectedQuestionNumer,question){
    return (selectedQuestionNumer.substr(-1)) == question["right_answer"];
}


function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    resetAnswerButton();
    show_question();
}


function resetAnswerButton() {
    document.getElementById(`answer_1`).parentNode.classList.remove('bg-success', 'bg-danger');
    document.getElementById(`answer_2`).parentNode.classList.remove('bg-success', 'bg-danger');
    document.getElementById(`answer_3`).parentNode.classList.remove('bg-success', 'bg-danger');
    document.getElementById(`answer_4`).parentNode.classList.remove('bg-success', 'bg-danger');
}

function ProgrsBarCalculation() {
    let percent = 100 / questions.length;
    percent = Math.round(percent * currentQuestion);
    document.getElementById('progress-bar').innerHTML = `${percent}%`;
    document.getElementById('progress-bar').style.width = `${percent}%`;
}

function restartGame() {
    document.getElementById('header-img').src = './img/school.jpg';
    currentQuestion = 0;
    right_answers = 0;
    document.getElementById('endscreen-body').classList.add('d-none');
    document.getElementById('question-body').classList.remove('d-none');
    init();
}
