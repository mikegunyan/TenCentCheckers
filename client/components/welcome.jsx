import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Welcome = ({ username, modal, gameList, victory, message, savedView, usersList, clientID, changeView, changeVictory, makeBoard, sendInvite, onClose }) => {
  const [user, setUser] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    if (user === '') {
      axios.get('/user')
        .then((user) => {
          setUser(user.data.username);
          setId(user.data.id);
          makeBoard('000000000000000000000000', user.data.username, user.data.id);
        });
    } else {
      makeBoard('000000000000000000000000', user, id);
    }
  }, []);

  if (!modal) {
    return null;
  }
  if (victory !== '') {
    return (
      <div className="modalBackground victoryBackground">
        <div className="head"><h2>Checkers</h2></div>
        <div className="formBox">
          <div>
            <h1>{`${victory} wins!!!`}</h1>
            <h3>{message}</h3>
          </div>
          <button className="altButton" type="button" onClick={() => {
            makeBoard('000000000000000000000000', user, id);
          }}>Back to Welcome Page</button>
        </div>
      </div>
    );
  }
  if (savedView) {
    return (
      <div className="modalBackground">
        <div className="head"><h2>Checkers</h2></div>
        <div className="formBox">
          <h2>Select Game</h2>
          <div>
            {gameList.map((game) => (
              <button key={game.gameId} name={game.gameId} className="altButton" type="button" onClick={() => {
                makeBoard(game.gameId);
                onClose();
              }}>{game.name}</button>
            ))}
          </div>
          <button className="altButton back" type="button" onClick={changeView}>Back to Welcome Page</button>
        </div>
      </div>
    );
  }
  return (
    <div className="modalBackground">
      <div className="head"><h2>Checkers</h2></div>
      <div className="formBox">
        <h1>{`Welcome ${username}!`}</h1>
        <h2>Start Game</h2>
        <div>
          {usersList.length > 1 ? usersList.map((user) => {
            if (user.userID !== clientID) {
              return (
                <button key={user.userID} name={user.userID} className="altButton" type="button" onClick={() => {
                  sendInvite(clientID, user.userID);
                }}>{user.userName}</button>
              );
            }
            return null;
          }
          ) :
            <div>
              Welcome: waiting on players...
            </div>
          }
        </div>
        {/* <button type="altButton" onClick={changeView}>Saved Games</button> */}
      </div>
    </div>
  );
};

export default Welcome;
