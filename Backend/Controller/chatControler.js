 const chatcollection = require("../Models/chatCollection");
const Conversation = require("../Models/Conversation");

  const createchat =async(req,res)=>{

try {
  let {friendId}=req.params;
let {text,file} =req.body;
let {_id}=req.user;

let chat = await chatcollection.create({
friendId,
text, 
file,
userId:_id

})

 let conversation = await Conversation.findOne({members:{$all:[friendId,_id]}})
    if(!conversation){
        conversation = await Conversation.create({members:[friendId,_id]})
    }

    conversation.messages.push(chat._id);
    await conversation.save()


    res.status(201).json({msg:"message sent successfully"})
  }


     catch (error) {
        res.status(500).json({error:error.message})
}

  }

const getFriendChat = async(req,res)=>{

try {
   let {friendId }= req.params;
    let {_id} = req.user;

    let chat = await Conversation.find({members:{$all:[friendId,_id]}}).populate('messages');
    res.status(201).json(chat)
} catch (error) {
     res.status(500).json({error:error.message})
}
   
}


module.exports={
createchat,
getFriendChat
}