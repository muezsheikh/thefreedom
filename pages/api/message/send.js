import connectDb from "@/lib/connect-db"
import Msg from "@/models/msg-schema"
export default async function handler(req, res) {
  await connectDb()
  let data = await Msg.create(req.body)
  res.status(200).json({ data })
}
