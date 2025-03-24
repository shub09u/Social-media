const Postcollection = require("../Models/Postcollection");

  const createpost =async(req,res)=>{


try {
const {title,description,file}=req.body;
const {_id}=req.user

let post =await Postcollection.create({
title,
description,
file,
userId:_id
})
res.status(201).json({msg:'post created succesfully',success:true})
}  
 catch (error) {
res.status(500).json({msg:'error in creating post', error:error.message})    
}

  }
const updatepost=async(req,res)=>{

}


const deletepost=async(req,res)=>{

}


const getallyoupost=async(req,res)=>{
 let {_id} = req.user
    let posts = await Postcollection.find({userId:_id}).populate({path:'userId',select:'-password'}).populate({path:'Comment',populate:{path:'userId',select:'profilePic name'}});
    res.status(200).json({posts})
}


const alluserspost=async(req,res)=>{
 let post = await Postcollection.find().populate({path:'userId',select:'-password'}).sort({createdAt:-1}).populate({path:'Comment',populate:{path:'userId',select:'profilePic name'}});
    res.status(200).json({post})
}

const likesPost = async(req,res)=>{
    let{ postId} = req.params;
    const { _id } = req.user;

   try {
    let post = await Postcollection.findById(postId)
    if(post.likes.includes(_id)){
        post.likes.pull(_id)
        await post.save()
        res.status(200).json({msg:'post disliked successfully'})
    }
    else{
        post.likes.push(_id)
        await post.save()
        res.status(200).json({msg:'post liked successfully'})
    }
   } catch (error) {
    res.status(500).json({error:error.message})
   }
}

const commentpost=async(req,res)=>{
let { postId }=req.params;
let { _id }=req.user;
let { text }=req.body;
    let post = await Postcollection.findById(postId)
post.Comment.push({userId:_id, text:text})
await post.save()
res.status(200).json({msg:'comment added succesfully'})

}

const deleteComment = async(req,res)=>{
    const {postId, commentId} = req.params;
    console.log(postId)
    console.log(commentId)

    let post = await Postcollection.findById(postId);
   let filterArr =  post.Comment.filter((comnt)=>comnt._id.toString()!==commentId)
    post.Comment = filterArr
    await post.save()
    res.status(200).json({msg:"comment deleted successfully"})
}
const commentlike = async (req, res) => {
  const { postId, commentId } = req.params;
  const { _id } = req.user;

  try {
    let post = await Postcollection.findById(postId).populate({
      path: 'Commentlike',
      select: 'userId text likes', 
    });

    let comment = post?.Comment.id(commentId);
    if (!comment) {
      return res.status(401).json({ msg: 'comment not found' });
    }

    if (comment.likes?.includes(_id)) {
      comment.Commentlike?.pull(_id);
      await post.save();
      res.status(200).json({ msg: 'comment unliked successfully' });
    } else {
      comment.Commentlike?.push(_id);
      await post.save();
      res.status(200).json({ msg: 'comment liked successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const friendPost = async(req,res)=>{
   try {
    let {friendId} = req.params;

    let posts = await Postcollection.find({userId:friendId}).populate({path:'userId',select:'-password'}).sort({createdAt:-1}).populate({path:'Comment',populate:{path:'userId',select:'profilePic name'}});

    res.status(200).json({posts})
   } catch (error) {
    res.status(200).json({error:error.message})
   }

}



module.exports={
createpost,
updatepost,
deletepost,
getallyoupost,
alluserspost,
likesPost,
commentpost,
deleteComment,
commentlike,
friendPost
}