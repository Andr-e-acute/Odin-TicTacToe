// GameBoard object  module store
const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  // display board
  const displayBoard = document.querySelector("#gameboard");
  board.forEach((element, index) => {
    const field = document.createElement("div");
    field.className = "field";
    field.setAttribute("data-index", index);
    
    // is there a better place for this?
    field.addEventListener("click", (event) => {
      console.log(event.target);
    });

    displayBoard.appendChild(field);
  });

  return {
    board,
  };
})();

// Player objects factory

// displayController

// game Flow Object module
const game = (() => {})();

// render game board function maybe as a method in gameboard?

//

const startBTN = document.querySelector("#start");
startBTN.addEventListener("click", (e) => {
  console.log(e.target);
});
const restartBTN = document.querySelector("#restart");
restartBTN.addEventListener("click", (e) => {
  console.log(e.target);
});
