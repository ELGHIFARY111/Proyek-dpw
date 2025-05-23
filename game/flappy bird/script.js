const bird = document.getElementById('bird');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart');
let birdBottom = 300;
let gravity = 2;
let isGameOver = false;
let score = 0;
let gameLoop;

function jump() {
    if (birdBottom < 600) {
        birdBottom += 50;
        bird.style.bottom = birdBottom + 'px';
    }
    if (birdBottom >= 600) {
        endGame();
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
    let gap = 150;
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
        let bottomPipeRight = parseInt(bottomPipe.style.right);
        let pipeLeft = 400 - bottomPipeRight;
        let pipeWidth = 50;
        let birdLeft = 60;

        if (
            pipeLeft < birdLeft + 30 &&
            pipeLeft + pipeWidth > birdLeft && 
            (
                birdBottom < bottomPipeHeight || 
                birdBottom > bottomPipeHeight + gap
            )
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
    alert('Game Over! Your score: ' + score);
    isGameOver = true;
    clearInterval(gameLoop);
    restartButton.style.display = 'block'; 
}
function restartGame() {
    birdBottom = 300;
    gravity = 2;
    isGameOver = false;
    score = 0;
    scoreDisplay.innerText = score;
    bird.style.bottom = birdBottom + 'px';
    restartButton.style.display = 'none';
    const pipes = document.querySelectorAll('.pipe');
    pipes.forEach(pipe => pipe.remove());

    generatePipe();
    gameLoop = setInterval(() => {
        if (!isGameOver) {
            fall();
        }
    }, 20);
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !isGameOver) {
        jump();
    }
});

restartButton.addEventListener('click', restartGame);

gameLoop = setInterval(() => {
    if (!isGameOver) {
        fall();
    }
}, 20);

generatePipe();