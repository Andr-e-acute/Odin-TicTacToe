import { Omark, Xmark } from "./svg.js";
// console.log(Xmark[0])
// console.log(Omark[0])
// GameBoard object  module store
const GameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const htmlBoard = document.querySelector("#gameboard");

  function resetBoard() {
    for (let index = 0; index < board.length; index += 1) {
      board[index] = "";
    }
  }
  // click handler
  // ? move to  game flow logic
  function clickHandler(event) {
    // event.target.innerText = Game.activeMark(); //
    event.target.appendChild(createMark());

    board[event.target.dataset.index] = Game.activeMark();
    Game.nextPlayer();
    checkForWin(board);
  }
  function createMark() {
    const markArr=(Game.activeMark()==="X")?Xmark:Omark;
    const randomNum=Math.floor(Math.random() * markArr.length)
    return createSvg(markArr[randomNum]);
  }
  function createSvg(arr) {
    const iconSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );

    iconSvg.setAttribute("width", "180");
    iconSvg.setAttribute("height", "180");

    // x mark needs more then one path

    arr.forEach((obj) => {
      const iconPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      iconPath.setAttribute("stroke-linecap", "round");
      iconPath.setAttribute("stroke-linejoin", "round");
      iconPath.setAttribute("fill", "none");
      // only these attribute will be different
      iconPath.setAttribute("d", `${obj.d}`);
      iconPath.setAttribute("stroke-width", `${obj.strokeWidth}`);
      iconPath.setAttribute("stroke", `${obj.stroke}`);

      iconSvg.appendChild(iconPath);
    });
    return iconSvg;
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

//

function checkForWin(board) {
  function threeOfKind(first, second, third) {
    if (first === "") {
      return;
    }
    if (first === second && first === third) {
      document.querySelector(
        ".gameMessage"
      ).textContent = `${Game.getPlayer()} won the Game`;
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
