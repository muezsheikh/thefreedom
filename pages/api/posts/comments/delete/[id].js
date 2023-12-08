import connectDb from "@/lib/connect-db";
import Comments from "@/models/comments-schema";
import { getServerSession } from "next-auth";
import { authOptions } from './../../../auth/[...nextauth]';

export default async function handler(req, res) {
  const allowedUsername = process.env.NEXT_PUBLIC_ADMIN_URL; // Replace with the actual GitHub username
  const session = await getServerSession(req, res, authOptions);

  // Check if the session is not loaded or the user is not authenticated
  if (!session || !session.user || session.user.name !== allowedUsername) {
    return res.status(401).json({ success: false, msg: 'Unauthorized' });
  }

  try {
    await connectDb();
    const post = await Comments.deleteOne({ _id: req.query.id });
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: 'Internal Server Error', message: error.message });
  }
}
