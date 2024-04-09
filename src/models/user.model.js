import mongoose from "mongoose";
 const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    studentID: { type: String, required: true, unique: true  },
    collegeCareer: { type: String, required: true },
    dateAdmission: { type: Date, required: true },
    image: {
        public_id: {type: String, required: true},
        url: {type: String, required: true}
    },
    /*credential: { 
        public_id: String,
        url: String,
        required: true 
    }*/
},{
    timestamps: true
});
// required para especificar si un campo es obligatorio, unique para asegurar que no haya duplicados
export default mongoose.model('User', userSchema )

