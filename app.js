function gameBoard() {

    const board = [];

    for(let i = 0; i < 3; i++) {
        board[i] = [];
        for(let j = 0; j < 3; j++)
            board[i][j] = 0;
    };

    const getBoard = () => board;

    const changeCell = (row, column, symbol) => {
        board[row][column] = symbol;
    };

    const checkCellEmpty = (row, column) => {
        if(board[row][column] != 0) {
        return false;
        }
        else {
            return true;
        }
    }

    const clearBoard = () => {
        for(let i = 0; i < 3; i++) {
            board[i] = [];
            for(let j = 0; j < 3; j++)
                board[i][j] = 0;
        };
    }

    return {getBoard, changeCell, checkCellEmpty, clearBoard}

};

function Player(name, symbol) {

    let score = 0;

    const incrementScore = ()=> {
        this.score++;
    }

    return {name, symbol, incrementScore, score};
}

function gameController() {

    const player1 = Player("Player 1", 1);
    const player2 = Player("Player 2", 2);

    function changePlayerName(name1, name2) {
        player1.name = name1;
        player2.name = name2;

        const firstNameBox = document.querySelector(".first1");
        const secondNameBox = document.querySelector(".second2");
        
        console.log(firstNameBox);

        firstNameBox.textContent = player1.name;
        secondNameBox.textContent = player2.name;
    }

    function getPlayerScores() {
        return [player1.score, player2.score]
    };

    const startNewGame = () => {
        counter = 0;
        board.clearBoard();
    }

    const board = gameBoard();
    const actualBoard = board.getBoard();
    let counter = 0;
    let activePlayer = player1;

    const switchTurn = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    };

    const addSymbol = (row, column) => {
        if(!(board.checkCellEmpty(row, column))) {
            return;
        }
        counter++
        board.changeCell(row, column, activePlayer.symbol);
        if(checkWin() === "win") {
            activePlayer.score++;
            console.log(activePlayer.score);
            return "win";
        }

        if(counter == 9) {
            counter = 0;
            return "draw";
        }

        switchTurn();
    }

    const getActivePlayer = () => activePlayer;

    const checkWin = () => {
        for(let i = 0; i < 3; i++) {
            if(actualBoard[i][0] == 1 && actualBoard[i][1] == 1 && actualBoard[i][2] == 1) {
                return "win";
            }
        };

        for(let i = 0; i < 3; i++) {
            if(actualBoard[i][0] == 2 && actualBoard[i][1] == 2 && actualBoard[i][2] == 2 ) {
                return "win";
            }
        };

        for(let i = 0; i < 3; i++) {
            if(actualBoard[0][i] == 1 && actualBoard[1][i] == 1 && actualBoard[2][i] == 1 ) {
                return "win";
                
            }
        };

        for(let i = 0; i < 3; i++) {
            if(actualBoard[0][i] == 2 && actualBoard[1][i] == 2 && actualBoard[2][i] == 2 ) {
                return "win";
            }
        };
        
        if(actualBoard[1][1] == 1 && actualBoard[2][2] == 1 && actualBoard[0][0] == 1) {
            return "win";
        }
        

        if(actualBoard[0][2] == 1 && actualBoard[1][1] == 1 && actualBoard[2][0] == 1) {
            return "win";
        }

        if(actualBoard[1][1] == 2 && actualBoard[2][2] == 2 && actualBoard[0][0] == 2) {
            return "win";
        }
        

        if(actualBoard[0][2] == 2 && actualBoard[1][1] == 2 && actualBoard[2][0] == 2) {
            return "win";
        }
    }

    return {
        addSymbol,
        getActivePlayer,
        getBoard : board.getBoard,
        changePlayerName,
        startNewGame,
        getPlayerScores
    }

};

const screenController = (() =>{
    
    const messageBox = document.querySelector(".message");
    const container = document.querySelector(".board-container");
    const game = gameController();
    const board = game.getBoard();
    let activePlayer = game.getActivePlayer();

    const displayBoard = () => {

        container.textContent = "";

        board.forEach((row, i) => {
            row.forEach((element, j) => {

                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.column = j;
                cell.dataset.row = i;
                if(element == 0) {
                    cell.textContent = "";
                } else if ( element == 1){
                    cell.textContent = "X";
                } else {
                    cell.textContent = "O";
                }
                container.append(cell);

            });
        });
        const cells = document.querySelectorAll(".cell");

        cells.forEach(cellDiv => {
            cellDiv.addEventListener("click", (e) => {
                messageBox.textContent = "New Round!";
                const row = cellDiv.dataset.row;
                const column = cellDiv.dataset.column;
                let gameState = game.addSymbol(row, column);
                if(gameState == "win") {
                    displayFinalBoard();
                    updateScore(game.getPlayerScores()[0], game.getPlayerScores()[1]);
                    console.log("win");
                } else if (gameState =="draw"){
                    messageBox.textContent = "It's a tie!";
                    displayFinalBoard();
                    console.log("draw");
                } else {
                    displayBoard();
                }
            })
        });
    }   

const displayFinalBoard = () => {
    container.textContent = "";

        board.forEach((row, i) => {
            row.forEach((element, j) => {

                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.column = j;
                cell.dataset.row = i;
                if(element == 0) {
                    cell.textContent = "";
                } else if ( element == 1){
                    cell.textContent = "X";
                } else {
                    cell.textContent = "O";
                }
                container.append(cell);

            });
        });
}

const startButton = document.querySelector(".start-game");
const startMenuContainer = document.querySelector(".start-menu");
const firstNameForm = document.querySelector(".one");
const secondNameForm = document.querySelector(".two");
const firstNameInput = document.querySelector("#player1Name");
const secondNameInput = document.querySelector("#player2Name");
const restartButton = document.querySelector(".restart-button");
const firstScore = document.querySelector(".score1");
const secondScore = document.querySelector(".score2");


startButton.addEventListener("click", (e) => {

    if(firstNameForm.checkValidity() == false || secondNameForm.checkValidity() == false) {
        firstNameForm.reportValidity();
        secondNameForm.reportValidity();
        return;
    }

    startMenuContainer.style.display = "none";
    game.changePlayerName(firstNameInput.value, secondNameInput.value);


});

const updateScore = (score1,score2) => {
    activePlayer = game.getActivePlayer();
    firstScore.textContent = score1;
    secondScore.textContent =score2;
    messageBox.textContent = activePlayer.name + " has won the round!";
}



restartButton.addEventListener("click", (e)=> {
    game.startNewGame();
    displayBoard();
})

    displayBoard();

})();