import mongoose from "mongoose";
import ClassPost from "../models/class.js";
import SessionPost from "../models/sessions.js";

export const getSessions = async (req, res) => {
    try {
        const sessions = await SessionPost.find()

        res.status(200).json(sessions);
    }
    catch (e) {
        res.status(404).json({message: error.message})
    }
}

export const getSessionsByPage = async (req, res) => {
    const {page, acc} = req.query

  
    try {
        const limit = 8;
        const startIndex = (Number(page) - 1) * limit

        if (acc === 'undefined'){
            
            const total = await SessionPost.countDocuments({})
            
            const sessions = await SessionPost.find().sort({_id: -1}).limit(limit).skip(startIndex)
           
            res.status(200).json({data: sessions, currentPage: Number(page), numberOfPages: Math.ceil(total / limit)})

        } else {
            
            
            const total = await SessionPost.find({classRootId: acc}).countDocuments({})
            const sessions = await SessionPost.find({classRootId: acc}).sort({_id: -1}).limit(limit).skip(startIndex)
            
        res.status(200).json({data: sessions, currentPage: Number(page), numberOfPages: Math.ceil(total / limit)})

        } 
        

    }
    catch (error) {
        console.log(error)
    }
}

export const getSessionsBySearch = async (req, res) => {
    
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

        const classIdbySearch =  (await ClassPost.find(reqToObj(query)).distinct("_id")).map((id) => id.toString()) //Get classids by query
         //Get sessions in those classes - all classes if no query
        
        if (searchDateStart && !searchDateEnd) { //If start date
            const sessionsByClassId = await SessionPost.find({$and: [{classRootId: {$in: classIdbySearch}}, {date: startDateObj}]})
            res.status(200).json({data: sessionsByClassId})
        }
        else if (searchDateStart && searchDateEnd) { //If start and end
            const sessionsByClassId = await SessionPost.find({$and: [{classRootId: {$in: classIdbySearch}}, {date: {$gte: startDateObj, $lte: endDateObj}}]})
            res.status(200).json({data: sessionsByClassId})
        }
        else { //If no date range //just by class query
            const sessionsByClassId = await SessionPost.find({classRootId: {$in: classIdbySearch}})
            res.status(200).json({data: sessionsByClassId})
        }
    }



    catch(error) {
        console.log(error)
    }
}

export const getSessionsForCalendar = async (req, res) => {
    console.log('here')
    const {searchDateStart, searchDateEnd, type, id} = req.query;
    
    const startDateObj = new Date(searchDateStart)
    const endDateObj = new Date(searchDateEnd)
    let sessionCalendarData = []

    
    try {
        switch (type) {
            case 'teacher':
                const classesByTeacherAndDates = await ClassPost.find({$and: [{teacher: id}, {date: {$gte: startDateObj, $lte: endDateObj}}]})
                const classesByTeacherAndDatesIds = (await ClassPost.find({$and: [{teacher: id}, {date: {$gte: startDateObj, $lte: endDateObj}}]}).distinct("_id")).map((id) => id.toString())
                const sessionsByClass = await SessionPost.find({classRootId: {$in: classesByTeacherAndDatesIds}})
                for (let i = 0; i < sessionsByClass.length; i++) {
                    const thisClass = classesByTeacherAndDates.filter((thisClass) => thisClass._id.toString() === sessionsByClass[i].classRootId)[0]
                    
                    sessionCalendarData.push({
                        Id: i,
                        Subject: 'Group: ' + thisClass?.group,
                        Location: 'School',
                        StartTime: sessionsByClass[i].startTime.toISOString(),
                        EndTime: sessionsByClass[i].endTime.toISOString(),
                        CategoryColor: '#357cd2',
                        Level: 'A1'
                    })
                }
                console.log(sessionCalendarData)
                res.status(200).json({data: sessionsByClass, sessionCalendarData})

            break;
            case 'student':
                const sessionsByStudents = await SessionPost.find({$and: [{"attedance.studentRootId": id}, {date: {$gte: startDateObj, $lte: endDateObj}}]})
                const sessionIdsByStudents = (await SessionPost.find({$and: [{"attedance.studentRootId": id}, {date: {$gte: startDateObj, $lte: endDateObj}}]}).distinct("classRootId")).map((id) => id.toString())
                const classesByDates = await ClassPost.find({_id: {$in: sessionIdsByStudents}})
                for (let i = 0; i < sessionsByStudents.length; i++) {
                    const thisClass = classesByDates.filter((thisClass) => thisClass._id.toString() === sessionsByStudents[i].classRootId)[0]
                    
                    sessionCalendarData.push({
                        Id: i,
                        Subject: 'Group: ' + thisClass.group,
                        Location: 'School',
                        StartTime: sessionsByStudents[i].startTime.toISOString(),
                        EndTime: sessionsByStudents[i].endTime.toISOString(),
                        CategoryColor: '#357cd2',
                        Level: 'A1'
                    })
                }
                
                res.status(200).json({data: sessionsByStudents, sessionCalendarData})
            break;
            case 'class':
                const sessionsByClassIdAndDates = await SessionPost.find({$and: [{classRootId: id}, {date: {$gte: startDateObj, $lte: endDateObj}}]})
                const sessionsByClassIdAndDatesIds = (await SessionPost.find({$and: [{classRootId: id}, {date: {$gte: startDateObj, $lte: endDateObj}}]}).distinct("classRootId")).map((id) => id.toString())
                const classesByDatesClass = await ClassPost.find({_id: {$in: sessionsByClassIdAndDatesIds}})
                for (let i = 0; i < sessionsByClassIdAndDates.length; i++) {
                    const thisClass = classesByDatesClass.filter((thisClass) => thisClass._id.toString() === sessionsByClassIdAndDates[i].classRootId)[0]
                    
                    sessionCalendarData.push({
                        Id: i,
                        Subject: 'Group: ' + thisClass?.group,
                        Location: 'School',
                        StartTime: sessionsByClassIdAndDates[i].startTime.toISOString(),
                        EndTime: sessionsByClassIdAndDates[i].endTime.toISOString(),
                        CategoryColor: '#357cd2',
                        Level: 'A1'
                    })
                }
                res.status(200).json({data: sessionsByClassIdAndDates, sessionCalendarData})
            default:
            break;
        }
    


    }

    

    catch(error) {
        console.log(error)
    }
}



export const createSession = async (req, res) => {
   
    //current CLASS ID
    //session data
    // {date, starttime, endTime, attendance [], attendanceComplete, classROOT}

    try {

        await SessionPost.create({})
    }
    catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const updateSession = async (req, res) => {
    const {id: _id} = req.params;
    const session = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Session with ID')

    const updatedSession = await SessionPost.findByIdAndUpdate(_id, session, {new: true})


    res.json(updatedSession)
}

export const deleteSession = async (req, res) => {
    const {id: _id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Student with ID')

    await SessionPost.findByIdAndRemove(_id)

    res.json({message: 'Post deleted'})
}