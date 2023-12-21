import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';

const SignUp = () => {
  const [validate, setValidate]=useState("");
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

   
    const addUser = async (e) => {
        e.preventDefault();
        
      try{
        await axios.post("http://localhost:3003/users/signUp", {
            name:username,
            email: email,
            password: password
          })
         
           
           navigate("../logIn")
           
        
         
        
        }catch(err){
          console.log(err)
          if (!username){
            setValidate("please enter a user name")
          }
          else if (!email){
            setValidate("please enter your email")
          }
          else if (!password){
            setValidate("please enter a password")
          }else if(err.response.data.code==11000){
            setValidate("email or user name already exists");
          }else{
            setValidate("choose a password with 3 to 16 characters and a user name with maximun 15 characters");

          }
        }

  };

  return (
    <div className='wrapper'>
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginTop:"20px"}}>
    <div className="signup-container col-10 col-md-5 col-xl-3">
      <h1>Sign Up</h1>
      <form onSubmit={addUser}>
        <label className='labels' htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />

        <label className='labels' htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          required
        />

        <label className='labels' htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />

        <button className='button' onClick={addUser} type="submit">Sign Up</button>
        <p>{validate}</p>
      </form>
    </div>
    <div className='col-10 col-md-5 col-xl-3 d-flex justify-content-between'>
      <label className='labels'>Already have an account? </label> <a href='./login'>log in</a>
      </div>
    </div>
    </div>
  );
};

export default SignUp;


    
    
