import React, { useState } from 'react'
import Sidebarcom from '../Components/Sidebarcom'
import Posts from '../Components/Posts'
import axios from 'axios'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'


const Home = () => {
  const [posts, setposts] = useState([]);
  let userSlice = useSelector((state) => state.user);
console.log(userSlice);

  // console.log(userSlice)
  let getAllPosts = async()=>{
    let res = await axios.get('https://social-media-1-7t2p.onrender.com/posts/alluserpost',{
      headers:{
        'Authorization':userSlice.token
      }
    })
    console.log(res)
    let data = res.data;
    console.log(data.post)
    setposts(data.post)
  }

  useEffect(()=>{
    getAllPosts()
  },[])

  return (
    <div className='flex h-[80vh]'>
    {/* Sidebar - Fixed */}
    <div className='fixed lg:top-[65px] top-[55px] left-0 w-[240px] h-[calc(110vh-65px)] bg-white'>
      <Sidebarcom  getAllPosts={getAllPosts} />
    </div>
  
    {/* Main Content - Pushed right, scrollable */}
    <div className=' lg:ml-[240px] ml-50px flex-1  overflow-y-auto lg:pt-15 pt-13 ' style={{ height: 'calc(110vh - 65px)' }}>
        <div className='max-w-1/2 m-auto  flex flex-col gap-2'>
          {posts?.map((ele,i)=>{
 return <Posts getAllPosts= {getAllPosts} key ={ele._id} ele={ele}/>
          })}
        </div>
    </div>
  </div>
  
  )
}

export default Home