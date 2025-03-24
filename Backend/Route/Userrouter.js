
const express = require('express');
const { Userregister, Userlogin, Userupdate, UserDelete, forgetPassword, resetPassword, getLogInUser, searchuser, getFriend, followers } = require('../Controller/Usercontroller');
const checkToken = require('../CheckToken');

const router = express.Router();
const path = require('path')    
const usercollection = require('../Models/Usermodels')

router.post('/register',Userregister);
router.post('/login',Userlogin);
router.put('/update',checkToken,Userupdate);
router.delete('/delete',checkToken,UserDelete);
router.post('/forget',forgetPassword)


router.get('/passwordToken/:token',async(req,res)=>{
let token=req.params.token
let user= await usercollection.findOne({passwordResetToken:token})
if(user){
res.render('newpassword',{token})
}
else{
res.send("token expired or not valid!")
}
})

router.post('/passwordToken/:token',resetPassword)

router.get('/loginuser',checkToken,getLogInUser)
router.get('/search',searchuser)
router.get('/getFriend/:friendId',checkToken,getFriend)
router.put('/follower/:friendId',checkToken,followers)

module.exports = router