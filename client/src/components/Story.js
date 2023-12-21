import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import TimeAgo from '../functions/timeAgo';
import Context from '../context/userContext';
import Heart from "react-animated-heart";
import Cookies from 'js-cookie';

const Story = ({ story, onLike, onDelete }) => { 
  const context = useContext(Context);
  let url = "http://localhost:3003/";
  const [liked, setLiked] = useState(false);
  const [authorInfo, setAuthorInfo] = useState({});
  
  useEffect(() => {
    fetchUserInfo();
    isLiked();
  }, []);


  const isLiked = async () => {
    const authToken = Cookies.get("authToken")
      if (authToken) {
        try {
    const { data } = await axios.get(url + "stories/isLiked/" + story._id, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": authToken,
      },
    });
    setLiked(data);
  }catch(error){
    console.log(error);
  }}
  };

  const fetchUserInfo = async () => {
    const { data } = await axios.get(url + "users/userInfo/" + story.user_id);
    setAuthorInfo(data);
  };

  const setLikeFunc = async () => {
    const authToken = Cookies.get("authToken")
    if (authToken) {
      try {
    const data = await axios.put(url + "stories/like/" + story._id, {}, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": authToken,
      }
    })}catch(error){
      console.log(error);
    }}
  };


  const toggleLike = async () => {
    try {
      await setLikeFunc();
      await isLiked();
        onLike();
    } catch (error) {
      console.log(error);
    }
  };
const isOwnPost = context.userInfo.name == authorInfo.name;

const setDeleteFunc = async()=>{
  const authToken = Cookies.get("authToken")
      if (authToken) {
        try {
  const data = await axios.delete(url + "stories/" + story._id, {headers: {
    "Content-Type": "application/json",
    "x-api-key": authToken,
  }
}
)
}catch(error){
  console.log(error);
}}};

  const toggleDelete = async()=>{
    try{
      await setDeleteFunc();
      await onDelete();
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div style={{color: "#762129"}} className='d-flex justify-content-between'>
          <h5 className="card-title">{story.name}</h5>
          <h6>by: <a href={`http://localhost:3000/user/${authorInfo._id}`}>{authorInfo.name}</a></h6>
        </div>
        <div style={{color: "#D2691E"}} className='d-flex justify-content-between'>
        <h6>{story.genere}</h6>
        <p className="text-muted">
          <TimeAgo date={story.createdAt}></TimeAgo>
        </p>
        </div>
        <p className="card-text">{story.text}</p>
      </div>
      <div className="card-footer" style={{height:"80px", background:"#f4e16636", borderColor:"#762129"}}>
        <div className={`d-flex justify-content-${(isOwnPost)?"between":"end"} align-items-center`} style={{height:"65px"}}>
        {(isOwnPost) && (
          <button className="btn btn-danger" style={{padding:"5px"}} onClick={toggleDelete}>
            Delete
          </button>
        )}
        <span className='d-flex align-items-center'>
        <Heart isClick={liked} onClick={toggleLike} />
            {story.likes.length} likes
          </span>
          </div>
      </div>
      
    </div>
  );
}

export default Story;
