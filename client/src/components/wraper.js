import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Context from '../context/userContext';
import MyProfile from './MyProfile';
import Explore from './Explore';
import LogIn from './LogIn';
import SignUp from './SignUp';
import LogOut from './LogOut';
import AddStory from './addStory';
import UserProfile from './UserProfile';
import Feed from './Feed';
import Cookies from 'js-cookie';

  

  



export default function Wrapper() {
  const userContext = useContext(Context);
  useEffect(() => {
    const fetchData = async () => {
      const authToken = Cookies.get("authToken")
      if (authToken) {
        try {
         axios.defaults.withCredentials= true;

          const { data } = await axios.get(
            "http://localhost:3003/users/showInfo",
            {
              headers: {
                "x-api-key": authToken
              }
            }
          );
          if (JSON.stringify(userContext.userInfo) !== JSON.stringify(data)) {
            // כדי למנוע לולאה, נשנה את היוזר קונקסט רק אם אין בפנים את פרטי היוזר
            userContext.setUserInfo(data);
          }
        } catch (err) {
          // אם הטוקן לא תקין, מעיף אותו מהלוקל סטורג
          Cookies.remove("authToken")
          console.log(err);
        }
      }else if(Object.keys(userContext.userInfo).length != 0){
      //אם אין טוקן, מסיר את פרטי המשתמש מיוזר קונטקסט במידה והוא אינו ריק
        
        userContext.setUserInfo({})
          
        
      }
         
      }
    
  
    fetchData();
  }, [userContext.userInfo]);

  return (
    <BrowserRouter>
  <Routes>
    {userContext.userInfo.name ? (
      <>
        <Route path="/*" element={<Feed/>} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/myProfile" element={<MyProfile />} />
        <Route path="/publishStory" element={<AddStory />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/user/:userId" element={<UserProfile />} />
      </>
    ) : (
      <>
        <Route path="/*" element={<LogIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
      </>
    )}
        <Route path="/LogOut" element={<LogOut />} />

  </Routes>
</BrowserRouter>

  );
}



