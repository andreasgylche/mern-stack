import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            min: 8,
            max: 32,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 8,
        },
        picturePath: {
            type: String,
            default: '',
        },
        following: {
            type: Map,
            of: Boolean,
            default: {},
        },
        followers: {
            type: Map,
            of: Boolean,
            default: {},
        },
        games: {
            type: Map,
            of: Boolean,
            default: {},
        },
        totalPosts: {
            type: Number,
            default: 0,
        },
        totalLikes: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

export default User;
