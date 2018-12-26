function Game(fieldSize) {
    this.fieldSize = fieldSize;
    this.snake = Snake.create(2);
    this.apple = Apple.create(fieldSize, this.snake);
    this.isSnakeAlive = function () {
        if (this.snake.head.x >= this.fieldSize-1
            || this.snake.head.x < 0
            || this.snake.head.y >= this.fieldSize-1
            || this.snake.head.y < 0) {
            this.snake.isAlive = false;
        }
    };

    this.field = (function (amount) {
        let field = [];
        for (let i = 0; i < amount; i++) {
            let row = [];
            for (let j = 0; j < amount; j++) {
                row.push('empty');
            }
            field.push(row);
        }
        return field;
    })(fieldSize);

}


function Cell(x, y, nextCell) {
    this.x = +x;
    this.y = +y;
    this.nextCell = nextCell;
}

function Snake(direction, head, tail, positionOnField) {

    this.direction = direction;
    this.head = head;
    this.tail = tail;
    this.positionOnField = positionOnField;
    this.isAlive = true;
    this.makeMove = function () {
        this.growUp();
        this.positionOnField.shift();
        this.tail = this.tail.nextCell;

    };

    this.changeDirection = function (keyName) {
        switch (true) {
            case keyName === 'ArrowUp' && this.direction !== 'down':
                this.direction = 'up';
                break;

            case keyName === 'ArrowDown' && this.direction !== 'up':
                this.direction = 'down';
                break;

            case keyName === 'ArrowRight' && this.direction !== 'left':
                this.direction = 'right';
                break;

            case keyName === 'ArrowLeft' && this.direction !== 'right':
                this.direction = 'left';
                break;
            default:
                return;

        }
    };


    this.growUp = function () {
        let xDir = 0;
        let yDir = 0;
        switch (true) {
            case this.direction === 'right':
                xDir += 1;
                break;
            case this.direction === 'left':
                xDir -= 1;
                break;
            case this.direction === 'up':
                yDir -= 1;
                break;
            case this.direction === 'down':
                yDir += 1;
                break;
        }
        let x = this.head.x + xDir;
        let y = this.head.y + yDir;

        this.positionOnField.push([x,y]);
        this.head.nextCell = new Cell(x, y, null);
        this.head = this.head.nextCell;
    }

}

function Apple(x, y) {
    this.x = x;
    this.y = y;
}

Snake.create = function (count) {
    let tail = new Cell(0, 0, null);
    let positionOnField = [[0, 0]];
    let head = tail;

    for (let i = 0; i < count - 1; i++) {
        head.nextCell = new Cell(i + 1, 0, null);
        head = head.nextCell;
        positionOnField.push([i + 1, 0])
    }


    return new Snake('right', head, tail, positionOnField)
};

Apple.create = function (fieldSize, snake) {

    let x = Math.floor(Math.random() * fieldSize);
    let y = Math.floor(Math.random() * fieldSize);
    for (let i = 0; i < snake.positionOnField.length; i++) {
        if (snake.positionOnField[i][0] === x && snake.positionOnField[i][1] === y) {
            return Apple.create(fieldSize, snake);
        }
    }

    return new Apple(x, y);


};





