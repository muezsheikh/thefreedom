import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import connectDb from '@/lib/connect-db'
import Post from '@/models/post-schema'

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ success: false, msg: 'Method not allowed' })
  }

  // Extract token from cookies
  const { token } = cookie.parse(req.headers.cookie || '')

  if (!token) {
    return res.status(401).json({ success: false, msg: 'No token, authorization denied' })
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET)

  

    await connectDb()

    const postId = req.query.id
    const updateData = req.body // Assuming that the updated data is sent in the request body

    // Update the post
    const post = await Post.updateOne({ _id: postId }, updateData)

    if (post.matchedCount === 0) {
      return res.status(404).json({ success: false, msg: 'Post not found' })
    }

    res.status(200).json({ success: true, msg: 'Updated Successfully!', post })
  } catch (error) {
    console.error('Error:', error) // Log the error for debugging
    res.status(500).json({ success: false, msg: 'Internal Server Error' })
  }
}
