const container = document.querySelector(".container");
const resetBtn = document.querySelector(".reset");
let gameState = true;

const Player = (name, mark, score) => {
  return { name, mark, score };
};
// set players

const player1 = Player("bill", "x", 0);
const player2 = Player("kim", "o", 0);

//set game
const Game = (player1, player2) => {
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

    const updateBoard = (board) => {
      let index = parseInt(e.target.id);
      board[index] = e.target.textContent;
    };

    const winConditions = (board, player) => {
      const _checkForRows = (board) => {
        for (let i = 0; i < 3; i++) {
          let row = [];
          for (let j = i * 3; j < i * 3 + 3; j++) {
            console.log(j);
            row.push(board.getField(j));
          }

          if (
            row.every((field) => field == "X") ||
            row.every((field) => field == "O")
          ) {
            return true;
          }
        }
        return false;
      };

      _checkForRows(board);
      if (!board.includes(undefined)) {
        alert("it's a tie!");
        resetBtn.classList.toggle("hidden");
        resetBtn.addEventListener("click", (e) => resetGame(gameBoard.board));
        gameState = false;
      }

      const checkColumns = (board) => {};
    };

    const resetGame = () => {
      let board = (gameBoard.board = new Array(9));
      container.innerHTML = "";
      gameBoard.addSquares(board);
      resetBtn.classList.toggle("hidden");
      Game(player1, player2);
      return (gameState = true);
    };

    while (gameState) {
      if (!e.target.textContent) {
        let board = gameBoard.board;
        changePlayer();
        e.target.textContent = player.mark;
        updateBoard(board);
        winConditions(board, player);
        return;
      } else {
        return alert("Illegal move!");
      }
    }
  };
};

// set gameBoard
const gameBoard = (() => {
  let board = new Array(9);
  const addSquares = (board) => {
    for (let [index, value] of board.entries()) {
      let box = document.createElement("div");
      box.setAttribute("id", `${index}`);
      box.className = "box";
      container.appendChild(box);
    }
  };
  addSquares(board);
  Game(player1, player2);
  return { board, addSquares };
})();
