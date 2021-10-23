import React from 'react';

const buttons = (modal, saveGame, changeGame, exit, leftGame) => {
  if (modal) {
    return null;
  }
  return (
    <div>
      {/* <button className="altButton" type="button" onClick={saveGame}>Save Game</button> */}
      <button className="altButton" type="button" onClick={() => { exit(); changeGame(!leftGame); }}>Change Game</button>
    </div>
  );
};

const Settings = ({ settings, leftGame, playerTwo, modal, exit, saveGame, changeGame }) => {
  if (!settings) {
    return null;
  }
  if (leftGame) {
    return (
      <div className="settingsBackground">
        <div className="head"><h2>Checkers</h2></div>
        <div className="formBox">
          <h2>{playerTwo} has left the game!</h2>
          {buttons(modal, saveGame, changeGame, exit, leftGame)}
          <form action="/logout?_method=DELETE" method="POST">
            <button className="altButton" type="submit">Log Out</button>
          </form>
        </div>
      </div>
    );
  }
  return (
    <div className="settingsBackground">
      <div className="head"><h2>Checkers</h2></div>
      <div className="formBox">
        <h2>Settings</h2>
        {buttons(modal, saveGame, changeGame, exit, leftGame)}
        <form action="/logout?_method=DELETE" method="POST">
          <button className="altButton" type="submit" onClick={() => changeGame(true)}>Log Out</button>
        </form>
        <button onClick={exit} className="altButton" type="button">Exit</button>
      </div>
    </div>
  );
};

export default Settings;
