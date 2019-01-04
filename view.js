let View = function () {
    this.document = document;
    this.document.addEventListener('keydown', function (e) {
        const keyName = e.key;
        controller.revertSnake(keyName);
    });

    this.popup = this.document.getElementsByClassName('pop')[0];

    this.cleanField = function () {
        this.popup.classList.remove('visible');
    };

    this.replay = document.getElementsByClassName('replay')[0];

    this.replay.addEventListener('click', function () {
        controller.beginNewGame();
    });
    this.score = this.document.getElementsByClassName('score')[0];
    this.bestScore = this.document.getElementsByClassName('best-score')[0];

    this.drawScore = function (number) {
        this.score.innerHTML = this.score.innerText.split(':')[0]+": "+number;
    };

    this.drawBestScore = function (number) {
        this.bestScore.innerHTML = this.bestScore.innerText.split(':')[0]+": " + number;
    }

};

View.drawNewField = function (amount) {
    document.body.removeChild(document.getElementsByClassName('row-container')[0]);
    let rowContainer = document.createElement('div');
    rowContainer.classList.add('row-container');
    for (let i = 0; i < amount; i++) {
        let row = document.createElement('div');
        row.setAttribute('data-atr-y', `${i}`);
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
};

View.drawSnake = function (snakePosition) {
    let greyCells = document.getElementsByClassName('grey');
    for (let i = 0; i < greyCells.length; i++) {
        greyCells[i].classList.remove('grey');
    }
    for (let i = 0; i < snakePosition.length; i++) {
        document.querySelector(`[data-atr-y='${snakePosition[i][1]}'] > [data-atr-x='${snakePosition[i][0]}']`).classList.add('grey');
    }
};
View.cleanCell =function(cell) {
    document.querySelector(`[data-atr-y='${cell.y}'] > [data-atr-x='${cell.x}']`).classList.remove('grey');
};

View.drawCell =function(cell) {
    document.querySelector(`[data-atr-y='${cell.y}'] > [data-atr-x='${cell.x}']`).classList.add('grey');
};

View.drawApple = function (apple) {
    let oldApple = document.getElementsByClassName('red')[0];
    if (!oldApple) {
        oldApple.classList.remove('red');
    }
    document.querySelector(`[data-atr-y='${apple.y}'] > [data-atr-x='${apple.x}']`).classList.add('red');
};

View.gameover = function () {
    document.getElementsByClassName('pop')[0].classList.add('visible');
};



