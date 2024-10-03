import connectDb from "@/lib/connect-db";
import Post from "@/models/post-schema";

export default async function handler(req, res) {
  await connectDb();
  

  try {
    const { id } = req.query;

    // Log the Post schema to verify it has postCustomId
    const postSchema = Post.schema.obj;

    let query = {};

    // Check if the id is a valid number, and use postCustomId if it is, otherwise use _id
    if (!isNaN(id)) {
      query = { postCustomId: Number(id) };
    } else {
      query = { _id: id };
    }

    // Perform the database query
    const post = await Post.findOne(query);


    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
