var game = {
    // get question list from external JS file
    questions: getQuestions(),
    incorrectAnswers: 0,
    correctAnswers: 0,
    startGame: function() {
        for (var i = 0; i < this.questions.length; i++) {
            this.showQuestion(i);
        }
        // console.log("Game over");
    },
    showQuestion: function(i) {
        // Start timeer for each question displayed
        (function(i) {
            setTimeout(function () {
            screenHandler.displayQuestionDetails(game.questions[i]);
            }, i * 2000);
        })(i);
    }
}

var screenHandler = {
    displayQuestionDetails: function(question) {
        // Display question text
        $(".question-text").text(question.questionText);
        // Clear answers from previous questions
        var answerDiv = $(".answers").empty();
        // Display each answer
        for(var i = 0; i < question.answers.length; i++) {
            answerDiv.append($("<div>").text(question.answers[i].answerText));
        }
    }
}


console.log(game.questions);
game.startGame();





