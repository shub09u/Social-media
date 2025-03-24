const mongoose=require('mongoose')
const postSchema=new mongoose.Schema({

title:{
type:String,
},
description:{
type:String
},
file:[],
userId:{
type:mongoose.Schema.Types.ObjectId,
require:true,
ref:"users"
},
likes:[
{
type:mongoose.Schema.Types.ObjectId,
require:true,
ref:"users"
}
],

Comment:[
{
userId:{
type:mongoose.Schema.Types.ObjectId,
require:true,
ref:"users"
},
text:{
type:String
},
reply:[
{
userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"users"
},
text:{
type:String
}
}
],
Commentlike:[
{
userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"users"
}

}

]
}
]


},{timestamps:true})
module.exports=mongoose.model('posts',postSchema)