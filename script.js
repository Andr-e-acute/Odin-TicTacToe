// GameBoard object  module store
const GameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const htmlBoard = document.querySelector("#gameboard");

  // click handler
  // ? move to  game flow logic
  function clickHandler() {
    const playerSymbol = "x";
    this.innerText = playerSymbol; //
    board[this.dataset.index] = playerSymbol;
  }

  // display board
  function render() {
    htmlBoard.innerText = "";
    board.forEach((e, index) => {
      const field = document.createElement("div");
      field.className = "field";
      field.setAttribute("data-index", index);
      field.addEventListener("click", clickHandler, { once: true });
      htmlBoard.appendChild(field);
    });
  }

  return {
    render,
    board,
  };
})();

// Player objects factory
const createPlayer = (name, marker) => ({name, marker})

// game Flow / logic Object module
const Game = (() => {
  // ? decide what the user can do
  const players = [createPlayer("Player1","X"),createPlayer("Player2","O")];

})();

// render game board function maybe as a method in gameboard?

//

const startBTN = document.querySelector("#start");
startBTN.addEventListener("click", (e) => {
  console.log(e.target);
});
const restartBTN = document.querySelector("#restart");
restartBTN.addEventListener("click", () => {
  GameBoard.render();
});
