import User from '../models/User.js';

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
        const user = await User.findById(id, { password: 0 });

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

/* UPDATE */
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, picturePath } = req.body;

        const user = await User.findByIdAndUpdate(id, {
            firstName,
            lastName,
            email,
            picturePath,
        });
        user.save();

        const updatedUser = {
            firstName,
            lastName,
            email,
            picturePath,
        };
        res.status(200).json(updatedUser);
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
