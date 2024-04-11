import app from "./app.js"
import { connectDB } from "./db.js"

port = process.env.PORT || 3000;

connectDB();
app.listen(4000)
 console.log('server on port ', 4000)