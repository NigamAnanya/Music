import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const landing = () => {
  //state variables
  const[songs, setsongs] = useState([]);

  const getSongs = async()=>{
    const response = await axios
      .get(
      `http://localhost:3000/getSongs`
    )
    console.log(response)

      }

  useEffect(()=>{
     

  },[])


  return (
    <div>
      <input className = "text-black" type="text" name="Search Songs" id="text" />
      <button onClick={()=>getSongs()}>Refresh</button>
    </div>
  );
}



export default landing