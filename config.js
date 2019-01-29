let ARROW_UP = 'ArrowUp';
let ARROW_DOWN = 'ArrowDown';
let ARROW_RIGHT = 'ArrowRight';
let ARROW_LEFT = 'ArrowLeft';

let UP = 'up';
let DOWN = 'down';
let RIGHT = 'right';
let LEFT = 'left';

let SNAKE = 'snake';
let APPLE = 'apple';
let EMPTY = 'empty';

let forbiddenDirections = {
    [ARROW_UP]: DOWN,
    [ARROW_DOWN]: UP,
    [ARROW_LEFT]: RIGHT,
    [ARROW_RIGHT]: LEFT,
};

let directions = {
    [ARROW_UP]: UP,
    [ARROW_DOWN]: DOWN,
    [ARROW_LEFT]: LEFT,
    [ARROW_RIGHT]: RIGHT,
};


let chooseDirections = {
    [RIGHT]: [1, 0],
    [LEFT]: [-1, 0],
    [UP]: [0, -1],
    [DOWN]: [0, 1],
};



