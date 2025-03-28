import express from 'express';
const router = express.Router();
import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import { validateCreateComment, validateUpdateComment } from '../middleware/commentValidations.js';

/**
 * POST /comments/post/{postId}
 * @tags Comments
 * @summary Create a new comment for a specific post
 * @param {string} postId.path.required - ID of the post to comment on
 * @param {object} request.body.required - Comment object to be created
 * @property {string} text - The content of the comment
 * @property {string} author - ID of the author
 * @return {object} 201 - Success response - application/json
 * @return {object} 400 - Validation error - application/json
 * @return {object} 404 - Post not found - application/json
 * @return {object} 500 - Error response
 */
router.post('/comments/post/:postId', validateCreateComment, async (req, res) => {
  try {
    const postExists = await Post.findById(req.params.postId);
    if (!postExists) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = new Comment({
      text: req.body.text,
      author: req.body.author,
      postId: req.params.postId
    });

    const savedComment = await comment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET /comments/post/{postId}
 * @tags Comments
 * @summary Get all comments for a specific post
 * @param {string} postId.path.required - ID of the post to retrieve comments for
 * @return {array<object>} 200 - Success response - application/json
 * @return {object} 500 - Error response
 */
router.get('/comments/post/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET /comments/comment/{commentId}
 * @tags Comments
 * @summary Get a specific comment by ID
 * @param {string} commentId.path.required - ID of the comment to fetch
 * @return {object} 200 - Success response - application/json
 * @return {object} 404 - Not found error - application/json
 * @return {object} 500 - Error response
 */
router.get('/comments/comment/:commentId', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/**
 * PUT /comments/comment/{commentId}
 * @tags Comments
 * @summary Update an existing comment (full replacement)
 * @param {string} commentId.path.required - ID of the comment to update
 * @param {CommentUpdateInput} request.body.required - Updated comment data
 * @return {Comment} 200 - Success response - application/json
 * @return {object} 400 - Validation error - application/json
 * @return {object} 404 - Not found error - application/json
 * @return {object} 500 - Error response
 */
/**
 * @typedef {object} CommentUpdateInput
 * @property {string} text - The updated comment text
 * @property {string} author - The updated author name
 */
router.put('/comments/comment/:commentId', validateUpdateComment, async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(req.params.commentId, req.body, {
      new: true,
      overwrite: true, // Ensure full replacement
      runValidators: true
    });

    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json(updatedComment);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ message: err.message });
  }
});

/**
 * DELETE /comments/comment/{commentId}
 * @tags Comments
 * @summary Delete a comment by ID
 * @param {string} commentId.path.required - ID of the comment to delete
 * @return {object} 200 - Success response - application/json
 * @return {object} 404 - Not found error - application/json
 * @return {object} 500 - Error response
 */
router.delete('/comments/comment/:commentId', async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);
    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
