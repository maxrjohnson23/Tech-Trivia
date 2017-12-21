var game = {
    // get question list from external JS file
    questions: questionBank.getQuestions(),
    currentQuestionIndex: 0,
    incorrectAnswers: 0,
    correctAnswers: 0,
    // 30 second timer on each question
    timePerQuestion: 30000,
    // Time to display correct answer details
    answerSummaryTime: 2000,
    // handle for the timeout functions
    questionTimeoutHandle: undefined,
    clockTickHandle: undefined,
    clockTime: 0,
    startGame: function () {
        this.showQuestion(this.currentQuestionIndex);

    },
    showQuestion: function (questionIndex) {
        this.currentQuestionIndex = questionIndex;
        screenHandler.updateQuestionNumber(this.currentQuestionIndex);
        // Start timer for each question displayed
        screenHandler.displayQuestionDetails(this.questions[questionIndex]);

        // Set timer in seconds
        this.clockTime = this.timePerQuestion / 1000;
        screenHandler.displayTime(game.clockTime);
        // set interval to update clock        
        this.clockTickHandle = setInterval(function () {
            game.clockTick();
        }, 1000);
    },
    clockTick: function () {
        game.clockTime--;
        screenHandler.displayTime(game.clockTime);
        if (game.clockTime === 0) {
            // 
            game.evaluateAnswer();
            clearInterval(game.clockTickHandle);
        }
    },
    evaluateAnswer: function (answerId) {
        // remove click functions from answers
        screenHandler.disableAnswerSelection();
        // clear timeouts if user selects answer
        clearTimeout(this.questionTimeoutHandle);
        clearInterval(this.clockTickHandle);

        var currentQuestion = this.questions[this.currentQuestionIndex];

        // Update correct/incorrect count for game summary
        if (answerId && currentQuestion.answers[answerId].isCorrectAnswer) {
            this.correctAnswers++;
        } else {
            // No answer selected - question timeout
            this.incorrectAnswers++;
        }

        // Get index of correct answer for the current question
        var correctAnswerId = currentQuestion.answers.findIndex(ans => ans.isCorrectAnswer);
        screenHandler.displayAnswerSummary(Number(answerId), correctAnswerId);
        this.currentTimeoutHandle = setTimeout(function () {
            game.nextQuestion();
        }, this.answerSummaryTime);
    },
    nextQuestion: function () {
        this.currentQuestionIndex++;
        // If questions remain, continue game
        if (this.currentQuestionIndex < this.questions.length) {
            this.showQuestion(this.currentQuestionIndex);
        } else {
            // End game and show the summary
            this.showGameSummary();
        }
    },
    showGameSummary: function () {
        screenHandler.displayGameSummary();
    },
    reset: function () {
        screenHandler.resetGame();
        // Reset game to initial settings
        this.correctAnswers = 0;
        this.incorrectAnswers = 0;
        this.questions = questionBank.getQuestions();
        this.currentQuestionIndex = 0;
        this.startGame();
    }
}

var screenHandler = {
    answerOrder: ["A", "B", "C", "D"],
    displayQuestionDetails: function (question) {
        // Display question text
        $(".question-text").text(question.questionText);
        // Clear answers from previous questions
        var answerDiv = $(".answers").empty();
        // Display each answer
        for (var i = 0; i < question.answers.length; i++) {
            // Format answer as "A.) Answer Text"
            var answerText = `${this.answerOrder[i]}.) ${question.answers[i].answerText}`;
            // Add data attribute to track answer number
            var answerChoice = $("<div>").text(answerText).addClass("answer-choice").attr("data-answer", i);
            answerChoice.on("click", this.answerClicked);
            answerDiv.append(answerChoice);
        }
    },
    answerClicked: function () {
        // check answer ID against current question
        var answerId = $(this).attr("data-answer");
        game.evaluateAnswer(answerId);
    },
    displayAnswerSummary: function (selectedId, correctId) {
        if (selectedId !== correctId) {
            // Highlight incorrect answer
            $(`.answer-choice[data-answer="${selectedId}"`).addClass("incorrect-answer");
        }
        // Highlight correct answer
        $(`.answer-choice[data-answer="${correctId}"`).addClass("correct-answer");
    },
    disableAnswerSelection: function () {
        $(".answer-choice").off("click");
    },
    displayGameSummary: function () {
        $(".answers").empty();
        $(".question-text").empty();
        // Show screen overlay with game results
        $("#correct").text(game.correctAnswers);
        $("#incorrect").text(game.incorrectAnswers);
        // Calculate percentage score
        var score = Math.floor((game.correctAnswers / game.questions.length) * 100);
        $("#score").text(score);
        $("#summary-modal").show();

        // bind click events to play again button
        $("#play-again").on("click", function () {
            game.reset();
        });
    },
    displayTime: function (seconds) {
        // add leading zeroes to seconds if needed
        paddedSeconds = String(seconds).padStart(2, "0");
        $(".timer").text(`00:${paddedSeconds}`);
    },
    updateQuestionNumber: function(questionNum) {
        $(".question-number").text(`${questionNum} / ${game.questions.length}`);
    },
    resetGame: function () {
        $("#summary-modal").hide();
        $("#play-again").off("click");
    }
}

$(".timer").text("Technology trivia covering computers, the Internet, companies, and people.");
$(".question-text").html("<button id='start-button'>Play</button>");

$("#start-button").on("click", function (event) {

    $(this).off("keydown");
    game.startGame();
});





