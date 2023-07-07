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


    return {getBoard, changeCell, checkCellEmpty}

};

function Player(name, symbol) {

    let score = 0;

    const incrementScore = ()=> {
        this.score++;
    }

    return {name, symbol, incrementScore, score};
}

function gameController() {

    const player1 = Player("first", 1);
    const player2 = Player("second", 2);

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
            incrementScore(activePlayer);
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
    }

    return {
        addSymbol,
        getActivePlayer,
        getBoard : board.getBoard
    }

};

const screenController = (() =>{
    
    const container = document.querySelector(".board-container");
    const game = gameController();
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

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
                const row = cellDiv.dataset.row;
                const column = cellDiv.dataset.column;
                let gameState = game.addSymbol(row, column);
                if(gameState == "win") {
                    displayFinalBoard();
                    console.log("win");
                } else if (gameState =="draw"){
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
startButton.addEventListener("click", (e) => {
    startMenuContainer.style.display = "none";
});


    displayBoard();

})();