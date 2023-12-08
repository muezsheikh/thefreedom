import connectDb from "@/lib/connect-db";
import Replies from "@/models/replies-schema";
export default async function handler(req, res) {

  await connectDb();

  try {
    const replies = await Replies.find({}).lean() // Set timeout to 20 seconds
    res.status(200).json({ replies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
