import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
  postId: String,
  name: String,
  email: String,
  comment: String,
  date: String
})

export default mongoose.models.comments || mongoose.model('comments', commentsSchema)