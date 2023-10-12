import { useEffect, useState } from 'react';

const CountdownTimer = (time: string) => {
  const diffTime = (date: string) => {
    const future = date && new Date(date);
    const now = new Date();
    if (future) {
      const diff = future.getTime() - now.getTime();
      if (diff < 0) {
        return '0일 00:00:00';
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hh = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mm = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const ss = Math.floor((diff % (1000 * 60)) / 1000);

      if (days === 0) {
        return `${hh.toString().padStart(2, '0')}:${mm
          .toString()
          .padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
      } else {
        return `${days}일 ${hh.toString().padStart(2, '0')}:${mm
          .toString()
          .padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
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
