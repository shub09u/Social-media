import { Link } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Modal } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';

const Sidebarcom = (props) => {

    let userSlice = useSelector((state)=>state.user);
    console.log(userSlice)
    
 const [isModalOpen, setIsModalOpen] = useState(false);
const[uploadfile,setuploadfile]=useState('')    
const [LiveFiles,setLiveFiles]=useState('')

 let titleRef=useRef()
 let descriptionRef=useRef()

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
const handlefilechange=async(e)=>{
let file=e.target.files
// console.log(file);
let fileArr=[...file]

let imageArr=fileArr.map((ele)=>{
let formdata=new FormData()
formdata.append('upload_preset','social media')
formdata.append('file',ele)
let res= axios.post('https://api.cloudinary.com/v1_1/datqx3bjs/upload',formdata)
return res
})
let ans=await Promise.all(imageArr)
console.log(ans);

let liveArr=[];
if(ans){
ans.forEach((ele)=>{
liveArr.push(ele.data.secure_url)
})
setLiveFiles(liveArr)

setuploadfile(fileArr)
}
}

const handleSubmit= async(e)=>{
e.preventDefault()
let obj={
title:titleRef.current.value,
description:descriptionRef?.current?.value,
}

   if(LiveFiles){
            obj.file = LiveFiles
        }
console.log(obj);
 try {
        let res = await axios.post('https://social-media-1-7t2p.onrender.com/posts/create',obj,{
            headers:{
                'Authorization':userSlice.token
            }
        })
        let data = res.data;
        console.log(data)
        if(res.status==201){
            toast.success(data.msg,{position:"top-center"})
props.getAllPosts()
            titleRef.current.value = ""
            descriptionRef.current.value = ""
            setuploadfile('')
            setIsModalOpen(false);
            setLiveFiles('')
        }else{
            toast.error('something went wrong',{position:'top-center'})
        }
      } catch (error) {
        console.log(error)
      }
    }


  return (
    <div className='mb-12'>
      <ul className=' lg:w-[230px] w-[80px] flex shrink-0 flex-col text-center  bg-violet-200 '>
<li className='lg:p-3 p-1 border-b text-black'> <Link to={'/'}>Home</Link> </li>

<li onClick={showModal} className=' lg:p-3   border-b text-black'>create post</li>
<li  className='lg:p-3  border-b text-black'>Message</li>
<li  className='lg:p-3  border-b text-black'>Followers</li>
<li  className='lg:p-3  border-b text-black'>Following</li>
</ul>

<Modal title= "Create Post" className='lg:w-full md:w-[150px] sm:w-[80px] text-center' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {/* <p>Some contents...</p> 
        <p>Some contents...</p>
        <p>Some contents...</p> */}

<form action="" className='  flex flex-col gap-3'>
<label htmlFor="">title</label>
<input ref={titleRef} className='px-4 py-2 rounded-md border' type="text" placeholder='enter title' />
{/* 
<label htmlFor="">Description</label>
<textarea ref={descriptionRef} className='px-4 py-2 rounded-md border' name="" id=""></textarea> */}

<label className='bg-green-700 rounded-md text-center w-max hover:bg-green-200 px-4 py-2 text-white' htmlFor="file">upload</label>
<input  onChange={handlefilechange} id='file' multiple hidden type="file" />

{uploadfile && <div className='flex justify-center items-start'>
{

  uploadfile?.map((ele,i)=>{
return ele.type.includes('image')? <img className='w-[150px] h-[150px] m-auto ' src={URL.createObjectURL(ele)} alt="" />: <video className='w-[150px] h-[150px] m-auto' controls src={URL.createObjectURL(ele)}></video>
})
}
</div>}
{/* <img className='w-[150px] h-[150px] m-auto' src="" alt="" /> */}
<button onClick={handleSubmit} className='bg-blue-700 rounded-md hover:bg-blue-400 px-4 py-2 text-white'>post</button>
</form>

      </Modal>
    </div>
  )
}

export default Sidebarcom
