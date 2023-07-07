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

    return {getBoard, changeCell}

};

function Player(name, symbol) {
    return {name, symbol};
}

function gameController() {

    const player1 = Player("first", 1);
    const player2 = Player("second", 2);
    const board = gameBoard();
    const actualBoard = board.getBoard();

    let activePlayer = player1;

    const switchTurn = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    };

    const addSymbol = (row, column) => {
        board.changeCell(row, column, activePlayer.symbol);

        if(actualBoard[0][0] == 1 && actualBoard[0][1] == 1 && actualBoard[0][2] == 1)  {
            return true;
        }


        switchTurn();
    }

    const getActivePlayer = () => activePlayer;

    return {
        addSymbol,
        getActivePlayer,
        getBoard : board.getBoard
    }

};

function screenController() {
    
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
        console.log(board);
        const cells = document.querySelectorAll(".cell");

        cells.forEach(cellDiv => {
            cellDiv.addEventListener("click", (e) => {
                const row = cellDiv.dataset.row;
                const column = cellDiv.dataset.column;
                gameState = game.addSymbol(row, column);
                displayBoard();
            })
        });
    }   

    displayBoard();

};

screenController();