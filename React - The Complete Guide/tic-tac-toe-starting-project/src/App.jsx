import { useState } from 'react';

import Player from './components/Player/Player';
import GameBoard from './components/GameBoard/GameBoard';
import Log from './components/Log/Log';
import GameOver from './components/GameOver/GameOver.jsx';

import { WINNING_COMBINATIONS } from './winning-combinations.js';

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
};

const computeGameBoard = (turns) => {
  let gameBoard = [...INITIAL_GAME_BOARD.map((row) => [...row])];

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
};

const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
};

const checkForWinner = (board, players) => {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstCellSymbol = board[combination[0].row][combination[0].column];
    const secondCellSymbol = board[combination[1].row][combination[1].column];
    const thirdCellSymbol = board[combination[2].row][combination[2].column];

    if (
      firstCellSymbol &&
      firstCellSymbol === secondCellSymbol &&
      firstCellSymbol === thirdCellSymbol
    ) {
      winner = players[firstCellSymbol];
    }
  }

  return winner;
};

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = computeGameBoard(gameTurns);

  const winner = checkForWinner(gameBoard, players);

  const hasDraw = !winner && gameTurns.length === 9;

  const handleSelectSquare = (row, col) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {
          square: {
            row,
            col,
          },
          player: currentPlayer,
        },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  };

  const handleRestart = () => {
    setGameTurns([]);
  };

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  };

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player
            initialName={PLAYERS.X}
            symbol='X'
            isActive={activePlayer === 'X'}
            onSave={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol='O'
            isActive={activePlayer === 'O'}
            onSave={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRematch={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
