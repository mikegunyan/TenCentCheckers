import React from 'react';
import Bugs from './bugs';

const buttons = (modal, saveGame, changeGame, exit, leftGame, toggleBug, bug) => {
  if (modal) {
    return null;
  }
  return (
    <div>
      {/* <button className="altButton" type="button" onClick={saveGame}>Save Game</button> */}
      <button className="altButton" type="button" onClick={() => { exit(); changeGame(!leftGame); }}>Change Game</button>
      <button className="altButton" type="button" onClick={toggleBug}>Report Bug</button>
    </div>
  );
};

const Settings = ({ settings, bug, bugs, leftGame, playerTwo, modal, exit, saveGame, changeGame, toggleBug, toggleBugs, reportBug }) => {
  if (!settings) {
    return null;
  }
  if (leftGame) {
    return (
      <div className="settingsBackground">
        <div className="head"><h2>Checkers</h2></div>
        <div className="formBox">
          <h2>{playerTwo} has left the game!</h2>
          {buttons(modal, saveGame, changeGame, exit, leftGame, toggleBug, bug )}
          <form action="/logout?_method=DELETE" method="POST">
            <button className="altButton" type="submit">Log Out</button>
          </form>
        </div>
      </div>
    );
  }
  if (bugs) {
    return (
      <Bugs toggleBugs={toggleBugs} />
    );
  }
  if (bug) {
    return (
      <div className="settingsBackground">
        <div className="head"><h2>Checkers</h2></div>
        <div className="formBox">
          <h2>Report Bug</h2>
          <label htmlFor="bug">
            Describe bug:
            <input type="text" className="bug"/>
          </label>
          <div className="buttonGrid">
            <button type="button" onClick={() => reportBug(document.getElementsByClassName('bug')[0].value) }>Send Report</button>
            <button type="button" onClick={toggleBug}>cancel</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="settingsBackground">
      <div className="head"><h2>Checkers</h2></div>
      <div className="formBox">
        <h2>Settings</h2>
        {buttons(modal, saveGame, changeGame, exit, leftGame, toggleBug, bug)}
        <form action="/logout?_method=DELETE" method="POST">
          <button className="altButton" type="submit" onClick={() => changeGame(true)}>Log Out</button>
        </form>
        <button onClick={exit} className="altButton" type="button">Exit</button>
      </div>
    </div>
  );
};

export default Settings;
