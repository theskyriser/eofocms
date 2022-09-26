import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    image: String,
    firstName: String,
    lastName: String,
    nationality: String,
    level: String,
    nativeLanguage: String,
    phone: String,
    email: String,
    address: String,
    state: String,
    code: String,
    addedBy: String,
    dateAdded: {
        type: Date,
        default: new Date()
    },
    currentAverage: Number,
    accountType: String
})

const StudentPost = mongoose.model('Student', studentSchema)

export default StudentPost;