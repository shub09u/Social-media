import axios from 'axios';
import React from 'react'
import { CiCamera } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserByToken } from '../Store/Userslice';

const ProfilePicUpdate = () => {
    let Userslice=useSelector((state)=>state.user)
console.log(Userslice);

let dispatch=useDispatch()

const handleprofile=async(e)=>{
let file=e.target.files[0];
console.log(file);

let formdata =new FormData();
formdata.append('file',file);
formdata.append('upload_preset','social media');
 

let res= await axios.post('https://api.cloudinary.com/v1_1/datqx3bjs/upload',formdata)
 console.log(res);
console.log(res.data.secure_url);

let response=await axios.put('https://social-media-1-7t2p.onrender.com/user/update',{profilePic:res.data.secure_url},{
headers:{
'Authorization':Userslice.token
}

})
let data=response.data;
console.log(data);
if(response.data==200)
 dispatch(fetchUserByToken(token))


}

  return (
    <div className=' absolute bottom-[-75px] left-[5%] w-[175px] h-[175px] rounded-full border-amber-800 border-2'>
        <img src={Userslice.user?.profilePic} className='w-full h-full rounded-full object-cover' alt="" />
            <h3 className='text-center mt-1 text-xl'>{Userslice?.user?.name} </h3>
          
            <div className='updateProfile absolute bottom-4 right-0'>
                <label htmlFor="profile"><CiCamera size={35} color='red'/></label>
                <input onChange={handleprofile} type="file" hidden id='profile' />
            </div>
    </div>
  )
}

export default ProfilePicUpdate