let canvas = document.getElementById("snake")
let ctx = canvas.getContext('2d')

let bg = new Image()
bg.src = 'images/bg.png'

let fd = new Image()
fd.src = 'images/food.png'

let die = new Audio()
die.src = 'audio/die.mp3'

let eat = new Audio()
eat.src = 'audio/eat.mp3'

let move = new Audio()
move.src = 'audio/move.mp3'

let point = 0

let box = 32

let snake = []
snake[0] = {
    x: 9 * box,
    y: 8 * box
}

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

let d;
document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "RIGHT") {
        d = "LEFT"; move.play()
    } else if (key == 38 && d != "DOWN") {
        d = "UP"; move.play()
    } else if (key == 39 && d != "LEFT") {
        d = "RIGHT"; move.play()
    } else if (key = 40 && d != "UP") {
        d = "DOWN"; move.play()
    }
}

function cannibal(head, body) {
    for (let r = 0; r < snake.length; r++) {
        if (head.x == body[r].x &&
            head.y == body[r].y
        )
            return true
    }
    return false
}

function draw() {
    ctx.drawImage(bg, 0, 0)
    ctx.drawImage(fd, food.x, food.y)
    for (let k = 0; k < snake.length; k++) {
        ctx.fillStyle = (k == 0) ? 'green' : 'gray'
        ctx.strokeStyle = 'black'
        ctx.fillRect(snake[k].x, snake[k].y, box, box)
        ctx.strokeRect(snake[k].x, snake[k].y, box, box)

    }
    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if (d == 'LEFT') snakeX -= box
    if (d == 'RIGHT') snakeX += box
    if (d == 'UP') snakeY -= box
    if (d == 'DOWN') snakeY += box
    if (snakeX == food.x && snakeY == food.y) {
        point++
        eat.play()
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }

    } else {
        snake.pop()
    }
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || cannibal(newHead, snake)) {
        die.play()
        clearInterval(game);
    }
    snake.unshift(newHead);

    ctx.fillStyle = "white";

    ctx.font = "45px Changa one";

    ctx.fillText(point, 2 * box, 1.6 * box);

}

let game = setInterval(draw, 100);



