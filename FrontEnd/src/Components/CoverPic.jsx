import React, { useState } from 'react'
import ProfilePicUpdate from './ProfilePicUpdate'
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchUserByToken } from '../Store/Userslice';
import Loading from './Loading';  

const CoverPic = () => {
const[timing,setTiming]=useState(false)

      let Userslice=useSelector((state)=>state.user)
console.log(Userslice);
   let dispatch=useDispatch()




       const handleCoverChanger =async (e)=>{
setTiming(true)
           let file = e.target.files[0];
           console.log(file)

let formdata =new FormData();
formdata.append('file',file);
formdata.append('upload_preset','social media');
 
let res= await axios.post('https://api.cloudinary.com/v1_1/datqx3bjs/upload',formdata)
 console.log(res);
console.log(res.data.secure_url);

let response=await axios.put('https://social-media-1-7t2p.onrender.com/user/update',{coverPic:res.data.secure_url},{
headers:{
'Authorization':Userslice.token
}

})
console.log(response)
let data=response.data;
console.log(data);
if(res.status==200){
setTiming(false)
 dispatch(fetchUserByToken(Userslice.token))

}
       }
  return (
    <div className=' w-full  m-auto h-[45vh]  relative '>
      { timing=== false && <img className='w-[100%] h-[300px] object-' src={Userslice.user?.coverPic} alt="" />}

{ timing=== true && <div>
<Loading/>
</div>
}
<div className='updateCoverPic absolute bottom-0 right-5'>
        <label htmlFor="cover">< FaCamera size={35} color='Red'/></label>
        <input onChange={handleCoverChanger} type="file" hidden id='cover' />
    </div>

<div className="profileBox">
  <ProfilePicUpdate/>    
</div>
    </div>
  )
}

export default CoverPic
