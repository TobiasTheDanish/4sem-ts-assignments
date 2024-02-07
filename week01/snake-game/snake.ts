const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

// CANVAS
const width = canvas.width;
const height = canvas.height;

// GRID
const blockSize = 10;
const widthInBlocks = width / blockSize;
const heightInBlocks = height / blockSize;

// SCORE
let score = 0;

// DRAW BORDER
const drawBorder = () => {
	ctx.fillStyle = 'Gray';
	ctx.fillRect(0, 0, width, blockSize);
	ctx.fillRect(0, height - blockSize, width, blockSize);
	ctx.fillRect(0, 0, blockSize, height);
	ctx.fillRect(width - blockSize, 0, blockSize, height);
}

const drawScore = () => {
	ctx.font = '20px Courier';
	ctx.fillStyle = 'Black';
	ctx.textAlign = 'left';
	ctx.textBaseline = 'top';
	ctx.fillText(`Score: ${score}`, blockSize, blockSize);
}

const gameOver = () => {
	// clearInterval(intervalId);
	ctx.font = '60px Courier';
	ctx.fillStyle = 'Black';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText('Game Over', width / 2, height / 2);
}

const circle = (x: number, y: number, radius: number, fillCircle: true) => {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI * 2, false);

	if (fillCircle) {
		ctx.fill();
	} else {
		ctx.stroke();
	}
}

class Block {
	col: number;
	row: number;
	constructor(col: number, row: number) {
		this.col = col;
		this.row = row;
	}

	drawSquare = function (color: string | CanvasGradient | CanvasPattern) {
		const x = this.col * blockSize;
		const y = this.row * blockSize;
		ctx.fillStyle = color;
		ctx.fillRect(x, y, blockSize, blockSize);
	}

	drawCircle = function (color: string | CanvasGradient | CanvasPattern) {
		const centerX = this.col * blockSize + blockSize / 2;
		const centerY = this.row * blockSize + blockSize / 2;
		ctx.fillStyle = color;
		circle(centerX, centerY, blockSize / 2, true);
	}

	equal = function (otherBlock: Block) {
		return this.col === otherBlock.col && this.row === otherBlock.row;
	}
}

type Direction = 'left' | 'right' | 'up' | 'down';

class Snake {
	readonly segments: Array<Block>;
	direction: Direction;
	nextDirection: Direction;

	constructor() {
		this.segments = [
			new Block(7, 5),
			new Block(6, 5),
			new Block(5, 5),
		];
		this.direction = 'right';
		this.nextDirection = 'right';
	}

	draw() {
		for (let i = 0; i < this.segments.length; i++) {
			this.segments[i].drawSquare('Blue');
		}
	}

	move() {
		const head = this.segments[0];
		let newHead: Block;
		this.direction = this.nextDirection;
		if (this.direction === 'right') {
			newHead = new Block(head.col + 1, head.row);
		} else if (this.direction === 'down') {
			newHead = new Block(head.col, head.row + 1);
		} else if (this.direction === 'left') {
			newHead = new Block(head.col - 1, head.row);
		} else if (this.direction === 'up') {
			newHead = new Block(head.col, head.row - 1);
		} else {
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
		} else {
			this.segments.pop();
		}

	}

	checkCollision(head: Block) {
		let leftCollision = (head.col === 0);
		let topCollision = (head.row === 0);
		let rightCollision = (head.col === widthInBlocks - 1);
		let bottomCollision = (head.row === heightInBlocks - 1);

		let wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;

		let selfCollision = false;

		for (let i = 0; i < this.segments.length; i++) {
			if (head.equal(this.segments[i])) {
				selfCollision = true;
			}
		}

		return wallCollision || selfCollision;
	}

	setDirection(newDirection: Direction) {
		if (this.direction === 'up' && newDirection === 'down') {
			return;
		} else if (this.direction === 'right' && newDirection === 'left') {
			return;
		} else if (this.direction === 'down' && newDirection === 'up') {
			return;
		} else if (this.direction === 'left' && newDirection === 'right') {
			return;
		}
		this.nextDirection = newDirection;
	}
}

class Apple {
	constructor(public position: Block) {
		this.position = new Block(10, 10);
	}

	draw() {
		this.position.drawCircle('LimeGreen');
	}

	move() {
		const randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
		const randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
		this.position = new Block(randomCol, randomRow);
	}
}



const snake = new Snake();
const apple = new Apple(new Block(0, 0));

const intervalId = setInterval(() => {
    ctx.clearRect(0, 0, width, height);
    drawScore();
    snake.move();
    snake.draw();
    apple.draw();
    drawBorder();
}, 100);

const directions = {
    "ArrowLeft": 'left',
    "ArrowUp": 'up',
    "ArrowRight": 'right',
    "ArrowDown": 'down',
}

document.getElementById("bodyID")!.addEventListener('keydown', (event) => {
    const newDirection = directions[event.code];
    if (newDirection !== undefined) {
        snake.setDirection(newDirection);
    }
});


const sampleBlock = new Block(3, 4);
sampleBlock.drawSquare('Blue');
const sampleCircle = new Block(4, 3);
sampleCircle.drawCircle('LightGreen');


drawBorder()
drawScore()
