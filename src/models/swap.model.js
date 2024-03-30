import mongoose from "mongoose";

//coleecion de  intercambios

<<<<<<< HEAD
const swapSchema = new mongoose.Schema({
=======
const swapSchema = mongoose.Schema({
>>>>>>> bd9a86ed218b3161c4d2ec243857739e38f00aa4
    requestUser: {type:String, required: true},
    respondUser: {type:String, required: true},
    requestBook:{
        title: {type:String, required: true},
        ISDN: {type:String, required: true},
        statusImage: { data: Buffer, contentType: String , required: true}
    },
    respondBook:{
        title: {type:String, required: true},
        ISDN: {type:String, required: true},
        statusImage: { data: Buffer, contentType: String , required: true}
    },
    swapDate: {type: Date, required: true}
});

export default mongoose.model('swap', swapSchema)
