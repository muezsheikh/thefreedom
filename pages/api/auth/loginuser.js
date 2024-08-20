import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { check, validationResult } from 'express-validator'
import cookie from 'cookie'
import User from '../../../models/user-schema'
import connectDb from '@/lib/connect-db'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  await connectDb()

  // Validate the request
  await check('password', 'Password is required').exists().run(req)
  
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { username, password } = req.body

  try {
    let user = await User.findOne({ username })
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' })
    }

    const payload = {
      user: {
        id: user.id,
        userRole: user.userRole,
        username: user.username, // Include email in the payload
      },
    }

    // Sign and return JWT
    jwt.sign(
      payload,
      process.env.NEXT_PUBLIC_JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err

        // Set the cookie with the token and additional user info
        res.setHeader('Set-Cookie', [
          cookie.serialize('token', token, {
            httpOnly: true,
            maxAge: 3600, // 1 hour
            sameSite: 'strict',
            path: '/',
          }),
        ])

        res.json({ msg: 'Login successful' })
      }
    )
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
