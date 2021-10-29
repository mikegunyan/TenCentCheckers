import React from 'react';

const Victory = ({ victory, message, isLoggedIn, exit, toggleTutorial }) => {
  if (victory === '') {
    return null;
  }
  return (
    <div className="modalBackground victoryBackground">
      <div className="head"><h2>Checkers</h2></div>
      <div className="formBox">
        <div>
          <h1>{`${victory} wins!!!`}</h1>
          <h3>{message}</h3>
        </div>
        {
          isLoggedIn ?
            <form action="/login" method="POST">
              <button className="altButton" type="submit">Exit Tutorial</button>
            </form> :
            <button className="altButton" type="button" onClick={() => { exit(); toggleTutorial(); }}>Exit Tutorial</button>
        }
      </div>
    </div>
  );
};

export default Victory;
