const container = document.querySelector(".container");
const resetBtn = document.querySelector(".reset");
const submitBtn = document.querySelector(".submitBtn");
const scores = document.querySelector(".scores");
const score1 = document.querySelector(".score1");
const score2 = document.querySelector(".score2");
const form = document.querySelector("form");
let player1;
let player2;
let winner;
let gameState = true;

const Player = (name, mark, score = 0) => {
  return { name, mark, score };
};
// set players
submitBtn.addEventListener("click", (e) => setPlayers(e));

const setPlayers = (data) => {
  const player1Name = document.querySelector(".player1Name");
  const player2Name = document.querySelector(".player2Name");

  data.preventDefault();
  let formData = new FormData(form);
  let players = {};
  for (const data of formData) {
    players[data[0]] = data[1];
  }
  player1 = Player(players.player1, players.player1Mark);
  player2 = Player(players.player2, players.player2Mark);
  if (players.player1 === players.player2) {
    return alert("both players can't have the same name!");
  } else if (players.player1Mark === players.player2Mark) {
    return alert("both players can't have the same Mark!");
  }
  player1Name.textContent = player1.name + ": ";
  player2Name.textContent = player2.name + ": ";
  scores.classList.toggle("hidden");
  form.classList.toggle("hidden");
  container.classList.toggle("hidden");
  Game(player1, player2);
};

//!SET GAME
const Game = (player1, player2) => {
  //variables
  const box = document.querySelectorAll(".box");
  let tempArr1 = [];
  let tempArr2 = [];
  let playerTurn = true;

  box.forEach((element) => {
    element.addEventListener("click", (e) => addMark(e));
  });

  //player make marks by clicking on it
  const addMark = (e) => {
    let player;

    //change turns
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
      board[index] = e.target.firstChild.textContent;
    };

    const winConditions = (box, board, player) => {
      if (player) {
        if (player.mark === "x") {
          tempArr1.push(parseInt(box.id));
          checkWin(tempArr1);
        } else if (player.mark === "o") {
          tempArr2.push(parseInt(box.id));
          checkWin(tempArr2);
        }
      }
    };
    //WIN LOGIC
    const checkWin = (arr) => {
      const rows = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ];
      const cols = [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ];
      const cross = [
        [0, 4, 8],
        [2, 4, 6],
      ];
      const winCons = [...rows, ...cols, ...cross];
      if (!gameBoard.board.includes(undefined)) {
        gameState = false;
        winner = null;
        alert("it's a tie!");
        updateScores();
        restart();
      } else {
        for (const winCon of winCons) {
          if (checkWin(winCon, arr)) {
            gameState = false;
            winner = player;
            player.score++;
            updateScores();
            restart();
          }
        }
      }

      function checkWin(row, arr) {
        return row.every((value) => {
          return arr.includes(value);
        });
      }
    };

    const updateScores = () => {
      score1.textContent = player1.score;
      score2.textContent = player2.score;
    };
    //RESTART FUNCTIONS
    const restart = () => {
      const playAgain = () => {
        resetBtn.classList.toggle("hidden");
        resetBtn.addEventListener("click", resetGame);
      };

      const resetGame = () => {
        container.innerHTML = "";
        gameBoard.board = new Array(9);
        gameBoard.addSquares(gameBoard.board);
        resetBtn.className += " hidden";
        Game(player1, player2);
        updateScores();
        return (gameState = true);
      };

      if (player1.score >= 3 || player2.score >= 3) {
        playAgain();
        const winner = document.createElement("h2");
        winner.className = "winner";
        winner.innerHTML = `${player.name} wins! Click reset to start a new game!`;
        container.append(winner);
        player1.score = player2.score = 0;

        return (gameState = false);
      } else {
        if (winner) {
          const winner = document.createElement("h2");
          winner.className = "winner";
          winner.innerHTML = `${player.name} wins!`;
          container.append(winner);
        }
        return playAgain();
      }
    };

    while (gameState) {
      let box = e.target.firstChild;

      if (!box.textContent) {
        let board = gameBoard.board;
        changePlayer();
        box.textContent = player.mark;
        updateBoard(board);
        winConditions(box.parentElement, board, player);
        return;
      } else {
        return alert("Illegal move!");
      }
    }
  };
};

// SET GAMEBOARD FOR FIRST GAME
const gameBoard = (() => {
  let board = new Array(9);
  const addSquares = (board) => {
    for (let [index, value] of board.entries()) {
      let box = document.createElement("div");
      let text = document.createElement("p");
      box.setAttribute("id", `${index}`);
      box.className = "box";
      text.classList = "text";
      container.appendChild(box);
      box.appendChild(text);
    }
  };
  addSquares(board);

  return { board, addSquares };
})();
