var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
// CANVAS
var width = canvas.width;
var height = canvas.height;
// GRID
var blockSize = 10;
var widthInBlocks = width / blockSize;
var heightInBlocks = height / blockSize;
// SCORE
var score = 0;
// DRAW BORDER
var drawBorder = function () {
    ctx.fillStyle = 'Gray';
    ctx.fillRect(0, 0, width, blockSize);
    ctx.fillRect(0, height - blockSize, width, blockSize);
    ctx.fillRect(0, 0, blockSize, height);
    ctx.fillRect(width - blockSize, 0, blockSize, height);
};
var drawScore = function () {
    ctx.font = '20px Courier';
    ctx.fillStyle = 'Black';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText("Score: ".concat(score), blockSize, blockSize);
};
var gameOver = function () {
    // clearInterval(intervalId);
    ctx.font = '60px Courier';
    ctx.fillStyle = 'Black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Game Over', width / 2, height / 2);
};
var circle = function (x, y, radius, fillCircle) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fillCircle) {
        ctx.fill();
    }
    else {
        ctx.stroke();
    }
};
var Block = /** @class */ (function () {
    function Block(col, row) {
        this.drawSquare = function (color) {
            var x = this.col * blockSize;
            var y = this.row * blockSize;
            ctx.fillStyle = color;
            ctx.fillRect(x, y, blockSize, blockSize);
        };
        this.drawCircle = function (color) {
            var centerX = this.col * blockSize + blockSize / 2;
            var centerY = this.row * blockSize + blockSize / 2;
            ctx.fillStyle = color;
            circle(centerX, centerY, blockSize / 2, true);
        };
        this.equal = function (otherBlock) {
            return this.col === otherBlock.col && this.row === otherBlock.row;
        };
        this.col = col;
        this.row = row;
    }
    return Block;
}());
var Snake = /** @class */ (function () {
    function Snake() {
        this.segments = [
            new Block(7, 5),
            new Block(6, 5),
            new Block(5, 5),
        ];
        this.direction = 'right';
        this.nextDirection = 'right';
    }
    Snake.prototype.draw = function () {
        for (var i = 0; i < this.segments.length; i++) {
            this.segments[i].drawSquare('Blue');
        }
    };
    Snake.prototype.move = function () {
        var head = this.segments[0];
        var newHead;
        this.direction = this.nextDirection;
        if (this.direction === 'right') {
            newHead = new Block(head.col + 1, head.row);
        }
        else if (this.direction === 'down') {
            newHead = new Block(head.col, head.row + 1);
        }
        else if (this.direction === 'left') {
            newHead = new Block(head.col - 1, head.row);
        }
        else if (this.direction === 'up') {
            newHead = new Block(head.col, head.row - 1);
        }
        else {
            newHead = new Block(head.col, head.row);
        }
        if (this.checkCollision(newHead)) {
            gameOver();
            return;
        }
        this.segments.unshift(newHead);
        if (newHead.equal(apple.position)) {
            score++;
            apple.move();
        }
        else {
            this.segments.pop();
        }
    };
    Snake.prototype.checkCollision = function (head) {
        var leftCollision = (head.col === 0);
        var topCollision = (head.row === 0);
        var rightCollision = (head.col === widthInBlocks - 1);
        var bottomCollision = (head.row === heightInBlocks - 1);
        var wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;
        var selfCollision = false;
        for (var i = 0; i < this.segments.length; i++) {
            if (head.equal(this.segments[i])) {
                selfCollision = true;
            }
        }
        return wallCollision || selfCollision;
    };
    Snake.prototype.setDirection = function (newDirection) {
        if (this.direction === 'up' && newDirection === 'down') {
            return;
        }
        else if (this.direction === 'right' && newDirection === 'left') {
            return;
        }
        else if (this.direction === 'down' && newDirection === 'up') {
            return;
        }
        else if (this.direction === 'left' && newDirection === 'right') {
            return;
        }
        this.nextDirection = newDirection;
    };
    return Snake;
}());
var Apple = /** @class */ (function () {
    function Apple(position) {
        this.position = position;
        this.position = new Block(10, 10);
    }
    Apple.prototype.draw = function () {
        this.position.drawCircle('LimeGreen');
    };
    Apple.prototype.move = function () {
        var randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
        var randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
        this.position = new Block(randomCol, randomRow);
    };
    return Apple;
}());
var snake = new Snake();
var apple = new Apple(new Block(0, 0));
var intervalId = setInterval(function () {
    ctx.clearRect(0, 0, width, height);
    drawScore();
    snake.move();
    snake.draw();
    apple.draw();
    drawBorder();
}, 100);
var directions = {
    "ArrowLeft": 'left',
    "ArrowUp": 'up',
    "ArrowRight": 'right',
    "ArrowDown": 'down',
};
document.getElementById("bodyID").addEventListener('keydown', function (event) {
    var newDirection = directions[event.code];
    if (newDirection !== undefined) {
        snake.setDirection(newDirection);
    }
});
var sampleBlock = new Block(3, 4);
sampleBlock.drawSquare('Blue');
var sampleCircle = new Block(4, 3);
sampleCircle.drawCircle('LightGreen');
drawBorder();
drawScore();
