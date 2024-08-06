import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  url: String,
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', PostSchema);

export default Post;