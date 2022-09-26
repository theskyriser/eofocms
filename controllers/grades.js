import mongoose from "mongoose";
import GradePost from "../models/grades.js";

export const getGrades = async (req, res) => {
    try {
        const grades = await GradePost.find()

        res.status(200).json(grades);
    }
    catch (e) {
        res.status(404).json({message: error.message})
    }
}

export const getGradesByStudent = async (req, res) => {
    const {id: _id} = req.params
    
    
    try {
        const grades = await GradePost.find({studentRootId: _id})
        const latestGrades = await GradePost.find({studentRootId: _id}).sort({_id: -1}).limit(1)
        res.status(200).json({grades, latestGrades: latestGrades[0]});
    }
    catch (e) {
        console.log(e)
    }
}

export const createGrades = async (req, res) => {

    const grades = req.body
    
    try {

        

        await GradePost.create({...grades, dateAdded: new Date()})
    }
    catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const updateGrades = async (req, res) => {
    const {id: _id} = req.params;
    const grades = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Session with ID')

    const updatedGrades = await GradePost.findByIdAndUpdate(_id, grades, {new: true})


    res.json(updatedGrades)
}

export const deleteGrades = async (req, res) => {
    const {id: _id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Student with ID')

    await GradePost.findByIdAndRemove(_id)

    res.json({message: 'Post deleted'})
}