import Comment from "../models/comment.model.js"
import User from "../models/user.model.js"
export const getPostComments = async(req,res)=>{
    const comments = await Comment.find({post:req.params.postId})
    .populate("user","username img")
    .sort({createdAt:-1})
    res.json(comments)
}
export const addComments = async (req, res) => {
    const clerkUserId = req.auth?.userId; 
    const postId = req.params.postId;
    console.log(clerkUserId); 
    console.log(postId)
    if (!clerkUserId) {
        return res.status(401).json({ message: "Not authenticated Because of clerkUserId" });
    }

    console.log("Searching for user with clerkUserId:", clerkUserId);
    const user = await User.findOne({ clerkUserid: clerkUserId });

    if (!user) {
        console.error("User not found in MongoDB!");
        return res.status(404).json({ message: "User not found" });
    }


    const newComment = new Comment({
        ...req.body,
        user: user._id, 
        post: postId,
    });

    const savedComment = await newComment.save();
    res.json(savedComment);
};

export const deleteComments = async(req,res)=>{
    const clerkUserId = req.auth.clerkUserId
    const id = req.params.id;
    if(!clerkUserId){
        return res.status(401).json("not authenticated")

    }
    const user =await User.findOne({clerkUserId})
    const deletedcomment = await Comment.findOneAndDelete({
        _id:id,
        user:user.id,
    });
    if(!deletedcomment){
        return res.status(403).json("you can delete only your comment")
    }
    return res.json("comment deleted")
    
}