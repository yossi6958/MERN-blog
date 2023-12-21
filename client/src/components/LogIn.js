
import React, {  useContext, useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Context from '../context/userContext';


const Login = () => {
  const userContext = useContext(Context);
  const [validate, setValidate] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    axios.defaults.withCredentials= true;
    try{
   const {data}= await axios.post("http://localhost:3003/users/logIn", {
      email:email,
      password: password
    })
    if(data){
      // טכנית יכלתי לתת גם מערך ריק, אני נותן ערך כלשהו כדי שהוא ירנדר את היוז אפקט ויתן לו את הפרטי משתמש
      userContext.setUserInfo(data);      
        navigate("../feed")
      
      
    }
  } catch (error) {
    console.log('Login error:', error);
    if(!email){
      setValidate("please enter your email"); 
    }else if(!password){
      setValidate("please enter a password");
    }else{
      setValidate("email or password are not correct");
    }
    
    
  }
       };
  return (
    <div className='wrapper'>
   <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginTop:"20px"}}>
    <div className="login-container col-10 col-md-5 col-xl-3">
        
      <h1>Login</h1>
      <form  onSubmit={handleSubmit}>
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
        <button className='button' onClick={handleSubmit} type="submit">Login</button>
        <span>{validate}</span>

      </form>
    </div>
    <div className='d-flex justify-content-between col-10 col-md-5 col-xl-3'>
      <label className='labels'>Don't have an account? </label> <a href='./SignUp'>sign up</a>
      </div>
    </div>
    </div>
  );
};

export default Login;
