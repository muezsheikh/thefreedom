import mongoose from "mongoose";

const msgSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: String,
})

export default mongoose.models.messages || mongoose.model('messages', msgSchema)