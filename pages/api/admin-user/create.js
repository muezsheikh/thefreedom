import connectDb from "@/lib/connect-db"
import adminUser from "@/models/user-schema"
export default async function handler(req, res) {
  await connectDb()
  let data = await adminUser.create(req.body)
  res.status(200).json({ data })
}
