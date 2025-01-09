let cloud = document.getElementById('cloud');
const playGround = document.getElementById('ContainerFalling');
const character = document.getElementById('character');
character.style.left = '50%';	
let speed = 6;
let score = document.getElementById('score');
let wait = false;
let wait2 = false;
let hit = false;
let GameOnline = false;
let CharacterSpeed = 1;
let title = document.getElementById('Title');

// stukje van copilot geleerd
function adjustForMobile() {
    if (window.innerWidth <= 500) {
        CharacterSpeed = 0.7;
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            document.documentElement.msRequestFullscreen();
        }
    }
}

adjustForMobile();

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
    move();
    requestAnimationFrame(checkCloudPosition);
    requestAnimationFrame(checkCloudPosition2);
    requestAnimationFrame(checkCollision);
});

function checkCloudPosition() {
    //stukje heb ik van ChatGPT
    if (cloud.getBoundingClientRect().top < window.innerHeight * 0.05) {
        NewCloud();
        wait2 = false;
    } else {
        requestAnimationFrame(checkCloudPosition);
    }
}

function checkCloudPosition2() {
    if (cloud.getBoundingClientRect().top < window.innerHeight * 0.07) {
        if (wait === false) {
            if (cloud.hit === false) {
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
    if (GameOnline === true) {
        let randomX = Math.floor(Math.random() * 5);
        let clonedCloud = cloud.cloneNode(true);

        if (randomX === 0) {
            console.log('0')
            clonedCloud.style.left = '0%';
            playGround.appendChild(clonedCloud);
            clonedCloud.hit = false; // Add hit property to the cloned cloud
            clonedCloud.style.animation = 'CloudMove' + ' ' + speed + 's' + ' ' + 'linear';
        }
        if (randomX === 1) {
            console.log('1')
            clonedCloud.style.left = '16%';
            playGround.appendChild(clonedCloud);
            clonedCloud.hit = false; // Add hit property to the cloned cloud
            clonedCloud.style.animation = 'CloudMove' + ' ' + speed + 's' + ' ' + 'linear';
        }
        if (randomX === 2) {
            console.log('2')
            clonedCloud.style.left = '30%';
            playGround.appendChild(clonedCloud);
            clonedCloud.hit = false; // Add hit property to the cloned cloud
            clonedCloud.style.animation = 'CloudMove' + ' ' + speed + 's' + ' ' + 'linear';
        }
        if (randomX === 3) {
            console.log('3')
            clonedCloud.style.left = '40%';
            playGround.appendChild(clonedCloud);
            clonedCloud.hit = false; // Add hit property to the cloned cloud
            clonedCloud.style.animation = 'CloudMove' + ' ' + speed + 's' + ' ' + 'linear';
        }
        if (randomX === 4) {
            console.log('4')
            clonedCloud.style.left = '56%';
            playGround.appendChild(clonedCloud);
            clonedCloud.hit = false; // Add hit property to the cloned cloud
            clonedCloud.style.animation = 'CloudMove' + ' ' + speed + 's' + ' ' + 'linear';
        }
        cloud = clonedCloud;
        requestAnimationFrame(checkCloudPosition);
    }
}


//movement system
function move() {
    if (GameOnline === true) {
        let moveRight = false;
        let moveLeft = false;
        let moving = false;

        setInterval(() => {
            if (speed > 1) {
                speed -= 0.07; // Increase the speed by decreasing the interval time
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
            if (GameOnline === false) {
                moving = false;
                return;
            }
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
    }
} 

function checkCollision() {
    let characterRect = character.getBoundingClientRect();
    let cloudRect = cloud.getBoundingClientRect();
    const HitCloud = document.getElementById('HitCount');
    if (characterRect.left < cloudRect.right &&
        characterRect.right > cloudRect.left &&
        characterRect.top < cloudRect.bottom &&
        characterRect.bottom > (cloudRect.top - 10)) {
        // Add 'disappear' animation without removing the existing 'CloudMove'
        cloud.style.animation = 'CloudMove ' + speed + 's linear, cloudsdisappear 1s forwards';
        cloud.hit = true;
        if (wait2 === false) {
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
    character.style.left = '250px';
    document.getElementById('cloudcount').style.visibility = 'hidden';
    speed = 6;
    CharacterSpeed = 1;
    move();
    title.style.display = 'block';
};
