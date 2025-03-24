
const usercollection =require('../Models/Usermodels')

const bcrypt=require('bcryptjs')
const salt=bcrypt.genSaltSync(10)
var jwt=require('jsonwebtoken')
const JWT_SECRET='mySecret@09'
const nodemailer = require("nodemailer");
var randomstring = require("randomstring");

const Userregister= async(req,res)=>{
// res.send('user register');
const {name,email,password,phone}=req.body
try {

  let hashpaasword=bcrypt.hashSync(password,salt)
let data=await usercollection.create({
name,
email,
password:hashpaasword,
phone

})

res.status(200).json({msg:'user register succesfully'})  
} catch (error) {
    res.status(500).json({msg:"error in creating user",error:error.message})
}


}
const Userlogin=async(req,res)=>{
// res.send('user register');
const{email,password}=req.body
if(!password || !email){
return res.json({msg:"all field are required"})

}
try {
    let user=await usercollection.findOne({email});
if(user){
let comparePassword=bcrypt.compareSync(password,user.password)
if(comparePassword){

let token=jwt.sign({_id:user._id},JWT_SECRET)
res.cookie('token',token)
res.status(201).json({msg:'login succesfully',user,token})
}
else{
return res.status(401).json({msg:"invalid credantial"})

}
}
else{
res.status(404).json({msg:"user not found please signup"})

}


} catch (error) {
    res.status(500).json({msg:"error in login user",error:error.message})
}
}

const Userupdate= async(req,res)=>{
// res.send('user update');
  const {name,password,phone,profilePic,coverPic} = req.body;
    const id = req.user._id
    
    if(password){
        var hashedPassword = bcrypt.hashSync(password,salt)
    }
    
    let data = await usercollection.findByIdAndUpdate( id,{name,password:hashedPassword,phone,profilePic,coverPic},{new:true});
    res.status(200).json({msg:"updated successfully",data})


}

const UserDelete= async(req,res)=>{
// res.send('user register');
    // const  {id} = req.params;
    console.log(req.user)
    
try {
    let data = await usercollection.findByIdAndDelete(req.user._id)
    res.status(200).json({msg:"user deleted successfully"})

} catch (error) {
    res.status(500).json({msg:"error in deleting user",error:error.message})
}


}

const forgetPassword= async(req,res)=>{
    const {email}=req.body
    let user=await usercollection.findOne({email})

    if(user){
        let resetToken=randomstring.generate(25)
        user.passwordResetToken=resetToken;
        await user.save()
       
        

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports

  auth: {
    user: "shubhamupadhyay627@gmail.com",
    pass: 'mgge ybeu cxyx qevj'


  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "shubhamupadhyay@gmail.com" , // sender address
    to:email, // list of receivers
    subject: "Password reset request", // Subject line
    text: `please click the link \n http://localhost:8090/user/passwordToken/${resetToken}`,// plain text body
  
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
main().catch(console.error);
res.json({msg:'pleses check the email'})
    }
    else{
     return res.status(404).json({msg:'user not found'})
 }
}
const resetPassword=async(req,res)=>{
const{token}=req.params
const {password}=req.body

let user =await usercollection.findOne({passwordResetToken:token})
let hashedPassword=bcrypt.hashSync(password,salt)
user.password=hashedPassword
user.passwordResetToken=null
await user.save();
res.status(200).json({msg:"password updated succesfully"})


}
const getLogInUser = async(req,res)=>{
        console.log(req.user)
        res.status(200).json(req.user)
}

const searchuser=async(req,res)=>{
let {name} =req.query
console.log(name);
if(name===''){
return res.json({user:[]})
}
let user=await usercollection.find({name: new RegExp(name)})
console.log(user);

res.status(200).json({user})


}


const getFriend = async(req,res)=>{
        const {friendId} = req.params;
       try {
        let user  = await usercollection.findById(friendId).select('-password');
        return res.status(200).json({user})
       } catch (error) {
        res.status(500).json({error:error.message})
       }
}

const followers=async(req,res)=>{
let {_id} = req.user;
let {friendId}=req.params;

try {
  let user=await usercollection.findById(_id).select('-password')
let friend =await usercollection.findById(friendId).select('-password'); ;

if(!user.followings.includes(friend._id)){
user.followings.push(friend._id)
friend.followers.push(user._id)
await user.save()
await friend.save()
res.status(200).json({msg:"follow succesfully",user,friend})
}
else{
user.followings.pull(friend._id)
friend.followers.pull(user._id)
await user.save()
await friend.save()

res.status(200).json({msg:"unfollow succesfully",user,friend})

}
} catch (error) {
  res.status(500).json({error:error.message})
}

}

module.exports={

Userregister,
Userlogin,
Userupdate,
UserDelete,
forgetPassword,
resetPassword,
getLogInUser,
searchuser,
getFriend,
followers
}
