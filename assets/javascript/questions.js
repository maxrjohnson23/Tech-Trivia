function getQuestions() {
    var questions = [
        {
            questionText: "Question A?",
            answers: [
                {
                    answerText: "Answer 1",
                    isCorrectAnswer: false
                },
                {
                    answerText: "Answer 2",
                    isCorrectAnswer: true
                },
                {
                    answerText: "Answer 3",
                    isCorrectAnswer: false
                },
                {
                    answerText: "Answer 4",
                    isCorrectAnswer: false
                }
            ]
        },
        {
            questionText: "Question B?",
            answers: [
                {
                    answerText: "Answer 1",
                    isCorrectAnswer: true
                },
                {
                    answerText: "Answer 2",
                    isCorrectAnswer: false
                },
                {
                    answerText: "Answer 3",
                    isCorrectAnswer: false
                },
                {
                    answerText: "Answer 4",
                    isCorrectAnswer: false
                }
            ]
        }
        // {
        //     questionText: "Question C?",
        //     answers: [
        //         {
        //             answerText: "Answer 1",
        //             isCorrectAnswer: true
        //         },
        //         {
        //             answerText: "Answer 2",
        //             isCorrectAnswer: false
        //         },
        //         {
        //             answerText: "Answer 3",
        //             isCorrectAnswer: false
        //         },
        //         {
        //             answerText: "Answer 4",
        //             isCorrectAnswer: false
        //         }
        //     ]
        // },
        // {
        //     questionText: "Question D?",
        //     answers: [
        //         {
        //             answerText: "Answer 1",
        //             isCorrectAnswer: false
        //         },
        //         {
        //             answerText: "Answer 2",
        //             isCorrectAnswer: false
        //         },
        //         {
        //             answerText: "Answer 3",
        //             isCorrectAnswer: false
        //         },
        //         {
        //             answerText: "Answer 4",
        //             isCorrectAnswer: true
        //         }
        //     ]
        // },
        // {
        //     questionText: "Question E?",
        //     answers: [
        //         {
        //             answerText: "Answer 1",
        //             isCorrectAnswer: false
        //         },
        //         {
        //             answerText: "Answer 2",
        //             isCorrectAnswer: false
        //         },
        //         {
        //             answerText: "Answer 3",
        //             isCorrectAnswer: true
        //         },
        //         {
        //             answerText: "Answer 4",
        //             isCorrectAnswer: false
        //         }
        //     ]
        // }
    ];

    // Shuffle order of answers in each question
    for(var i = 0; i < questions.length; i++) {
        shuffleArray(questions[i].answers);
    }

    // Shuffle order of all the questions
    return shuffleArray(questions);
};

// Shuffle an array usiung the Durstenfeld shuffle algorithm
function shuffleArray(array) {
    for(var i = array.length - 1; i > 0; i-- ) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}