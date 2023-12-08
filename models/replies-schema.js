import mongoose from "mongoose";

const repliesSchema = new mongoose.Schema({
  commentId: String,
  commenterName: String,
  name: String,
  email: String,
  reply: String,
  date: String
})

export default mongoose.models.replies || mongoose.model('replies', repliesSchema)