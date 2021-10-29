import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import SmsIcon from '@mui/icons-material/Sms';

const Messager = ({ openMessager, toggleDrawer }) => {
  const [badge, setBadge] = useState(1);
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      top: -4,
      right: 20,
      border: '1px solid black',
      backgroundColor: 'rgb(166, 149, 96)'
    },
  }));
  if (!openMessager) {
    return (
      <div className={openMessager ? 'drawer openDrawer' : 'drawer'}>
        <button
          className='drawerButton'
          onClick={() => { toggleDrawer(); setBadge(0); }}
        >
          <StyledBadge badgeContent={badge}>
            <SmsIcon />
          </StyledBadge>
        </button>
      </div>
    );
  }
  return (
    <div>
      <div className={openMessager ? 'drawer openDrawer' : 'drawer'}>
        <button
          className='drawerButton'
          onClick={() => { toggleDrawer(); setBadge(0); }}
        >
          <StyledBadge color="secondary" badgeContent={badge}>
            <SmsIcon />
          </StyledBadge>
        </button>
        <div className="drawerContent">
          <div>
            <p className="opponentName">
              mrgunyan
            </p>
            <p className="opponentMessage">
              Welcome to TenCentCheckers and thank you for visiting! Check out the message feature in an online game.
            </p>
          </div>
          <form action="/logout?_method=DELETE" method="POST">
            <button className="altButton" type="submit">Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messager;
