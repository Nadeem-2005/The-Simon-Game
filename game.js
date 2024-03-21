let colors = ["green", "red", "yellow", "blue"];
let generatedPattern = [];
let userClickedPattern = [];
var level = 0;
$(document).keydown(function () {
    if (level === 0) {
        // for the game to start only upon th first key press after an interval of 1.5s
        setTimeout(function () {
            nextPattern();
        }, 1500);

    }
})
function nextPattern() { // function that generates pattern on random upon invoke
    var chosenColorIndex = Math.floor(Math.random() * 4);
    var chosenColor = colors[chosenColorIndex];
    generatedPattern.push(chosenColor);
    buttonAnimation(chosenColor);
    buttonSound(chosenColor);
    level++;
    $("h1").text("Level: " + level);
    userClickedPattern = []; // resets the array whenever fn is called
}
function checkMatch(index) {
    if (generatedPattern[index] == userClickedPattern[index]) {
        if (generatedPattern.toString() === userClickedPattern.toString()) {
            setTimeout(function () {
                nextPattern();
            }, 2500);
        }
    }
    else {
        document.querySelector("body").classList.add("game-over");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        document.querySelector("h1").textContent = "Game over!! Press any key to restart";
        setTimeout(function () {
            gameOver();
        }, 500);

    }
}
function gameOver() {
    level = 0;
    document.querySelector("body").classList.remove("game-over");
    //resets both arrays upon invoke;
    userClickedPattern = [];
    generatedPattern = [];
}

$(".btn").click(function () {
    var activeColor = this.id;
    buttonAnimation(activeColor);
    buttonSound(activeColor);
    userClickedPattern.push(activeColor);
    checkMatch(userClickedPattern.length - 1);
});

function buttonAnimation(key) {
    $("#" + key).addClass("pressed");
    setTimeout(function () {
        $("#" + key).removeClass("pressed");
    }, 500);
}

function buttonSound(key) {
    var audio = new Audio("sounds/" + key + ".mp3");
    audio.play();
}
