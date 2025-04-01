import Post from "../models/post.model.js";

const increasevisit = async (req, res, next) => {
    try {
        const slug = req.params.slug;

        const post = await Post.findOneAndUpdate(
            { slug },
            { $inc: { visit: 1 } },
            { new: true }
        );

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export default increasevisit;
