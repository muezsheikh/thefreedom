import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import connectDb from '@/lib/connect-db'
import Post from '@/models/post-schema'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
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

   

    // Connect to the database
    await connectDb()

    // Create a new post
    let data = await Post.create(req.body)

    return res.status(200).json({ data, success: true, msg: 'Posted Successfully!' })
  } catch (error) {
    console.error('Error:', error) // Log the error for debugging
    return res.status(500).json({ success: false, msg: 'Internal Server Error!' })
  }
}
