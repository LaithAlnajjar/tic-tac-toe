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

    let activePlayer = player1;

    const switchTurn = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    };

    const addSymbol = () => {
        gameBoard.changeCell(row, column, activePlayer);
    }

};

function screenController() {
    
    const container = document.querySelector(".container");
    const board = gameBoard.getBoard()


    const displayBoard = () => {

        container.textContent = "";

        board[row].forEach(row => {
            row.forEach(element => {

                const cell = document.createElement("div");
                cell.classList.add("cell");

                if(element == 0) {
                    cell.textContent = "";
                } else if ( element == 1){
                    cell.textContent = "X";
                } else {
                    cell.textContent = "O";
                }

                container.append(cell);

            })
        })

    }


};

