import mongoose from 'mongoose';
const date = new Date().toISOString();

const CommentSchema = mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  date: {
    type: Date,
    default: date
  }
});

export default mongoose.model('Comment', CommentSchema);
