import { useEffect, useState } from 'react';

function TimeAgo({ date }) {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const calculateTimeAgo = () => {
      const currentDate = new Date();
      const pastDate = new Date(date);

      const timeDifference = currentDate - pastDate;
      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const weeks = Math.floor(days / 7); // Calculate weeks

      if (seconds < 60) {
        setTimeAgo(`${seconds} second${seconds !== 1 ? 's' : ''} ago`);
      } else if (minutes < 60) {
        setTimeAgo(`${minutes} minute${minutes !== 1 ? 's' : ''} ago`);
      } else if (hours < 24) {
        setTimeAgo(`${hours} hour${hours !== 1 ? 's' : ''} ago`);
      } else if (days < 7) {
        setTimeAgo(`${days} day${days !== 1 ? 's' : ''} ago`);
      } else if (weeks < 4) {
        setTimeAgo(`${weeks} week${weeks !== 1 ? 's' : ''} ago`); // Display in weeks
      } else {
        const monthsAgo = Math.round(days / 30);
        if (monthsAgo < 12) {
          setTimeAgo(`${monthsAgo} month${monthsAgo !== 1 ? 's' : ''} ago`);
        } else {
          const yearsAgo = Math.floor(monthsAgo / 12);
          setTimeAgo(`${yearsAgo} year${yearsAgo !== 1 ? 's' : ''} ago`);
        }
      }
    };

    calculateTimeAgo();

    const timerId = setInterval(calculateTimeAgo, 60000);

    return () => clearInterval(timerId);
  }, [date]);

  return timeAgo;
}

export default TimeAgo;
