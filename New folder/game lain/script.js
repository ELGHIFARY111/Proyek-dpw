let board;
let boardWidth = 1185;
let boardHeight = 550;
let context;
let birdWidth = 41;
let birdHeight = 36;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;


window.onload = function () {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    requestAnimationFrame(update);
    setInterval(placePipes, 1500);
    document.addEventListener("keydown", moveBird);
};


function update() {
    requestAnimationFrame(update);
    if (gameOver) return;
    context.clearRect(0, 0, board.width, board.height);
    // score
    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.fillText(score, 5, 45);

    if (gameOver) {
        context.fillText("GAME OVER", 5, 90);
    }
}