import React, { useContext } from 'react'
import ShowUserInfo from './ShowUserInfo'
import ShowStories from './ShowStories'
import 'bootstrap/dist/css/bootstrap.css';
import Context from '../context/userContext';


export default function ShowProfile({userId}) {
    const context = useContext(Context);
    const isOwnProfile = context.userInfo._id==userId;
  return (
    <div className='d-md-flex'>
      <div className='col-xs-12 col-md-6 d-flex align-items-center' style={{ flexDirection:"column"}}>
        <h1 style={{color:'burlywood'}}>{isOwnProfile?"Your Info":"User Info"}</h1>
        
        <ShowUserInfo userId={userId}/>
      </div>
      <div className='col-md-6 d-flex justify-content-center'>
        <div className='mt-5 mt-md-0' style={{width:"75%" }}>
        <h1 style={{color:'burlywood'}}>{isOwnProfile?"Your Stories":"User Stories"}</h1>
        
        <div style={{overflow: "auto", maxHeight: "80vh"}}>
           <ShowStories url={"http://localhost:3003/stories/userStories/"+userId}/>
        </div>
      </div>
      </div>
      </div>
  )
}
