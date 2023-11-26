import connectDb from "@/lib/connect-db"
import Post from "@/models/post-schema"
export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectDb()
    let data = await Post.create(req.body)
    res.status(200).json({ data, success: true, msg: 'Posted Successfully!' })
  } else {
    return res.status(500).json({ success: false, msg: 'Internal Server Error!' })
  }
}
