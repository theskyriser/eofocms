import mongoose from "mongoose";
import HomeworkPost from "../models/homework.js";

export const getHomework = async (req, res) => {
    try {
        const homeworks = await HomeworkPost.find()
        const latestHomework = await HomeworkPost.find().sort({_id: -1}).limit(1)

        res.status(200).json({homeworks, latestHomework: latestHomework[0]});
    }
    catch (e) {
        res.status(404).json({message: error.message})
    }
}

export const getHomeworkByStudent = async (req, res) => {
    const {id: _id} = req.params
    
    try {
        const homeworks = await HomeworkPost.find({studentRootId: _id})
        const latestHomework = await HomeworkPost.find({studentRootId: _id}).sort({_id: -1}).limit(1)
        res.status(200).json({homeworks, latestHomework: latestHomework[0]});
    }
    catch (e) {
        console.log(e)
    }
}

export const createHomework = async (req, res) => {

    const homeworks = req.body
    try {
        await HomeworkPost.create({...homeworks, dateSet: new Date(), completed: 'NOT COMPLETE'})


    }
    catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const updateHomework = async (req, res) => {
    const {id: _id} = req.params;
    const homeworks = req.body;

    console.log(homeworks)

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Homework with ID')

    const updatedHomework = await HomeworkPost.findByIdAndUpdate(_id, homeworks, {new: true})


    res.json(updatedHomework)
}

export const deleteHomework = async (req, res) => {
    const {id: _id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Student with ID')

    await HomeworkPost.findByIdAndRemove(_id)

    res.json({message: 'Post deleted'})
}