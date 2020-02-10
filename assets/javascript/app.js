window.onload = function () {
    $("#start").on("click", start);

    // an array of questions, answer, and correct answer
    const myQuestion = [
        {
            question: "What name was Voldemort born with?",
            answers: [
                "James Potter",
                "Cedric Diggory",
                "Tom Riddle",
                "Mad Eye Moody"
            ],
            correctAnswer: "2"
        },
        {
            question: "Who did the British Ministry of Magic formerly employ to guard Azkaban prison?",
            answers: [
                "Mandrakes",
                "Hippogriffs",
                "Centaurs",
                "Dementors"
            ],
            correctAnswer: "3"
        },

        {
            question: "What is the name of the Wizarding Newspaper based in London?",
            answers: [
                "The Daily News",
                "The Prophecy",
                "The London Daily",
                "The Daily Prophet"
            ],
            correctAnswer: "3"
        },

        {
            question: "How old must a wizard be to enter the Triwizard Tournament",
            answers: [
                "16",
                "17",
                "15",
                "13"
            ],
            correctAnswer: "1"
        },

        {
            question: "What do you call a person who can magically speak to serpents?",
            answers: [
                "Slytherin",
                "Snake Charmer",
                "Parselmouth",
                "Parseltongue"
            ],
            correctAnswer: "2"
        },

    ];

    var counter = 0;
    var intervalId;
    var clockRunning = false;
    var time = 10;
    var wins = 0;
    var loss = 0;

    // 
    function start() {

        // DONE: Use setInterval to start the count here and set the clock to running.
        if (!clockRunning) {
            $("#display").text("00:10");
            intervalId = setInterval(count, 1000);
            clockRunning = true;
            displayQA();    
            $("#welcome").remove();
            
        }   
    }

    function displayQA() {
        if (counter > 4) {
            if(wins>loss){
                console.log("you win!");
                clearInterval(intervalId);
                $('#mainDiv').empty();
                $('#mainDiv').css('background-image', 'url(assets/images/happy.jpg)');
                $("#mainDiv").append("<p id='score'>You WIN!</p>");
                return;
            } else {
                console.log("you lose!");
                clearInterval(intervalId);
                $('#mainDiv').empty();
                $('#mainDiv').css('background-image', 'url(assets/images/bad.jpg)');
                $("#mainDiv").append("<p id='score'>Try Again Later...</p>");
                return;
            }
        }
        
        $("#question").text(myQuestion[counter].question);
        currentAns = myQuestion[counter].correctAnswer;
        for (var i = 0; i < myQuestion.length; i++) {
            for (var i = 0; i < 4; i++) {
                $("#question").append("<br><button class='btn answer amber lighten-4 black-text' value='" + [i] + "'>" + myQuestion[counter].answers[i] + "</button>");
            }
        }

        $(".answer").on("click", function () {
            answer = $(this).val();

            if (answer == currentAns) {
                $("#display").text("Correct!");
                clearInterval(intervalId);
                clockRunning = false;
                counter++;
                time = 10;
                wins++;
                let timeoutID = setTimeout(start, 1000);

            } else if (answer != currentAns) {
                var answerNum = (myQuestion[counter].correctAnswer);
                var displayAnswer = (myQuestion[counter].answers[answerNum]);
                $("#question").empty();
                $("#question").append(displayAnswer + "! Try Again!");
                $("#display").text("Wrong!");
                clearInterval(intervalId);
                clockRunning = false;
                counter++;
                time = 10;
                loss++;
                let timeoutID = setTimeout(start, 2000);
            }
        });

    };

    function count() {

        //decrement time by 1
        time--;

        // saving time after each decrement into variable
        var converted = timeConverter(time);

        // showing time in #display div
        $("#display").text(converted);

        if (time == 0) {
            clearInterval(intervalId);
            clockRunning = false;
            counter++;
            time = 11;
            let timeoutID = setTimeout(start, 1000);
            if (counter == 5) {
                clockRunning = true;
            }
        }
    }

    function timeConverter(t) {

        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }
        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    }

};