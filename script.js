// let canvas = document.getElementById('canvas')
// let ctx = canvas.getContext('2d')
/*
Пчела
let x = 100
let y = 100
let circle = function (x, y, radius, fillCircle) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2, false)
    if (fillCircle) {
        ctx.fill()
    } else ctx.stroke()
}
let drawBee = function (x, y) {
    ctx.lineWidth = 2
    ctx.strokeStyle = 'Black'
    ctx.fillStyle = 'Gold'

    circle(x, y, 8, false)
    circle(x, y, 8, true)
    circle(x - 5, y - 11, 5, false)
    circle(x + 5, y - 11, 5, false)
    circle(x - 2, y - 1, 2, false)
    circle(x + 2, y - 1, 2, false)
}

let update = function (coordinate) {
    let offset = Math.random() * 4 - 2
    coordinate += offset
    if (coordinate > 2000) {
        coordinate = 200
    } else if (coordinate < 0) {
        coordinate = 0
    }
    return coordinate
}
setInterval(() => {
    ctx.clearRect(0, 0, 200, 200)
    drawBee(x, y)
    x = update(x)
    y = update(y)
    ctx.strokeRect(0, 0, 200, 200)
}, 30);
*/
/*Мячи
let colors = ['red', ' blue', 'green', 'black', 'yellow ', 'gold']
let width = canvas.width = 500
let height = canvas.height = 300
let Ball = function () {
    this.x = 100;
    this.y = 100
    this.xSpeed = (Math.random() * (2 - (-5))) - 5
    this.ySpeed = (Math.random() * (2 - (-3))) - 3
    this.color = colors[Math.floor(Math.random() * colors.length)]
}

let circle = function (x, y, radius, fillCircle, color) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2, false)
    ctx.fillStyle = color
    if (fillCircle) {
        ctx.fill()
    } else {
        ctx.stroke()
    }
}
Ball.prototype.draw = function () {
    circle(this.x, this.y, 3, true, this.color)
}
Ball.prototype.move = function () {
    this.x += this.xSpeed
    this.y += this.ySpeed
}
Ball.prototype.checkCollision = function () {
    if (this.x > width || this.x < 0) {
        this.xSpeed = -this.xSpeed
    }
    if (this.y > height || this.y < 0)
        this.ySpeed = -this.ySpeed
}

let ball = new Ball

let empty = []
for (let i = 0; i < 10; i++) {
    empty.push(new Ball)
}
setInterval(() => {
    ctx.clearRect(0, 0, width, height)
    for (let i = 0; i < 10; i++) {
        empty.map(el => {
            el.draw()
            el.move()
            el.checkCollision()
        })
    }
    // ball.draw()
    // ball.move()
    // ball.checkCollision()
    ctx.strokeRect(0, 0, width, height)

}, 30);
*/
/*Мяч
let keyNames = {
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'

}
const speeds = {
    97: 1,
    98: 2,
    99: 3,
    100: 4,
    101: 5,
    102: 6,
    103: 7,
    104: 8,
    105: 9
}

let circle = function (x, y, radius, fill) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2, false)
    if (fill) {
        ctx.fill()
    } else {
        ctx.stroke()
    }
}
let width = canvas.width = 500
let height = canvas.height = 300
let Ball = function () {

    this.x = width / 2
    this.y = height / 2

    this.speed = 5
    this.xSpeed = this.speed
    this.ySpeed = 0
}
Ball.prototype.move = function () {
    this.x += this.xSpeed
    this.y += this.ySpeed
    console.log(this.x, this.y)
    if (this.x < 0) {
        this.xSpeed = this.speed
    } else if (this.x > width) {
        this.xSpeed = -this.speed
    }
    if (this.y > height) {
        this.ySpeed = -this.ySpeed
    } else if (this.y < 0) {
        this.ySpeed = -this.ySpeed
    }
}
Ball.prototype.draw = function () {
    circle(this.x, this.y, 10, true)
}
Ball.prototype.setDirection = function (direction) {
    if (direction === 'up') {
        this.xSpeed = 0
        this.ySpeed = -this.speed
    } else if (direction === 'down') {
        console.log(Ball)
        this.xSpeed = 0
        this.ySpeed = this.speed
    } else if (direction === 'left') {
        this.xSpeed = -this.speed
        this.ySpeed = 0
    } else if (direction === 'right') {
        this.xSpeed = this.speed
        this.ySpeed = 0
    } else if (direction === 'space') {
        this.xSpeed = 0
        this.ySpeed = 0
    }

}

Ball.prototype.changeSpeed = function (speed) {
    if (this.speed != speed)
        this.speed = speed
}

let ball = new Ball

document.onkeydown = function (event) {
    if (event.keyCode == 32, 37, 38, 39, 40) {
        let direction = keyNames[event.keyCode]
        ball.setDirection(direction)
    } if (event.keyCode == 97, 98, 99, 100, 101, 102, 103, 104, 105) {
        // debugger
        let speed = speeds[event.keyCode]
        ball.changeSpeed(speed)
    }

}
setInterval(function () {
    ctx.clearRect(0, 0, width, height)
    ball.draw()
    ball.move()
    ctx.strokeRect(0, 0, width, height)
}, 30)

*/

let gameSpeed = 200
let randomColor = function () {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
}
let colors = [randomColor(), randomColor(), randomColor()]
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let width = canvas.width = 400
let height = canvas.height = 400

let blockSize = 10
let widthInBlocks = width / blockSize
let heightInBlocks = height / blockSize
let score = 0
let Block = function (col, row) {
    this.col = col
    this.row = row
}
let circle = function (x, y, radius, fill) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2, false)
    if (fill) {
        ctx.fill()
    } else ctx.stroke()
}
Block.prototype.drawSquare = function (index) {
    let x = this.col * blockSize
    let y = this.row * blockSize
    ctx.fillStyle = colors[index - 1]
    ctx.fillRect(x, y, blockSize, blockSize)
}
Block.prototype.drawCircle = function (index) {
    let centerX = this.col * blockSize + blockSize / 2
    let centerY = this.row * blockSize + blockSize / 2
    ctx.fillStyle = colors[index]
    circle(centerX, centerY, blockSize / 2, true)
}
Block.prototype.equal = function (otherBlock) {
    return this.col == otherBlock.col && this.row == otherBlock.row
}
let Snake = function () {
    this.segments = [
        new Block(7, 5),
        new Block(6, 5),
        new Block(5, 5)
    ]
    this.direction = 'right'
    this.nextDirection = 'right'
}

Snake.prototype.draw = function () {
    for (let i = 0; i < this.segments.length; i++) {
        this.segments[i].drawSquare(i)
    }
}
Snake.prototype.move = function () {
    let head = this.segments[0]
    let newHead
    this.direction = this.nextDirection
    if (this.direction == 'right') {
        newHead = new Block(head.col + 1, head.row)
    } else if (this.direction == 'left') {
        newHead = new Block(head.col - 1, head.row)
    } else if (this.direction == 'up') {
        newHead = new Block(head.col, head.row - 1)
    } else if (this.direction == 'down') {
        newHead = new Block(head.col, head.row + 1)
    }

    if (this.checkCollision(newHead)) {
        endGame()
        return
    }
    this.segments.unshift(newHead)

    if (newHead.equal(apple.position)) {
        colors.push(randomColor())
        score++;
        apple.move(this.segments)
        if (gameSpeed >= 70) {
            gameSpeed -= 20
        }
    } else (
        this.segments.pop()
    )
}
Snake.prototype.checkCollision = function (head) {
    let leftCollision = (head.col == 0)
    let rightCollision = (head.col == widthInBlocks - 1)
    let topCollision = (head.row == 0)
    let bottomCollision = (head.row == heightInBlocks - 1)
    let wallCollision = leftCollision || rightCollision || topCollision || bottomCollision

    let selfCollision = false

    for (let i = 0; i < this.segments.length; i++) {
        if (head.equal(this.segments[i])) {
            selfCollision = true
        }
    }
    return selfCollision || wallCollision
}
let drawBorder = function () {
    ctx.fillStyle = 'Black'
    ctx.fillRect(0, 0, width, blockSize)
    ctx.fillRect(0, height - blockSize, width, blockSize)
    ctx.fillRect(0, 0, blockSize, height)
    ctx.fillRect(width - blockSize, 0, blockSize, height)
}
drawBorder()
let drawScrore = function () {
    ctx.textBaseline = 'top'
    ctx.textAlign = 'left'
    ctx.font = ' 16px Courier'
    ctx.fillText('Счет : ' + score, 10, 10)
}
drawScrore()

let Game = function () {
    clearInterval(intervalId)
    ctx.fillStyle = ' Black'
    ctx.font = '32px Courier'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillText(answer, width / 2, height / 2)
    ctx.font = '32px Courier'
    ctx.fillText('your score is:' + score, width / 2, height / 2 + 60)
}
let endGame = function () {
    ctx.fillStyle = ' Black'
    ctx.font = '64px Courier'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillText('Game over', width / 2, height / 2)
    ctx.font = '32px Courier'
    ctx.fillText('your score is:' + score, width / 2, height / 2 + 60)
}

let directions = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
}
Snake.prototype.setDirection = function (newDirection) {
    if (this.direction == 'up' && newDirection == 'down') {
        return
    } else if (this.direction == 'right' && newDirection == "left") {
        return
    } else if (this.direction == 'left' && newDirection == 'right') {
        return
    } else if (this.direction == 'down' && newDirection == 'up') {
        return
    }
    this.nextDirection = newDirection
}
document.addEventListener('keydown', function (event) {
    let newDirection = directions[event.keyCode]
    if (newDirection != undefined) {
        snake.setDirection(newDirection)
    }
})

let Apple = function () {
    this.position = new Block(Math.floor(Math.random() * (widthInBlocks - 2) + 1), Math.floor(Math.random() * (heightInBlocks - 2) + 1))
}
Apple.prototype.draw = function () {
    this.position.drawCircle(colors.length - 1)
}

Apple.prototype.move = function (occupiedSlots) {

    let randomCol = Math.floor(Math.random() * (widthInBlocks - 2) + 1)
    let randomRow = Math.floor(Math.random() * (heightInBlocks - 2) + 1)
    this.position = new Block(randomCol, randomRow)
    let index = occupiedSlots.length - 1
    while (index >= 0) {
        if (this.position.equal(occupiedSlots[index])) {
            this.move(occupiedSlots)
            return
        }
        index--
    }

}
let snake = new Snake
let apple = new Apple
let gameloop = function () {
    ctx.clearRect(0, 0, width, height)
    drawBorder()
    drawScrore()
    snake.move()
    snake.draw()
    apple.draw()
    setTimeout(gameloop, gameSpeed);
}
gameloop()