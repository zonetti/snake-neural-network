class Game {

  constructor ({size, unit, frameRate, maxTurns, lowestScoreAllowed, score, onGameOver}) {
    this.size = size
    this.unit = unit
    this.unitsPerRow = this.size / this.unit
    this.frameRate = frameRate
    this.maxTurns = maxTurns
    this.lowestScoreAllowed = lowestScoreAllowed
    this.onGameOver = onGameOver
    this.status = 'IDLE'
    this.grid = []
    this.snake = new Snake(score)
    this.turns = 0

    for (let x = 0; x < this.unitsPerRow; x++) {
      for (let y = 0; y < this.unitsPerRow; y++) {
        this.grid.push([x + 1, y + 1])
      }
    }
    
    const game = this

    new p5(p => {
      p.setup = () => {
        p.frameRate(game.frameRate)
        p.createCanvas(game.size, game.size)
      }

      p.drawFood = () => {
        p.fill('red')
        p.rect(
          game.food.position[0] * game.unit - game.unit,
          game.food.position[1] * game.unit - game.unit,
          game.unit,
          game.unit
        )
      }

      p.drawSnake = () => {
        p.fill('black')
        game.snake.segments.forEach(s => {
          p.rect(
            s[0] * game.unit - game.unit,
            s[1] * game.unit - game.unit,
            game.unit,
            game.unit
          )
        })
      }

      p.draw = () => {
        if (['IDLE', 'GAME_OVER'].indexOf(game.status) !== -1) {
          p.background('#EEE')
          p.fill(0)
          p.textSize(15)
          p.text(game.snake.brain.score.toString(), 5, 20)
          return
        }

        p.background(255)

        game.snake.move(game)

        if (game.snake.isEating) {
          game.food = new Food(game)
        }

        game.updateGameStatus()

        if (game.status === 'GAME_OVER') {
          return game.onGameOver()
        }

        p.drawSnake()
        p.drawFood()

        game.turns++
      }
    }, 'wrapper')
  }

  updateGameStatus () {
    const snakeHeadIndex = this.snake.segments.length - 1
    const snakeHead = this.snake.segments[snakeHeadIndex]
    const snakeHitWall = snakeHead[0] < 1 || snakeHead[0] > this.unitsPerRow || snakeHead[1] < 1 || snakeHead[1] > this.unitsPerRow
    const snakeHitTail = this.snake.segments.some((s, i) => s[0] === snakeHead[0] && s[1] === snakeHead[1] && i !== snakeHeadIndex)
    const noMoreRoomLeft = this.getAvailablePositions().length === 1
    const gameLastedLongEnough = this.turns > this.maxTurns
    const scoreTooLow = this.snake.brain.score <= this.lowestScoreAllowed

    if (snakeHitWall || snakeHitTail || noMoreRoomLeft || gameLastedLongEnough || scoreTooLow) {
      this.status = 'GAME_OVER'
    }
  }

  getAvailablePositions () {
    return this.grid.filter(position => {
      return !this.snake.segments.some(segment => {
        return position[0] === segment[0] && position[1] === segment[1]
      })
    })
  }

  start () {
    this.turns = 0
    this.snake.reset()
    this.food = new Food(this)
    this.status = 'RUNNING'
  }

}
