const gameBoard = (() => {
  let board = new Array(9);
  let container = document.querySelector(".container");

  const addSquares = (board) => {
    container.innerHTML = "";
    for (let [index, value] of board.entries()) {
      let box = document.createElement("div");
      box.setAttribute("id", `${index}`);
      box.className = "box";
      container.appendChild(box);
    }
  };
  addSquares(board);
  return { board };
})();

const Player = (name, mark, score) => {
  return { name, mark, score };
};

const game = (() => {
  const player1 = Player("bill", "x", 0);
  const player2 = Player("kim", "o", 0);
  const box = document.querySelectorAll(".box");
  let playerTurn = true;

  box.forEach((element) => {
    element.addEventListener("click", (e) => addMark(e));
  });

  const addMark = (e) => {
    let player;

    const changePlayer = () => {
      if (playerTurn) {
        player = player1;
      } else {
        player = player2;
      }
      return (playerTurn = !playerTurn);
    };
    changePlayer();

    return (e.target.textContent = player.mark);
  };
})();
