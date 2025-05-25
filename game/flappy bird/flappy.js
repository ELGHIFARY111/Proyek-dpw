const bird = document.getElementById('bird');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('restart');

const no1 = document.getElementsByClassName("1")[0];
const no2 = document.getElementsByClassName("2")[0];
const no3 = document.getElementsByClassName("3")[0];

let birdBottom = 300;
let gravity = 2;
let isGameOver = true;
let score = 0;
let gameLoop;
let playerName = "Player";
let scoreList = [];


startButton.textContent = "Start";
startButton.style.display = "block";

function jump() {
    if (birdBottom < 600 && !isGameOver) {
        birdBottom += 50;
        bird.style.bottom = birdBottom + 'px';
    }
}

function fall() {
    birdBottom -= gravity;
    if (birdBottom < 0) {
        birdBottom = 0;
        endGame();
    }
    bird.style.bottom = birdBottom + 'px';
}

function generatePipe() {
    let gap = 175;
    let randomHeight = Math.random() * 200 + 100;
    let bottomPipeHeight = randomHeight;
    let topPipeHeight = 600 - bottomPipeHeight - gap;

    const bottomPipe = document.createElement('div');
    bottomPipe.classList.add('pipe');
    bottomPipe.style.height = bottomPipeHeight + 'px';
    bottomPipe.style.right = '0px';
    bottomPipe.style.bottom = '0px';
    bottomPipe.style.position = 'absolute';

    const topPipe = document.createElement('div');
    topPipe.classList.add('pipe');
    topPipe.style.height = topPipeHeight + 'px';
    topPipe.style.right = '0px';
    topPipe.style.top = '0px';
    topPipe.style.position = 'absolute';

    document.querySelector('.game-container').appendChild(bottomPipe);
    document.querySelector('.game-container').appendChild(topPipe);

    const pipeInterval = setInterval(() => {
        if (isGameOver) {
        clearInterval(pipeInterval);
        bottomPipe.remove();
        topPipe.remove();
        return;
        }

        let bottomPipeRight = parseInt(bottomPipe.style.right);
        let pipeLeft = 400 - bottomPipeRight;
        let pipeWidth = 50;
        let birdLeft = 60;

        if (
        pipeLeft < birdLeft + 30 &&
        pipeLeft + pipeWidth > birdLeft &&
        (birdBottom < bottomPipeHeight || birdBottom > bottomPipeHeight + gap)
        ) {
        clearInterval(pipeInterval);
        endGame();
        }

        if (bottomPipeRight > 450) {
        clearInterval(pipeInterval);
        score++;
        scoreDisplay.innerText = score;
        bottomPipe.remove();
        topPipe.remove();
        generatePipe();
        } else {
        bottomPipe.style.right = (bottomPipeRight + 5) + 'px';
        topPipe.style.right = (parseInt(topPipe.style.right) + 5) + 'px';
        }
    }, 20);
}

function endGame() {
    isGameOver = true;
    clearInterval(gameLoop);
    alert("Game Over! Skor kamu: " + score);

    scoreList.push({ nama: playerName, skor: score });
    updateLeaderboard();

    startButton.textContent = "Start Lagi";
    startButton.style.display = "block";
}

function startGame() {
    playerName = prompt("Masukkan nama Anda:") || "Player";
    birdBottom = 300;
    score = 0;
    isGameOver = false;

    bird.style.bottom = birdBottom + 'px';
    scoreDisplay.innerText = score;
    const pipes = document.querySelectorAll('.pipe');
    pipes.forEach(pipe => pipe.remove());
    generatePipe();
    gameLoop = setInterval(() => {
        if (!isGameOver) fall();
    }, 20);

    startButton.style.display = "none";
}

function updateLeaderboard() {
    let sorted = scoreList.sort((a, b) => b.skor - a.skor);
    no1.innerText = sorted[0] ? `1. ${sorted[0].nama}: ${sorted[0].skor}` : "";
    no2.innerText = sorted[1] ? `2. ${sorted[1].nama}: ${sorted[1].skor}` : "";
    no3.innerText = sorted[2] ? `3. ${sorted[2].nama}: ${sorted[2].skor}` : "";
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') jump();
});
startButton.addEventListener('click', startGame);
updateLeaderboard();
