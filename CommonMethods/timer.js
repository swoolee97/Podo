import { useState, useEffect, useRef } from 'react';

const timer = (initialTime = 300) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isExpired, setIsExpired] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setTimeRemaining(initialTime);
    setIsExpired(false);

    timerRef.current = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          setIsExpired(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (timeRemaining <= 0) {
      setIsExpired(true);
    }
  }, [timeRemaining]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return { timeRemaining, isExpired, startTimer };
};

export default timer;
