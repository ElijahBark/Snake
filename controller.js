let view = new View();
let game;

function Controller() {
    this.changeSpeed = function (minSpeed) {
        return Math.max(400 - game.snake.positionOnField.length*game.fieldSize, minSpeed);
    };

    this.step = (function() {


            if (game.isSnakeEatApple()) {
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
                    console.log('fin');
                    return;
                }

            }
            setTimeout(this.step, this.changeSpeed(150));

    }).bind(this);

    this.beginNewGame = function(fieldSize = 8) {
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



