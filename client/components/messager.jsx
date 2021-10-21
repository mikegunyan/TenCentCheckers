import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import SmsIcon from '@mui/icons-material/Sms';
import TelegramIcon from '@mui/icons-material/Telegram';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    top: -4,
    right: 20,
    border: '1px solid black',
    backgroundColor: 'rgb(166, 149, 96)',
    color: 'black'
  },
}));

const Messager = ({ openMessager, messageCount, messages, playerOne, playerTwo, toggleDrawer, sendMessage }) => {
  const [message, setMessage] = useState('');
  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  if (!openMessager) {
    return (
      <div className={openMessager ? 'drawer openDrawer' : 'drawer'}>
        <button
          className='drawerButton'
          onClick={toggleDrawer}
        >
          <Stack spacing={4} direction="row" sx={{ color: 'action.active' }}>
            <StyledBadge color="secondary" badgeContent={messageCount}>
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
            <StyledBadge color="secondary" badgeContent={messageCount}>
              <SmsIcon />
            </StyledBadge>
          </Stack>
        </button>
        <div className="drawerContent">
          <div className="messages">
            {messages.map((message, index) =>
              <div key={index}>
                <p className={message.source === 'client' ? 'clientName' : 'opponentName'}>
                  {message.source === 'client' ? playerOne : playerTwo}
                </p>
                <p className={message.source === 'client' ? 'clientMessage' : 'opponentMessage'}>
                  {message.message}
                </p>
              </div>
            )}
          </div>
          <div>
            <div className="sendBox">
              <input value={message} onChange={handleChange} className="send"></input>
              <button
                onClick={() => {
                  sendMessage(message);
                  setMessage('');
                }}
                className="sendButton"
              >
                <TelegramIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messager;
