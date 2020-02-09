//Liste de question
var questions = [  {
    question: "Who is the creator of PHP?",
    choices: ["Jack Sparrow","Rasmus Lerdorf","Tim Berners-Lee","Dennis Ritchie"],
    correctAnswer: "2"
},

  {
    question: "When was the first implementation of Blockchain Technology?",
    choices: ["2009","2008","2000","1991"],
    correctAnswer: "1"
  },

  {
    question: "In which year was the first Playstation made?",
    choices: ["1994","1992","1990","1995"],
    correctAnswer: "1"
  },

   {
    question: "What does PHP mean today ?",
    choices: ["PHP: Personal Home Page","PHP: Program High Performace","PHP: Hypertext Preprocessor","PHP: Hypertext Page"],
    correctAnswer: "3"
  },

   {
    question: "What is the last Sega console?",
    choices: ["Dreamcast","Saturn","S-Gage","Lindbergh"],
    correctAnswer: "1"
  },

   {
    question: "What does www stands for ?",
    choices: ["Web wasabi world","World wide web","Wide web world","Web war song"],
    correctAnswer: "2"
  },

   {
    question: "What's the name of the UNIX creator?",
    choices: ["Mark Shuttleworth","Kenneth Thompson","Linus Torvalds","Bill Gates"],
    correctAnswer: "2"
  },

  {
    question: "When was born Alan Turing ?",
    choices: ["1981","1891","1934","1912"],
    correctAnswer: "4"
  },

    {
    question: "What is the port for the http",
    choices: ["70","90","82","80"],
    correctAnswer: "4"
  }
];
//
var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () { // Si  la page HTML est executable par jquery

    // Afficher la première question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // Si on click sur prochaine question on passa a la suivantes
    $(this).find(".nextButton").on("click", function () { //Find sélectionne le boutton et ON execute.
       
      if (!quizOver) {
            value = $("input[type='radio']:checked").val(); // $ fait recherche du boutton 'radio'
            if (value == undefined) {   //Si le boutton n'est pas coché alors
                $(document).find(".quizMessage").text("Fait un choix (idiot !)"); // recherche le css pour afficher le message
                $(document).find(".quizMessage").show();
            } else {
                $(document).find(".quizMessage").hide(); // Retire le message d'alerte

                if (value == questions[currentQuestion].correctAnswer) { // compte le nombre de bonne réponse
                    correctAnswers++;
                }

                if (correctAnswers > 0) {
                  alert("Bonne réponse");
                }

                currentQuestion++; // Compte le nombre de question
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();  //Affiche le score
                    $(document).find(".nextButton").text("Rejouer ?"); // On propose de rejouer
                    quizOver = true;
                }
            }
        } else { // relance le script de question
            quizOver = false;
            $(document).find(".nextButton").text("Question suivante");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// INTEGRATION JSON HTML
function displayCurrentQuestion() {

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
      
      }
}

function resetQuiz() { // RESET le résultat et le quizz
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() { // AFFICHE LE RESULTAT
    $(document).find(".quizContainer > .result").text("Votre score : " + correctAnswers + " de bon sur " + questions.length + " questions ");
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide(); // Efface résultat
}