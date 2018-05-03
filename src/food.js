class Food {

  constructor (game) {
    const availablePositions = game.getAvailablePositions()
    this.position = availablePositions[Math.floor(Math.random() * availablePositions.length)]
  }

}
