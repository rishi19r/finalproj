const Post = require("../models/Post");
const cloudinary = require("../config/cloudinary");
exports.createPost = async (req, res) => {
    try {
        let imageUrl = "";

        // Agar image file bheji gayi hai
        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "post_images" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(req.file.buffer);
            });
            imageUrl = result.secure_url;
        }

        const post = new Post({
            userId: req.user._id,
            content: req.body.content,
            image: imageUrl
        });

        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getFeed = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("userId", "name profilePic")
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.likePost = async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, {
            $addToSet: { likes: req.user.id }
        });
        res.json({ msg: "Post liked" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.commentOnPost = async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, {
            $push: { comments: { userId: req.user.id, text: req.body.text } }
        });
        res.json({ msg: "Comment added" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
