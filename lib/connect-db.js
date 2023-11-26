import mongoose from "mongoose"
const connectDb = async () => {
  if (mongoose.connections[0].readyState) return console.log('Success!')
  mongoose.set(`strictQuery`, false);
  console.log(process.env.NEXT_PUBLIC_MONGO_URL)
  try {
    await mongoose.connect(`${process.env.NEXT_PUBLIC_MONGO_URL}/thefreedom`)

    console.log('mongodb is connected!')
  } catch (err) {
    console.log(err)
  }
}
export default connectDb;