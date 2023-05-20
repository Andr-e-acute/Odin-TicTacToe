// GameBoard object  module store
const GameBoard = (() => {
  let board =["", "", "", "", "", "", "", "", ""];
  
  const htmlBoard = document.querySelector("#gameboard");

  function resetBoard(){
   for (let index = 0; index < board.length; index++) {
    board[index]= "";
    
   }
  }
  // click handler
  // ? move to  game flow logic
  function clickHandler(event) {

    event.target.innerText = Game.activeMark(); //
    board[event.target.dataset.index] = Game.activeMark();
    Game.nextPlayer();
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
    board
  };
})();

// Player objects factory
const createPlayer = (name, mark) => ({ name, mark });

// game Flow / logic Object module
const Game = (() => {

  let players = [];
  let activePlayer = 0;


  function start() {
    players = [
      createPlayer(document.querySelector("#player1").value, "X"), 
      createPlayer(document.querySelector("#player2").value, "O")]
    
    GameBoard.render()
  }

  const activeMark = () => players[activePlayer].mark;

  const nextPlayer = () => {
    activePlayer = activePlayer === 0 ? 1 : 0;
  };

 
  return {
    activeMark,
    nextPlayer,
    start
  };
})();



const startBTN = document.querySelector("#start");
startBTN.addEventListener("click", (e) => {
  Game.start()
});
const restartBTN = document.querySelector("#restart");
restartBTN.addEventListener("click", () => {
  Game.start();
  GameBoard.resetBoard()
});
