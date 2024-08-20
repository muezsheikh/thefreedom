import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import connectDb from '@/lib/connect-db'
import User from '@/models/user-schema'

export default async function handler(req, res) {
  try {
    // Extract token from cookies
    const { token } = cookie.parse(req.headers.cookie || '')

    if (!token) {
      return res.status(401).json({ success: false, msg: 'No token, authorization denied' })
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET)

    // Fetch the user from the database to verify their role
    await connectDb()
    const user = await User.findById(decoded.user.id)

    if (!user) {
      return res.status(404).json({ success: false, msg: 'User not found' })
    }

    // Check if the user has the 'Admin' role
    if (user.userRole !== 'Admin') {
      return res.status(403).json({ success: false, msg: 'Forbidden: Admins only' })
    }

    // If the user is an Admin, proceed with fetching the messages
    const messages = await User.find({}).lean()
    res.status(200).json({ success: true, data: messages })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message,
    })
  }
}
