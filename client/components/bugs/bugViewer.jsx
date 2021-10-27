import React, { useState } from 'react';
import Messager from '../messager';
import StateViewer from './stateViewer';

const BugViewer = ({ step, state, messages, navigate }) => {
  const [openMessager, setOpenMessager] = useState(false);
  const [openStateViewer, setOpenStateViewer] = useState(false);

  const toggleDrawer = () => {
    setOpenMessager(!openMessager);
  };

  const toggleLeftDrawer = () => {
    setOpenStateViewer(!openStateViewer);
  };

  const whichPiece = (square, index, i) => {
    if (square[0] === null) {
      return null;
    }
    if (square[0] === 'x') {
      return (
        <img name={`${index}${i}`} className="piece" alt="" src="https://tencentcheckers.s3.us-west-2.amazonaws.com/redPiece.png" />
      );
    }
    if (square[0] === 'X') {
      return (
        <img name={`${index}${i}`} className="piece" alt="" src="https://tencentcheckers.s3.us-west-2.amazonaws.com/kingRedPiece.png" />
      );
    }
    if (square[0] === 'O') {
      return (
        <img name={`${index}${i}`} className="piece" alt="" src="https://tencentcheckers.s3.us-west-2.amazonaws.com/kingBlackPiece.png" />
      );
    }
    return (
      <img name={`${index}${i}`} className="piece" alt="" src="https://tencentcheckers.s3.us-west-2.amazonaws.com/blackPiece.png" />
    );
  };

  return (
    <div className="settingsBackground">
      <div className="head"><h3>{`Step ${step}`}</h3></div>
      <div className="viewer">
        <button className="navigate" onClick={() => navigate('left')}>⬅</button>
        <button className="navigate" onClick={() => navigate('exit')}>Exit</button>
        <button className="navigate" onClick={() => navigate('right')}>⮕</button>
      </div>

      <Messager
        openMessager={openMessager}
        mobileBrowser={false}
        messageCount={0}
        messages={messages}
        playerOne={state.playerOne}
        playerTwo={state.playerTwo}
        toggleDrawer={toggleDrawer}
        sendMessage={() => {}}
      />

      <StateViewer
        openStateViewer={openStateViewer}
        state={state}
        toggleLeftDrawer={toggleLeftDrawer}
      />

      {state.board.map((row, index) => (
        <div className="grid" key={`row ${Math.random() * 1000}`}>
          {row.map((square, i) => (
            <div
              name={`${index}${i}`}
              className={square[1]}
              key={`square ${Math.random() * 1000}`}
            >
              {whichPiece(square, index, i)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BugViewer;
