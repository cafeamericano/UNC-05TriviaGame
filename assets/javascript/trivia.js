//############# GLOBAL VARIABLES #################################################################   

let correctCount = 0;
let incorrectCount = 0;

let defaultStartTime = 10;
let timeLeft = defaultStartTime;

var stopwatchCountdown = 0;
var timeoutUntilNextQuestion = 0;

let shuffledQuestions = [];

let activeDisplayIndex = 0;

//############# OBJECTS #################################################################   

//Begin or end a turn
let turn = {
    acceptingInput: true,
    //End turn
    end: function () {
        this.acceptingInput = false
    },
    //Begin turn
    begin: function () {
        this.acceptingInput = true
    }
};

//Reward or punish based on selections
let player = {
    //Reward the player
    reward: function () {
        stopwatch.stop()
        turn.end()
        correctCount += 1
        scoreboard.update()
        UI.clearQuestion_CorrectAnswer()
        timeoutUntilNextQuestion = setTimeout(function () { UI.goToNextQuestion() }, 3500);
    },
    //Define common punishment
    implementPunishment: function () {
        stopwatch.stop()
        turn.end()
        incorrectCount += 1
        scoreboard.update()
    },
    //Common punishment + wrong-answer-specific punishment
    providedWrongAnswer: function () {
        this.implementPunishment()
        UI.clearQuestion_WrongAnswer();
        timeoutUntilNextQuestion = setTimeout(function () { UI.goToNextQuestion() }, 3500);

    },
    //Common punishment + time-out-specific punishment
    outOfTime: function () {
        this.implementPunishment()
        UI.clearQuestion_TimeUp();
        timeoutUntilNextQuestion = setTimeout(function () { UI.goToNextQuestion() }, 3500);
    }
};

//Stopwatch
let stopwatch = {

    //Stop the clock
    stop: function () {
        clearInterval(stopwatchCountdown);
    },

    //Reset the clock
    reset: function () {
        timeLeft = defaultStartTime;
        stopwatchCountdown = setInterval(makeTimePass, 1000);
        stopwatch.updateView()
    },

    //Update the DOM
    updateView: function () {
        $("#timeRemaining").text(`${timeLeft} seconds`)
        $("#progressBar").css({ width: ((timeLeft - defaultStartTime) / defaultStartTime) * -100 + '%' })
    }
};

//The scoreboard
let scoreboard = {
    //Update the scoreboard
    update: function () {
        $("#correctCount").text(`Correct: ${correctCount}`)
        $("#incorrectCount").text(`Incorrect: ${incorrectCount}`)
        $("#currentQuestion").text(`Question: ${activeDisplayIndex + 1} of ${trivia.length}`)
    },
    //Show final results
    showFinalResults: function () {
        $("#watchAndInfo").remove()
        $("#main").css({ width: '100%' })
        $("#main").removeClass("col-9");
        $("#main").addClass("mt-3");
        $("#main").append(`<h4 class="text-center text-info">Your final score is... </h4>`)
        $("#main").append(`<h1 class="text-center text-info" style="font-size: 150px">${correctCount / (trivia.length) * 100}%</h1>`)
        $("#main").append(`<br/>`)
        $("#main").append(`<p class="text-center text-info">You answered ${correctCount} questions correctly.</p>`)
        $("#main").append(`<p class="text-center text-info">You missed ${incorrectCount} questions.</p>`)
        $("#main").append(`<div class='text-center'><button id="restartButton" class="btn btn-outline-info">Restart</button></div>`)
    }
};

let game = {
    //Shuffle questions
    shuffleQuestions: function () {
        while (shuffledQuestions.length < trivia.length) {
            let randomNumber = Math.floor(Math.random() * trivia.length);
            if (shuffledQuestions.indexOf(randomNumber) === -1) {
                shuffledQuestions.push(randomNumber)
            }
        }
    },

    //Restart the game
    restart: function () {
        $('#everythingBelowHeader').empty()
        alert('Restarting...')
        correctCount = 0;
        incorrectCount = 0;
        activeDisplayIndex = 0;
        defaultStartTime = 10;
        timeLeft = defaultStartTime;
        stopwatchCountdown = 0;
        timeoutUntilNextQuestion = 0;
        UI.renderNewTestSession();
    }
};

//Control what the user sees
let UI = {

    //Start a new quiz
    renderNewTestSession: function () {

        //The watch and info section
        $("#everythingBelowHeader").append(`<div id='watchAndInfo' class="col-3"></div>`)
        //The section for the questions
        $("#everythingBelowHeader").append(`<div id='main' class="col-9"></div>`)

        //The watchface
        $("#watchAndInfo").append(`<div id="watchface" class="row mb-2"></div>`)
        $("#watchface").append(`<li class="list-group-item bg-info text-light font-weight-bold" style="width: 100%">Time Remaining</li>`)
        $("#watchface").append(`<li class="list-group-item text-center" style="width: 100%" id='timeRemaining'></li>`)
        $("#watchface").append(`<li class="list-group-item" style="width: 100%"><div class="progress"><div id='progressBar' class="progress-bar bg-danger" role="progressbar" style="width: 95%"></div></div></li>`)

        //The info panel
        $("#watchAndInfo").append(`<div id="infoPanel" class="row"></div>`)
        $("#infoPanel").append(`<li class="list-group-item bg-info text-light font-weight-bold" style="width: 100%">Progress</li>`)
        $("#infoPanel").append(`<li class="list-group-item" style="width: 100%" id='correctCount'></li>`)
        $("#infoPanel").append(`<li class="list-group-item" style="width: 100%" id='incorrectCount'></li>`)
        $("#infoPanel").append(`<li class="list-group-item" style="width: 100%" id='currentQuestion'></li>`)

        game.shuffleQuestions()
        scoreboard.update()
        stopwatch.reset()
        askQuestion(trivia[shuffledQuestions[activeDisplayIndex]])
    },

    //Define how to remove the question from the DOM
    clearQuestion: function () {
        $("#main").empty()
    },

    //What happens when the correct answer is guessed
    clearQuestion_CorrectAnswer: function () {
        $('#main').children().fadeOut(300, function () {
            $('#main').empty();
            $("#main").append(`<div id="resultText" class="text-center">That's correct!</div>`)
            $("#main").append(`<div id="resultImage"><i class="fas fa-check-circle fa-10x"></i></div>`)
        });
    },

    //What happens when th wrong answer is guessed
    clearQuestion_WrongAnswer: function () {
        $('#main').children().fadeOut(300, function () {
            $('#main').empty();
            $("#main").append(`<div id="resultText" class="text-center">No! The correct answer is "${trivia[shuffledQuestions[activeDisplayIndex]].answer}".</div>`)
            $("#main").append(`<div id="resultImage"><i class="fas fa-times-circle fa-10x"></i></div>`)
        });
    },

    //What happens when time runs out
    clearQuestion_TimeUp: function () {
        $('#main').children().fadeOut(300, function () {
            $('#main').empty();
            $("#main").append(`<div id="resultText" class="text-center">You ran out of time! The correct answer is "${trivia[shuffledQuestions[activeDisplayIndex]].answer}".</div>`)
            $("#main").append(`<div id="resultImage"><i class="fas fa-stopwatch fa-10x"></i></div>`)
        });
    },

    //Clear the timer set for going to the next question
    interruptTimeout: function () {
        clearTimeout(timeoutUntilNextQuestion)
    },

    //Define how to go to the next question
    goToNextQuestion: function () {
        UI.interruptTimeout();
        UI.clearQuestion();
        activeDisplayIndex += 1;
        if (activeDisplayIndex < trivia.length) {
            stopwatch.reset()
            scoreboard.update()
            askQuestion(trivia[shuffledQuestions[activeDisplayIndex]])
            turn.begin()
        } else {
            scoreboard.showFinalResults()
        }
        turn.acceptingInput = true;
    }
};

//The questions and their answers
trivia = [
    question1 = {
        name: "q1",
        tag: "#q1",
        question: "Which term measures the degree to which a lens is open?",
        answer: "Aperture",
        option1: {
            label: "Bokeh",
            status: false
        },
        option2: {
            label: "Aperture",
            status: true
        },
        option3: {
            label: "ISO",
            status: false
        },
        option4: {
            label: "Depth of Field",
            status: false
        }
    },

    question2 = {
        name: "q2",
        tag: "#q2",
        question: "Which term references the background blur in a photo?",
        answer: "Bokeh",
        option1: {
            label: "Portrait",
            status: false
        },
        option2: {
            label: "Aperture",
            status: false
        },
        option3: {
            label: "Bokeh",
            status: true
        },
        option4: {
            label: "Focal Length",
            status: false
        }
    },

    question3 = {
        name: "q3",
        tag: "#q3",
        question: "The speed at which a camera takes a photo is…",
        answer: "Shutter Speed",
        option1: {
            label: "HDR",
            status: false
        },
        option2: {
            label: "Aperture",
            status: false
        },
        option3: {
            label: "ISO",
            status: false
        },
        option4: {
            label: "Shutter Speed",
            status: true
        }
    },

    question4 = {
        name: "q4",
        tag: "#q4",
        question: "A HDR (High Dynamic Range) photo is a photo…",
        answer: "Created by combing multiple photos with varying exposures together",
        option1: {
            label: "Whose subject is affected by a wide range of lighting.",
            status: false
        },
        option2: {
            label: "Created by combing multiple photos with varying exposures together.",
            status: true
        },
        option3: {
            label: "With at least one million unique colors.",
            status: false
        },
        option4: {
            label: "Portraying a landscape.",
            status: false
        }
    },

    question5 = {
        name: "q5",
        tag: "#q5",
        question: "In photography, a RAW photo can be best described as…",
        answer: "A photo saved in the camera’s native file format",
        option1: {
            label: "A photo that has not been edited.",
            status: false
        },
        option2: {
            label: "A photo that is of poor quality.",
            status: false
        },
        option3: {
            label: "A photo saved in the camera’s native file format.",
            status: true
        },
        option4: {
            label: "A photo taken on a professional grade camera.",
            status: false
        }
    },

    question6 = {
        name: "q6",
        tag: "#q6",
        question: "ISO is a measurement of…",
        answer: "The degree to which a camera is sensitive to light",
        option1: {
            label: "The amount of grain in a photo.",
            status: false
        },
        option2: {
            label: "The degree to which a camera is sensitive to light.",
            status: true
        },
        option3: {
            label: "The speed at which a camera can take a photo.",
            status: false
        },
        option4: {
            label: "The image quality of which a camera is capable.",
            status: false
        }
    },

    question7 = {
        name: "q7",
        tag: "#q7",
        question: "Changing the ISO setting on a camera will impact…",
        answer: "All of the above",
        option1: {
            label: "How grainy a photo appears.",
            status: false
        },
        option2: {
            label: "How quickly the camera is able to take a picture.",
            status: false
        },
        option3: {
            label: "A camera’s ability to photograph in low light situations.",
            status: false
        },
        option4: {
            label: "All of the above.",
            status: true
        }
    },

    question8 = {
        name: "q8",
        tag: "#q8",
        question: "Which of the following describes the grain that appears in a photo?",
        answer: "Noise",
        option1: {
            label: "Noise",
            status: true,
        },
        option2: {
            label: "Bokeh",
            status: false,
        },
        option3: {
            label: "Exposure",
            status: false,
        },
        option4: {
            label: "Aperture",
            status: false
        }
    },

    question9 = {
        name: "q9",
        tag: "#q9",
        question: "Between what two colors can white balance be adjusted?",
        answer: "Blue and yellow",
        option1: {
            label: "Red and green",
            status: false
        },
        option2: {
            label: "Red and blue",
            status: false
        },
        option3: {
            label: "Blue and yellow",
            status: true
        },
        option4: {
            label: "Red and yellow",
            status: false
        }
    },

    question10 = {
        name: "q10",
        tag: "#q10",
        question: "Which term best describes the perceived distance between a subject and the background and a photo?",
        answer: "Depth of field",
        option1: {
            label: "Depth of field",
            status: true
        },
        option2: {
            label: "White balance",
            status: false
        },
        option3: {
            label: "Focal length",
            status: false
        },
        option4: {
            label: "Zoom",
            status: false
        },
    }
];

//############# GLOBAL FUNCTIONS #################################################################   

//Render the question and available answers
function askQuestion(item) {
    $("#main").append(`<div id=${item.name} class="container"></div>`)
    $(`${item.tag}`).append(`<strong>${item.question}</strong><br/><br/>`)
    $(`${item.tag}`).append(`<button class="triviaOption rounded btn-outline-info mt-2 mb-2 card-body" value=${item.option1.status}>${item.option1.label}</button><br/>`)
    $(`${item.tag}`).append(`<button class="triviaOption rounded btn-outline-info mt-2 mb-2 card-body" value=${item.option2.status}>${item.option2.label}</button><br/>`)
    $(`${item.tag}`).append(`<button class="triviaOption rounded btn-outline-info mt-2 mb-2 card-body" value=${item.option3.status}>${item.option3.label}</button><br/>`)
    $(`${item.tag}`).append(`<button class="triviaOption rounded btn-outline-info mt-2 mb-2 card-body" value=${item.option4.status}>${item.option4.label}</button><br/>`)
};

//Define the passage of time and what to do when it runs out
function makeTimePass() {
    timeLeft -= 1
    stopwatch.updateView()
    if (timeLeft === 0) {
        player.outOfTime()
    }
}

//############# EVENT LISTENERS #################################################################    

//Listen for click on a triviaOption element
$(document).on("click", ".triviaOption", function () {

    //As long as input is being accepted...
    if (turn.acceptingInput) {

        //Grab the value of the user's selection
        let selection = $(this).val();

        //Reward or punish the player
        if (selection === 'true') {
            player.reward()
        } else {
            player.providedWrongAnswer()
        };

    }
});

//Listen for restart button
$(document).on("click", "#restartButton", function () {
    game.restart()
});

//############# RUN PROGRAM #################################################################   

UI.renderNewTestSession();
console.log(shuffledQuestions)

