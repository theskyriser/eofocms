import mongoose from "mongoose";
import StudentPost from "../models/student.js";
import ClassPost from "../models/class.js";

export const getStudents = async (req, res) => {
    try {
        const students = await StudentPost.find()

        res.status(200).json(students);
    }
    catch (e) {
        res.status(404).json({message: e.message})
    }
}

export const getStudentsByTeacher = async (req, res) => {
    const {teacher} = req.query;
    try {
        
        const studentIdsByTeacher = (await ClassPost.find({teacher: teacher}).distinct("students"))

        const studentsByTeacher = await StudentPost.find({_id: {$in: studentIdsByTeacher}})

        res.status(200).json(studentsByTeacher)
        
    }
    catch (e) {
        res.status(404).json({message: e.message})
        console.log(e)
    }
}

export const createStudents = async (req, res) => {
   
    const students = req.body;
    const {email} = req.body

    try {
        let existingStudent = await StudentPost.findOne({email})

        if(existingStudent) return res.status(400).json({message: 'Student already exists with this email'})

        await StudentPost.create({...students, addedBy: req.userId, dateAdded: new Date().toISOString(), accountType: 'STUDENT'})
    }
    catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const updateStudents = async (req, res) => {
    const {id: _id} = req.params;
    const student = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Student with ID')

    const updatedStudent = await StudentPost.findByIdAndUpdate(_id, student, {new: true})

    res.json(updatedStudent)
}

export const deleteStudents = async (req, res) => {
    const {id: _id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Student with ID')

    await StudentPost.findByIdAndRemove(_id)

    res.json({message: 'Post deleted'})
}