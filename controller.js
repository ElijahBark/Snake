let view, game;

function Controller() {
    this.step = (function() {


            if (game.apple.x === game.snake.head.x && game.apple.y === game.snake.head.y) {
                game.snake.growUp();
                game.changeScore();
                game.changeBestScore();
                view.drawScore(game.score);
                view.drawBestScore(game.bestScore);
                game.snake.changeOldDirection();
                View.drawCell(game.snake.head);
                game.apple = Apple.create(game.fieldSize, game.snake, game.field);
                View.drawApple(game.apple);
            } else {
                game.snake.growUp();
                if (game.snake.isAlive) {
                    View.cleanCell(game.snake.tail);
                    game.snake.cutOldTail();
                    game.snake.changeOldDirection();
                    View.drawCell(game.snake.head);
                } else {
                    View.gameover();
                    console.log('fin')
                    return;
                }

            }

            setTimeout(this.step, 400 - game.snake.positionOnField.length*15);

    }).bind(this);

    this.beginNewGame = function(fieldSize = 8) {
        view = new View();
        game = new Game(fieldSize);
        view.cleanField();
        view.drawScore(game.score);
        view.drawBestScore(game.bestScore);
        View.drawNewField(game.fieldSize);
        View.drawSnake(game.snake.positionOnField);
        View.drawApple(game.apple);

        setTimeout(this.step, 400);
    };

    this.revertSnake = function (keyname) {
        game.snake.changeDirection(keyname);
    }
}

let controller = new Controller();
controller.beginNewGame();



