import connectDb from "@/lib/connect-db";
import Categories from "@/models/categories-schema";

export default async function handler(req, res) {
  await connectDb();

  try {
    const categories = await Categories.find({}).lean();
    res.status(200).json({ categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
