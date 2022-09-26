import mongoose from "mongoose";
import ClassPost from '../models/class.js'
import SessionPost from '../models/sessions.js'
import TeacherPost from "../models/teacher.js";
import StudentPost from "../models/student.js"

export const getPayrollBySearch = async (req, res) => {
    const {searchDateStart, searchDateEnd, teacherId} = req.query;


    const startDateObj = new Date(searchDateStart)
    const endDateObj = new Date(searchDateEnd)
    
    let numberOfCompleteSessions = 0
    let sessionsWithNoAttendance = 0
    let numberOfSessionsCancelledByTeacher = 0
    let numberOfSessionsCancelledByClient = 0
    let sessionsWithPartialAttendance = 0
    let income = 0
    let numberOfHours = 0
    let levelsTaughtArr = []
    let numberOfFullAttendance = 0;
    
    let averageAttendance = 0

    try {
        const teacher = await TeacherPost.findById(teacherId)
        const classesByTeacherIds = (await ClassPost.find({$and: [{teacher: teacherId}, {startDate: {$gte: startDateObj}}, {endDate: {$lte: endDateObj}}]}).distinct("_id")).map((id) => id.toString())
        const classesByTeacher = await ClassPost.find({$and: [{teacher: teacherId}, {startDate: {$gte: startDateObj}}, {endDate: {$lte: endDateObj}}]})
        const sessionsByClass = await SessionPost.find({$and: [{classRootId: {$in: classesByTeacherIds}}, {date: {$gte: startDateObj, $lte: endDateObj}}]})

        const studentsByTeacher = (await ClassPost.find({$and: [{teacher: teacherId}, {startDate: {$gte: startDateObj}}, {endDate: {$lte: endDateObj}}]}).distinct("students")).map((id) => id.toString())



        const numberOfClasses = classesByTeacherIds.length
        const numberOfSessions = sessionsByClass.length
        const numberOfStudents = studentsByTeacher.length
        const payRollGridData = []

        for (let i = 0; i < sessionsByClass.length; i++) {
            const thisClass = classesByTeacher.filter((thisClass) => thisClass._id.toString() === sessionsByClass[i].classRootId)[0]    
            const hours = (sessionsByClass[i].endTime - sessionsByClass[i].startTime) / 1000 / 60 / 60
            const date = sessionsByClass[i].date.toISOString().slice(0, 10)
            let length = 0;
            for (let j = 0; j < sessionsByClass[i].attendance.length; j++) {
                if (sessionsByClass[i].attendance[j].present === "/") {
                    length++
                }
            }
           
            if (length === sessionsByClass[i].attendance.length) {
                numberOfFullAttendance++
            }

            averageAttendance += length /sessionsByClass[i].attendance.length

            

            if (sessionsByClass[i].cancelled === '') {
                if (sessionsByClass[i].attendanceComplete === 'COMPLETE') {
                    numberOfCompleteSessions++;
                    numberOfHours = numberOfHours + hours

                    income = income + (hours * thisClass.teacherHourlyRate)
                    payRollGridData.push({client: thisClass.client, date, sessionHours: hours, hourlyRate: thisClass.teacherHourlyRate, attendance: sessionsByClass[i].attendanceComplete, total: thisClass.teacherHourlyRate * hours})
                    continue;
                }
            }
            if (sessionsByClass[i].cancelled === 'TEACHER') {
                payRollGridData.push({client: thisClass.client, date, sessionHours: hours, hourlyRate: thisClass.teacherHourlyRate, attendance: 'CANCELLED', total: thisClass.teacherHourlyRate * hours})
                numberOfSessionsCancelledByTeacher++
                continue;
            }
            if (sessionsByClass[i].cancelled === 'CLIENT') {
                payRollGridData.push({client: thisClass.client, date, sessionHours: hours, hourlyRate: thisClass.teacherHourlyRate, attendance: 'CANCELLED', total: thisClass.teacherHourlyRate * hours})
                numberOfSessionsCancelledByClient++
                continue;
            }
            if (sessionsByClass[i].attendanceComplete === 'PARTIALLY COMPLETE') {
                numberOfHours = numberOfHours + hours
                income = income + (hours * thisClass.teacherHourlyRate)
                sessionsWithPartialAttendance++
                payRollGridData.push({client: thisClass.client, date, sessionHours: hours, hourlyRate: thisClass.teacherHourlyRate, attendance: sessionsByClass[i].attendanceComplete, total: thisClass.teacherHourlyRate * hours})
                continue;
            }
            if (sessionsByClass[i].attendanceComplete === 'NOT COMPLETE') {
                sessionsWithNoAttendance++
                payRollGridData.push({client: thisClass.client, date, sessionHours: hours, hourlyRate: thisClass.teacherHourlyRate, attendance: sessionsByClass[i].attendanceComplete, total: thisClass.teacherHourlyRate * hours})
                continue;
            }

            
        }

        for (let i = 0; i < classesByTeacher.length; i++) {
            if (!levelsTaughtArr.includes(classesByTeacher[i].level)) {
                levelsTaughtArr.push(classesByTeacher[i].level)
            }
        }

        averageAttendance = Math.floor(averageAttendance / numberOfSessions * 100)
        const levelsTaught = levelsTaughtArr.join(' | ')

       console.log('fire')
        res.status(200).json({payRollGridData, averageAttendance, numberOfFullAttendance, levelsTaught, income, numberOfStudents, numberOfClasses, numberOfSessions, numberOfCompleteSessions, numberOfSessionsCancelledByClient, numberOfSessionsCancelledByTeacher, sessionsWithNoAttendance, sessionsWithPartialAttendance, numberOfHours});
    }
    catch (e) {
        console.log(e)
    }
}

export const getPayrollByDates = async (req, res) => {
    const {id: _id} = req.params
    
    try {
        const classesByTeacher = (await ClassPost.find({teacher: _id}).distinct("_id")).map((id) => id.toString())
        
        for (let i = 0; i < classesByTeacher.length; i++) {
            
        }

        //number of sessions in the month
        //number of classes
        //number of classes with attendance
        //number of classes with no attendance
        //number of classes cancelled by school
        //number of classes cancelled by client
    }
    catch (e) {
        console.log(e)
    }
}

