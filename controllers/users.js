import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import AdminPost from '../models/admin.js'
import TeacherPost from '../models/teacher.js'
import StudentPost from '../models/student.js'

import mongoose from 'mongoose'

export const signIn = async (req, res) => {
    const {email, password} = req.body
    console.log(email, password)
    try {
        let existingUser = await TeacherPost.findOne({email})

        if(!existingUser) {
            
            existingUser = await AdminPost.findOne({email})
            
        }
        
        if(!existingUser) return res.status(404).json({message: "User not found"})
    
       
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect) return res.status(400).json({message: 'Invalid Password'})

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "7d"})
        
        res.status(200).json({result: existingUser, token})

    } catch (error) {
        res.status(500).json({message: 'Something went wrong'})
    }   
}

export const checkPassword = async (req, res) => {
    const {email, password} = req.body
    console.log(email, password)
    try {
        let existingUser = await TeacherPost.findOne({email})

        if(!existingUser) {
            existingUser = await AdminPost.findOne({email})
        }
        
        if(!existingUser) return res.status(404).json({message: "User not found"})
    
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "7d"})
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect) return res.status(200).json({data: {result: existingUser, token}, passwordCheck: 'REJECT'})

        res.status(200).json({data: {result: existingUser, token}, passwordCheck: 'AUTH'})

    } catch (error) {
        res.status(500).json({message: 'Something went wrong'})
    }   
}

export const updateCredentials = async (req, res) => {
    const {id, type, password} = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No user with ID')
    const hashedPassword = await bcrypt.hash(password, 12)
    switch(type) {
        case 'TEACHER':
            const teacher = await TeacherPost.findById(id)
            const updatedTeacher = await TeacherPost.findByIdAndUpdate(id, {...teacher, password: hashedPassword}, {new: true})
            res.json({data: updatedTeacher, type: 'TEACHER'})
            break;
        case 'STUDENT':
            console.log('UPDATE STUDENT')
            const student = await StudentPost.findById(id)
            const updatedStudent = await StudentPost.findByIdAndUpdate(id, {...student, password: hashedPassword}, {new: true})
            res.json({data: updatedStudent, type: 'STUDENT'})
            break;
        case 'ADMIN':
            const admin = await AdminPost.findById(id)
            const updatedAdmin = await AdminPost.findByIdAndUpdate(id, {...admin, password: hashedPassword}, {new: true})
            res.json({data: updatedAdmin, type: 'ADMIN'})
            break;
    }
}

export const createAdmin = async (req, res) => {
        const admin = req.body;
        const {email, password, confirmPassword} = req.body
      
    try {
        let existingUser = await AdminPost.findOne({email})

        if(existingUser) return res.status(400).json({message: 'Admin already exists'})

        if (!existingUser) { 
            existingUser = await TeacherPost.findOne({email})
        }

        if(existingUser) return res.status(400).json({message: 'Teacher already exists'})



    
        if(password !== confirmPassword) return res.status(400).json({message: "Passwords don't match"})
    
        const hashedPassword = await bcrypt.hash(password, 12)
    
        const result = await AdminPost.create({...admin, password: hashedPassword, addedBy: req.userId, dateAdded: new Date().toISOString(), accountType: 'ADMIN'})

        const token = jwt.sign({ email: result.email, id: result._id_}, 'test', {expiresIn: "1d"})

        res.status(200).json({result, token})
    }
    catch (error) {
        console.log(error.message)
    } 
}

export const getAdmins = async (req, res) => {
    try {
        const admins = await AdminPost.find()

        res.status(200).json(admins);
    }
    catch (e) {
        res.status(404).json({message: error.message})
    }
}

export const updateAdmin = async (req, res) => {
  
    const {id: _id} = req.params;
    const admin = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No admin with ID')

    const updatedAdmin = await AdminPost.findByIdAndUpdate(_id, admin, {new: true})

    res.json(updateAdmin)
}


export const deleteAdmin = async (req, res) => {
    const {id: _id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No admin with ID')

    const toBeDeleted = await AdminPost.findOne({_id})

    if(toBeDeleted.firstName === "ADMIN") return res.status(400).json({message: 'NO ADMIN DELETION'})

    await AdminPost.findByIdAndRemove(_id)

    res.json({message: 'Admin deleted'})
}