import React, { useEffect, useState } from 'react'


import Posts from '../Components/Posts';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'querystring';
import { updateuser } from '../Store/Userslice';

const FriendProfile = () => {
  let dispatch=useDispatch()
  let userSlice = useSelector((state) => state.user);
console.log(userSlice);

  let location = useLocation(); 
  let friendId = location.state

  const [friend, setfriend] = useState('');
console.log(friend);

  let getFriendData = async()=>{
    let res = await axios.get(`https://social-media-1-7t2p.onrender.com/user/getFriend/${friendId}`,{
      headers:{
        'Authorization':userSlice.token
      }
    })
    let data = res.data
    console.log(data)
    setfriend(data.user)
  }

  useEffect(()=>{
    getFriendData()
  },[friendId])

  const [friendPosts, setfriendPosts] = useState([]);
  const getFriendPost = async()=>{
   let res = await axios.get(`https://social-media-1-7t2p.onrender.com/posts/friendPost/${friendId}`,{
    headers:{
      'Authorization':userSlice.token
    }
   })
   let data = res.data
   console.log(data.posts)
   setfriendPosts(data.posts)
  }


  useEffect(()=>{
    getFriendPost()
  },[friendId])

  const handleFollow = async()=>{
    let res = await axios.put(`https://social-media-1-7t2p.onrender.com/user/follower/${friendId}`,{},{

      headers:{
        'Authorization': userSlice.token

      }

    })

    let data = res.data;
    console.log(data)
    setfriend(data.friend)
    dispatch(updateuser(data.user))

  }


  return (
    <div>
        
    
      <div  className="topPart w-[90%] m-auto h-[45vh] relative ">
      <div className=' w-full m-auto h-[45vh] relative '>
     <img className='w-full h-full mt-16 object-cover' src={friend?.coverPic} alt="" />
 


<div className="profileBox">
   <div className=' absolute bottom-[-75px] left-[5%] w-[175px] h-[175px] rounded-full border-amber-800 border-2'>
         <img src={friend?.profilePic} className='w-full h-full object-center rounded-full object-cover' alt="" />
             <h3 className='text-center mt-3 text-xl'>{friend?.name}</h3>
           
     </div>  
</div>
    </div>
      </div>
      <div className="mid mb-5 w-[50%] m-auto text-center lg:mt-5 mt-35 ">
        <div className='flex justify-center gap-7 '>
        <span>
            <b>Posts</b>
            <p>{friendPosts?.length}</p>
        </span>
        <span>
            <b>Followers</b>
            <p>{friend?.followers?.length}</p>
        </span>
        <span>
            <b>Followings</b>
            <p>{friend?.followings?.length}</p>
        </span>
        </div>
         <div className='flex gap-2 absolute lg:right-0 top-105 right-2'>
  <Link state={{friend:{id:friend?._id, profilePic:friend?.profilePic,name:friend?.name}}}className='bg-yellow-700 px-3 py-2 rounded-md hover:bg-yellow-800 text-white' to={'/chat'}>Chat</Link>
          {
            friend?.followers?.includes(userSlice?.user?._id) ?
              <button onClick={handleFollow} className='bg-green-700 px-2 py-2 rounded-md hover:bg-green-800 text-white'>Unfollow</button>
              :
              <button onClick={handleFollow} className='bg-green-700 px-2 py-2 rounded-md hover:bg-green-800 text-white'>Follow</button>
          }


        </div>
      </div>

     
      {friendPosts?.length>0?<div className='max-w-1/4  lg:m-auto md:m-auto ml-15 flex flex-col gap-2'>
                   {friendPosts.map((ele,i)=>{
                     return <Posts ele={ele}/>
                   })}
      </div> : <h1 className='text-3xl text-center my-16'>No Post Yet</h1>}
    </div>
  )
}

export default FriendProfile