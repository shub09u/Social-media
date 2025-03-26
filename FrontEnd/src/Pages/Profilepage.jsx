import React, { useEffect, useState } from 'react'


import Posts from '../Components/Posts';
import CoverPic from '../components/CoverPic';
import { useSelector } from 'react-redux';
import axios from 'axios';


const Profilepage = () => {


  let userslice = useSelector((state) => state.user);
console.log(userslice);

  const [posts, setposts] = useState([]);
  let getAllPosts = async()=>{
    console.log("hello")
    let res = await axios.get('https://social-media-1-7t2p.onrender.com/posts/yourpost',{
      headers:{
        'Authorization':userslice.token
      }
    })
    console.log(res)
    let data = res.data;
    console.log(data.posts)
    setposts(data.posts)
  }

  useEffect(()=>{
    getAllPosts()
  },[])
  // console.log(userSlice)
  

  return (
    <div>
        
    
      <div  className="topPart w-[90%] m-auto h-[45vh] relative bg-green-500 ">
        <CoverPic/>
      </div>
      <div className="mid mb-5 w-[50%] m-auto text-center mt-16 ">
        <div className='flex justify-center gap-7  '>
        <span>
            <b>Posts</b>
            <p>{posts.length}</p>
        </span>
        <span>
            <b>Followers</b>
            <p>{userslice?.user?.followers?.length}</p>
        </span>
        <span>
            <b>Followings</b>
            <p>{userslice?.user?.followings?.length}</p>
        </span>
        </div>
    
      </div>

     
      <div className='max-w-1/4 m-auto  flex flex-col gap-2'>
                   {posts.map((ele,i)=>{
                     return <Posts ele={ele}/>
                   })}
                 </div>
    </div>
  )
}

export default Profilepage