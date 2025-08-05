// Background and images
let img;
let img2;
let img3;
let imgWidth, imgHeight;
let music;
let correctSound;
let wrongSound;
let timerSound;
let restartButton; // Button for restarting the game

// Geography questions
let questions = [
  {
    question: "EM QUE ANO O BRASIL COMEÇOU A MIGRAR PARA CIDADE?",
    choices: ["1976", "1950", "1860", "1948"],
    correct: 1
  },
  {
    question: "ONDE HABITA PREDOMINANTEMENTE A POPULAÇÃO BRASILEIRA?",
    choices: ["Asia", "Africa", "America do sul", "europa"],
    correct: 2
  },
  {
    question: "Quais são as razões para a migração do campo para a cidade?",
    choices: ["namoro","emprego", "guerra", "bomba nuclear"],
    correct: 1
  },
  {
    question: "O que o campo oferece para as cidades?",
    choices: ["comida", "carro", "pistola", "pneu"],
    correct: 0
  },
  {
    question: "Quais os impactos ambientais dessa conexão?",
    choices: ["desmatamento", "desemprego", "melhora na flora e fauna", "explosão"],
    correct: 0
  },
  {
    question: "qual o maior estado do Brasil?",
    choices: ["amazonas", "são paulo", "nova york", "Oceano pacifico"],
    correct: 0
  },
  {
    question: "qual foi a primeira capital do Brasil?",
    choices: ["Brasilia", "Salvador", "Rio de janeiro", "Tokyo"],
    correct: 1
  },
  {
    question: "A agricultura influencia as cidades?",
    choices: ["sim", "não", "talvez", "Não sei"],
    correct: 0
  },
  {
    question: "Quais as desvantagens de viver no campo?",
    choices: ["mais empregos", "mais sussego", "menos empregos", "nenhuma"],
    correct: 2
  },
  {
    question: "A conexão pode reduzir a desigualdade social?",
    choices: ["sim", "não", "talvez", "não sei"],
    correct: 0
  },
  {
    question: "em que ano Brasil se torno urbano?",
    choices: ["1970", "2001", "1987", "1952"],
    correct: 0
  },
  {
    question: "Qual é uma principal diferença entre o campo e a cidade?",
    choices: ["estrela", "calor", "distancia", "infraestrutura"],
    correct: 3
  },
  {
    question: " O que pode fortalecer a relação entre campo e cidade?",
    choices: ["briga", "guerra", "tecnologia", "desigualdade"],
    correct: 2
  },
  {
    question: "A tecnologia tem aproximado mais o campo e a cidade?",
    choices: ["sim", "não", "com certeza não", "talvez"],
    correct: 1
  },
  {
    question: "È mais barato morar no campo ou na cidade?",
    choices: ["campo", "cidade", ".", "."],
    correct: 1
  },
  {
    question: "quantas pessoas viviam no campo em 1950?",
    choices: ["33.161.506", "128.354", "2", "789.456.456"],
    correct: 0
  },
  {
    question: "qual a capital do Brasil?",
    choices: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
    correct: 2
  },
  {
    question: "qual oceano banha o brasil?",
    choices: ["atlantico", "pacifico", "ocidental", "meridiano"],
    correct: 0
  },
  {
    question: "qual foi a segunda capital do Brasil?",
    choices: ["Rio de janeiro", "São paulo", "Salvador", "Japão"],
    correct: 0
  },
  {
    question: "qual a capital do Brasil?",
    choices: ["Brasilia", "Alexandria", "Amazonas", "Acre"],
    correct: 0
  }
];
function shuffleQuestions(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}
// Variables
let currentQuestion = 0;
let timer = 20; 
let interval;
let userChoice = -1;
let gameStarted = false; 
let score = 0; 
let gameOver = false;

function preload() {
  img = loadImage('gameScreen.png');
  img2 = loadImage("startScreen.png");
  img3 = loadImage("gameOverScreen.png");
  correctSound = loadSound("correctSound.mp3");
  wrongSound = loadSound("wrongSound.mp3");
}

function setup() {
  createCanvas(800, 600);
  interval = setInterval(decreaseTimer, 1000);

  let scaleFactor = min(width / img.width, height / img.height); 
  imgWidth = img.width * scaleFactor;
  imgHeight = img.height * scaleFactor;

  let scaleFactor2 = min(width / img2.width, height / img2.height); 
  imgWidth2 = img2.width * scaleFactor;
  imgHeight2 = img2.height * scaleFactor;

  let scaleFactor3 = min(width / img3.width, height / img3.height); 
  imgWidth3 = img3.width * scaleFactor;
  imgHeight3 = img3.height * scaleFactor;
  
  shuffleQuestions(questions);

  // Create restart button
  restartButton = createButton("Restart");
  restartButton.position(width / 2 - 50, height / 2 + 50);
  restartButton.mousePressed(restartGame);
  restartButton.hide(); // Hide until game ends
}

function draw() {
  background(255);
  
  if (!gameStarted) {
    image(img2, 0, 0, imgWidth2, imgHeight2);
    return; 
  }
  
  if (gameOver) {
    image(img3, 0, 0, imgWidth3, imgHeight3);
    textSize(30);
    fill(0, 234, 255);
    stroke(0);
    strokeWeight(2);
    textAlign(CENTER);
    text("Your score: " + score + " out of " + questions.length, width / 2, height / 2);
    restartButton.show(); // Show the restart button
    clearInterval(interval);
    return;
  }
  
  image(img, 0, 0, imgWidth, imgHeight);
  
  if (currentQuestion < questions.length) {
    displayQuestion();
    displayChoices();
    displayTimer();
  } else {
    gameOver = true; // Set the game over state
  }
}

function keyPressed() {
  if (key === ' ') {
    gameStarted = true; 
    timer = 10; 
    currentQuestion = 0; 
    userChoice = -1; 
    score = 0; 
    restartButton.hide(); // Hide the restart button during the game
  }
}

function displayQuestion() {
  let question = questions[currentQuestion].question;
  let wordCount = question.split(' ').length; 
  let baseSize = 24; 
  let textSizeFactor = 1; 

  if (wordCount >= 10) {
    textSizeFactor = 0.7; 
  } else if (wordCount >= 7) {
    textSizeFactor = 0.8; 
  }

  textSize(baseSize * textSizeFactor); 
  fill(255);
  stroke(0);
  strokeWeight(3);
  textAlign(CENTER, CENTER); 
  text(question, 400, 190); 
}

function displayChoices() {
  textSize(17);
  noStroke();
  
  // Choice 1
  fill(255); 
  stroke(72, 165, 165);
  strokeWeight(5);
  rectMode(CORNER); 
  rect(210, 350, 150, 40); 
  noStroke();
  fill(0); 
  textAlign(LEFT, CENTER); 
  text("1. " + questions[currentQuestion].choices[0], 215, 370);
  
  // Choice 2
  fill(255); 
  stroke(40, 145, 210);
  strokeWeight(5);
  rectMode(CORNER); 
  rect(440, 350, 150, 40); 
  noStroke();
  fill(0); 
  textAlign(LEFT, CENTER); 
  text("2. " + questions[currentQuestion].choices[1], 448, 370);
  
  // Choice 3
  fill(255); 
  stroke(72, 165, 165);
  rectMode(CORNER); 
  rect(210, 410, 150, 40); 
  noStroke();
  fill(0); 
  textAlign(LEFT, CENTER); 
  text("3. " + questions[currentQuestion].choices[2], 215, 430);
  
  // Choice 4
  fill(255); 
  stroke(40, 145, 210);
  strokeWeight(5);
  rectMode(CORNER); 
  rect(440, 410, 150, 40); 
  noStroke();
  fill(0); 
  textAlign(LEFT, CENTER); 
  text("4. " + questions[currentQuestion].choices[3], 448, 430);
}

function displayTimer() {
  textSize(23);
  stroke(0);
  strokeWeight(1);
  fill(0, 240, 255);
  text("Time left: " + timer + " seconds", 300, 320);
}

function decreaseTimer() {
  if (timer > 0) {
    timer--;
  } else {
    moveToNextQuestion();
  }
}

function moveToNextQuestion() {
  timer = 10; 
  currentQuestion++; 
  userChoice = -1;
  if (currentQuestion >= questions.length) {
    clearInterval(interval); 
    gameOver = true; // Mark game as over
  }
}

function mousePressed() {
  if (gameOver) return; // Disable answer selection after the game is over

  if (mouseX > 210 && mouseX < 360 && mouseY > 350 && mouseY < 390) {
    userChoice = 0; 
    checkAnswer();
    moveToNextQuestion();
  } else if (mouseX > 440 && mouseX < 590 && mouseY > 350 && mouseY < 390) {
    userChoice = 1; 
    checkAnswer();
    moveToNextQuestion();
  } else if (mouseX > 210 && mouseX < 360 && mouseY > 410 && mouseY < 450) {
    userChoice = 2; 
    checkAnswer();
    moveToNextQuestion();
  } else if (mouseX > 440 && mouseX < 590 && mouseY > 410 && mouseY < 450) {
    userChoice = 3; 
    checkAnswer();
    moveToNextQuestion();
  }
}

function checkAnswer() {
  if (userChoice === questions[currentQuestion].correct) {
    correctSound.setVolume(0.5);
    correctSound.play();
    correctSound.jump(0.2);
    score++; 
  } else {
    wrongSound.setVolume(0.5);
    wrongSound.play(); 
    wrongSound.jump(0.5); 
  }
}

function restartGame() {
  gameOver = false;
  gameStarted = true;
  currentQuestion = 0;
  score = 0;
  timer = 10;
  userChoice = -1;
  shuffleQuestions(questions); // Shuffle questions again on restart

  interval = setInterval(decreaseTimer, 1000);
  restartButton.hide(); // Hide the restart button during the game
  
}
