import connectDb from "@/lib/connect-db";
import Post from "@/models/post-schema";
import adminUser from "@/models/user-schema";

export default async function handler(req, res) {
  await connectDb();

  try {
    const users = await adminUser.find({}).lean();
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
