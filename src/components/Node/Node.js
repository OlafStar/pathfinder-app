import React from 'react';
import { Square } from './Node.style';

const Node = ({ col, row, isStart, isFinish, isWall, onMouseDown, onMouseEnter, onMouseUp }) => {
  const extraClassName = isFinish ? 'node-finish' : isStart ? 'node-start' : isWall ? 'node-wall' : '';
  return (
    <Square
      id={`node-${row}-${col}`}
      className={`${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    ></Square>
  );
};

export default Node;
