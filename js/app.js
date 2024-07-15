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


/*---------------------------- Variables (state) ----------------------------*/
let board 
let turn 
let winner 
let tie 
let p1Score
let p2Score
let piece

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

// to toggle disable attributefor the 'Continue' button
const enableContinue = () => {
    if (contBtnEl.hasAttribute('disabled')) {
        contBtnEl.removeAttribute('disabled')
      }
}

const disableContinue = () => {
    if (contBtnEl.hasAttribute('disabled') === false) {
        contBtnEl.setAttribute('disabled', true)
    }
}

const updateBoard = () => {
    board.forEach((box, idx) => {
        squareEls[idx].textContent = box
    });
}

const updateMessage = () => {
    if (winner === false && tie === false) {
        messageEl.textContent = `It's the turn of ${turn}. Please click on an empty square!`
    } else if (winner === false && tie) {
        messageEl.textContent = `It's a Tie!!`
    } else {
        messageEl.textContent = `${turn} won! Congratulations!`
    }
}

//Show player Scores
const showPlayerScores = () => {
    p1El.textContent = `🐱: ${p1Score}`
    p2El.textContent = `🐶: ${p2Score}`
}

const render = () => {
    updateBoard()
    updateMessage()
    showPlayerScores()
}

// reset the background color for all squares
const resetSquares = () => {
    squareEls.forEach(square => {
        square.classList.remove('clickedSqr')
    })
}


const init = () => {
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
    resetSquares()
    disableContinue()
}
init()

//place Piece on the board
const placePiece = (index) => {
    if (turn === 'X') {
        piece = '🐱'
        meowEl.play()
    } else {
        piece = '🐶'
        barkEl.play()
    }
    board[index] = piece
    squareEls[index].classList.add('clickedSqr')
}

//check for winner
const checkForWinner = () => {
    winningCombos.forEach(winningCombo => {
        let winCombo = []
        winningCombo.forEach(pos => {
            winCombo.push(board[pos])
        })
        if (winCombo[0] !== '' && winCombo[0] === winCombo[1] && winCombo[0] === winCombo[2]) {
            winner = true
            enableContinue()
            if (turn === 'X') {
                p1Score++
            } else {
                p2Score++
            }
        }
    })
}

//check for Tie
const checkForTie = () => {
    if (winner) { 
        return
    }
    let emptyCount = 0
    board.forEach(sqr => {
        if (sqr === '') {
            emptyCount++
        }
    })
    if (emptyCount) {
        return
    } 
    tie = true
    enableContinue()
}

// switch Player Turn
const switchPlayerTurn = () => {
    if (winner) {
        return
    } else if (turn === 'X') {
        turn = 'O'
    } else {
        turn = 'X'
    }
}

const handleClick = (event) => {
    const squareIndex = event.target.id
    if (board[squareIndex]) {
        return
    } else if (winner) {
        return
    }
    placePiece(squareIndex)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    render()
}

// cleaning the board to continue playing
const continueGame = () => {
    board = [
        '', '', '',
        '', '', '', 
        '', '', '',
    ]
    winner = false
    tie = false
    switchPlayerTurn()
    render()
    resetSquares()
    disableContinue()
}



/*----------------------------- Event Listeners -----------------------------*/

boardEl.addEventListener('click', handleClick)
resetBtnEl.addEventListener('click', init)
contBtnEl.addEventListener('click', continueGame)
