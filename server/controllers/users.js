import User from '../models/User.js';
import Post from '../models/Post.js';

/* READ */
export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const posts = await Post.find({ user: userId });

        const totalPosts = posts.length;
        const totalLikes = posts.reduce(
            (acc, post) => acc + post.likes.size,
            0
        );

        const user = await User.findByIdAndUpdate(
            userId,
            { totalPosts: totalPosts, totalLikes: totalLikes },
            { new: true, select: '-password' }
        );

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

/* UPDATE */
export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { username, email, picturePath } = req.body;

        const user = await User.findByIdAndUpdate(userId, {
            username,
            email,
            picturePath,
        });

        user.save();

        const updatedUser = {
            username,
            email,
            picturePath,
        };
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const addRemoveFollower = async (req, res) => {
    try {
        const { userId, followId } = req.params;
        const [user, followUser] = await Promise.all([
            User.findById(userId),
            User.findById(followId),
        ]);

        const isFollow = user.following.get(followId);

        if (isFollow) {
            user.following.delete(followId);
            followUser.followers.delete(userId);
        } else {
            user.following.set(followId, true);
            followUser.followers.set(userId, true);
        }

        await Promise.all([user.save(), followUser.save()]);

        res.status(200).json(user.following);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

/* DELETE */
export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User has been deleted.' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
