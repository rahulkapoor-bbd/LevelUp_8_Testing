let statusDisplay;

if (typeof window !== 'undefined'){
    console.log('Running in a browser today');
    statusDisplay = document.querySelector('.game--status');
    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
    document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
    
}else{
    console.log('Running local no screen bra');
}

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// statusDisplay.innerText = statusDisplay.innerText !== null ? currentPlayerTurn() : null;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex, isTest=false) {
    
    if(isTest){
        gameState[clickedCellIndex] = currentPlayer;
        return gameState;
    }
    
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;
}

function handlePlayerChange(isTest=false) {
    if (isTest){
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        return currentPlayer;
    }else{
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.innerText = currentPlayerTurn();
    }
    
}

function handleResultValidation(isTest=false, setGameState=null) {
    
    if(setGameState){
        gameState = setGameState
    }

    let roundWon = false;
    for(let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];
        if(a === '' || b === '' || c === '')
            continue;
        if(a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if(isTest){
        return roundWon;
    }

    if(roundWon) {
        statusDisplay.innerText = winningMessage();
        gameActive = false;
        return;
    }

    const roundDraw = !gameState.includes("");
    if(roundDraw) {
        statusDisplay.innerText = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if(gameState[clickedCellIndex] !== "" || !gameActive)
        return;

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame(isTest=false) {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    
    if(isTest===true){
        return gameState
    }

    statusDisplay.innerText = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = "");
}

if (typeof window === 'undefined'){
    module.exports={
        handleCellPlayed,
        handlePlayerChange,
        handleResultValidation,
        handleRestartGame
    }
}
