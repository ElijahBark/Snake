let game = new Game(15);
let view = new View();

view.document.addEventListener('keydown', function (e) {
    const keyName = e.key;
    revertSnake(keyName);
});


function revertSnake(keyName) {
    game.snake.changeDirection(keyName);
}

View.drawNewField(game.fieldSize);
View.drawSnake(game.snake.positionOnField);

View.drawApple(game.apple);


setTimeout(function step() {
    game.isSnakeAlive();

    if (game.snake.isAlive) {
        View.cleanCell(game.snake.tail);
        game.snake.makeMove();
        View.drawCell(game.snake.head);
        if (game.apple.x === game.snake.head.x && game.apple.y === game.snake.head.y) {
            game.snake.growUp();
            View.drawCell(game.snake.head);
            game.apple = Apple.create(game.fieldSize, game.snake);
            View.drawApple(game.apple);
        }
        setTimeout(step, 400);
    } else {
        console.log('fin')
    }
}, 400);
