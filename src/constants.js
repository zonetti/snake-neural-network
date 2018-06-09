// game settings

const GAMES = 60
const GAME_SIZE = 100
const GAME_UNIT = 5
const FRAME_RATE = 45

// game bottlenecks

const MAX_TURNS = 5000
const LOWEST_SCORE_ALLOWED = -50

// neural network settings

const MUTATION_RATE = 0.5
const MUTATION_AMOUNT = 3
const ELITISM = Math.round(0.2 * GAMES)

// score settings

const POINTS_MOVED_TOWARDS_FOOD = 1
const POINTS_MOVED_AGAINST_FOOD = -1.5
const POINTS_ATE_FOOD = 2
