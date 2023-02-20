import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        picturePath: {
            type: String,
        },
        likes: {
            type: Map,
            of: Boolean,
            default: {},
        },
        comments: {
            type: Array,
            default: [],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
