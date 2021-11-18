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

function getPickByName (input) {
  return PICKS.findIndex(pick => pick.name === input)
}

function getUserMove () {
  let userPickIndex
  while (true) {
    const userInput = prompt('Type rock, paper or scissors: ').toLowerCase()
    userPickIndex = getPickByName(userInput)
    if (userPickIndex === -1) {
      console.log('Invalid input. Pick either rock, paper or scissors.')
      displaySeparatorMessage()
    } else {
      break
    }
  }
  return PICKS[userPickIndex]
}

function isWinner (move, opponentMove) {
  return move.beats(opponentMove)
}

function displayRoundMessages (userWins, computerWins, userMove, computerMove, round) {
  console.log(`Round ${round}`)
  console.log(`You picked ${userMove.name} and I picked ${computerMove.name}.`)
  if (userWins) {
    console.log(`${userMove.name} beats ${userMove.winsOver}. You win the round.`)
  } else if (computerWins) {
    console.log(`${computerMove.name} beats ${computerMove.winsOver}. You lost the round.`)
  } else {
    console.log('Draw.')
  }
  console.log(`Your score: ${userScore}`)
  console.log(`My score: ${computerScore}`)
  displaySeparatorMessage()
}

function displayPickMessage () {
  console.log('Pick either rock, paper or scissors.')
}

function displaySeparatorMessage () {
  console.log('---------------------')
}

function finalScoreMsg (userScore, computerScore) {
  console.log('You ' + ((userScore > computerScore) ? 'won' : 'lost') + ' the game.')
}

function playGame () {

  displayPickMessage()
  displaySeparatorMessage()

  while (userScore < 3 && computerScore < 3) {
    const computerMove = getComputerMove()
    const userMove = getUserMove()
    const userWins = isWinner(userMove, computerMove)
    const computerWins = isWinner(computerMove, userMove)
    if (userWins) {
      userScore++
    } else if (computerWins) {
      computerScore++
    }
    displayRoundMessages(userWins, computerWins, userMove, computerMove, round)
    round++
  }

  finalScoreMsg(userScore, computerScore)
}

let userScore = 0
let computerScore = 0
let round = 1
