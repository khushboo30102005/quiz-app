const startNowBtn = document.querySelector('.start-now')
const frontPage = document.querySelector('.front-page')
const quizTime = document.querySelector('.quiz-time')
const questionCount = document.querySelector('.question-count')
const nextBtn = document.querySelector('.next-btn')
const quizQuestion = document.querySelector('.quiz-Question')
const option = document.querySelectorAll(".option")
const option1 = document.querySelector(".option-1")
const option2 = document.querySelector(".option-2")
const option3 = document.querySelector(".option-3")
const option4 = document.querySelector(".option-4")
const quizScore = document.querySelector('.quiz-score')
const timer = document.querySelector('.timer')
const quizSection = document.querySelector('.quiz-section')
const resultSection = document.querySelector('.result-section')
const rightPercentage = document.querySelector('.right-percentage')
const wrongPercentage = document.querySelector('.wrong-percentage')
const resultScore = document.querySelector('.result-score')
const greenResult = document.querySelector('.right-result')
const redResult = document.querySelector('.wrong-result')
const retryBtn = document.querySelector('.retry')

// ALL QUIZ QUESTIONS ARE STORED IN AN ARRAY OF OBJECT LIKE THAT:

const quizData = JSON.parse(localStorage.getItem('quizData')) || [
  {
    question: "Which of the following is the correct way to declare a variable in JavaScript?",
    options: ["var myVar;", "let myVar;", "const myVar;", "All of the above"],
    answer: 3
  },
  {
    question: "Which symbol is used for comments in JavaScript (single line)?",
    options: ["<!-- -->", "//", "**", "#"],
    answer: 1
  },
  {
    question: "Which method is used to print something in the console?",
    options: ["console.print()", "console.write()", "console.log()", "log.console()"],
    answer: 2
  },
  {
    question: "JavaScript is a ____ language.",
    options: ["Compiled", "Interpreted", "Markup", "Machine"],
    answer: 1
  },
  {
    question: "What will typeof null return?",
    options: ["null", "object", "undefined", "string"],
    answer: 1
  },
  {
    question: "Which operator is used to compare both value and type?",
    options: ["=", "==", "===", "!=="],
    answer: 2
  },
  {
    question: "What does NaN stand for in JavaScript?",
    options: ["Not a Name", "Not a Null", "Not a Number", "No Any Number"],
    answer: 2
  },
  {
    question: "Which keyword is used to define a constant in JavaScript?",
    options: ["let", "var", "const", "define"],
    answer: 2
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["Number", "Boolean", "Character", "Undefined"],
    answer: 2
  },
  {
    question: "Which function is used to parse a string into an integer?",
    options: ["Number()", "parseInt()", "parseFloat()", "String()"],
    answer: 1
  },
  {
    question: "What is the output of '5' + 2 in JavaScript?",
    options: ["7", "52", "Error", "NaN"],
    answer: 1
  },
  {
    question: "What is the default value of an uninitialized variable in JavaScript?",
    options: ["null", "undefined", "0", "false"],
    answer: 1
  },
  {
    question: "Which method is used to remove the last element of an array?",
    options: ["shift()", "pop()", "push()", "splice()"],
    answer: 1
  },
  {
    question: "Which method is used to add elements at the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: 0
  },
  {
    question: "Which function is used to convert JSON to a JavaScript object?",
    options: ["JSON.parse()", "JSON.stringify()", "JSON.toObject()", "JSON.convert()"],
    answer: 0
  },
  {
    question: "Which of the following is a looping structure in JavaScript?",
    options: ["for", "while", "do…while", "All of the above"],
    answer: 3
  },
  {
    question: "What will Boolean(0) return?",
    options: ["true", "false", "null", "undefined"],
    answer: 1
  },
  {
    question: "Which method is used to join array elements into a string?",
    options: ["concat()", "join()", "toString()", "push()"],
    answer: 1
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Netscape", "Google", "IBM"],
    answer: 1
  },
  {
    question: "Which event is fired when a user clicks on an HTML element?",
    options: ["onmouseover", "onclick", "onchange", "onsubmit"],
    answer: 1
  },
  {
    question: "Which function is used to execute code after a delay?",
    options: ["setTimeout()", "setInterval()", "delay()", "wait()"],
    answer: 0
  },
  {
    question: "What will be the output of 2 + '2'?",
    options: ["4", "'22'", "NaN", "Error"],
    answer: 1
  },
  {
    question: "Which method is used to find the length of a string?",
    options: ["size()", "count()", "length", "len()"],
    answer: 2
  },
  {
    question: "Which keyword is used to exit a loop in JavaScript?",
    options: ["exit", "stop", "break", "continue"],
    answer: 2
  },
  {
    question: "Which of the following is true about const variables?",
    options: [
      "Value can be reassigned",
      "Scope is global only",
      "Must be initialized at the time of declaration",
      "Can be declared without a value"
    ],
    answer: 2
  }
];

let totalQuestion = quizData.length

quizData.forEach((quiz) => {
  retryBtn.addEventListener('click', () =>{
 quiz.userAnswer = null
  })
    
})
retryBtn.addEventListener('click', () => {
  quizSection.classList.remove('submitted')
  resultSection.style.display = 'none'
  document.body.style.backgroundColor = '#CCE2C2'
  currentQuestionIndex = 0
  quizData.forEach((quiz) => {
    const currentQuestion = quizData[currentQuestionIndex]
    displayQuestion()
  })


})
// SHOW MSG WHEN USER CHOOSES WRONG OPTION ==>

function createWrongMsg() {
  const span = document.createElement('span')
  span.innerText = 'you choose'
  span.classList.add('wrong-msg')
  return span
}
startNowBtn.addEventListener('click', () => {
  document.body.style.backgroundColor = '#CCE2C2'
  frontPage.classList.add('quiz-start')

})

// ADD SOUND EFFECT ==>

const correctBuzzer = document.createElement('audio')
correctBuzzer.src = 'music/correct-buzzer.mp3'

const incorrectBuzzer = document.createElement('audio')
incorrectBuzzer.src = 'music/incorrect-buzzer.mp3'

// TOGGLE SOUND EFFECTS ==> 

const soundToggleBtn = document.querySelector(".sound-toggle-btn")
let soundEnable = JSON.parse(localStorage.getItem('soundEnable')) ?? true

updateSoundButton();

soundToggleBtn.addEventListener('click', () => {
  soundEnable = !soundEnable;
  localStorage.setItem('soundEnable', soundEnable);
  updateSoundButton();
});

function updateSoundButton() {
  soundToggleBtn.innerHTML = "";
  const soundImg = document.createElement('img')
  soundImg.classList.add('volume')
  soundImg.src = soundEnable ? "images/unmute.svg" : "images/mute.svg";
  soundImg.alt = soundEnable ? 'soundOn' : 'soundOff';
  soundToggleBtn.append(soundImg)
}


// SHOW WRONG OR RIGHT ICONS ==> 

function createIcon(isCorrect) {
  const icon = document.createElement('img')
  icon.src = isCorrect ? "images/correct.svg" : "images/wrong.svg";
  icon.classList.add('answer-react')
  return icon
}



// START QUIZ FROM USER LEAVE 

const savedIndex = localStorage.getItem('currentQuestionIndex')
let currentQuestionIndex = savedIndex ? parseInt(savedIndex) : 0;




// CREATE userAnswer PROPERTY IN quizData OBJECT

quizData.forEach((quiz) => {
  if (quiz.userAnswer === undefined) {
    quiz.userAnswer = null
  }
})


// UPDATE USER'S HIGHTEST SCORE ==>

function updateScore() {
  const currentQuestion = quizData[currentQuestionIndex]
  if (currentQuestion.userAnswer) {
    const userScore = quizData.filter((quiz) => {
      return quiz.userAnswer.isCorrect === true
    }).length
    quizScore.innerText = `Highest Score: ${userScore}/${totalQuestion}`
  }

}

if (currentQuestionIndex === totalQuestion - 1) {
  updateScore()
}

// DISPLAY QUESTIONS ON SCREEN 

function displayQuestion() {
  const currentQuestion = quizData[currentQuestionIndex]
  quizQuestion.innerText = currentQuestion.question
  questionCount.innerText = `${currentQuestionIndex + 1}/${totalQuestion}`
  option1.innerText = currentQuestion.options[0]
  option2.innerText = currentQuestion.options[1]
  option3.innerText = currentQuestion.options[2]
  option4.innerText = currentQuestion.options[3]

  showAnswerUI(currentQuestion)
  localStorage.setItem('quizData', JSON.stringify(quizData))
  localStorage.setItem('currentQuestionIndex', currentQuestionIndex)

  if (currentQuestionIndex === totalQuestion - 1) {
    nextBtn.innerText = 'submit>>'
    // quizSection.classList.add('submitted')

  }
  else{
    nextBtn.innerText = 'next>>>'
  }
  pointerOnNextBtn()

}

// MAINTAIN UI OF DISPLAYED QUESTIONS ==>

function showAnswerUI(currentQuestion) {
  option.forEach((opt) => {
    opt.classList.remove('right', 'wrong')
  })
  if (currentQuestion.userAnswer) {
    const selectedIndex = currentQuestion.userAnswer.selected
    if (currentQuestion.userAnswer.isCorrect) {
      option[selectedIndex].append(createIcon(true));
      option[selectedIndex].classList.add('right');
    } else {
      option[selectedIndex].append(createWrongMsg());
      option[currentQuestion.answer].append(createIcon(true));
      option[currentQuestion.answer].classList.add('right');
      option[selectedIndex].append(createIcon(false));
      option[selectedIndex].classList.add('wrong');
    }
  }
}

displayQuestion()

// UPDATE QUESTIONS AND OPTIONS ==>

function nextQuestion() {
  currentQuestionIndex++
  if (currentQuestionIndex < totalQuestion) {
    displayQuestion()
  }
  else  if(currentQuestionIndex = totalQuestion){
    displayResult()
  }

}

// CHECK USER'S ANSWERS ==>

function checkAnswer(e) {
  const currentQuestion = quizData[currentQuestionIndex];
  if (currentQuestion.userAnswer !== null) {
    return
  }

  const selectedIndex = currentQuestion.options.indexOf(e.target.innerText);;
  if (selectedIndex === currentQuestion.answer) {
    currentQuestion.userAnswer = { isCorrect: true, selected: selectedIndex }
    option[currentQuestion.answer].append(createIcon(true))
    option[selectedIndex].classList.add('right')
    if (soundEnable) {
      correctBuzzer.play()
    }
  } else if ((selectedIndex !== currentQuestion.answer)) {

    currentQuestion.userAnswer = { isCorrect: false, selected: selectedIndex }
    option[currentQuestion.answer].append(createIcon(true))
    option[selectedIndex].append(createWrongMsg());

    option[selectedIndex].append(createIcon(false))
    option[currentQuestion.answer].classList.add('right')
    option[selectedIndex].classList.add('wrong')
    if (soundEnable) {
      incorrectBuzzer.play()
    }
  }



  localStorage.setItem('quizData', JSON.stringify(quizData))

}

function displayResult() {
  let userScore = quizData.filter((quiz) => {
    return quiz.userAnswer.isCorrect === true
  }).length
  rightPercentage.innerText = `${userScore / totalQuestion * 100}%`
  wrongPercentage.innerText = `${100 - userScore / totalQuestion * 100}%`
  resultScore.innerText = `Your Score is: ${userScore}/${totalQuestion}`
  greenResult.style.width = `${userScore / totalQuestion * 100}%`
  // redResult.style.width = `${100-userScore/totalQuestion*100}%`
  if (greenResult.style.width === '100%') {
    redResult.style.display = 'none'
  }
}


option.forEach((option) => {
  option.addEventListener('click', checkAnswer)
  option.addEventListener('click', pointerOnNextBtn)

})

function pointerOnNextBtn() {
  const currentQuestion = quizData[currentQuestionIndex]
  if (currentQuestion.userAnswer === null) {
    nextBtn.classList.add('disabled')
    nextBtn.classList.remove('able')
  } else if (currentQuestion.userAnswer) {
    nextBtn.classList.remove('disabled')
    nextBtn.classList.add('able')
  }
}




nextBtn.addEventListener('click', nextQuestion)

nextBtn.addEventListener('click', () => {
  if (currentQuestionIndex === totalQuestion) {
    quizSection.classList.add('submitted')
    resultSection.style.display = 'block'
    document.body.style.backgroundColor = '#F6F4F0'
    displayResult()
  }
}) 
