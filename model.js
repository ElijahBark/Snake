function Game(fieldSize) {
    this.fieldSize = fieldSize;
    this.field = (function (amount) {
        let field = [];
        for (let i = 0; i < amount; i++) {
            let row = [];
            for (let j = 0; j < amount; j++) {
                row.push(EMPTY);
            }
            field.push(row);
        }
        return field;
    })(fieldSize);
    this.snake = Snake.create(2,this.field);
    this.apple = Apple.create(fieldSize, this.snake, this.field);
    this.score = this.snake.positionOnField.length;
    this.bestScore = localStorage.getItem('bestScore') && localStorage.getItem('bestScore') > this.score ? localStorage.getItem('bestScore'): this.score;
    this.changeBestScore = function () {
        this.bestScore = this.score > this.bestScore? this.score: this.bestScore;
        localStorage.setItem('bestScore', this.bestScore);
    };
    this.changeScore = function () {
        this.score = this.snake.positionOnField.length;
    };
    this.isSnakeEatApple = function () {
        return game.apple.x === game.snake.head.x && game.apple.y === game.snake.head.y;
    }



}


function Cell(x, y, nextCell) {
    this.x = +x;
    this.y = +y;
    this.nextCell = nextCell;
}

function Snake(direction, head, tail, positionOnField, field) {
    this.direction = direction;
    this.oldDirection = direction;
    this.head = head;
    this.tail = tail;
    this.positionOnField = positionOnField;
    this.isAlive = true;
    this.field = field;

    this.changeDirection = function (keyName) {
        if (this.oldDirection !== forbiddenDirections[keyName]) {
            this.direction = directions[keyName]
        }

    };

    this.changeOldDirection = function () {
        this.oldDirection = this.direction;
    }.bind(this);

    this.isItPossibleToMove = function (x,y) {
        if (!this.field[y] || !this.field[y][x] || this.field[y][x] === SNAKE ) {
            this.isAlive = false;
        }
    };

    this.chooseDirection = function () {
        if(chooseDirections[this.direction]) {
            return {
                x : this.head.x + chooseDirections[this.direction][0],
                y : this.head.y + chooseDirections[this.direction][1]
            };
        }
    };

    this.growUp = function () {
        let {x,y} = this.chooseDirection();

        this.isItPossibleToMove(x,y);

        if (this.isAlive) {
            this.positionOnField.push([x,y]);
            this.field[y][x] = SNAKE;
            this.head.nextCell = new Cell(x, y, null);
            this.head = this.head.nextCell;
        }
    };

    this.cutOldTail = function () {
        this.positionOnField.shift();
        this.field[this.tail.y][this.tail.x] = EMPTY;
        this.tail = this.tail.nextCell;
    };


}

function Apple(x, y) {
    this.x = x;
    this.y = y;
}

Snake.create = function (count, field) {
    let tail = new Cell(0, 0, null);
    let positionOnField = [[0, 0]];
    field[0][0] = SNAKE;
    let head = tail;

    for (let i = 0; i < count - 1; i++) {
        head.nextCell = new Cell(i + 1, 0, null);
        field[0][i + 1] = SNAKE;
        head = head.nextCell;
        positionOnField.push([i + 1, 0])
    }



    return new Snake(RIGHT, head, tail, positionOnField, field)
};

Apple.create = function (fieldSize, snake, field) {

    let x = Math.floor(Math.random() * fieldSize);
    let y = Math.floor(Math.random() * fieldSize);
    for (let i = 0; i < snake.positionOnField.length; i++) {
        if (snake.positionOnField[i][0] === x && snake.positionOnField[i][1] === y) {
            return Apple.create(fieldSize, snake,field);
        }
    }
    field[y][x] = APPLE;
    return new Apple(x, y);


};





