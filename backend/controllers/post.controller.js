import ImageKit from "imagekit"
import Post from "../models/post.model.js"
import User from "../models/user.model.js"
export const getPosts = async(req,res)=>{

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    
    const query = {};
    const cat = req.query.cat;
    const author = req.query.author;
    const searchQuery = req.query.search;
    const sortQuery = req.query.sort;
    const featured = req.query.featured;
    
    if (cat) {
        query.category = cat;
    }
    if (searchQuery) {
        query.title = { $regex: searchQuery, $options: "i" }; // Fixed typo
    }
    if (author) {
        const user = await User.findOne({ username: author }).select("_id");
        if (!user) {
            return res.status(404).json("No Post Found");
        }
        query.user = user._id;
    }
    
    let sortObj = { createdAt: -1 }; // Default sorting
    if (sortQuery) {
        switch (sortQuery) {
            case "newest":
                sortObj = { createdAt: -1 };
                break;
            case "oldest":
                sortObj = { createdAt: 1 };
                break;
            case "popular":
                sortObj = { visit: -1 };
                break;
            case "trending":
                sortObj = { visit: -1 };
                query.createdAt = {
                    $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
                };
                break;
            default:
                console.warn("Invalid sort query:", sortQuery);
                break;
        }
    }
    if(featured){
        query.isFeatured = true;
    }


    const posts = await Post.find(query)
    .populate("user","username")
    .sort(sortObj)
    .limit(limit)
    .skip((page-1)*limit)
    const totalPosts = await Post.countDocuments();
    const hasMore = (page * limit) < totalPosts;
    
    res.send({posts,hasMore})
}
export const getPost = async(req,res)=>{
    const post = await Post.findOne({slug:req.params.slug}).populate(
        "user",
        "username img"
    )
    res.send(post)
}   
export const createPost = async(req,res)=>{
    console.log(process.env.CLERK_PUBLISHABLE_KEY)
    const clerkUserid = req.auth?.userId;
    console.log(req.headers)
    if(!clerkUserid){
        return res.status(401).json("not authenticated")
    }
    const user = await User.findOne({clerkUserid})
    let slug = req.body.title.replace(/ /g, "-").toLowerCase(); 
    let existingPost = await Post.findOne({ slug });
  
   
    let counter = 2;
    while (existingPost) {
      slug = `${slug}-${counter}`;
      existingPost = await Post.findOne({ slug });
      counter++;
    }
    console.log(slug)
    
    const newPost = new Post({user:user._id,slug,...req.body})
    const post = await newPost.save();
    res.send(post)
}
export const deletePost = async(req,res)=>{
    const clerkUserid = req.auth.userId;
    if(!clerkUserid){
        return res.status(401).json("not authenticated")
    }
    const role = req.auth.sessionClaims?.metadata?.role ||"user"
    if(role ==="admin"){
        await Post.findByIdAndDelete(req.params.id)
        return res.send("the post has been deleted successfully")

    }
    const user = await User.findOne({clerkUserid})

    const deletedpost = await Post.findByIdAndDelete({_id:req.params.id,user:user._id});
    if(!deletedpost){
        return res.status(403).json("cannot delete others post")
    }
    res.send("the post has been deleted successfully")
}

const imagekit = new ImageKit({
    urlEndpoint: process.env.IK_URL_ENDPOINT,
    publicKey: process.env.IK_PUBLICKEY,
    privateKey: process.env.IK_PRIVATEKEY,
  });
export const uploadauth = async(req,res)=>{
    const result = imagekit.getAuthenticationParameters();;
    res.send(result);
}

export const featurePost = async(req,res)=>{
    const clerkUserid = req.auth.userId;
    const postId = req.body.postId;
    if(!clerkUserid){
        return res.status(401).json("not authenticated")
    }
    const role = req.auth.sessionClaims?.metadata?.role ||"user"
    if(role !=="admin"){
        return res.send("You cannot feature post ")

    }
    const post = await Post.findById(postId);
    if(!post){
        return res.status(404).json("post not found")
    }
    const isFeatured = post.isFeatured;
    const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
            isFeatured:!isFeatured
        },
        {new:true}
    );
    res.status(200).json(updatedPost);
};