import mongoose from "mongoose";

const homeworkSchema = mongoose.Schema({
    studentRootId: String,
    dateSet: {
        type: Date,
        default: new Date()
    },
    deadline: {
        type: Date,
        default: new Date()
    },
    description: String,
    completed: String
})

const HomeworkPost = mongoose.model('Homework', homeworkSchema)

export default HomeworkPost;