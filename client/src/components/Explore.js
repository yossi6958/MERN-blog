import React, { useEffect, useState } from 'react';
import Navi from './Navi';
import 'bootstrap/dist/css/bootstrap.css';
import ShowStories from './ShowStories';

function Explore() {
  const [url, setUrl] = useState('http://localhost:3003/stories?s=');

  const search = (e) => {
    e.preventDefault();
    
    setUrl(`http://localhost:3003/stories?s=${e.target.value}`);
  }
 
  
  return (
    <>
      <Navi />
      <div>
      <div style={{display: "flex", flexDirection:"column", alignItems:"center"}}>
        <h1 style={{color:'burlywood'}}>stories</h1>
        <input  placeholder='search for stories..' style={{ width: "80%", color:'brown', borderColor:"#D2691E", outline:"none" }} onChange={search}></input>
        </div>
        <div >
        <ShowStories url={url}   />
        </div>

      </div>
    </>
  );
} 

export default Explore;
