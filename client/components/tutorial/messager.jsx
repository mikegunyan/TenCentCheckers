import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import SmsIcon from '@mui/icons-material/Sms';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    top: -4,
    right: 20,
    border: '1px solid black',
    backgroundColor: 'rgb(166, 149, 96)',
    color: 'black'
  },
}));

const Messager = ({ openMessager, toggleTutorial, toggleDrawer }) => {
  const [badge, setBadge] = useState(0);
  if (!openMessager) {
    return (
      <div className={openMessager ? 'drawer openDrawer' : 'drawer'}>
        <button
          className='drawerButton'
          onClick={toggleDrawer}
        >
          <Stack spacing={4} direction="row" sx={{ color: 'action.active' }}>
            <StyledBadge color="secondary" badgeContent={badge}>
              <SmsIcon />
            </StyledBadge>
          </Stack>
        </button>
      </div>
    );
  }
  return (
    <div>
      <div className={openMessager ? 'drawer openDrawer' : 'drawer'}>
        <button
          className='drawerButton'
          onClick={toggleDrawer}
        >
          <Stack spacing={4} direction="row" sx={{ color: 'action.active' }}>
            <StyledBadge color="secondary" badgeContent={badge}>
              <SmsIcon />
            </StyledBadge>
          </Stack>
        </button>
        <div className="drawerContent">
          {/* <button className="drawerLogIn" onClick={toggleTutorial}>Exit tutorial</button> */}
        </div>
      </div>
    </div>
  );
};

export default Messager;
