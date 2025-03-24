const mongoose=require('mongoose')
let UserSchema=new mongoose.Schema({

name:{
type:String,
required:[true,'name is required'],
trim:true,
minLength:[3,'name should be greater than 3 character']

},
email:{
type:String,
require:[true,'email is required'],
unique:true

},
password:{
type:String,
require:true

},
phone:{

type:String
}

},{timestamps:true})


UserSchema.add({
passwordResetToken:{
type:String,
default:null

},
profilePic:{
      type:String,
      default:"https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="
  },
  coverPic:{
      type:String,
      default:"https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="
  },
  bio:{
  type:String
 },
followers:[
{
type:mongoose.Schema.Types.ObjectId,
require:true,
ref:"users"
}
],

followings:[
{
type:mongoose.Schema.Types.ObjectId,
require:true,
ref:"users"
}

]

})

module.exports= mongoose.model('users',UserSchema)  