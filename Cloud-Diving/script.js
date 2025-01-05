let cloud = document.getElementById('cloud');
const playGround = document.getElementById('ContainerFalling');
const character = document.getElementById('character');
character.style.left = '250px';
let speed = 6;
let Gamestarted = false;

document.getElementById('StartButton').addEventListener('click', () => {
    document.getElementById('StartButton').style.display = 'none';
    character.style.animation = 'falling 3s linear infinite';
    cloud.style.animation = 'CloudMoveFirstTime 7s linear';
    document.body.style.cursor = 'none';
    Gamestarted = true;
    // dit roept de functie aan die checkt of de cloud boven de 0px is, maar ik weet niet waar die de functie aanroept.
    requestAnimationFrame(checkCloudPosition);
});

// deze functie is gemaakt door chatGPT. Ik weet niet hoe, maar het werkt.
function checkCloudPosition() {
    if (cloud.getBoundingClientRect().top < window.innerHeight * 0.05) {
        NewCloud();
    } else {
        requestAnimationFrame(checkCloudPosition);
    }
}

function NewCloud() {
    let randomX = Math.floor(Math.random() * 5);
    let clonedCloud = cloud.cloneNode(true);

    if (randomX === 0) {
        console.log('0')
        clonedCloud.style.left = '-2%';
        playGround.appendChild(clonedCloud);
        clonedCloud.style.animation = 'CloudMove' + ' ' + speed + 's' + ' ' + 'linear';
    }
    if (randomX === 1) {
        console.log('1')
        clonedCloud.style.left = '15%';
        playGround.appendChild(clonedCloud);
        clonedCloud.style.animation = 'CloudMove' + ' ' + speed + 's' + ' ' + 'linear';
    }
    if (randomX === 2) {
        console.log('2')
        clonedCloud.style.left = '30%';
        playGround.appendChild(clonedCloud);
        clonedCloud.style.animation = 'CloudMove' + ' ' + speed + 's' + ' ' + 'linear';
    }
    if (randomX === 3) {
        console.log('3')
        clonedCloud.style.left = '40%';
        playGround.appendChild(clonedCloud);
        clonedCloud.style.animation = 'CloudMove' + ' ' + speed + 's' + ' ' + 'linear';
    }
    if (randomX === 4) {
        console.log('4')
        clonedCloud.style.left = '56%';
        playGround.appendChild(clonedCloud);
        clonedCloud.style.animation = 'CloudMove' + ' ' + speed + 's' + ' ' + 'linear';
    }
    cloud = clonedCloud;
    requestAnimationFrame(checkCloudPosition);
}

//increase game speed

setInterval(() => {
    if (Gamestarted) {
        speed -= 0.07; // Increase the speed by decreasing the interval time
        CharacterSpeed += 0.03;
    }
}, 1000);


//movement system
let CharacterSpeed = 1;
let moveRight = false;
let moveLeft = false;
let moving = false;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        moveRight = true;
    }
    if (e.key === 'ArrowLeft') {
        moveLeft = true;
    }
    if (!moving) {
        moving = true;
        move();
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight') {
        moveRight = false;
    }
    if (e.key === 'ArrowLeft') {
        moveLeft = false;
    }
});

function move() {
    if (moveRight && parseInt(character.style.left) < 465) {
        character.style.left = parseFloat(character.style.left) + CharacterSpeed + 'px';
    }
    if (moveLeft && parseInt(character.style.left) > 35) {
        character.style.left = parseFloat(character.style.left) - CharacterSpeed + 'px';
    }
    if (moveRight || moveLeft) {
        requestAnimationFrame(move);
    } else {
        moving = false;
    }
};
