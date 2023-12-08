import connectDb from "@/lib/connect-db";
import Comments from "@/models/comments-schema";

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      await connectDb();

      // Create a new comment based on the request body
      let data = await Comments.create(req.body);

      // Return a 201 Created status code for successful creation
      return res.status(201).json({ data, success: true, msg: 'Posted Successfully!' });
    } else {
      // Return a 405 Method Not Allowed status code for non-POST requests
      return res.status(405).json({ success: false, msg: 'Method Not Allowed' });
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error creating comment:', error);

    // Return a 500 Internal Server Error status code for unexpected errors
    return res.status(500).json({ data: null, success: false, msg: 'Internal Server Error!', error: error.message });
  }
}
