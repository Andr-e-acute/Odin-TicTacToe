/* eslint-disable no-use-before-define */
// TODO clean this file

// round based logic? X starts first.
// i think i need rounds for minmax.

// eslint-disable-next-line import/extensions
import { createMark } from "./marks.js";
// live server don't work without .js eslint hates it

const GameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
   function resetBoard() {
    for (let index = 0; index < board.length; index += 1) {
      board[index] = "";
    }
  }
  return {
    resetBoard,
    board,
  };
})();

const DisplayController = (() => {
  const htmlBoard = document.querySelector("#gameboard");

  function createHtmlBoard() {
    htmlBoard.innerText = "";
    GameBoard.board.forEach((_, index) => {
      const field = document.createElement("div");
      field.className = "field";
      field.setAttribute("data-index", index);
      field.addEventListener("click", Game.clickedField, { once: true });
      htmlBoard.appendChild(field);
    });
  }

  return {
    createHtmlBoard,
  };
})();
// Player objects factory
const createPlayer = (name, mark) => ({ name, mark });

// game Flow / logic Object module
const Game = (() => {
  let players = [];
  let activePlayer = 0;
  // let counter=0
  // counter for turns only need to check for win after 5 and draw ==9

  function start() {
    players = [
      createPlayer(document.querySelector("#player1").value, "X"),
      createPlayer(document.querySelector("#player2").value, "O"),
    ];
    DisplayController.createHtmlBoard();
  }

  function clickedField(event) {
    event.target.appendChild(createMark(Game.activeMark()));
    GameBoard.board[event.target.dataset.index] = Game.activeMark();
    Game.nextPlayer();
    checkForWin(GameBoard.board);
  }
  function removeClickedField(){
    const fields =document.querySelectorAll(".field")
    fields.forEach((field)=>{
      field.removeEventListener("click", Game.clickedField)
    })
  }
  const activeMark = () => players[activePlayer].mark;

 
  const nextPlayer = () => {
    activePlayer = activePlayer === 0 ? 1 : 0;
  };
  const getPlayer = () => players[activePlayer].name;
 
  function checkForWin(board) {
    function threeOfKind(first, second, third) {
      if (first === "") {
        return;
      }
      if (first === second && first === third) {
        document.querySelector(
          ".gameMessage"
        ).textContent = `${Game.getPlayer()} won the Game`;
        removeClickedField()
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

  return {
    activeMark,
    nextPlayer,
    start,
    getPlayer,
    clickedField,
  };
})();

const startBTN = document.querySelector("#start");
startBTN.addEventListener("click", () => {
  Game.start();
});

const restartBTN = document.querySelector("#restart");
restartBTN.addEventListener("click", () => {
  Game.start();
  GameBoard.resetBoard();
  document.querySelector(".gameMessage").textContent = "";
});
