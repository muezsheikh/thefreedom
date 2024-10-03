import connectDb from "@/lib/connect-db";
import Post from "@/models/post-schema";

export default async function handler(req, res) {
  await connectDb();
  try {
    let query = {};
    const postSchema = Post.schema.obj;
    if (postSchema.postCustomId > 0) {
      query.postCustomId = req.query.id;
    } else {
      query._id = req.query.id;
    }
    const post = await Post.findOne(query);
    res.status(200).json({ post });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
