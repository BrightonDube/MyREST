import express from 'express';
const router = express.Router();

//Routes

router.get('/', (req, res) => {
    res.send('This is my first post')
    });


export default router;