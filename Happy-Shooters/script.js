let audio = new Audio('explosion.mp3');
        const starteasy = document.getElementById('start-easy');
        const startnormal = document.getElementById('start-normal');
        const starthard = document.getElementById('start-hard');
        let startscreen = document.getElementById('startscreen');
        let bgstartscreen = document.getElementById('background-startscreen');
        let raket = document.getElementById('raket');
        let countdown = document.getElementById('countdown');
        let startedgame = false;
        let infoboard = document.getElementById('infoboard');
        let timeout = false;
        let score = document.getElementById('score');
        let highscore = document.getElementById('highscore');
        let timegame = 60;
        let time = document.getElementById('time').innerHTML = timegame;
        let scorestartscreen = document.getElementById('scorestartscreen');
        let easy = false;
        let normal = false;
        let hard = false;
        let repeatRocket = 1200;
        let BGsound = new Audio('background.mp3');
        BGsound.loop = true;
        if (localStorage.getItem('highscore') === null) {
            localStorage.setItem('highscore', 0);
        }
        highscore.innerHTML = localStorage.getItem('highscore')

        // starting game
        starteasy.addEventListener('click', () => {
            easy = true
            score.innerHTML = 0;
            startscreen.style.visibility = 'hidden';
            bgstartscreen.style.visibility = 'hidden';
            startcountdown();
            speed = 4
            BGsound.play();
        });

        startnormal.addEventListener('click', () => {
            normal = true
            score.innerHTML = 0;
            startscreen.style.visibility = 'hidden';
            bgstartscreen.style.visibility = 'hidden';
            startcountdown();
            speed = 3
            BGsound.play();

        });

        starthard.addEventListener('click', () => {
            hard = true
            score.innerHTML = 0;
            startscreen.style.visibility = 'hidden';
            bgstartscreen.style.visibility = 'hidden';
            startcountdown();
            speed = 2
            BGsound.play();
        });

        // counting down for game to start
        function startcountdown() {
            countdown.style.visibility = 'visible';
            infoboard.style.visibility = 'visible';
            let i = 3;
            countdown.innerHTML = i; // Initialize countdown display
            const interval = setInterval(() => {
                if (i === 0) {
                    clearInterval(interval);
                    countdown.style.visibility = 'hidden';
                    startedgame = true;
                    starttimer();
                    startmoveRocket();
                } else {
                    i--;
                    countdown.innerHTML = i;
                }
            }, 1000);
        }

        // clicking causes explosion on mouse position

        document.addEventListener('click', (e) => {
            if (startedgame === true) {
                if (timeout === false) {
                    timeout = true;
                    let explosion = document.createElement('div');
                    explosion.style.position = 'absolute';
                    let size = Math.floor(Math.random() * 70) + 100;
                    explosion.style.width = size + 'px';
                    explosion.style.height = size + 'px';
                    explosion.style.zIndex = '1';
                    explosion.style.backgroundImage = 'url(https://png.pngtree.com/png-clipart/20230824/ourmid/pngtree-cartoon-bomb-gunpowder-explosion-flame-burning-decorative-pattern-png-image_9183772.png)';
                    explosion.style.backgroundSize = 'cover';
                    explosion.style.left = (e.clientX - 50) + 'px';
                    explosion.style.top = (e.clientY - 50) + 'px';
                    audio.currentTime = 0;
                    audio.play();
                    document.body.appendChild(explosion);

                    setTimeout(() => {
                        explosion.remove();
                    }, 1000);

                    setTimeout(() => {
                        timeout = false;
                    }, 700);
                }
            }
        });

        // timer and score and ending game
        function starttimer() {
            let timer = document.getElementById('time');
            let currenttime = parseInt(timer.innerHTML);
            const interval = setInterval(() => {
                if (currenttime === 0) {
                    clearInterval(interval);
                    startedgame = false;
                    infoboard.style.visibility = 'hidden';
                    startscreen.style.visibility = 'visible';
                    bgstartscreen.style.visibility = 'visible';
                    BGsound.pause();
                    BGsound.currentTime = 0;
                    timer.innerHTML = timegame;
                    startmoveRocket();
                    if (parseInt(score.innerHTML) > parseInt(highscore.innerHTML)) {
                        highscore.innerHTML = parseInt(score.innerHTML);
                        localStorage.setItem('highscore', highscore.innerHTML);
                    }
                    scorestartscreen.innerHTML = parseInt(score.innerHTML);
                    easy = false;
                    normal = false;
                    hard = false;
                } else {
                    currenttime--;
                    timer.innerHTML = currenttime;
                }
            }, 1000);
        };

        //rocket moving system
        function startmoveRocket() {
            let interval2 = setInterval(() => {
                if (startedgame === true) {
                    let position = Math.floor(Math.random() * (window.innerWidth - 100));
                    const clonedraket = raket.cloneNode(true);
                    clonedraket.addEventListener('click', () => {
                    if (timeout === false) {
                    clonedraket.remove();
                    score.innerHTML = parseInt(score.innerHTML) + 1;
                    };
                    });
                    clonedraket.style.left = position + 'px';
                    clonedraket.style.top = '95vh';
                    clonedraket.style.cursor = 'pointer';
                    clonedraket.style.zIndex = '2';
                    clonedraket.style.userSelect = 'none';
                    document.body.appendChild(clonedraket);
                    clonedraket.style.animation = 'raket' + ' ' + speed + 's' + ' ' + 'linear';
                    clonedraket.addEventListener('animationend', () => {
                        clonedraket.remove();
                        if (parseInt(score.innerHTML) > 0) {
                        score.innerHTML = parseInt(score.innerHTML) - 1;
                        }
                    });

                        
                } else {
                    clearInterval(interval2);
                }
            }, 1000);
        }