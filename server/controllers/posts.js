import Post from '../models/Post.js';
import User from '../models/User.js';

/* CREATE */
export const createPost = async (req, res) => {
    try {
        const { userId, title, description, picturePath } = req.body;
        const user = await User.findById(userId, { password: 0 });

        const newPost = new Post({
            title,
            description,
            picturePath,
            likes: {},
            comments: [],
            user: user,
        });

        await newPost.save();

        const posts = await Post.find().populate('user');

        res.status(201).json(posts);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

/* READ */
export const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user');
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;

        const userPosts = await Post.find({ user: userId }).populate('user');
        res.status(200).json(userPosts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

/* UPDATE */
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        ).populate('user');

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
