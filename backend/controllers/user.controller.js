import User from "../models/user.model.js";

export const getuserSavedPosts = async(req,res)=>{
    const clerkUserid = req.auth?.userId;
    if(!clerkUserid){
        return res.status(401).json("not authenticated")
    }
     const user = await User.findOne({clerkUserid})

     res.status(200).json(user.savedposts)
}
export const savePosts = async(req,res)=>{
    const clerkUserid = req.auth?.userId;
    const postId = req.body.postId;
    if(!clerkUserid){
        return res.status(401).json("not authenticated")
    }
     const user = await User.findOne({clerkUserid})
     const isSaved = user.savedposts.some((p)=>p===postId);

     if(!isSaved){
        await User.findByIdAndUpdate(user._id,{
            $push:{savedposts:postId},
        })
     }else{
        await User.findByIdAndUpdate(user._id,{
            $pull:{savedposts:postId},
     })

     setTimeout(() => {
        
         res.status(200).json(isSaved?"Post unsaved " : "Post saved")
     }, 3000);

     
}
}