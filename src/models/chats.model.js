import mongoose from "mongoose";

//coleecion de chats

<<<<<<< HEAD
const chatSchema = new mongoose.Schema({
=======
const chatSchema = mongoose.Schema({
>>>>>>> bd9a86ed218b3161c4d2ec243857739e38f00aa4
    date: {type: Date, required: true},
});

export default mongoose.model('chats',chatSchema)
