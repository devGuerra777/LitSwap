import mongoose from "mongoose";

//coleecion de chats

const chatSchema = mongoose.Schema({
    date: {type: Date, required: true},
});

export default mongoose.model('chats',chatSchema)
