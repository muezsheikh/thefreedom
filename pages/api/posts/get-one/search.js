

import connectDb from "@/lib/connect-db";
import Post from "@/models/post-schema";

export default async function handler(req, res) {
  const {search} = req.query
  if(!search) return res.json({ results: [] })   
  await connectDb();
  try {
    const results = await Post.find({
      $or: [
        // { category: { $regex: searchTerm, $options: "i" } },
        { title: { $regex: search, $options: "i" } },
        { tags: { $elemMatch: { $regex: search, $options: "i" } } }
      ]
    })

    res.status(200).json({ results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
