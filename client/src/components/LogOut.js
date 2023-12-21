import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './LogOut.css';
import Cookies from 'js-cookie';

const LogOut = () => {
  const [visible, setVisible] = useState(true);
  Cookies.remove("authToken")
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        window.location.href = '/';
      }, 800); 
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const fade = useSpring({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(50px)',
    config: { duration: 800 },
  });

  return (
    <div className="logout-page">
      <animated.div style={fade} className="logout-content">
        <h1 className='message'>Logging out...</h1>
        <div className="loader"></div>
      </animated.div>
    </div>
  );
};

export default LogOut;
