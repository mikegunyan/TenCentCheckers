import React from 'react';

const Settings = ({ settings, isLoggedIn, toggleTutorial, exit }) => {
  if (!settings) {
    return null;
  }
  return (
    <div className="settingsBackground">
      <div className="head"><h2>Checkers</h2></div>
      <div className="formBox">
        <h2>Settings</h2>
        {
          isLoggedIn ?
            <form action="/login" method="POST">
              <button className="altButton" type="submit">Exit Tutorial</button>
            </form> :
            <button className="altButton" type="button" onClick={() => { exit(); toggleTutorial(); }}>Exit Tutorial</button>
        }
        <form action="/logout?_method=DELETE" method="POST">
          <button className="altButton" type="submit">{isLoggedIn ? 'Log Out' : 'Log In'}</button>
        </form>
        <button onClick={exit} className="altButton" type="button">Exit</button>
      </div>
    </div>
  );
};

export default Settings;
