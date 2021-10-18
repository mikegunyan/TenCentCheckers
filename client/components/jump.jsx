import React from 'react';

const Jump = ({ nextJump, moveSender, playerTwo, sendJump, toggleJump, skipJump }) => {
  if (!nextJump) {
    return null;
  }
  if (!moveSender) {
    return (
      <div className="jumpBackground">
        <div className="formBox jumpBox">
          <h3>{`Waiting on ${playerTwo}!`}</h3>
        </div>
      </div>
    );
  }
  return (
    <div className="jumpBackground">
      <div className="formBox jumpBox">
        <h2>Take next jump?</h2>
        <div className="buttonGrid">
          <button type="button" onClick={() => {
            sendJump('take');
          }}>Take it</button>
          <button type="button" onClick={() => {
            sendJump('skip');
          }}>End Turn</button>
        </div>
      </div>
    </div>
  );
};

export default Jump;
