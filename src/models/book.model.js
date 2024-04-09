import mongoose from "mongoose";

//coleccion de libros

const booksSchema = new mongoose.Schema({
    title: {type: String, required:true},
    ISBN: {type: String, required: true, unique: true},
    edit: {type: String, required: true}, //editorial
    autor: {type: String, required: true},
    sipnosis: {type: String, required: true}, //debe de ser de maximo 400 caracteres
    date: {type: Date, required: true}, 
    language: {type: String, required: true},
    user:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    tags: [String],
    image: {
        public_id: {type: String, required: true},
        url: {type: String, required: true}
    }
},  
{
    timestamps: true,
});

export default mongoose.model('book',booksSchema)