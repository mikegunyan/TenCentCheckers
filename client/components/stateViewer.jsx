import React from 'react';

const StateViewer = ({ openStateViewer, state, toggleLeftDrawer }) => {
  if (!openStateViewer) {
    return (
      <div className={openStateViewer ? 'leftDrawer leftOpenDrawer' : 'leftDrawer'}>
        <button
          className='leftDrawerButton'
          onClick={toggleLeftDrawer}
        >
        |||
        </button>
      </div>
    );
  }
  return (
    <div className={openStateViewer ? 'leftDrawer leftOpenDrawer' : 'leftDrawer'}>
      <div className="stateTable">
        <div className="rowName">turn: </div>
        <div className="rowInfo">{state.turn}</div>
        <div className="rowName">black: </div>
        <div className="rowInfo">{state.black}</div>
        <div className="rowName">red: </div>
        <div className="rowInfo">{state.red}</div>
        <div className="rowName">autoJumpBlack: </div>
        <div className="rowInfo">{state.autoJumpBlack ? 'true' : 'false'}</div>
        <div className="rowName">autoJumpRed: </div>
        <div className="rowInfo">{state.autoJumpRed ? 'true' : 'false'}</div>
        <div className="rowName">nextJump: </div>
        <div className="rowInfo">{state.nextJump ? 'true' : 'false'}</div>
        <div className="rowName">leftGame: </div>
        <div className="rowInfo">{state.leftGame ? 'true' : 'false'}</div>
        <div className="rowName">mobileBrowser: </div>
        <div className="rowInfo">{state.mobileBrowser ? 'true' : 'false'}</div>
        <div className="rowName">sender: </div>
        <div className="rowInfo">{state.sender ? 'true' : 'false'}</div>
        <div className="rowName">moveSender: </div>
        <div className="rowInfo">{state.moveSender ? 'true' : 'false'}</div>
        <div className="rowName">openMessager: </div>
        <div className="rowInfo">{state.openMessager ? 'true' : 'false'}</div>
        <div className="rowName">selected: </div>
        <div className="rowInfo">{JSON.stringify(state.selected)}</div>
        <div className="rowName">victory: </div>
        <div className="rowInfo">{state.victory}</div>
        <div className="rowName">victoryMessage: </div>
        <div className="rowInfo">{state.victoryMessage}</div>
      </div>
      <button
        className='leftDrawerButton'
        onClick={toggleLeftDrawer}
      >
      |||
      </button>
    </div>
  );
};

export default StateViewer;
