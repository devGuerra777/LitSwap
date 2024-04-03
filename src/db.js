import mongoose from "mongoose";

// Uri para la base de datos en la nube: "mongodb+srv://<username>:<password>@litswap.mhotub9.mongodb.net/?retryWrites=true&w=majority&appName=LitSwap"
const uri = "mongodb+srv://all:1234@litswap.mhotub9.mongodb.net/?retryWrites=true&w=majority&appName=LitSwap";

export const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!")
  } catch (error) {
    console.log(error);
  }
}
