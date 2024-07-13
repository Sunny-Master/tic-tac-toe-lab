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

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const boardEl = document.querySelector('.board')
const resetBtnEl = document.querySelector('#reset')
const contBtnEl = document.querySelector('#continue')

/*-------------------------------- Functions --------------------------------*/

const updateBoard = () => {
    board.forEach((box, idx) => {
        squareEls[idx].textContent = box
        
    });
}

const updateMessage = () => {
    if (winner === false && tie === false) {
        messageEl.textContent = `It's the turn of Player ${turn}. Please click on an empty square!`
    } else if (winner === false && tie) {
        messageEl.textContent = `It's a Tie!!`
    } else {
        messageEl.textContent = `Player ${turn} won! Congratulations!`
    }
}

const render = () => {
    updateBoard()
    updateMessage()
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
    render()
}
init()

//place Piece on the board
const placePiece = (index) => {
    board[index] = turn
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




/*----------------------------- Event Listeners -----------------------------*/

boardEl.addEventListener('click', handleClick)
resetBtnEl.addEventListener('click', init)

