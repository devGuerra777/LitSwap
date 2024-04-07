import mongoose from "mongoose";

//coleecion de  intercambios

const swapSchema = new mongoose.Schema({
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
