import connectDb from "@/lib/connect-db";
import Comments from "@/models/comments-schema";
export default async function handler(req, res) {
  await connectDb();

  try {
    const comments = await Comments.find({}).lean() // Set timeout to 20 seconds
    res.status(200).json({ comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
