import { questions } from "./questions-container.js";


const QuestionHtml = document.querySelector('#Question');
const answerContainer = document.querySelector('#Answers');
const nextbtn = document.querySelector('#nextBtn');


let CurrentIndex = 0;
let Score = 0;

function PlayGame(){
    nextbtn.innerHTML = 'Next';
    CurrentIndex = 0;
    Score = 0;
    startQuiz();
}

function startQuiz() {
    removeButtons();
    let currentQuestion = questions[CurrentIndex];
    let questionNo = CurrentIndex + 1;

    QuestionHtml.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answer.forEach((answer) => {
        const button = document.createElement('button');
        button.classList.add('ansBtn');
        button.innerHTML = answer.text;
        answerContainer.appendChild(button);
        
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener('click', selectedBtn);
    })
}


function selectedBtn(event) {
   const ClickedBtn = event.target;
   if(ClickedBtn.dataset.correct){
    ClickedBtn.classList.add('correct');
    Score++;
   }else{
    ClickedBtn.classList.add('incorrect');
   }

   const buttons = document.querySelectorAll('.ansBtn');
   buttons.forEach((btn) => {
      if(btn.dataset.correct){
        btn.classList.add('correct');
      }
      btn.disabled = 'true';
   })
   nextbtn.style.display = 'block';
}


function removeButtons(){
    answerContainer.replaceChildren()
}


function showScore(){
   removeButtons();
   QuestionHtml.innerHTML = `Your Score is ${Score} out of ${questions.length}`;
   nextbtn.innerHTML = 'Play Again';
   nextbtn.style.display = 'block';
}



function HandleNextQuestion(){
    CurrentIndex++;
    if(CurrentIndex < questions.length){
        startQuiz();
    }else{
        showScore();
    }
}




nextbtn.addEventListener('click', () =>{
    nextbtn.style.display = 'none';
    if(CurrentIndex < questions.length){
        HandleNextQuestion();
    }else{
      PlayGame();
    }
})


PlayGame();