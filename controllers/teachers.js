import mongoose from "mongoose";
import TeacherPost from "../models/teacher.js"
import bcrypt from 'bcrypt'
import AdminPost from "../models/admin.js";

export const getTeachers = async (req, res) => {
    try {
        const teachers = await TeacherPost.find()

        res.status(200).json(teachers);
    }
    catch (e) {
        res.status(404).json({message: e.message})
    }
}

export const createTeacher = async (req, res) => {
    const teacher = req.body;
    const {email, password, confirmPassword} = req.body

    
    try {

        let existingUser = await TeacherPost.findOne({email})

        if (!existingUser) {
            existingUser = await AdminPost.findOne({email})
        }

        if(existingUser) return res.status(400).json({message: 'Teacher already exists'})

        if(password !== confirmPassword) return res.status(400).json({message: "Passwords don't match"})

        const hashedPassword = await bcrypt.hash(password, 12)

        await TeacherPost.create({...teacher, password: hashedPassword, addedBy: req.userId, dateAdded: new Date().toISOString(), accountType: 'TEACHER'})
    }
    catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const updateTeacher = async (req, res) => {
    const {id: _id} = req.params;
    const teacher = req.body;
    


    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No teacher with ID')

    const updatedTeacher = await TeacherPost.findByIdAndUpdate(_id, teacher, {new: true})

    

    res.json(updatedTeacher)
}

export const deleteTeacher = async (req, res) => {
    const {id: _id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No teacher with ID')

    await TeacherPost.findByIdAndRemove(_id)

    res.json({message: 'Post deleted'})
}