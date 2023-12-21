import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/userContext';
import TimeAgo from '../functions/timeAgo';
import 'bootstrap/dist/css/bootstrap.css';
import Cookies from 'js-cookie';

export default function ShowUserInfo({ userId }) {
  const context = useContext(Context);
  const [userData, setUserData] = useState({});
  const [postsData, setPostsData] = useState({});
  const [followed, setFollowed] = useState(false);
  const url = "http://localhost:3003/";
  const authToken = Cookies.get("authToken");

  const fetchUserData = async () => {
    if (authToken) {
      try {
        axios.defaults.withCredentials = true;
        const userDataResponse = await axios.get(url+`users/userInfo/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": authToken,
          },
        });
        setUserData(userDataResponse.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchPostData = async () => {
    if (authToken) {
      try {
        const postsDataResponse = await axios.get(url+`stories/userPostsInfo/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": authToken,
          },
        });
        setPostsData(postsDataResponse.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchDatas = async () => {
    await fetchUserData();
    await fetchPostData();
  };

  const isFollowed = async () => {
    if (authToken) {
      try {
        const data = await axios.get(`${url}users/isFollowed/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": authToken,
          },
        });
        setFollowed(data.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const setFollowFunc = async () => {
    if (authToken) {
      try {
        await axios.put(`${url}users/follow/${userData._id}`, {}, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": authToken,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const toggleFollow = async () => {
    try {
      await setFollowFunc();
      await isFollowed();
      context.setFollowEvent(!context.followEvent);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDatas();
    isFollowed();
  }, [context.likeEvent, context.deleteEvent, context.followEvent]);

  const handleImageChange = async (event) => {
    const imageFile = event.target.files[0];
  
    if (imageFile) {
      const formData = new FormData();
      formData.append("myFile", imageFile);
  
      try {
        const response = await axios.post(url + "upload/users", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-api-key": authToken,
          },
        });
  
        // Handle the response if needed
        console.log(response.data);
        
        // Refetch user data to update the displayed profile image
        fetchUserData();
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  const isItHim = context.userInfo._id === userData._id;
  const hasProfilePhoto = Boolean(userData.img_url)

  return (
<div style={{
  width: "75%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
  height: "80vh",
  border: "1px solid rgba(0, 0, 0, 0.17)",
  borderRadius: "0.375rem",
  color: "rgb(118, 33, 41)",
  
}}>
  <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }}>
   <img
  src={url + (hasProfilePhoto ? userData.img_url : "noProfile.png")}
  alt="Profile"
  style={{
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "2px solid darkred",
    boxShadow: "-4px -6px 8px burlywood", // Adjust the values as needed
  }}
/>

    {
  isItHim && (
  
      <label htmlFor="fileInput" className="button" style={{ height: "25px", padding: 10 }}>
        {hasProfilePhoto ? "Change" : "Upload"} Profile Picture
        <input
          id="fileInput"
          type="file"
          accept=".png, .jpg, .jpeg, .gif"
          onChange={handleImageChange}
          style={{ display: 'none' }} 
        />
      </label>
  )
}


  
        <h3>{userData.name}</h3>
        <h4>{userData.email}</h4>
        {userData.role === "admin" && <p>(admin)</p>}

        {!isItHim && <button className='button' onClick={toggleFollow}>{followed ? "followed" : "follow"}</button>}
      </div>

      <h4>{postsData.numOfPosts} stories</h4>
      <h4>{postsData.numOfLikes} likes</h4>
      <h4>
        <p>followers: {userData.followers ? userData.followers.length : 0}</p>
        <p>follows: {userData.follows ? userData.follows.length : 0}</p>
      </h4>
      <h4>joined <TimeAgo date={userData.date_created}></TimeAgo></h4>
    </div>
  );
}
