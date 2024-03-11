import { useState } from "react";
import axios from "axios";

const login = () => {

  const[username, setUsername] = useState<string>();
  const[email, setEmail] = useState<string>();


  const loginUser = async()=>{
    const credentials = {
      userName : username,
      email : email,
    };
    const response = await axios
      .post(
      `http://localhost:3000/login`, credentials
    )
    console.log(response)

    const browser = response.data.token
    window.localStorage.setItem('musictoken', browser)
  }


  const signUpUser = async()=>{
    const credentials = {
      userName: username,
      email: email,
    };

    try {
      const response = await axios.post('http://localhost:3000/signUp', credentials);
      console.log(response.data);
      const browser = response.data.token
      window.localStorage.setItem('musictoken', browser)
    } catch (error) {
      console.error('Error logging in:', error);
    }
    
  }
  

  return (
    <div>
      <input type = "text" className = "text-black" onChange={(e)=>(setUsername(e.target.value))} />

      <input type = "email" className = "text-black" onChange={(e)=>(setEmail(e.target.value))} />

      <button onClick={()=>loginUser()}>Login</button>
      <button onClick={()=>signUpUser()}>SignUp</button>
    </div>
  );
}



export default login