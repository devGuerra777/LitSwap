import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  studentID: { type: String, required: true, unique: true, index: true },
  collegeCareer: { type: String, required: true },
  dateAdmission: { type: Date, required: true },
  images: [
    {
      name: { type: String, required: true, unique: true },
      data: { type: Buffer, required: true },
      contentType: { type: String, required: true },
    },
  ],
});
// required para especificar si un campo es obligatorio, unique para asegurar que no haya duplicados
export default mongoose.model('User', userSchema);
