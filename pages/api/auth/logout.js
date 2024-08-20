import cookie from 'cookie'

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Clear the JWT cookie by setting it with an expired maxAge
  res.setHeader('Set-Cookie', [
    cookie.serialize('token', '', {
      maxAge: -1, // Expire the cookie immediately
      path: '/',  // Ensure the cookie is removed for the whole site
    }),
  ])

  // Respond with a success message
  res.json({ msg: 'Logged out successfully' })
}
