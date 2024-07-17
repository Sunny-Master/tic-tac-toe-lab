/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
]

const tieSound = new Audio('../assets/tie.mp3')

/*---------------------------- Variables (state) ----------------------------*/
let board, turn, winner, tie 
let p1Score, p2Score
let piece, winSound

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const boardEl = document.querySelector('.board')
const resetBtnEl = document.querySelector('#reset')
const contBtnEl = document.querySelector('#continue')
const scoresEl = document.querySelector('#scores')

const p1El = document.querySelector('#player1')
const p2El = document.querySelector('#player2')

const meowEl = document.querySelector('#meow')
const barkEl = document.querySelector('#bark')

/*-------------------------------- Functions --------------------------------*/

init()
function init() {
    board = [
        '', '', '',
        '', '', '', 
        '', '', '',
       ]
    turn = 'X'
    winner = false
    tie = false
    p1Score = 0
    p2Score = 0   
    render()
    disableContinue()
}

function render() {
    updateBoard()
    updateMessage()
    showPlayerScores()
}

function updateBoard() {
    board.forEach((cell, idx) => {
        if  (cell === 'X') {
            squareEls[idx].textContent = '🐱'
            squareEls[idx].style.backgroundColor = '#83C5BE'
        } else if (cell === 'O') {
            squareEls[idx].textContent = '🐶'
            squareEls[idx].style.backgroundColor = '#83C5BE'
        } else {
            squareEls[idx].textContent = ''
            squareEls[idx].style.backgroundColor = '#EDF6F9'
        }
    })
}

// update the message displayed to players
function updateMessage() {
    if (winner === false && tie === false) {
        messageEl.textContent = `It's the turn of ${turn === 'X' ? '🐱' : '🐶'}. Please click on an empty square!`
    } else if (winner === false && tie) {
        messageEl.textContent = `It's a Tie!!`
    } else {
        messageEl.textContent = `${turn === 'X' ? '🐱' : '🐶'} won! Congratulations!`
        winSound.play()
    }
}

// to enable the 'Continue' button
function enableContinue() {
    if (contBtnEl.hasAttribute('disabled')) {
        contBtnEl.removeAttribute('disabled')
      }
}

//to disable the 'Continue' button
function disableContinue() {
    if (contBtnEl.hasAttribute('disabled') === false) {
        contBtnEl.setAttribute('disabled', true)
    }
}

//Show player Scores
function showPlayerScores() {
    p1El.textContent = `🐱: ${p1Score}`
    p2El.textContent = `🐶: ${p2Score}`
}

// when a player clicks on a square
function handleClick(event) {
    const squareIndex = parseInt(event.target.id) // parseInt to convert string to number
    if (board[squareIndex] !== '' || winner) return
    placePiece(squareIndex)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    render()
}

//place Piece on the board
function placePiece(index) {
    board[index] = turn
}

//check for winner
function checkForWinner() {
    winningCombos.forEach(winningCombo => {
        let winCombo = []
        winningCombo.forEach(pos => {
            winCombo.push(board[pos])
        })
        if (winCombo[0] !== '' && winCombo[0] === winCombo[1] && winCombo[0] === winCombo[2]) {
            winner = true
            confetti.start(1000)
            enableContinue()
            if (turn === 'X') {
                p1Score++
                winSound = meowEl
            } else {
                p2Score++
                winSound = barkEl
            }
        }
    })
}

//check for Tie
function checkForTie() {
    if (winner || board.includes('')) { 
        return
    }
    tie = true
    tieSound.play()
    enableContinue()
}

// switch Player Turn
function switchPlayerTurn() {
    if (winner) {
        return
    } 
    turn = turn === 'X' ? 'O' : 'X'
}

//when a player clicks on 'Continue' button to continue the same gaming session
function continueGame() {
    board = [
        '', '', '',
        '', '', '', 
        '', '', '',
    ]
    winner = false
    tie = false
    switchPlayerTurn()
    render()
    disableContinue()
}

/*----------------------------- Event Listeners -----------------------------*/

boardEl.addEventListener('click', handleClick)
resetBtnEl.addEventListener('click', init)
contBtnEl.addEventListener('click', continueGame)
