import connectDb from "@/lib/connect-db";
import Post from "@/models/post-schema";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req, res) {
  
  try {
    const allowedUsername = process.env.NEXT_PUBLIC_ADMIN_URL; // Replace with the actual GitHub username
    const session = await getServerSession(req, res, authOptions);
    
    // Check if the session is not loaded or the user is not authenticated
    if (!session || !session.user || session.user.name !== allowedUsername) {
      return res.status(401).json({ success: false, msg: 'Unauthorized' });
    }
    
    await connectDb();
    const postId = req.query.id;
    const updateData = req.body; // Assuming that the updated data is sent in the request body

    // UpdateOne method: Provide a filter and update data
    const post = await Post.updateOne({ _id: postId }, updateData);

    res.status(200).json({ success: true, msg: 'Updated Successfully!', post });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
