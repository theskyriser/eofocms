import mongoose from "mongoose";

const classSchema = mongoose.Schema({
    client: String,
    group: String,
    level: String,
    startDate: {
        type: Date,
        default: new Date()
    },
    endDate: {
        type: Date,
        default: new Date()
    },
    sessionsGrid: Array,
    teacher: String,
    coOrdinator: String,
    addedBy: String,
    students: [{
        type: String
    }],
    dateAdded: {
        type: Date,
        default: new Date()
    },
    numerOfStudents: Number,
    numberOfHours: Number,
    numberPerWeek: Number,
    costPerSession: Number,
    teacherHourlyRate: Number
})

const ClassPost = mongoose.model('Class', classSchema)

export default ClassPost;