import React, { useState, useEffect, useRef } from 'react';

const TypeText = ({ text, textClass }) => {
  const index = useRef(0);
  const [string, setString] = useState('');

  useEffect(() => {
    index.current = 0;
    setString('');
  }, [text]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setString((typedString) => typedString + text.charAt(index.current));
      index.current++;
    }, 50);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [string, text]);

  return (
    <div className={textClass}>
      <div className="typeText">{string}</div>
    </div>
  );
};

export default TypeText;
