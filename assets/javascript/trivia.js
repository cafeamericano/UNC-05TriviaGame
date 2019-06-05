//############# OBJECTS (QUESTIONS) ############# 

trivia = [
    question1 = {
        name: "q1",
        tag: "#q1",
        question: "Which term measures the degree to which a lens is open?",
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
        },
        question: "Changing the ISO setting on a camera will impact…",
    },

    question8 = {
        name: "q8",
        tag: "#q8",
        question: "Which of the following describes the grain that appears in a photo?",
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

//############# SHARED FUNCTIONS ############# 

function askQuestion(item) {
    $("#main").append(`<div class="border border-info m-3 p-3" id=${item.name}></div>`)
    $(`${item.tag}`).append(`<strong>${item.question}</strong>`)
    $(`${item.tag}`).append(`<br/>`)
    $(`${item.tag}`).append(`<button class="triviaOption btn btn-info m-3" value=${item.option1.status}>${item.option1.label + ' ' + item.option1.status}</button>`)
    $(`${item.tag}`).append(`<button class="triviaOption btn btn-info m-3" value=${item.option2.status}>${item.option2.label + ' ' + item.option2.status}</button>`)
    $(`${item.tag}`).append(`<button class="triviaOption btn btn-info m-3" value=${item.option3.status}>${item.option3.label + ' ' + item.option3.status}</button>`)
    $(`${item.tag}`).append(`<button class="triviaOption btn btn-info m-3" value=${item.option4.status}>${item.option4.label + ' ' + item.option4.status}</button>`)
}

for (i = 0; i < trivia.length; i++) {
    askQuestion(trivia[i])
};

$(".triviaOption").on("click", function () {
    alert($(this).val())
});

// $(".triviaOption").on("click", function () {
//     $(this).css({ color: 'red' })
// });