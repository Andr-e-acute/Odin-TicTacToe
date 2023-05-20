// GameBoard object  module store
const GameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const htmlBoard = document.querySelector("#gameboard");

  function resetBoard() {
    for (let index = 0; index < board.length; index++) {
      board[index] = "";
    }
  }
  // click handler
  // ? move to  game flow logic
  function clickHandler(event) {
    event.target.innerText = Game.activeMark(); //
    board[event.target.dataset.index] = Game.activeMark();
    Game.nextPlayer();
    checkForWin(board);
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
    resetBoard,
    // todo delete
    board,
  };
})();

// Player objects factory
const createPlayer = (name, mark) => ({ name, mark });

// game Flow / logic Object module
const Game = (() => {
  let players = [];
  let activePlayer = 0;
  // counter for turns only need to check for win after 5 and draw ==9

  function start() {
    players = [
      createPlayer(document.querySelector("#player1").value, "X"),
      createPlayer(document.querySelector("#player2").value, "O"),
    ];

    GameBoard.render();
  }

  const activeMark = () => players[activePlayer].mark;

  // use turns?
  const nextPlayer = () => {
    activePlayer = activePlayer === 0 ? 1 : 0;
  };
  const getPlayer = () => players[activePlayer].name;
  return {
    activeMark,
    nextPlayer,
    start,
    getPlayer,
  };
})();

function checkForWin(board) {
  function threeOfKind(first, second, third) {
    if (first === "") {
      return;
    }
    if (first === second && first === third) {
      document.querySelector(".gameMessage").textContent = `${Game.getPlayer()} won the Game`;
    }
  }

  for (let i = 0; i < 3; i += 1) {
    // check columns
    threeOfKind(board[i], board[i + 3], board[i + 6]);
    // check rows
    threeOfKind(board[i * 3], board[i * 3 + 1], board[i * 3 + 2]);
  }
  // cross
  threeOfKind(board[0], board[4], board[8]);
  threeOfKind(board[2], board[4], board[6]);
}

const startBTN = document.querySelector("#start");
startBTN.addEventListener("click", (e) => {
  Game.start();
});
const restartBTN = document.querySelector("#restart");
restartBTN.addEventListener("click", () => {
  Game.start();
  GameBoard.resetBoard();
});
