import express from 'express';
const router = express.Router();
import Post from "../models/Post.js";



//Routes

router.get('/', (req, res) => {
    res.send('This is my first post')
    }); 
router.post('/', async(req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try{
        const savedPost = await post.save();
        res.json(savedPost);
    
    } catch (err) {
    res.status(500).json({ message: err.message });
    };
});


export default router;