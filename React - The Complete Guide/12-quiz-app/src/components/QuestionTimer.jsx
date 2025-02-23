import { useEffect, useState } from 'react';

const QuestionTimer = ({ timeout, onTimeout, mode }) => {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);

    return () => clearTimeout(timer);
  }, [timeout, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 100);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <progress
      id='question-time'
      value={remainingTime}
      max={timeout}
      className={mode}
    />
  );
};

export default QuestionTimer;
