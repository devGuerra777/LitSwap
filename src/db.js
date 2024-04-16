import mongoose from "mongoose";

const uri = "mongodb+srv://vercel-admin-user:1234@cluster0.ydbhhet.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!")
  } catch (error) {
    console.log(error);
  }
}
