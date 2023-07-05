const boxes = document.querySelectorAll(".box");


const gameBoard = (() => {

    board = ["X","O","X","O","X","O","X","O","X"];

    const display = (index, symbol) => {
        boxes.forEach(box => {
            if(box.dataset.index == index) {
                box.textContent = symbol;
            };
        });

    }
    return {
        board,
        display
    };

})();


const playerFactory = (symbol, score) => {
    return {symbol, score};
  };


const game = (() => {

    const eraseBoard = () => {
        boxes.forEach(box => {
            box.textContent = "";
    })};

    const startNewGame = () => {
        eraseBoard();
    }

    return {
        startNewGame,
    }

})();
  
boxes.forEach(box => {
    if(box.textContent == "")
        box.addEventListener("click", (e) => {
            let index = box.dataset.index;
            console.log
            gameBoard.display(index, "O");
        })
})