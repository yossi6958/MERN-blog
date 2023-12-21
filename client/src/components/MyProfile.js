import React, { useContext, useState } from 'react';
import Navi from './Navi';
import 'bootstrap/dist/css/bootstrap.css';
import ShowStories from './ShowStories';
import ShowUserInfo from './ShowUserInfo';
import Context from '../context/userContext';
import ShowProfile from './ShowProfile';

function MyProfile() {
  const context = useContext(Context);
  const userId=context.userInfo._id;
  return (
    <>
      <Navi />
      <ShowProfile userId={userId}/>
      
     
    </>
  );
  }

export default MyProfile;
