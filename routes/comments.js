// routes/comments.js
import express from 'express';
const router = express.Router();
import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import { validateCreateComment, validateUpdateComment } from '../middleware/commentValidations.js';
/**
 * POST /comments/{postId}
 * @tags Comments
 * @summary Create a new comment for a specific post
 * @param {string} postId.path.required - ID of the post to comment on
 * @param {CommentInput} request.body.required - Comment object to be created
 * @return {Comment} 201 - Success response - application/json
 * @return {object} 400 - Validation error - application/json
 * @return {object} 404 - Post not found - application/json
 * @return {object} 500 - Error response
 */
router.post('/comments/:postId', validateCreateComment, async (req, res) => {
  try {
    const postId = req.params.postId;
    const postExists = await Post.findById(postId); // Validate if post exists
    if (!postExists) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = new Comment({
      text: req.body.text,
      author: req.body.author,
      postId: postId
    });
    const savedComment = await comment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get comments for a post
/**
 * GET /comments/{postId}
 * @tags Comments
 * @summary Get all comments for a specific post
 * @param {string} postId.path.required - ID of the post to retrieve comments for
 * @return {array<Comment>} 200 - Success response - application/json
 * @return {object} 500 - Error response
 */
router.get('/comments/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific comment by ID
/**
 * GET /comments/{commentId}
 * @tags Comments
 * @summary Get a specific comment by ID
 * @param {string} commentId.path.required - ID of the comment to fetch
 * @return {Comment} 200 - Success response - application/json
 * @return {object} 404 - Not found error - application/json
 * @return {object} 500 - Error response
 */
router.get('/comments/:commentId', async (req, res) => {
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

// PUT Update a comment (Optional - you can also use PATCH for partial updates)
/**
 * PUT /comments/{commentId}
 * @tags Comments
 * @summary Update an existing comment (PUT - full replacement)
 * @param {string} commentId.path.required - ID of the comment to update
 * @param {CommentInput} request.body.required - Comment object for full replacement
 * @return {Comment} 200 - Success response - application/json
 * @return {object} 400 - Validation error - application/json
 * @return {object} 404 - Not found error - application/json
 * @return {object} 500 - Error response
 */
router.put('/comments/:commentId', validateUpdateComment, async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(req.params.commentId, req.body, {
      new: true,
      overwrite: true,
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

// DELETE a comment
/**
 * DELETE /comments/{commentId}
 * @tags Comments
 * @summary Delete a comment by ID
 * @param {string} commentId.path.required - ID of the comment to delete
 * @return {object} 200 - Success response
 * @return {object} 404 - Not found error - application/json
 * @return {object} 500 - Error response
 */
router.delete('/comments/:commentId', async (req, res) => {
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
