import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    image: String,
    firstName: String,
    lastName: String,
    nationality: String,
    position: String,
    dob: {
        type: Date, 
        default: new Date()
    },
    phone: String,
    email: String,
    address: String,
    state: String,
    code: String,
    admin: Boolean,
    password: String,
    addedBy: String,
    dateAdded: {
        type: Date,
        default: new Date()
    },
    accountType: String
})

const AdminPost = mongoose.model('Admin', adminSchema)

export default AdminPost;