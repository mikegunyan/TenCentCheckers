import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BugViewer from './bugViewer';

const Bugs = ({ toggleBugs }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState('');
  const [bugs, setBugs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [bug, setBug] = useState('');
  const [states, setStates] = useState([]);
  const [step, setStep] = useState(0);
  const [state, setState] = useState({});

  useEffect(() => {
    axios.get('/api/bugs')
      .then((data) => {
        setUsers(data.data);
      });
  }, []);

  const navigate = (direction) => {
    if (direction === 'left' && step > 0) {
      setState(states[step - 1]);
      setStep(step - 1);
    }
    if (direction === 'right' && step < states.length - 1) {
      setState(states[step + 1]);
      setStep(step + 1);
    }
    if (direction === 'exit') {
      setBug('');
      setStep(0);
    }
  };

  if (bug !== '') {
    return (
      <BugViewer step={step} state={state} messages={messages} navigate={navigate} />
    );
  }

  if (user !== '') {
    return (
      <div className="settingsBackground">
        <div className="head"><h2>Checkers</h2></div>
        <div className="formBox">
          <h2>Bug Viewer</h2>
          {bugs.map((bug, index) => (
            <button key={index} className="altButton" onClick={() => {
              setBug(bug.bug);
              setStates(bug.states);
              setState(bug.states[0]);
              setMessages(bug.messages);
            }}>{index}</button>
          ))}
          <button type="button" className="altButton" onClick={() => setUser('')}>back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="settingsBackground">
      <div className="head"><h2>Checkers</h2></div>
      <div className="formBox">
        <h2>Bug Viewer</h2>
        {users.map((data) => (
          <button key={data._id} className="altButton" onClick={() => {
            setUser(data._id);
            setBugs(data.bugs);
          }}>{data._id} ➡ {data.bugs.length}</button>
        ))}
        <button type="button" className="altButton" onClick={toggleBugs}>exit</button>
      </div>
    </div>
  );
};

export default Bugs;
