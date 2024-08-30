import { useState } from 'react';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, turns }) {
  //   const [gameBoard, setGameBoard] = useState(initialGameBoard);

  //   const handleSelectSquare = (row, col) => {
  //     setGameBoard((prevGameBoard) => {
  //       // Since the state is of type array/object, should be updated in an
  //       // inmutable way (create a new copy).
  //       const nextGameBoard = [
  //         ...prevGameBoard.map((innerArrays) => [...innerArrays]),
  //       ];
  //       nextGameBoard[row][col] = activeSymbol;
  //       return nextGameBoard;
  //     });

  //     // Call function passed from parent component.
  //     onSelectSquare();
  //   };

  let gameBoard = initialGameBoard;

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return (
    <ol id='game-board'>
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
