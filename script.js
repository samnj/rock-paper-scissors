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

function getUserMove(userSelection) {
  let userPickIndex = getPickByName(userSelection)
  return PICKS[userPickIndex]
}

function getPickByName (input) {
  return PICKS.findIndex(pick => pick.name === input)
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

function playGame () {
  
}

const playBtn = document.querySelector('.play-game')
playBtn.addEventListener('click', playGame)



let userPoints = 0
let computerPoints = 0
let round = 1
let gameEnded = false

const btn = document.querySelectorAll('.pick-btn')
btn.forEach(item => item.addEventListener('click', () => playRound(item.textContent)))

function playRound(userSelection) {
  const movesMessage = document.querySelector('.moves-message')
  const playerScore = document.querySelector('.player-score')
  const computerScore = document.querySelector('.computer-score')
  const finalScore = document.querySelector('.final-score')
  
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
  
}