import connectDb from "@/lib/connect-db";
import Post from "@/models/post-schema";

export default async function handler(req, res) {
  await connectDb();
  try {
    let query = {};
    const postSchema = Post.schema.obj;
    console.log('postSchemea', postSchema)
    if (postSchema.postCustomId > 0) {
      query.postCustomId = req.query.id;
    } else {
      query._id = req.query.id;
    }
console.log('query checking', query)
    const post = await Post.findOne(query);
    console.log("Post found:", post);
    res.status(200).json({ post });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
