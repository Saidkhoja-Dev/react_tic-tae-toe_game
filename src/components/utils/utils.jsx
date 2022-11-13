import { useState } from "react";

import "./utils.css";

export const Square = (props) => {
  const [value, setValue] = useState(null);
  return (
    <button className="square" onClick={props.onClickEvent}>
      {props.value}
    </button>
  );
};

export const Board = () => {
  const initialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquares);
  const [xIsNext, setXIsNext] = useState(true);
  const handleClickEvent = (i) => {
    const newSquares = [...squares];
    const winnerDeclared = Boolean(CalculateWinner(newSquares));
    const squaresFilled = Boolean(newSquares[i]);
    if (winnerDeclared || squaresFilled) {
      return;
    }
    newSquares[i] = xIsNext ? "X" : "O";

    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };
  const renderSquare = (i) => {
    return (
      <>
        <Square value={squares[i]} onClickEvent={() => handleClickEvent(i)} />
      </>
    );
  };

  const winner = CalculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <>
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </>
  );
};

export const Game = () => {
  return (
    <>
      <div className="game">
        Tic-Tac-Toe
        <Board />
      </div>
    </>
  );
};

function CalculateWinner(squares) {
  const lines = [
    [1, 2, 3], //rows
    [3, 4, 5], //rows
    [6, 7, 8], //rows

    [0, 3, 6], //columns
    [1, 4, 7], //columns
    [2, 5, 8], //columns

    [0, 4, 8], //diagonal
    [2, 4, 6], //diagonal
  ];
  for (let line of lines) {
    const [a, b, c] = line;

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
