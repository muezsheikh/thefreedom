import connectDb from '@/lib/connect-db'
import Post from '@/models/post-schema'

export default async function handler(req, res) {
  try {
    await connectDb()
    const post = await Post.deleteOne({ _id: req.query.id })
    res.status(200).json({ success: true, data: post })
  } catch (error) {
    console.error('Error:', error)
    res
      .status(500)
      .json({
        success: false,
        error: 'Internal Server Error',
        message: error.message,
      })
  }
}
