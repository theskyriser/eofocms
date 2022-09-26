import mongoose from "mongoose";

const gradesSchema = mongoose.Schema({
    studentRootId: '',
    dateAdded: {
        type: Date,
        default: new Date
    },
    average: Number,
    writing: Number,
    reading: Number,
    listening: Number,
    speaking: Number,
    examPer: Number,
    excellence: String,
    improvements: String,
})

const GradePost = mongoose.model('Grades', gradesSchema)

export default GradePost;