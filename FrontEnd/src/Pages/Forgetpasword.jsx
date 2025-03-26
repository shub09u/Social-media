import React, {useRef} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

const Forgetpasword = () => {
 let inputRef = useRef();

 const handleSubmit= async (e)=>{
e.preventDefault();

let obj={
email:inputRef.current.value
}
if(!obj.email){
return toast.warning('email field cannot be blank ',{position:'top-center'})

}
let res = await axios.post('https://social-media-1-7t2p.onrender.com/user/forget',obj)

        let data = res.data
        toast.success(data.msg,{position:"top-center"})

        console.log(data)
        inputRef.current.value = ''
 }


  return (
    <>
  <div className=' h-[50vh] flex justify-center gap-6 flex-col items-center'>
        
     
        <h1 className='text-xl font-semibold'>Forget password page</h1>
        <form action="" className='flex gap-2 items-center'>
            <h1 className='text-lg'>Enter your Email </h1>
            <input ref={inputRef}  type="text" placeholder='enter your email' className='px-3 py-2 border rounded-md outline-none' />
            <button onClick={handleSubmit} className='bg-red-600 rounded-md cursor-pointer px-4 py-2 hover:bg-red-900 text-white'>Submit</button>
        </form>
    </div>
    </>
  )
}

export default Forgetpasword
