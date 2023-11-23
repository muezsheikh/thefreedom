import connectDb from "@/lib/connect-db"
import Post from "@/models/post-schema"
export default async function handler(req, res) {
  await connectDb()
  let data = await Post.create(req.body)
  res.status(200).json({ data })
}
