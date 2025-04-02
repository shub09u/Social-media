/* eslint-disable jsx-a11y/anchor-is-valid */
import  React, { useRef, useState } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import { MdDelete } from "react-icons/md";
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import Face from '@mui/icons-material/Face';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FaHeart } from "react-icons/fa";
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Posts(props) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [seletcedPost, setseletcedPost] = useState('');

let navigate = useNavigate()

    console.log(seletcedPost)

    const showModal = (obj) => {
        setseletcedPost(obj)
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

        let commentRef = useRef()
        let userSlice = useSelector((state)=>state.user)
        let userId = userSlice.user?._id
        console.log(userId)


    const handleLike = async(obj)=>{
        console.log(obj)

        let res = await axios.get(`https://social-media-1-7t2p.onrender.com/posts/likePost/${obj._id}`,{
            headers:{
                'Authorization':userSlice.token
            }
        })
        let data = res.data
        props.getAllPosts()
        console.log(data)
    }


    const settings = {
  
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        arrows:false,
        dots:true
      };

const commentLike=async(obj)=>{
console.log(obj);

 let res = await axios.get(`https://social-media-1-7t2p.onrender.com/posts/likecomment/${props.ele._id}/${obj._id}`,{
            headers:{
                'Authorization':userSlice.token
            }
        })
        let data = res.data
        props.getAllPosts()

        console.log(data)


}

      const commentHandler = async(post)=>{
        let text = commentRef.current.value;
        console.log(text)
        console.log(post)
        let res = await axios.post(`https://social-media-1-7t2p.onrender.com/posts/comment/${post._id}`,{text},{
            headers:{
                'Authorization':userSlice.token
            }
        })
        let data = res.data;
        console.log(data)
        commentRef.current.value = ''
        props.getAllPosts()

      }
      const handleCommentDelete = async(obj)=>{
        console.log(obj)
        console.log(props.ele)
        let res = await axios.delete(`https://social-media-1-7t2p.onrender.com/posts/commentDelete/${props.ele._id}/${obj._id}`)
        let data = res.data;
        console.log(data)
        props.getAllPosts()

      }
const handleClick=()=>{
  if(props?.ele?.userId?._id===userId){
            navigate('/profile')
        }
        else{

            navigate('/friendProfile', {state:props?.ele?.userId?._id})
        }

}
    return (
    <div>
            <Card
            variant="outlined"
            sx={{ minWidth: 250, '--Card-radius': (theme) => theme.vars.radius.xs }}
        >
             
            <CardContent onClick={handleClick} orientation="horizontal" sx={{ alignItems: 'center', gap: 1 }}>
                <Box
                    sx={{
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            m: '-2px',
                            borderRadius: '50%',
                            background:
                                'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                        },
                    }}
                >
                    <Avatar
                        size="md"
                        src={props.ele.userId.profilePic}
                        sx={{ border: '2px solid',borderRadius:'100%', borderColor: 'background.body' }}
                    />
                </Box>
                <Typography sx={{ fontWeight: 'lg' }}>{props.ele.userId.name}</Typography>
                <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
                    <MoreHoriz />
                </IconButton>
            </CardContent>

            {
                !props.ele.file.length && <div className='min-h-[150px] '>
                    <div className='flex min-h-[150px] justify-center items-center'>
                      <p className='text-center'>  {props.ele.title}</p>
                    </div>
                </div>
            }
        
   {  props.ele.file.length >0   &&   <Slider {...settings} className='h-[250px] relative flex  '>
    {
        props.ele.file.map((url, index) => (
            url.includes('image') ? (
                <div key={index}>
                    <img className='w-full object-contain h-[250px]' src={url} alt={`Slide ${index + 1}`} />
                </div>
            ) :(
                <div key={index}>
                    <video className='w-full h-[250px]' controls src={url}></video>
                </div>
            )
            
            
        ))
    }
</Slider>}

            <CardContent orientation="horizontal" sx={{ alignItems: 'center', mx: -1 }}>
                <Box sx={{ width: 0, display: 'flex', gap: 0.5 }}>
                   {!props.ele.likes.includes(userId) && <IconButton onClick={()=>handleLike(props.ele)} variant="plain" color="neutral" size="sm">
                        <FavoriteBorder />       
                    </IconButton>}
                  {props.ele.likes.includes(userId) &&  <IconButton  onClick={()=>handleLike(props.ele)}   color="danger" size="sm">
                        <FaHeart size={22}/>       
                    </IconButton>}
                    <FaHeart color='red' size={30}/>
                    <IconButton variant="plain" color="neutral" size="sm">
                        <ModeCommentOutlined onClick={()=>showModal(props.ele)}/>
                            <sup className='-mt-3 text-sm text-red-600'>{props.ele.Comment.length}</sup>
                    </IconButton>
                    <IconButton variant="plain" color="neutral" size="sm">
                        <SendOutlined />
                    </IconButton>
                </Box>
               
              
            </CardContent>
            <CardContent>
                <Link
                    component="button"
                    underline="none"
                    textColor="text.primary"
                    sx={{ fontSize: 'sm', fontWeight: 'lg' }}
                >
                    {props.ele.likes.length} Likes
                </Link>

               { props.ele.file.length>0 &&<Typography sx={{ fontSize: 'sm' }}>
                   
                   {props.ele.title}
                </Typography>}
                <Link
                    component="button"
                    underline="none"
                    startDecorator=""
                    sx={{ fontSize: 'sm', color: 'text.tertiary' }}
                >
                
                </Link>
                <Link
                    component="button"
                    underline="none"
                    sx={{ fontSize: '10px', color: 'text.tertiary', my: 0.5 }}
                >
                   {props.ele.createdAt && formatDistanceToNow(new Date(props.ele.createdAt), { addSuffix: true })}
                </Link>
            </CardContent>
            <CardContent orientation="horizontal" sx={{ gap: 1 }}>
                    <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
                        <Face />
                    </IconButton>
                <input
                className='ps-1 w-full outline-none border rounded border-gray-300'
                    ref= {commentRef}
                    variant="plain"
                    size="sm"
                    placeholder="Add a comment…"
                    sx={{ flex: 1, px: 0, '--Input-focusedThickness': '0px' }}
                />
  

                <button onClick={()=>commentHandler(props.ele)} className='cursor-pointer  bg-green-600 px-2 py-1 rounded-md text-white' type='button' role="button">
                    Post
                </button>
            </CardContent>
        </Card>


      <Modal title="Comments" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

            {
               props.ele.Comment.length>0?   <div>
               {
                   props?.ele?.Comment.map((ele)=>{
                        return <div className='mb-5 flex justify-between'>
                            <div className='flex gap-3 '>
                                <img src={ele?.userId?.profilePic} className='w-[40px] h-[40px] rounded-full' alt="" />
                                <div>
                                <p className='font-semibold'>{ele?.userId?.name}</p>
                                <p>{ele.text}</p>
                                </div>

                            </div>
{!props?.ele?.Commentlike?.includes(userId) && <IconButton onClick={()=>commentLike(props.ele)} variant="plain" color="neutral" size="sm">
                        <FavoriteBorder />       
                    </IconButton>}
                  {props?.ele?.Commentlike?.includes(userId) &&  <IconButton  onClick={()=>commentLike(props.ele)}   color="danger" size="sm">
                        <FaHeart size={22}/>       
                    </IconButton>}

                           {userId===ele.userId._id && <MdDelete onClick={()=>handleCommentDelete(ele)}  size={20} color='red'/>}



                        </div>

                    })
                }
               </div> 
               :
               <h1 className='text-center my-2'>No comments to show</h1>
            }
       
      </Modal>
    </div>
    );
}