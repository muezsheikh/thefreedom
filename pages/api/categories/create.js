import connectDb from '@/lib/connect-db'
import Categories from '@/models/categories-schema'

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      await connectDb()
      let data = await Categories.create(req.body)
      return res
        .status(200)
        .json({ data, success: true, msg: 'Added Successfully!' })
    } else {
      return res
        .status(500)
        .json({ success: false, msg: 'Internal Server Error!' })
    }
  } catch (error) {
    console.error('Error in API route:', error)
    return res
      .status(500)
      .json({ success: false, msg: 'Internal Server Error!' })
  }
}
