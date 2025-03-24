const express=require('express')
const router = express.Router();
const path = require('path');  
const { createpost, updatepost, deletepost, alluserspost, getallyoupost, likesPost, commentpost, deleteComment, commentlike, friendPost } = require('../Controller/postControler');
const checkToken = require('../CheckToken');
const { searchuser } = require('../Controller/Usercontroller');



router.post('/create',checkToken,createpost);
router.put('/update/:postId',checkToken,updatepost);
router.delete('/delete/:postId',checkToken,deletepost);
router.get('/alluserpost',checkToken,alluserspost);
router.get('/yourpost',checkToken,getallyoupost)
router.get('/likepost/:postId',checkToken,likesPost)
router.post('/comment/:postId',checkToken,commentpost)
router.delete('/commentDelete/:postId/:commentId',deleteComment)
router.get('/likecomment/:postId/:commentId',checkToken,commentlike)
router.get('/friendPost/:friendId',checkToken,friendPost)


module.exports=router