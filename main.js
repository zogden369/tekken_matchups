
//Code modified from: https://www.sitepoint.com/simple-javascript-quiz/
function buildQuiz(){
  // variable to store the HTML output
 const output = [];

 // for each question...
 myQuestions.forEach(
   (currentQuestion, questionNumber) => {

     // variable to store the list of possible answers
     const answers = [];

     // and for each available answer...
     for(letter in currentQuestion.answers){

       // ...add an HTML radio button
       answers.push(
         `<label>
           <input type="radio" name="question${questionNumber}" value="${letter}">
           ${letter} :
           ${currentQuestion.answers[letter]}
         </label>`
       );
     }

     // add this question and its answers to the output
     output.push(
       `<div class="question"> ${currentQuestion.question} </div>
       <div class="answers"> ${answers.join('')} </div>`
     );
   }
 );

 // finally combine our output list into one string of HTML and put it on the page
 quizContainer.innerHTML = output.join('');
}

function showResults(){
  // gather answer containers from our quiz
 const answerContainers = quizContainer.querySelectorAll('.answers');

 // keep track of user's answers
 let numCorrect = 0;

 // for each question...
 myQuestions.forEach( (currentQuestion, questionNumber) => {

   // find selected answer
   const answerContainer = answerContainers[questionNumber];
   const selector = `input[name=question${questionNumber}]:checked`;
   const userAnswer = (answerContainer.querySelector(selector) || {}).value;

   // if answer is correct
   if(userAnswer === currentQuestion.correctAnswer){
     // add to the number of correct answers
     numCorrect++;

     // color the answers green
     answerContainers[questionNumber].style.color = 'green';
   }
   // if answer is wrong or blank
   else{
     // color the answers red
     answerContainers[questionNumber].style.color = 'red';
   }
 });

 // show number of correct answers out of total
 //resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const myQuestions = [
  {
    question: "Which direction should you sidestep Kazuya?",
    answers: {
      a: "Right",
      b: "Left",
      c: "You shouldn't sidestep"
    },
    correctAnswer: "b"
  },
  {
    question: "What is Armor King's main weakness?",
    answers: {
      a: "He's weak to sidestepping",
      b: "Most of his moves are minus",
      c: "His best moves are high"
    },
    correctAnswer: "c"
  },
  {
    question: "What should you do after Dragunov's (specify plus move)",
    answers: {
      a: "Keep blocking and wait",
      b: "Challenge as soon as you leave blockstun",
      c: "None of the above"
    },
    correctAnswer: "a"
  },
  {
    question: "How should you approach Bryan?",
    answers: {
      a: "Charge in and pressure",
      b: "Bait moves and whiff punish",
      c: "Sidestep all the time"
    },
    correctAnswer: "b"
  },
  {
    question: "How should you generally fight Marduk?",
    answers: {
      a: "Pressure constantly",
      b: "Wait for him to come to you",
      c: "Sidestep a lot "
    },
    correctAnswer: "a"
  }


];

// display quiz right away
buildQuiz();

// on submit, show results
submitButton.addEventListener('click', showResults);
