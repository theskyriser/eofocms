import mongoose from "mongoose";
import { countCertainDays, dayToInt, sliceTime } from "../serverFunctions.js"
import {addDays, set, parseISO, isDate, setHours} from "date-fns"
import ClassPost from "../models/class.js";
import SessionPost from "../models/sessions.js";
import TeacherPost from "../models/teacher.js";


export const getClasses = async (req, res) => {
    try {
      
        const classes = await ClassPost.find()
        res.status(200).json(classes);
    }
    catch (e) {
        res.status(404).json({message: error.message})
    }
}

export const getClassesBySearch = async (req, res) => {
    
    const {searchDateStart, searchDateEnd, group, level} = req.query;

    let query = {...req.query}

    if (group) {
        query = {...query, group: new RegExp(group, "i")}
    }

    if (level) {
        query = {...query, level: new RegExp(level, "i")}
    }


    const reqToObj = (req) => {
        let obj = {}
        for (const item in req) {
            if(item !== "searchDateStart" && item !== "searchDateEnd") {
                obj = {...obj, [item]: req[item]}
            }
        }
        return obj
    }

    const startDateObj = new Date(searchDateStart)
    const endDateObj = new Date(searchDateEnd)
    
    try {
        if (searchDateStart && !searchDateEnd) { //If start date
            const classesStartDate = await ClassPost.find({$and: [reqToObj(query), {date: startDateObj}]})
            res.status(200).json({data: classesStartDate})
        }
        else if (searchDateStart && searchDateEnd) { //If start and end
            
            const classesStartAndEndDates = await ClassPost.find({$and: [reqToObj(query), {date: {$gte: startDateObj, $lte: endDateObj}}]})
            res.status(200).json({data: classesStartAndEndDates})
        }
        else { //If no date range //just by class query
            const classesNoDates = await ClassPost.find(reqToObj(query))
            res.status(200).json({data: classesNoDates})
        }
    }



    catch(error) {
        console.log(error)
    }
}

export const createClasses = async (req, res) => {
    
    const classes = req.body;
    const numberOfStudents = classes.students.length
    const numberPerWeek = classes.sessions.length
    const sessionsPerWeek = classes.sessions;
    const startDate = parseISO(classes.startDate)
    const endDate = parseISO(classes.endDate)
    const studentIDs = classes.students
    const attendance = []
    const sessions = [];
    const teacherId = classes.teacher;
    const cost = classes.costPerSession

    for (let i = 0; i < studentIDs.length; i++) {
        attendance.push({
            studentRootId: studentIDs[i],
            present: ''
        })
    }
   
    
    
    for(let i = 0; i < numberPerWeek; i++) {
        let currentSession = sessionsPerWeek[i];
        for (const day in currentSession) {
            const startTime = currentSession[day].slice(0, 5)
            const endTime = currentSession[day].slice(8, 13)
            const daysBetween = countCertainDays(dayToInt(day), startDate, endDate)

            let tempDay = startDate

             for (let j = 0; j < daysBetween; j++) {
                
                sessions.push (
                    {
                        date: tempDay,
                        startTime: sliceTime(startTime, tempDay),
                        endTime: sliceTime(endTime, tempDay),
                        attendance: attendance,
                        attendanceComplete: 'NOT COMPLETE',
                        cancelled: '',
                        costPerStudent: cost 
                    }
                )
                tempDay = addDays(tempDay, 7)
             }
          
        }
    }

    

    try {
        const teacherHourlyRate = await TeacherPost.findById(teacherId, {hourlyRate: 1, _id: 0})
      const newClassId = mongoose.Types.ObjectId();
     await ClassPost.create({...classes, _id: newClassId, addedBy: req.userId, dateAdded: new Date().toISOString(), numberPerWeek, sessionsGrid: sessionsPerWeek, numberOfStudents, teacherHourlyRate: teacherHourlyRate.hourlyRate})
      
      
      
      for (let i = 0; i < sessions.length; i++) {
      await SessionPost.create({...sessions[i], classRootId: newClassId})
      }


        
    }
    catch (error) {
        console.log(error)
    }
}

export const updateClasses = async (req, res) => {
    const {id: _id} = req.params;
    const classes = req.body;

   
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Class with ID')

    const updatedClass = await ClassPost.findByIdAndUpdate(_id, classes, {new: true})

    res.json(updatedClass)
}

export const deleteClass = async (req, res) => {
    const {id: _id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Class with ID')

    await ClassPost.findByIdAndRemove(_id)
    await SessionPost.deleteMany({classRootId: _id})

    res.json({message: 'Post deleted'})
}