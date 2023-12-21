import React, { useEffect, useState, useContext } from 'react';
import Navi from './Navi';
import Story from './Story';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Context from '../context/userContext';

function ShowStories({url}) {
  const context = useContext(Context);
  const [dataVal, setData] = useState([]);
  useEffect(()=>{
    fetchData();
  },[url])
  const fetchData = async () => {
    try {
      const response = await axios.get(
        url,
        {
          headers:localStorage.getItem('authToken')? {
            'Content-Type': 'application/json',
            'x-api-key': localStorage.getItem('authToken')
          }:{},
        }
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikeClick = () => {
    context.setLikeEvent(!context.likeEvent);
    fetchData(); 
  };
const handleDeleteClick = () => {
  context.setDeleteEvent(!context.deleteEvent);
  fetchData(); 
}

  return (
    <>
      
      <div>
        {dataVal.length>0? dataVal.map((item) => (
          <Story key={item._id} story={item} onLike={handleLikeClick} onDelete={handleDeleteClick}/>
        )):<h3  style={{height: "400px", display:"flex", justifyContent:"center", color:"darkred", alignItems: "center"}}>no stories yet</h3>}
      </div>
    </>
  );
}

export default ShowStories;
