const mongoose=require('mongoose')
const chatSchema=new mongoose.Schema({

userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"users"
},

friendId:{
type:mongoose.Schema.Types.ObjectId,
ref:"users"

},
text:{
type:String,


},
file:{
type:String
}


})

module.exports =mongoose.model('chat',chatSchema)  