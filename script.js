'use strict'

class Pick {
  constructor (name, winsOver) {
    this.name = name
    this.winsOver = winsOver
  }

  beats (opponentMove) {
    if (this.winsOver === opponentMove.name) {
      return true
    } else {
      return false
    }
  }
}

const PICKS = [
  new Pick('rock', 'scissors'), new Pick('paper', 'rock'), new Pick('scissors', 'paper')
]

function getComputerMove () {
  const randomIndex = Math.floor(Math.random() * PICKS.length)
  return PICKS[randomIndex]
}

function getUserMove (userSelection) {
  switch (userSelection) {
    case 'rock': return PICKS[0]
    case 'paper': return PICKS[1]
    case 'scissors': return PICKS[2]
  }
}

function isWinner (move, opponentMove) {
  return move.beats(opponentMove)
}

function getMovesMessage (round, userMove, computerMove, userWins, computerWins) {
  let message = `ROUND ${round}: you picked ${userMove.name} and I picked ${computerMove.name}.`
  if (userWins) {
    return message + ` ${capitalizeFirstLetter(userMove.name)} beats ${computerMove.name}. You win the round.`
  } else if (computerWins) {
    return message + ` ${capitalizeFirstLetter(computerMove.name)} beats ${userMove.name}. You lose the round.`
  } else {
    message = `ROUND ${round}:`
    return message + ` we both picked ${userMove.name}. Draw.`
  }
}

function capitalizeFirstLetter (str) {
  return str[0].toUpperCase() + str.slice(1)
}

function showGameStart () {
  playBtn.style.display = 'none'
  btnsContainer.style.display = 'flex'
  movesMessage.style.display = 'block'
  movesMessage.textContent = ''

  finalScore.style.display = 'none'
  playAgain.style.display = 'none'
}

function showScore () {
  scoreContainer.style.display = 'block'
}

function showGameEnd () {
  btnsContainer.style.display = 'none'
  movesMessage.style.display = 'none'
  scoreContainer.style.display = 'none'

  finalScore.style.display = 'block'
  finalScore.textContent = `Final score: user ${userPoints} - computer ${computerPoints}`

  playAgain.style.display = 'block'
}

function playGame () {
  userPoints = 0
  computerPoints = 0
  round = 1
  showGameStart()
}

function playRound (userSelection) {
  const userMove = getUserMove(userSelection)
  const computerMove = getComputerMove()
  const userWins = isWinner(userMove, computerMove)
  const computerWins = isWinner(computerMove, userMove)

  if (userWins) {
    userPoints++
  } else if (computerWins) {
    computerPoints++
  }

  movesMessage.textContent = getMovesMessage(round, userMove, computerMove, userWins, computerWins)
  round++

  showScore()
  playerScore.textContent = `Player score = ${userPoints}`
  computerScore.textContent = `Computer score = ${computerPoints}`

  if (userPoints > 2 || computerPoints > 2) {
    showGameEnd()
  }
}

const playBtn = document.querySelector('.play-game')
playBtn.addEventListener('click', playGame)
const btn = document.querySelectorAll('.pick-btn')
btn.forEach(item => item.addEventListener('click', () => playRound(item.textContent)))
const btnsContainer = document.querySelector('.btns-container')
const movesMessage = document.querySelector('.moves-message')
const scoreContainer = document.querySelector('.score-container')
const playerScore = document.querySelector('.player-score')
const computerScore = document.querySelector('.computer-score')
const finalScore = document.querySelector('.final-score')
const playAgain = document.querySelector('.play-again-btn')
playAgain.addEventListener('click', playGame)

let userPoints
let computerPoints
let round
