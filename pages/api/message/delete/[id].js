import connectDb from '@/lib/connect-db'
import Messages from '@/models/msg-schema'

export default async function handler(req, res) {
  try {
    await connectDb()
    const message = await Messages.deleteOne({ _id: req.query.id })
    res.status(200).json({ success: true, data: message })
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
