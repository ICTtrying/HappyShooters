let cloud = document.getElementById('cloud');
const playGround = document.getElementById('ContainerFalling');
const character = document.getElementById('character');
character.style.left = '250px';
let speed = 6;
let score = document.getElementById('score');
let wait = false;
let wait2 = false;
let hit = false;
let GameOnline = false;
let CharacterSpeed = 1;
let title = document.getElementById('Title');
const mobileleft = document.getElementById('mobileleft');
const mobileright = document.getElementById('mobileright');

if (window.innerWidth < 500) {
    character.style.left = '50%';
}

document.getElementById('StartButton').addEventListener('click', () => {
    GameOnline = true;
    document.getElementById('StartButton').style.display = 'none';
    document.getElementById('cloudcount').style.visibility = 'visible';
    document.getElementById('HitCount').innerHTML = '0';
    title.style.display = 'none';
    character.style.animation = 'falling 3s linear infinite';
    NewCloud();
    score.style.visibility = 'visible';
    score.innerHTML = '0';
    document.body.style.cursor = 'none';
    document.getElementById('cloudcount').style.visibility = 'visible';
    if (window.innerWidth < 500) {
        movemobile();
    } else {
        move();
    }
    requestAnimationFrame(checkCloudPosition);
    requestAnimationFrame(checkCloudPosition2);
    requestAnimationFrame(checkCollision);
});

function checkCloudPosition() {
    if (cloud.getBoundingClientRect().top < window.innerHeight * 0.05) {
        NewCloud();
        wait2 = false;
    } else {
        requestAnimationFrame(checkCloudPosition);
    }
}

function checkCloudPosition2() {
    if (cloud.getBoundingClientRect().top < window.innerHeight * 0.07) {
        if (!wait) {
            if (!cloud.hit) {
                score.innerHTML = parseInt(score.innerHTML) + 1;
            }
            wait = true;
        }
    } else {
        wait = false;
    }
    requestAnimationFrame(checkCloudPosition2);
}

function NewCloud() {
    if (GameOnline) {
        let randomX = Math.floor(Math.random() * 5);
        let clonedCloud = cloud.cloneNode(true);

        if (randomX === 0) {
            clonedCloud.style.left = '0%';
        } else if (randomX === 1) {
            clonedCloud.style.left = '16%';
        } else if (randomX === 2) {
            clonedCloud.style.left = '30%';
        } else if (randomX === 3) {
            clonedCloud.style.left = '40%';
        } else if (randomX === 4) {
            clonedCloud.style.left = '56%';
        }

        playGround.appendChild(clonedCloud);
        clonedCloud.style.animation = 'CloudMove ' + speed + 's linear';
        clonedCloud.hit = false;
        cloud = clonedCloud;
        requestAnimationFrame(checkCloudPosition);
    }
}

function move() {
    let moveRight = false;
    let moveLeft = false;
    let moving = false;

    setInterval(() => {
        if (speed > 1) {
            speed -= 0.07;
            CharacterSpeed += 0.03;
        }
    }, 1000);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            moveRight = true;
        }
        if (e.key === 'ArrowLeft') {
            moveLeft = true;
        }
        if (!moving) {
            moving = true;
            moveCharacter();
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

    function moveCharacter() {
        if (!GameOnline) {
            moving = false;
            return;
        }
        if (moveRight && parseFloat(character.style.left) < 465) {
            character.style.left = parseFloat(character.style.left) + CharacterSpeed + 'px';
        }
        if (moveLeft && parseFloat(character.style.left) > 35) {
            character.style.left = parseFloat(character.style.left) - CharacterSpeed + 'px';
        }
        if (moveRight || moveLeft) {
            requestAnimationFrame(moveCharacter);
        } else {
            moving = false;
        }
    }
}

function movemobile() {
    let moveRight = false;
    let moveLeft = false;
    let moving = false;

    setInterval(() => {
        if (speed > 1) {
            speed -= 0.07;
            CharacterSpeed += 0.04;
        }
    }, 1000);

    mobileleft.addEventListener('touchstart', () => {
        moveLeft = true;
        if (!moving) {
            moving = true;
            moveCharacter();
        }
    });

    mobileleft.addEventListener('touchend', () => {
        moveLeft = false;
    });

    mobileright.addEventListener('touchstart', () => {
        moveRight = true;
        if (!moving) {
            moving = true;
            moveCharacter();
        }
    });

    mobileright.addEventListener('touchend', () => {
        moveRight = false;
    });

    function moveCharacter() {
        if (!GameOnline) {
            moving = false;
            return;
        }
        if (moveRight && parseFloat(character.style.left) < window.innerWidth - 25) {
            character.style.left = parseFloat(character.style.left) + CharacterSpeed + 'px';
        }
        if (moveLeft && parseFloat(character.style.left) > 25) {
            character.style.left = parseFloat(character.style.left) - CharacterSpeed + 'px';
        }
        if (moveRight || moveLeft) {
            requestAnimationFrame(moveCharacter);
        } else {
            moving = false;
        }
    }
}

function checkCollision() {
    let characterRect = character.getBoundingClientRect();
    let cloudRect = cloud.getBoundingClientRect();
    const HitCloud = document.getElementById('HitCount');
    if (
        characterRect.left < cloudRect.right &&
        characterRect.right > cloudRect.left &&
        characterRect.top < cloudRect.bottom &&
        characterRect.bottom > cloudRect.top - 10
    ) {
        cloud.style.animation = 'CloudMove ' + speed + 's linear, cloudsdisappear 1s forwards';
        cloud.hit = true;
        if (!wait2) {
            HitCloud.innerHTML = parseInt(HitCloud.innerHTML) + 1;
            if (parseInt(HitCloud.innerHTML) === 5) {
                gameOver();
            }
            wait2 = true;
        }
    }
}

setInterval(checkCollision, 100);

function gameOver() {
    wait2 = false;
    GameOnline = false;
    document.getElementById('StartButton').style.display = 'block';
    score.style.visibility = 'hidden';
    document.body.style.cursor = 'default';
    character.style.animation = 'none';
    character.style.left = '50%';
    document.getElementById('cloudcount').style.visibility = 'hidden';
    speed = 6;
    CharacterSpeed = 1;
    title.style.display = 'block';
}
