import mongoose from "mongoose";

const teacherSchema = mongoose.Schema({
    image: String,
    firstName: String,
    lastName: String,
    position: String,
    hourlyRate: Number,
    salary: Number,
    level: String,
    dob: {
        type: Date, 
        default: new Date()
    },
    phone: String,
    email: String,
    address: String,
    state: String,
    code: String,
    numberOfClasses: Number,
    admin: Boolean,
    password: String,
    addedBy: String,
    dateAdded: {
        type: Date,
        default: new Date()
    },
    accountType: String
})

const TeacherPost = mongoose.model('Teacher', teacherSchema)

export default TeacherPost;