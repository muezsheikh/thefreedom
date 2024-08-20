import jwt from 'jsonwebtoken'
import cookie from 'cookie'

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Extract token from cookies
  const { token } = cookie.parse(req.headers.cookie || '')

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET)

    // Send the user profile as a response
    res.json({
      username: decoded.user.username,
      userRole: decoded.user.userRole,
    })
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' })
  }
}
