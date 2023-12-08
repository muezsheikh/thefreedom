import connectDb from "@/lib/connect-db";
import Post from "@/models/post-schema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  try {
    const allowedUsername = process.env.NEXT_PUBLIC_ADMIN_URL; // Replace with the actual GitHub username
    const session = await getServerSession(req, res, authOptions);

    // Check if the session is not loaded or the user is not authenticated
    if (!session || !session.user || session.user.name !== allowedUsername) {
      return res.status(401).json({ success: false, msg: 'Unauthorized' });
    }

    if (req.method === 'POST') {
      await connectDb();
      let data = await Post.create(req.body);
      return res.status(200).json({ data, success: true, msg: 'Posted Successfully!' });
    } else {
      return res.status(500).json({ success: false, msg: 'Internal Server Error!' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, msg: 'Internal Server Error!' });
  }
}
