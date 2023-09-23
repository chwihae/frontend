import { useEffect, useState } from 'react';

const CountdownTimer = (time: string) => {
  const diffTime = (date: string) => {
    const future = date && new Date(date);
    const now = new Date();
    if (future) {
      const diff = future.getTime() - now.getTime();
      const hh = Math.floor(diff / (1000 * 60 * 60));
      const mm = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const ss = Math.floor((diff % (1000 * 60)) / 1000);
      if (hh < 0 || mm < 0 || ss < 0) {
        return '00:00:00';
      } else {
        return `${hh}:${mm}:${ss}`;
      }
    }
  };

  const [timeRemaining, setTimeRemaining] = useState(diffTime(time));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(diffTime(time));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  return <span>{time && timeRemaining}</span>;
};

export default CountdownTimer;
