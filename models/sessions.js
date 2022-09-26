import mongoose from "mongoose";

const sessionSchema = mongoose.Schema({
        classRootId: String,
        date: {
            type: Date,
        },
        startTime: 
        {
            type: Date,
        },
        endTime: 
        {
            type: Date,
        },
        attendance: [{
            studentRootId: String,
            present: String
        }],
        attendanceComplete: String,
        cancelled: String
})

const SessionPost = mongoose.model('Session', sessionSchema)

export default SessionPost;