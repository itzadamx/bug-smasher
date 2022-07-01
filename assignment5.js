/*Assignment 5
 student number - 301151527 */


var gameCanvas = document.createElement("canvas");
var ctx = gameCanvas.getContext("2d");
gameCanvas.height = 580;
gameCanvas.width = 740;
document.getElementById("theCanvas").appendChild(gameCanvas);

var bgReady = false;
var bugImage = new Image();
bugImage.onload = function () {
    bgReady = true;
};
bugImage.src = "images/bug.png";


var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.png";


var bug = {
    speed: 256
};

var hopingInterval = 1500;
var totalScore = 0;

var bugHop = setInterval(function () {
    reset();
}, hopingInterval);


gameCanvas.addEventListener("mousedown", clicked, false);
function clicked(event) {
    event.preventDefault();
    var yaxis = event.clientY;
    var xaxis = event.clientX;

    if (yaxis > bug.y && yaxis < bug.y + 169 && xaxis < bug.x + 61 && xaxis > bug.x) {
        totalScore += 10;
        reset();
        if (hopingInterval - 100 >= 50) {
            clearInterval(bugHop);
            hopingInterval -= 100;
            bugHop = setInterval(function () {
                reset();
            }, hopingInterval);

        }
    }
}

var reset = function () {
    bug.x = 32 + (Math.random() * (gameCanvas.width - 64));
    bug.y = 32 + (Math.random() * (gameCanvas.height - 64));
};


var resetSpeed = function () {
    clearInterval(bugHop);
    hopingInterval = 2000;
    bugHop = setInterval(function () {
        reset();
    }, hopingInterval);
};
var scoreReset = function () {
    totalScore = 0;
    resetSpeed();
};


var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (bgReady) {
        ctx.drawImage(bugImage, bug.x, bug.y);
    }

    document.getElementById("totalScore").innerHTML = "Total Score : " + totalScore;
    ctx.fillStyle = "rgb(0, 0, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
};

var main = function () {
    render();
    requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

main();
