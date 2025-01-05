let cloud = document.getElementById('cloud');
const playGround = document.getElementById('ContainerFalling');
const character = document.getElementById('character');
let speed = 6;
CharacterSpeed = 2;

document.getElementById('StartButton').addEventListener('click', () => {
    document.getElementById('StartButton').style.display = 'none';
    character.style.animation = 'falling 3s linear infinite';
    cloud.style.animation = 'CloudMoveFirstTime 7s linear';
    document.body.style.cursor = 'none';
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
    let randomX = Math.floor(Math.random() * 4);
    let clonedCloud = cloud.cloneNode(true);

    if (randomX === 0) {
        clonedCloud.style.left = '-2%';
        playGround.appendChild(clonedCloud);
        clonedCloud.style.animation = 'CloudMove' + ' ' + speed + 's' + ' ' + 'linear';
    }
    if (randomX === 1) {
        clonedCloud.style.left = '15%';
        playGround.appendChild(clonedCloud);
        clonedCloud.style.animation = 'CloudMove' + ' ' + speed + 's' + ' ' + 'linear';
    }
    if (randomX === 2) {
        clonedCloud.style.left = '30%';
        playGround.appendChild(clonedCloud);
        clonedCloud.style.animation = 'CloudMove' + ' ' + speed + 's' + ' ' + 'linear';
    }
    if (randomX === 3) {
        clonedCloud.style.left = '40%';
        playGround.appendChild(clonedCloud);
        clonedCloud.style.animation = 'CloudMove' + ' ' + speed + 's' + ' ' + 'linear';
    }
    if (randomX === 4) {
        clonedCloud.style.left = '53%';
        playGround.appendChild(clonedCloud);
        clonedCloud.style.animation = 'CloudMove' + ' ' + speed + 's' + ' ' + 'linear';
    }
    cloud = clonedCloud;
    requestAnimationFrame(checkCloudPosition);
}


