import PostMessage from '../models/postMessage.js'
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const newPost = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No posts with id ${_id}`);
    
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, newPost, { new: true });
    res.status(200).json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No posts with id ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.status(200).json({ message: "Post deleted successfully!" });
}

export const updateLikeCount = async (req, res) => {
    const { id } = req.params;
    const currentPost = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No posts with id ${id}`);

    const likeCount = ++currentPost.likeCount;
    const postWithIncrementedLikes = {...currentPost, likeCount}

    // in the course, this was the solution:
    // await PostMessage.findById to find the current post
    // and then PostMessage.findByIdAndUpdate to over-write the post`s likes
    // but I opted to pass the whole current post from the frontend instead
    // because the service is too slow, so I saved one operation here

    const updatedPost = await PostMessage.findByIdAndUpdate(id, postWithIncrementedLikes, {new: true});
    res.status(200).json(updatedPost);
}