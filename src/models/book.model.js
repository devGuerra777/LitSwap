import mongoose from 'mongoose';

// Colección de libros
const booksSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    ISBN: { type: String, required: true },
    edit: { type: String, required: true },
    autor: { type: String, required: true },
    sipnosis: { type: String, required: true, maxlength: 400 },
    date: { type: Date, required: true },
    language: { type: String, required: true },
    use: { type: Number, required: true, min: 0, max: 10 },
    pages: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tags: [String],
    images: [
      {
        name: { type: String, required: true, unique: true },
        data: { type: Buffer, required: true },
        contentType: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('book', booksSchema);
