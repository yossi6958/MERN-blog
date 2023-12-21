import React, { useState } from 'react';
import './addStory.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const AddStory = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [genere, setGenere] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleGenereChange = (e) => {
    setGenere(e.target.value);
  };

  const publish = async (e) => {
    e.preventDefault();
    const authToken = Cookies.get("authToken")
    try {
      if (!authToken) {
        console.log("User not authenticated.");
        return;
      }
  
      const response = await axios.post("http://localhost:3003/stories", {
        name: title,
        text: text,
        genere: genere,
      }, {
        headers: {
          "x-api-key": authToken,
          "Content-Type": "application/json",
        }
      });
  
      
      navigate("../myProfile");
    } catch (err) {
      console.error('Error:', err);
    }
  };
  

  return (
    <div className="addStory-container">
      <h1 >Write a Story</h1>
      <form onSubmit={publish}>
      <label htmlFor="genere">Genre:</label>
<div className="custom-select">
  <select
    id="genere"
    name="genere"
    value={genere}
    onChange={handleGenereChange}
    required
  >
    <option value="">Select Genre</option>
    <option value="Adventure">Adventure</option>
    <option value="Mystery">Mystery</option>
    <option value="Humor">Humor</option>
    <option value="Komedy">Comedy</option>
    <option value="Horror">Horror</option>
  </select>
</div>
        <label htmlFor="title">title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleTitleChange}
          required
        />

        <label htmlFor="text">Text:</label>
        <textarea
        id="text"
        name="text"
         value={text}
        onChange={handleTextChange}
        required
        rows="4" 
        ></textarea>


        <button className='button' type="submit">publish</button>
      </form>
    </div>
  );
};

export default AddStory;

    
