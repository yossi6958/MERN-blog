import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useContext, useState } from 'react';
import Context from './context/userContext';
import Wraper from './components/wraper';
import "./App.css"



function App() {
  const [userInfo, setUserInfo] = useState({}) ;
  const [likeEvent, setLikeEvent]=useState(0);
  const [deleteEvent, setDeleteEvent]=useState(0);
  const [followEvent, setFollowEvent]=useState(0);


  return (
   <Context.Provider value={{userInfo, setUserInfo, likeEvent, setLikeEvent, deleteEvent, setDeleteEvent, followEvent, setFollowEvent}}>
      <Wraper />
    </Context.Provider>
  );
  }

export default App;
