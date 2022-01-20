import { useState } from 'react';
import styles from '../styles/styles.module.css';

function Square(props) {
  return (
    <button className={styles.square} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Board(props) {
  function renderSquare(i) {
    return <Square value={props.data[i]} onClick={() => props.onClick(i)} />;
  }

  return (
    <div>
      <div className={styles.status}></div>
      <div className={styles.boardRow}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className={styles.boardRow}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className={styles.boardRow}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [data, setData] = useState(Array(9).fill(null));

  const handleStatus = () => {
    const winner = calculateWinner(data);
    let status;
    if (winner) {
      status = 'Winner is ' + winner;
    } else {
      status = 'Next Player is ' + (xIsNext ? 'X' : 'O');
    }
    return status;
  };

  const handleClick = (i) => {
    const temp = data.slice();
    if (calculateWinner(data) || data[i]) {
      return;
    } else {
      temp[i] = xIsNext ? 'X' : '0';
      console.log(temp[i]);
      setData(temp);
      setXIsNext(!xIsNext);
    }
  };
  return (
    <div className={styles.game}>
      <div>
        <Board data={data} onClick={(i) => handleClick(i)} />
      </div>
      <div className={styles.status}>{handleStatus()}</div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
