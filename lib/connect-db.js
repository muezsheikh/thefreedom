import mongoose from "mongoose"
const connectDb = async () => {
  if (mongoose.connections[0].readyState) return console.log('Success!')
  mongoose.set(`strictQuery`, false);
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'thefreedom'

    })
    console.log('mongodb is connected!')
  } catch (err) {
    console.log(err)
  }
}
export default connectDb;