function Cell(x, y, nextCell) {
    this.x = +x;
    this.y = +y;
    this.nextCell = nextCell;
}

function Snake(direction, head, tail) {
    this.direction = direction;
    this.head = head;
    this.tail = tail;

    let makeMove = function () {
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
                yDir += 1;
                break;
            case this.direction === 'down':
                yDir -= 1;
                break;
        }

        let growUp = function () {
            this.head.nextCell = new Cell(this.head.x + xDir, this.head.y + yDir, null);
            this.head = this.head.nextCell;

            try {
                document.querySelector(`[data-atr-y='${this.head.y}'] > [data-atr-x='${this.head.x}']`).classList.add('grey');
            } catch (e) {
                throw new Error();
            }
        }.bind(this);

        growUp();

        if (document.querySelector(`[data-atr-y='${this.head.y}'] > [data-atr-x='${this.head.x}']`).classList.contains('red')) {
            let fieldSize =document.getElementsByClassName('row').length;
            document.querySelector(`[data-atr-y='${this.head.y}'] > [data-atr-x='${this.head.x}']`).classList.remove('red');
            createApple(fieldSize);
            growUp();
        }

        document.querySelector(`[data-atr-y='${this.tail.y}'] > [data-atr-x='${this.tail.x}']`).classList.remove('grey');
        this.tail = this.tail.nextCell;


    }.bind(this);

    let changeDirection = function (keyName) {
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
    }.bind(this);


    this.run = function (speed) {
        setTimeout(function step() {
            try {
                makeMove();

            } catch (e) {
                console.log('game over');
                document.getElementsByClassName('pop')[0].classList.add('visible');
                return;
            }
            document.addEventListener('keydown', function (e) {
                const keyName = e.key;
                changeDirection(keyName);
            });
            setTimeout(step, speed);
        }, speed);

    };
}

function createSnake(count) {
    let tail = new Cell(0, 0, null);
    document.querySelector(`[data-atr-y='${tail.y}'] > [data-atr-x='${tail.x}']`).classList.add('grey');
    let oldCell = tail;
    for (let i = 0; i < count - 1; i++) {

        oldCell.nextCell = new Cell(i + 1, 0, null);
        oldCell = oldCell.nextCell;
        document.querySelector(`[data-atr-y='${oldCell.y}'] > [data-atr-x='${oldCell.x}']`).classList.add('grey');
    }

    return new Snake('right', oldCell, tail)
}

function createNewField(amount) {
    document.body.removeChild(document.getElementsByClassName('row-container')[0]);
    let rowContainer = document.createElement('div');
    rowContainer.classList.add('row-container');
    for (let i = 0; i < amount; i++) {
        let row = document.createElement('div');
        row.setAttribute('data-atr-y', `${amount - 1 - i}`);
        row.classList.add('row');
        for (let j = 0; j < amount; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-atr-x', `${j}`);
            row.appendChild(cell);
        }
        rowContainer.appendChild(row);
    }
    document.body.insertBefore(rowContainer, document.getElementsByTagName('script')[0]);
}

function createApple(fieldSize) {
    let x = Math.floor(Math.random() * fieldSize);
    let y = Math.floor(Math.random() * fieldSize);

    if (document.querySelector(`[data-atr-y='${y}'] > [data-atr-x='${x}']`).classList.contains('grey')) {
        createApple(fieldSize);
    } else {
        document.querySelector(`[data-atr-y='${y}'] > [data-atr-x='${x}']`).classList.add('red');

    }
}


function newGame(fieldSize, snakeSize, snakeSpeed) {
    createNewField(fieldSize);
    let snake = createSnake(snakeSize);
    createApple(fieldSize);

    snake.run(snakeSpeed);
}

newGame(10, 2, 400);


let replay = document.getElementsByClassName('replay')[0];
replay.addEventListener('click', function () {
    document.getElementsByClassName('pop')[0].classList.remove('visible');
    newGame(10, 2, 400);
});