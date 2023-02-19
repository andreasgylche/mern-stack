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
        const { id } = req.params;

        // const user = await User.findById(id, { password: 0 });
        const posts = await Post.find({ user: id });

        const totalPosts = posts.length;

        let totalLikes = 0;
        const likes = posts.map((post) => {
            totalLikes += post.likes.size;
        });

        const user = await User.findByIdAndUpdate(
            id,
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
        const { id } = req.params;
        const { username, email, picturePath } = req.body;

        const user = await User.findByIdAndUpdate(id, {
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
        const { id, followId } = req.params;
        const user = await User.findById(id);
        const followUser = await User.findById(followId);
        const isFollow = user.following.get(followId);

        if (isFollow) {
            user.following.delete(followId);
            followUser.followers.delete(id);
        } else {
            user.following.set(followId, true);
            followUser.followers.set(id, true);
        }

        await user.save();
        await followUser.save();

        const updatedUser = await User.findById(id);

        const updatedFollowing = updatedUser.following;

        res.status(200).json(updatedFollowing);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

/* DELETE */
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User has been deleted.' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
