import connectDb from "@/lib/connect-db";
import Post from "@/models/post-schema";
export default async function handler(req, res) {
  await connectDb();
  try {
    const post = await Post.findOne({ _id: req.query.id });
    console.log("Post found:", post);
    res.status(200).json({ post });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
