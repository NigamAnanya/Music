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
    axios
    .post(
      `https://`
    )
  }


  const signUpUser = async()=>{

  }

  return (
    <div>
      <input type = "text" onChange={(e)=>(setUsername(e.target.value))} />

      <input type = "email" onChange={(e)=>(setEmail(e.target.value))} />

        <button>Login</button>
        <button>Signup</button>
    </div>
  );
}



export default login