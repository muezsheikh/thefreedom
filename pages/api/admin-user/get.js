import connectDb from "@/lib/connect-db";
import adminUser from "@/models/user-schema";

export default async function handler(req, res) {
  await connectDb();
  const { username,password } = req.query
  console.log(username,password)
  try {
    const user = await adminUser.findOne({username});
    console.log(user)
    if (user.password === password) {
      return res.status(200).json({ verified: true });
    } else {
      return res.status(403).json({verified: false})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
