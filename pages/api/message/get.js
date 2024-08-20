import connectDb from '@/lib/connect-db'
import Messages from '@/models/msg-schema'

export default async function handler(req, res) {
  try {
    await connectDb()
    const messages = await Messages.find({}).lean()
    res.status(200).json({ success: true, data: messages })
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
