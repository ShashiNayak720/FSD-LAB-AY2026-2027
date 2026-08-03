const quiz = [
  {
    question: "1) Which language is used for web page interactivity?",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    answer: "JavaScript" 
  },
  {
    question: "2) Which tag is used to change the font to italic?",
    options: ["br", "link", "i", "rel"],
    answer: "i"
  },
  {
    question: "3) What is the full form of CSS",
    options: ["Cascading Style Sheet", "Computer Style Sheet", "Creative Style Sheet", "Color Styling Synatx"],
    answer: "Cascading Style Sheet"
  },
  {
    question: "4) Which tag is used to highlight the text?",
    options: ["highlight", "Bold", "Strong", "Mark"],
    answer: "Mark"
  },
  {
    question: "5) Span tag is used for?",
    options: ["Breaking to the next line", "Highlighting particular text", "Creating a division", "Creating a Container"],
    answer: "Highlighting particular text"
  },
];

let index = 0;
let score = 0;
let time = 30;

const question = document.getElementById("question");
const options = document.getElementById("options");
const result = document.getElementById("result");

function loadQuestion() {
  question.innerHTML = quiz[index].question;
  options.innerHTML = "";

  quiz[index].options.forEach(option => {
    options.innerHTML += `
      <input type="radio" name="ans" value="${option}"> ${option}<br>
    `;
  });
}

function nextQuestion() {
  const selected = document.querySelector('input[name="ans"]:checked');

  if (selected && selected.value === quiz[index].answer) {
    score++;
  }

  index++;

  if (index < quiz.length) {
    loadQuestion();
  } else {
    result.innerHTML = "Your Score: " + score + "/" + quiz.length;
    question.innerHTML = "";
    options.innerHTML = "";
  }
}

loadQuestion();

setInterval(function () {
  time--;
  document.getElementById("timer").innerHTML = "Time: " + time;

  if (time == 0) {
    result.innerHTML = "Time Over! Score: " + score + "/" + quiz.length;
    question.innerHTML = "";
    options.innerHTML = "";
  }
}, 1000);