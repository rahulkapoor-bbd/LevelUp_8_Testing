const { handleCellPlayed, handlePlayerChange, handleResultValidation, handleRestartGame } = require('../script')

// Test state update
// Test player change
// result validation, no win and win
// check restart, does it reset the state 

describe("Click to place X/O", ()=>{
  it("Should up selected cell with current player value", ()=>{

    let gameState = ["", "", "", "", "X", "", "", "", ""];
    clickedCell = null;
    clickedCellIndex = 4;
    currentPlayer = "X";
    isTest = true;

    let result = handleCellPlayed(clickedCell, clickedCellIndex, isTest);
    
    expect(result[clickedCellIndex]).toBe(gameState[clickedCellIndex]);
    
    expect(result).toEqual(gameState);
    console.log("Test passed")
  })
})

describe("Change player turn", ()=>{
  it('Should change to player Y', ()=>{

    currentPlayer = handlePlayerChange(true);
    
    expect(currentPlayer).toBe("O");

  })
})

describe("Game not won", ()=>{
  it("Should evaluate to no win", ()=>{
    roundWon = handleResultValidation(true);
    expect(roundWon).toBe(false)
  })
})

describe("Game won", ()=>{
  it("Should return a win result", ()=>{
    let gameState = ["X", "X", "X", "", "O", "O", "", "", "O"];
    roundWon = handleResultValidation(true, gameState);
    expect(roundWon).toBe(true);
  })
})

describe("Game reset", ()=>{
  it("Should reset the array", ()=>{
    let resetState = ["", "", "", "", "", "", "", "", ""];
    let gameState = handleRestartGame(true);
    expect(gameState).toEqual(resetState);
  })
})