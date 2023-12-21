import React, { useContext } from 'react'
import Navi from './Navi'
import Context from '../context/userContext'
import ShowStories from './ShowStories';

export default function Feed() {
  const context = useContext(Context);
  const idArr=JSON.stringify(context.userInfo.follows)
  let url = "http://localhost:3003/";
  return (
    <> 
    <Navi/>
    <div style={{marginTop: "50px"}}>
    <h2 style={{color: "burlywood", display: "flex", justifyContent: "center", marginBottom:"50px"}}>Followed By You</h2>
    <ShowStories url={`${url}stories/feed/${idArr}`}/>
    </div>
    </>
  )
}
