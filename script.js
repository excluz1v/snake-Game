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