import mongoose from "mongoose";

const catSchema = new mongoose.Schema({
  category: String,
  link: String,
})

export default mongoose.models.categories || mongoose.model('categories', catSchema)




