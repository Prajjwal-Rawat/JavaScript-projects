import { questions } from "./questions-container.js";

const QuestionCol = document.querySelector('#Question');
const answerContainer  = document.getElementById('Answers');
const nextBtn = document.querySelector('#nextBtn');


let QuestionsIndex = 0;
let score = 0;


function playAgain(){
  QuestionsIndex = 0;
  score = 0;
  show();
  nextBtn.innerHTML = 'Next';
}



function show(){
  removeChilds();
  let currentQuestionIndex = questions[QuestionsIndex];
  let questionNo = QuestionsIndex + 1;
  QuestionCol.innerHTML = ` ${questionNo}. ${currentQuestionIndex.question}`;

  currentQuestionIndex.answer.forEach((answer, index) => {
    const button = document.createElement('button');
    button.classList.add('ansBtn');
    button.innerHTML = answer.text;
    answerContainer.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectOption);
  })

}


function selectOption(event){
  const selectedBtn = event.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';
  
  if(isCorrect){
    selectedBtn.classList.add('correct');
    score++;
  }else{
    selectedBtn.classList.add('incorrect');
  }

  const button = document.querySelectorAll('.ansBtn')
  button.forEach((button) =>{
    if(button.dataset.correct === 'true'){
      button.classList.add('correct');
    }
    button.disabled = 'true';
  })
  nextBtn.style.display = 'block';
}



function removeChilds(){
  while(answerContainer.firstChild){
    answerContainer.removeChild(answerContainer.firstChild);
  }
}


function showScore(){
  removeChilds();
  QuestionCol.innerHTML = `Your score is ${score} out of ${questions.length}`
  nextBtn.innerHTML = 'Play Again';
  nextBtn.style.display = 'block'
}


function HandleNextQuestion(){
  QuestionsIndex++;
  if(QuestionsIndex < questions.length){
    show();
  }else{
    showScore();
  }
}



nextBtn.addEventListener('click', () => {
  nextBtn.style.display = 'none';
  if(QuestionsIndex < questions.length){
    HandleNextQuestion();
  }else{
    playAgain();
  }
})









playAgain();