import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const newPost = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No posts with id ${_id}`);
    
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, newPost, { new: true });
    res.status(200).json(updatedPost);
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No posts with id ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.status(200).json({ message: "Post deleted successfully!" });
};

export const updateLikeCount = async (req, res) => {
    const { id } = req.params;
    const currentUserId = req.userId

    if (!currentUserId) return res.status(401).json({ message: "Unauthorized" });

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No posts with id ${id}`);

    const currentPost = await PostMessage.findById(id);

    const index = currentPost.likes.findIndex(id => id === String(currentUserId));
    if (index < 0) {
        currentPost.likes.push(currentUserId);
    } else {
        currentPost.likes = currentPost.likes.filter(id => id !== String(currentUserId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, currentPost, {new: true});
    res.status(200).json(updatedPost);
};