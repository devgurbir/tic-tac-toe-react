import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square({value, disabledHaiKya, onClick}){
    
    return (
        <button className="square" onClick = {onClick} disabled = {disabledHaiKya ? "disabled" : ""}>
            {value}
        </button>
      );
  }

  function Board(){
    const [boardState, setBoardState] = useState({
        squares: Array(9).fill(null),
        disabledStatus: Array(9).fill(false),
        xIsNext: true
    })

    

    const winner = calculateWinner(boardState.squares)
    let status;
    if(winner) {
        status = `Winner is ${boardState.xIsNext ? "O" : "X"}`
        boardState["disabledStatus"] = Array(9).fill(true)
        
    }
    else{
        status = `Next player: ${boardState.xIsNext ? "X" : "O"}`;
    }   

    const handleClick = (i) => {
        const squares = [ ...boardState["squares"] ];
        const nextTurnX = boardState["xIsNext"];
        const disabledStatus = [ ...boardState["disabledStatus"] ]
        squares[i] = nextTurnX ? "X" : "O";
        disabledStatus[i] = true;
        setBoardState({ squares : squares , disabledStatus: disabledStatus, xIsNext: nextTurnX ? false : true })
    }
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            <Square value={boardState["squares"][0]} onClick = {() => handleClick(0)} disabledHaiKya = {boardState["disabledStatus"][0]} />
            <Square value={boardState["squares"][1]} onClick = {() => handleClick(1)} disabledHaiKya = {boardState["disabledStatus"][1]} />
            <Square value={boardState["squares"][2]} onClick = {() => handleClick(2)} disabledHaiKya = {boardState["disabledStatus"][2]} />
          </div>
          <div className="board-row">
            <Square value={boardState["squares"][3]} onClick = {() => handleClick(3)} disabledHaiKya = {boardState["disabledStatus"][3]} />
            <Square value={boardState["squares"][4]} onClick = {() => handleClick(4)} disabledHaiKya = {boardState["disabledStatus"][4]} />
            <Square value={boardState["squares"][5]} onClick = {() => handleClick(5)} disabledHaiKya = {boardState["disabledStatus"][5]} />
          </div>
          <div className="board-row">
            <Square value={boardState["squares"][6]} onClick = {() => handleClick(6)} disabledHaiKya = {boardState["disabledStatus"][6]} />
            <Square value={boardState["squares"][7]} onClick = {() => handleClick(7)} disabledHaiKya = {boardState["disabledStatus"][7]} />
            <Square value={boardState["squares"][8]} onClick = {() => handleClick(8)} disabledHaiKya = {boardState["disabledStatus"][8]} />
          </div>
        </div>
      );
  }
  

  function Game(){
    return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

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
  