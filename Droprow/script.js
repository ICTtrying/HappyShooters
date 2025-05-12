let currentcolor = "blue";
const triangle = document.getElementById("triangle");
const score = document.getElementById("score");
const startButton = document.getElementById("start-button");
const countdownElement = document.getElementById("countdown");
const highscore = document.getElementById("high-score");
highscore.innerHTML = localStorage.getItem("highscore") || 0;
const gameContainer = document.getElementById("game-container");
let animationspeed = 4;

let canclick = false;

startButton.addEventListener("click", function () {
    canclick = true;
    score.innerHTML = 0;

    // Oude rijen verwijderen
    document.querySelectorAll(".row").forEach(r => r.remove());

    changeColor();
    document.getElementById("youlosetext").style.visibility = "hidden";
    document.getElementById("background-dark").style.visibility = "hidden";
    startcountdown();
});

function startcountdown() {
    countdownElement.style.visibility = "visible";
    countdownElement.style.display = "flex";
    countdownElement.style.alignItems = "center";
    countdownElement.style.justifyContent = "center";
    countdownElement.classList.add("countdown-pop");
    countdownElement.style.animation = "pop 0.7s";
    let countdown = 3;
    countdownElement.innerHTML = countdown;
    const countdownInterval = setInterval(() => {
        countdown--;
        countdownElement.innerHTML = countdown;
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            countdownElement.style.display = "none";
            const newRow = document.createElement("div");
            newRow.classList.add("row");
            gameContainer.appendChild(newRow);
            droprow(newRow);
        }
    }, 1000);
}

function droprow(targetRow) {
    targetRow.classList.add("dropdown");
    targetRow.style.animation = `dropdown ${animationspeed}s linear`;
    const deg = Math.random() * 10 - 5;
    targetRow.style.transform = `rotate(${deg}deg)`;
    const randomX = Math.floor(Math.random() * 3 + 1);
    switch (randomX) {
        case 1:
            targetRow.style.backgroundColor = "red";
            targetRow.classList.remove("green", "blue");
            targetRow.classList.add("red");
            break;
        case 2:
            targetRow.style.backgroundColor = "blue";
            targetRow.classList.remove("red", "green");
            targetRow.classList.add("blue");
            break;
        case 3:
            targetRow.style.backgroundColor = "green";
            targetRow.classList.remove("red", "blue");
            targetRow.classList.add("green");
            break;
    }

    targetRow.addEventListener('animationend', function handler() {
        if (targetRow.style.backgroundColor === currentcolor) {
            fasterspeed();
            targetRow.style.animation = "none";
            score.innerHTML = parseInt(score.innerHTML) + 1;
            const newRow = document.createElement("div");
            newRow.classList.add("row");
            gameContainer.appendChild(newRow);
            droprow(newRow);
        } else {
            gameover();
        }
        targetRow.removeEventListener('animationend', handler);
    });
}

function changeColor() {
    if (canclick === true){
        document.addEventListener("click", function () {
            const blueCircle = document.getElementById("blue-circle");
            const redCircle = document.getElementById("red-circle");
            const greenCircle = document.getElementById("green-circle");
            switch (currentcolor) {
                case "red":
                    currentcolor = "blue";
                    triangle.style.fill = "blue";
                    blueCircle.style.border = "4px solid gray";
                    greenCircle.style.border = "0px solid gray";
                    redCircle.style.border = "0px solid gray";
                    break;
                case "blue":
                    currentcolor = "green";
                    triangle.style.fill = "green";
                    blueCircle.style.border = "0px solid gray";
                    greenCircle.style.border = "4px solid gray";
                    redCircle.style.border = "0px solid gray";
                    break;
                case "green":
                    currentcolor = "red";
                    triangle.style.fill = "red";
                    blueCircle.style.border = "0px solid gray";
                    greenCircle.style.border = "0px solid gray";
                    redCircle.style.border = "4px solid gray";
                    break;
            }
        });
    }
}

function fasterspeed() {
    if (animationspeed > 1.4) {
        animationspeed -= 0.1;
        const rows = document.querySelectorAll(".row");
        rows.forEach(row => {
            row.style.animationDuration = `${animationspeed}s`;
        });
    }
}

function gameover() {
    console.log("gameover");
    document.getElementById("youlosetext").style.color = "red";
    document.getElementById("youlosetext").innerHTML = "you lose!";
    const youLoseText = document.getElementById("youlosetext");
    canclick = false;
    document.getElementById("score-homescreen").innerHTML = score.innerHTML;
    if (parseInt(score.innerHTML) > parseInt(highscore.innerHTML)) {
        highscore.innerHTML = score.innerHTML;
        document.getElementById("youlosetext").innerHTML = "new highscore!";
        document.getElementById("youlosetext").style.color = "green";
        localStorage.setItem("highscore", highscore.innerHTML);
    }
    
    
    document.getElementById("youlosetext").style.visibility = "visible";
    youLoseText.style.animation = "none";
    void youLoseText.offsetWidth; // geen flauw idee wat dit doet maar het werkt
    youLoseText.style.animation = "shake 0.7s";
    document.getElementById("background-dark").style.visibility = "visible";
    document.getElementById("title").innerHTML = "try again?";
    const backgroundDark = document.getElementById("background-dark");
    backgroundDark.style.animation = "none";
    void backgroundDark.offsetWidth; // force reflow to reset animation
    backgroundDark.style.animation = "fadeIn 0.7s";
}
