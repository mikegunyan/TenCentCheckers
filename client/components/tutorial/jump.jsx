import React from 'react';

const Jump = ({ nextJump, step, toggleJump, skipJump }) => {
  if (!nextJump) {
    return null;
  }
  return (
    <div className="jumpBackground">
      <div className="formBox jumpBox">
        <h2>Take next jump?</h2>
        <div className="buttonGrid">
          <button type="button" onClick={() => {
            toggleJump('jump');
          }}>Take it</button>
          <button type="button" onClick={step !== 9 ?
            skipJump :
            () => {}
          }>End Turn</button>
        </div>
      </div>
    </div>
  );
};

export default Jump;
