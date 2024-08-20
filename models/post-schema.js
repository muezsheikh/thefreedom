import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  title: String,
  image: String,
  category: String,
  content: String,
  banner: Boolean,
  tags: Array,
  date: String,
  createdAt: { type: Date, default: Date.now },
  postCustomId: Number,
  postby: String
})

export default mongoose.models.posts || mongoose.model('posts', postSchema)
