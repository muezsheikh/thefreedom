import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { check, validationResult } from 'express-validator'
import User from '../../../models/user-schema'
import connectDb from '@/lib/connect-db'

export default async function handler(req, res) {
  console.log('love', req.body)
  try {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  await connectDb()

  // Validate the request
  await check('password', 'Password must be 6 or more characters')
    .isLength({ min: 6 })
    .run(req)

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, username, password, userRole } = req.body

  
    let user = await User.findOne({ username })
    if (user) {
      return res.status(400).json({ msg: 'User already exists' })
    }

    // Hash password
    // const salt = await bcrypt.genSalt(10)
    // const hashedPassword = await bcrypt.hash(password, salt)

    // Create new user
    user = new User({
      name,
      username,
      password,
      userRole
    })

    await user.save()

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
        userRole: user.userRole,
      },
    }

    // Sign and return JWT
    jwt.sign(
      payload,
      process.env.NEXT_PUBLIC_JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err
        res.json({ token })
      }
    )
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
