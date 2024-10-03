import connectDb from "@/lib/connect-db";
import Post from "@/models/post-schema";

export default async function handler(req, res) {
  await connectDb();

  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });

    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
