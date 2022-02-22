import styled from 'styled-components';

export const Square = styled.div`
  width: 25px;
  height: 25px;
  outline: 1px solid grey;
  display: inline-block;
  &.node-start {
    background-color: red;
  }
  &.node-finish {
    background-color: green;
  }
  &.node-visited {
    animation-name: visited;
    animation-duration: 1.5s;
    animation-timing-function: ease-out;
    animation-delay: 0;
    animation-direction: alternate;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-play-state: running;
  }
  &.node-wall {
    background-color: black;
  }
  &.node-shortest-path {
    animation-name: shortest;
    animation-duration: 1.5s;
    animation-timing-function: ease-out;
    animation-delay: 0;
    animation-direction: alternate;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-play-state: running;
  }
  @keyframes visited {
    0% {
      background-color: rgba(36, 47, 191, 0.75);
      border-radius: 100%;
      transform: scale(0.7);
    }

    50% {
      background-color: rgba(51, 57, 138, 0.75);
      transform: scale(0.9);
    }

    75% {
      background-color: rgba(83, 89, 173, 0.75);
    }

    100% {
      background-color: rgba(120, 129, 250, 0.75);
      transform: scale(1);
    }
  }
  @keyframes shortest {
    0% {
      background-color: rgb(255, 254, 106);
    }

    50% {
      background-color: rgb(255, 254, 106);
    }

    100% {
      background-color: rgb(255, 254, 106);
    }
  }
`;
