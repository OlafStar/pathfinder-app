import Node from 'components/Node/Node';
import React, { useEffect, useState } from 'react';
import { GridWrapper, PathfinderWrapper, Wrapper } from './Pathfinder.style';
import { dijkstra, getNodesInShortestPathOrder } from 'algorithms/dijkstra';
import Menu from 'components/Menu/Menu';

let START_NODE_ROW = 10;
let START_NODE_COL = 15;
let FINISH_NODE_ROW = 10;
let FINISH_NODE_COL = 35;

const getPageGrid = () => {
  const nodesArr = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    nodesArr.push(currentRow);
  }
  return nodesArr;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWall = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridWithStart = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const startNode = newGrid[START_NODE_ROW][START_NODE_COL];
  const oldNode = {
    ...startNode,
    isStart: !startNode.isStart,
  };
  let newNode = {
    ...node,
    isStart: !node.isStart,
  };
  if (newNode.isWall) {
    newNode = {
      ...newNode,
      isWall: !newNode.isWall,
    };
  }
  newGrid[START_NODE_ROW][START_NODE_COL] = oldNode;
  newGrid[row][col] = newNode;
  START_NODE_ROW = row;
  START_NODE_COL = col;
  return newGrid;
};

const getNewGridWithFinish = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const startNode = newGrid[FINISH_NODE_ROW][FINISH_NODE_COL];
  const oldNode = {
    ...startNode,
    isFinish: !startNode.isFinish,
  };
  let newNode = {
    ...node,
    isFinish: !node.isFinish,
  };
  if (newNode.isWall) {
    newNode = {
      ...newNode,
      isWall: !newNode.isWall,
    };
  }
  newGrid[FINISH_NODE_ROW][FINISH_NODE_COL] = oldNode;
  newGrid[row][col] = newNode;
  FINISH_NODE_ROW = row;
  FINISH_NODE_COL = col;
  return newGrid;
};

const Pathfinder = () => {
  const [grid, setGrid] = useState([]);
  const [mousePress, setMousePress] = useState(false);
  const [start, setStart] = useState(false);
  const [finish, setFinish] = useState(false);

  useEffect(() => {
    const grid = getPageGrid();
    setGrid(grid);
  }, []);

  const mouseDown = (row, col) => {
    let newGrid;
    if (!start && !finish) {
      newGrid = getNewGridWithWall(grid, row, col);
    } else if (start) {
      newGrid = getNewGridWithStart(grid, row, col);
      setStart(false);
    } else if (finish) {
      newGrid = getNewGridWithFinish(grid, row, col);
      setFinish(false);
    }
    setGrid(newGrid);
    setMousePress(true);
  };

  const mouseEnter = (row, col) => {
    if (!mousePress) return;
    const newGrid = getNewGridWithWall(grid, row, col);
    setGrid(newGrid);
  };

  const mouseUp = () => {
    setMousePress(false);
  };

  const animateDijkstra = (visitedNodesInOrder, nodesInShorterPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShorterPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).classList.add(`node-visited`);
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShorterPathOrder) => {
    for (let i = 0; i < nodesInShorterPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShorterPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).classList.add('node-shortest-path');
      }, 50 * i);
    }
  };

  const visualizeDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  return (
    <PathfinderWrapper>
      <Menu visualizeDjikstra={visualizeDijkstra} setStart={setStart} setFinish={setFinish}></Menu>
      <Wrapper>
        <GridWrapper>
          {grid.map((row, rowI) => {
            return (
              <div key={rowI}>
                {row.map((node, nodeI) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeI}
                      col={col}
                      row={row}
                      isStart={isStart}
                      isFinish={isFinish}
                      isWall={isWall}
                      mousePress={mousePress}
                      onMouseDown={(row, col) => mouseDown(row, col)}
                      onMouseEnter={(row, col) => mouseEnter(row, col)}
                      onMouseUp={() => mouseUp()}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </GridWrapper>
      </Wrapper>
    </PathfinderWrapper>
  );
};

export default Pathfinder;
