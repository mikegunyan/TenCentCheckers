import React from 'react';

const Settings = ({ settings, toggleTutorial, exit }) => {
  if (!settings) {
    return null;
  }
  return (
    <div className="settingsBackground">
      <div className="head"><h2>Checkers</h2></div>
      <div className="formBox">
        <h2>Settings</h2>
        <button className="altButton" type="button" onClick={() => { exit(); toggleTutorial(); }}>Tutorial</button>
        <form action="/logout?_method=DELETE" method="POST">
          <button className="altButton" type="submit">Log In</button>
        </form>
        <button onClick={exit} className="altButton" type="button">Exit</button>
      </div>
    </div>
  );
};

export default Settings;
