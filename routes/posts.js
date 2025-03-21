import express from 'express';
const router = express.Router();
import Post from '../models/Post.js';
import { validateCreatePost, validateUpdatePost } from '../middleware/postValidations.js';

//All posts
/**
 * GET /posts
 * @tags Posts
 * @summary Get all posts
 * @return {array<Post>} 200 - Success response - application/json
 * @return {object} 500 - Error response
 */
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * POST /posts
 * @tags Posts
 * @summary Create a new post
 * @param {PostInput} request.body.required - Post object to be created
 * @return {Post} 200 - Success response - application/json
 * @return {object} 400 - Validation error - application/json
 * @return {object} 500 - Error response
 * @example request - example payload
 * {
 *   "title": "My New Post Title",
 *   "description": "This is the description of my new post."
 * }
 * @example response - 400 - Validation Error
 * {
 *   "errors": [
 *     {
 *       "msg": "Title is required",
 *       "param": "title",
 *       "location": "body"
 *     }
 *   ]
 * }
 */
// save some posts
router.post('/', validateCreatePost, async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET /posts/{postId}
 * @tags Posts
 * @summary Get a specific post by ID
 * @param {string} postId.path.required - ID of the post to fetch
 * @return {Post} 200 - Success response - application/json
 * @return {object} 500 - Error response
 */
// get a specific post
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.send(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * PUT /posts/{postId}
 * @tags Posts
 * @summary Update an existing post (PUT - full replacement)
 * @param {string} postId.path.required - ID of the post to update
 * @param {PostInput} request.body.required - Post object for full replacement
 * @return {Post} 200 - Success response - application/json
 * @return {object} 400 - Validation error - application/json
 * @return {object} 404 - Not found error - application/json
 * @return {object} 500 - Error response
 * @example request - example payload
 * {
 *   "title": "My Updated Post Title (PUT)",
 *   "description": "This is the completely replaced description for my post using PUT."
 * }
 * @example response - 400 - Validation Error
 * {
 *   "errors": [
 *     {
 *       "msg": "Title is required",
 *       "param": "title",
 *       "location": "body"
 *     }
 *   ]
 * }
 * @example response - 404 - Not Found Error
 * {
 *   "message": "Post not found"
 * }
 */
//PUT Update
router.put('/:postId', validateCreatePost, async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        title: req.body.title,
        description: req.body.description
      },
      { new: true, overwrite: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * PATCH /posts/{postId}
 * @tags Posts
 * @summary Update an existing post (PATCH - partial update)
 * @param {string} postId.path.required - ID of the post to update
 * @param {PostUpdateInput} request.body - Fields to update in the post (optional)
 * @return {Post} 200 - Success response - application/json
 * @return {object} 400 - Validation error - application/json
 * @return {object} 500 - Error response
 * @example request - example payload
 * {
 *   "title": "Partially Updated Title"
 * }
 * @example response - 400 - Validation Error
 * {
 *   "errors": [
 *     {
 *       "msg": "Title must be a string",
 *       "param": "title",
 *       "location": "body"
 *     }
 *   ]
 * }
 */
// update a post
router.patch('/:postId', validateUpdatePost, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.postId, req.body, {
      new: true
    });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * DELETE /posts/{postId}
 * @tags Posts
 * @summary Delete a post by ID
 * @param {string} postId.path.required - ID of the post to delete
 * @return {object} 200 - Success response
 * @return {object} 500 - Error response
 */
router.delete('/:postId', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @typedef PostInput
 * @property {string} title.required - Title of the post
 * @property {string} description.required - Description of the post
 */

/**
 * @typedef PostUpdateInput
 * @property {string} title - Title of the post (optional)
 * @property {string} description - Description of the post (optional)
 */

export default router;
