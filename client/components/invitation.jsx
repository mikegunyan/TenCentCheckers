import React from 'react';

const Invitation = ({ invitation, sender, clientID, playerTwo, acceptInvite, declineInvite }) => {
  if (!invitation) {
    return null;
  }
  if (sender) {
    return (
      <div className="jumpBackground">
        <div className="formBox inviteBox">
          <h2>Invitation sent to {playerTwo}</h2>
          <button className="altButton" type="button" onClick={() => {
            declineInvite();
          }}>Cancel Invite</button>
        </div>
      </div>
    );
  }
  return (
    <div className="jumpBackground">
      <div className="formBox jumpBox">
        <h2>{playerTwo} would like to play</h2>
        <div className="buttonGrid">
          <button type="button" onClick={() => {
            acceptInvite();
          }}>Accept Invite</button>
          <button type="button" onClick={() => {
            declineInvite();
          }}>Decline Invite</button>
        </div>
      </div>
    </div>
  );
};

export default Invitation;
