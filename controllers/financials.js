import ClassPost from "../models/class.js";
import SessionPost from "../models/sessions.js";
import { getHoursBetweenDates, getMonthsBetween, intToMonth, weeksBetween } from "../serverFunctions.js";
import {addDays, set, parseISO, isDate, setHours, addMonths} from "date-fns"

export const getFinancialsByDates = async (req, res) => {

    const {searchDateStart, searchDateEnd, type} = req.query

    const startDateObj = new Date(searchDateStart)
    const endDateObj = new Date(searchDateEnd)



    let incoming = 0;
    let outgoing = 0;
    let profit = 0;
    let sessionPricesPerStudent = [{}]
    let cancelledClassesTotal = 0;
    let totalStudentsInAttendance = 0;
    let averageAttendance = 0;
    let sessionPaymentsPerTeacher = [{}]
    let cancelledClasses = 0;
    let softwarePayments = 250;
    let financialChartData = [[], []]
    let profitChartData = []
    let sessionsCompleted = 0;
    let chartType = ''

    try {
        const sessionsByDate = await SessionPost.find({date: {$gte: startDateObj, $lte: endDateObj}})
        const sessionsByDateIds = (await SessionPost.find({date: {$gte: startDateObj, $lte: endDateObj}}).distinct("classRootId")).map((id) => id.toString())
        const classesBySessions = await ClassPost.find({_id: {$in: sessionsByDateIds}})
        
        const numberOfMonthsByDates = getMonthsBetween(startDateObj, endDateObj, true)

        if (numberOfMonthsByDates <= 1 && type !== 'TODAY') {
            //by weeks
            chartType = 'WEEKS'
            let tempStart = startDateObj
            let tempEnd = addDays(startDateObj, 7)
            let thisWeekIncome;
            let thisWeekOutgoing;

            const weeksBetweenDates = weeksBetween(startDateObj, endDateObj)
            
            for (let i = 0; i < weeksBetweenDates; i++) {
                thisWeekIncome = 0;
                thisWeekOutgoing = 0;
                const sessionsByTempDates = await SessionPost.find({date: {$gte: tempStart, $lte: tempEnd}})
                //loop through sessions in the current week
                for (let j = 0; j < sessionsByTempDates.length; j++) {
                    
                    const thisClass = classesBySessions.filter((thisClass) => thisClass._id.toString() === sessionsByTempDates[j].classRootId)[0]

                    let index = 0;

                    for (let k = 0; k < sessionPricesPerStudent.length; k++) {
                        if (sessionPricesPerStudent[k].sessionPrice === thisClass.costPerSession) {
                            
                            index = k
                            break;
                        } 
                    }

                    if (index === 0) {
                        
                        sessionPricesPerStudent.push({sessionPrice: thisClass.costPerSession, numberOfStudents: sessionsByTempDates[j].attendance.length, numberOfSessions: 1, total: thisClass.costPerSession * sessionsByTempDates[j].attendance.length})
                        
                    } else {
                        sessionPricesPerStudent[index].numberOfStudents += sessionsByTempDates[j].attendance.length
                        sessionPricesPerStudent[index].numberOfSessions ++
                        sessionPricesPerStudent[index].total += (sessionPricesPerStudent[index].sessionPrice * sessionsByTempDates[j].attendance.length)          
                    }

                    for (let k = 0; k < sessionPaymentsPerTeacher.length; k++) {
                        if (sessionPaymentsPerTeacher[k].hourlyRate === thisClass.teacherHourlyRate) {
                            index = k;
                            break;
                        }
                    }

                    if (index === 0) {
                        sessionPaymentsPerTeacher.push({hourlyRate: thisClass.teacherHourlyRate, numberOfSessions: 1, total: thisClass.teacherHourlyRate})
                    } else {
                        sessionPaymentsPerTeacher[index].numberOfSessions ++
                        sessionPaymentsPerTeacher[index].total += sessionPaymentsPerTeacher[index].hourlyRate
                    }



                  
                    //in each session, check if complete
                    if (sessionsByTempDates[j].attendanceComplete === 'COMPLETE' || sessionsByTempDates[j].attendanceComplete === 'PARTIALLY COMPLETE') {
                        const sessionHours = getHoursBetweenDates(sessionsByTempDates[j].startTime, sessionsByTempDates[j].endTime)
                        sessionsCompleted++
                        thisWeekOutgoing += sessionHours * thisClass.teacherHourlyRate;
                        outgoing += thisWeekOutgoing

                        sessionsByTempDates[j].attendance.map((item, index) => {
                            
                            if (item.present === "/" || item.present === "L") {
                               
                                thisWeekIncome += thisClass.costPerSession
                                incoming += thisWeekIncome
                                totalStudentsInAttendance++
                            }
                        })
                    } else {
                        cancelledClasses++
                        cancelledClassesTotal += (thisClass.costPerSession * sessionsByTempDates[j].attendance.length)
                    }
                }

                financialChartData[0].push({x: `Week ${i + 1}`, y: thisWeekIncome})
                financialChartData[1].push({x: `Week ${i + 1}`, y: thisWeekOutgoing})

                profitChartData.push({x: `Week ${i + 1}`, y: thisWeekIncome - thisWeekOutgoing})
          
                tempStart = addDays(tempStart, 7)
                tempEnd = addDays(tempEnd, 7)

                
            }
            averageAttendance = Math.floor(totalStudentsInAttendance / sessionsByDate.length * 100) 
            profit = incoming - outgoing - softwarePayments

            sessionPricesPerStudent = sessionPricesPerStudent.filter((item) => Object.keys(item).length !== 0)
            sessionPaymentsPerTeacher = sessionPaymentsPerTeacher.filter((item) => Object.keys(item).length !== 0)

       
            res.status(200).json({profitChartData, chartType, cancelledClassesTotal, sessionsCompleted, incoming, outgoing, profit, sessionPricesPerStudent, totalStudentsInAttendance, averageAttendance, sessionPricesPerStudent, sessionPaymentsPerTeacher, cancelledClasses, softwarePayments, financialChartData})
//BY MONTHS
        } else if (numberOfMonthsByDates > 1) {
            


            let tempStart = startDateObj
            let tempEnd = addMonths(startDateObj, 1)
            let thisMonthIncome;
            let thisMonthOutgoing;
            chartType = 'MONTH'
            const monthsBetweenDates = getMonthsBetween(startDateObj, endDateObj)
            
            for (let i = 0; i <= monthsBetweenDates; i++) {
                
                thisMonthIncome = 0;
                thisMonthOutgoing = 0;
                const sessionsByTempDates = await SessionPost.find({date: {$gte: tempStart, $lte: tempEnd}})
                //loop through sessions in the current week
                for (let j = 0; j < sessionsByTempDates.length; j++) {
                    
                    const thisClass = classesBySessions.filter((thisClass) => thisClass._id.toString() === sessionsByTempDates[j].classRootId)[0]

                    let index = 0;

                    for (let k = 0; k < sessionPricesPerStudent.length; k++) {
                        if (sessionPricesPerStudent[k].sessionPrice === thisClass.costPerSession) {
                            
                            index = k
                            break;
                        } 
                    }

                    if (index === 0) {
                        
                        sessionPricesPerStudent.push({sessionPrice: thisClass.costPerSession, numberOfStudents: sessionsByTempDates[j].attendance.length, numberOfSessions: 1, total: thisClass.costPerSession * sessionsByTempDates[j].attendance.length})
                        
                    } else {
                        
                        sessionPricesPerStudent[index].numberOfStudents += sessionsByTempDates[j].attendance.length
                        
                        sessionPricesPerStudent[index].numberOfSessions ++

                        sessionPricesPerStudent[index].total += (sessionPricesPerStudent[index].sessionPrice * sessionsByTempDates[j].attendance.length)
                        
                    }

                    for (let k = 0; k < sessionPaymentsPerTeacher.length; k++) {
                        if (sessionPaymentsPerTeacher[k].hourlyRate === thisClass.teacherHourlyRate) {
                            index = k;
                            break;
                        }
                    }

                    if (index === 0) {
                        sessionPaymentsPerTeacher.push({hourlyRate: thisClass.teacherHourlyRate, numberOfSessions: 1, total: thisClass.teacherHourlyRate})
                    } else {
                        sessionPaymentsPerTeacher[index].numberOfSessions ++
                        sessionPaymentsPerTeacher[index].total += sessionPaymentsPerTeacher[index].total
                    }



                  
                    //in each session, check if complete
                    if (sessionsByTempDates[j].attendanceComplete === 'COMPLETE' || sessionsByTempDates[j].attendanceComplete === 'PARTIALLY COMPLETE') {
                        const sessionHours = getHoursBetweenDates(sessionsByTempDates[j].startTime, sessionsByTempDates[j].endTime)
                        sessionsCompleted++
                        thisMonthOutgoing += sessionHours * thisClass.teacherHourlyRate;
                        outgoing += thisMonthOutgoing

                        sessionsByTempDates[j].attendance.map((item, index) => {
                            
                            if (item.present === "/" || item.present === "L") {
                               
                                thisMonthIncome += thisClass.costPerSession
                                incoming += thisMonthIncome
                                totalStudentsInAttendance++
                            }
                        })
                    } else {
                        cancelledClasses++
                        cancelledClassesTotal += (thisClass.costPerSession * sessionsByTempDates[j].attendance.length)
                    }
                }

                financialChartData[0].push({x: intToMonth(tempStart.getMonth()) , y: thisMonthIncome})
                financialChartData[1].push({x: intToMonth(tempStart.getMonth()), y: thisMonthOutgoing})

                profitChartData.push({x: intToMonth(tempStart.getMonth()), y: thisMonthIncome - thisMonthOutgoing})
          
                tempStart = addMonths(tempStart, 1)
                tempEnd = addMonths(tempEnd, 1)

                
            }
            averageAttendance = Math.floor(totalStudentsInAttendance / sessionsByDate.length * 100) 
            profit = incoming - outgoing - softwarePayments

            sessionPricesPerStudent = sessionPricesPerStudent.filter((item) => Object.keys(item).length !== 0)
            sessionPaymentsPerTeacher = sessionPaymentsPerTeacher.filter((item) => Object.keys(item).length !== 0)


  


       
            res.status(200).json({profitChartData, chartType, cancelledClassesTotal, sessionsCompleted, incoming, outgoing, profit, sessionPricesPerStudent, totalStudentsInAttendance, averageAttendance, sessionPricesPerStudent, sessionPaymentsPerTeacher, cancelledClasses, softwarePayments, financialChartData})
        } else {
            //TODAY
            chartType = 'TODAY'
            let tempStart = startDateObj
            let tempEnd = endDateObj
    
            let todayIncome = 0;
            let todayOutgoing = 0;
                const sessionsByTempDates = await SessionPost.find({date: {$gte: tempStart, $lte: tempEnd}})

              
                //loop through sessions in the current week
                for (let j = 0; j < sessionsByTempDates.length; j++) {
                    
                    const thisClass = classesBySessions.filter((thisClass) => thisClass._id.toString() === sessionsByTempDates[j].classRootId)[0]

                    let index = 0;

                    for (let k = 0; k < sessionPricesPerStudent.length; k++) {
                        if (sessionPricesPerStudent[k].sessionPrice === thisClass.costPerSession) {
                            
                            index = k
                            break;
                        } 
                    }

                    if (index === 0) {
                        
                        sessionPricesPerStudent.push({sessionPrice: thisClass.costPerSession, numberOfStudents: sessionsByTempDates[j].attendance.length, numberOfSessions: 1, total: thisClass.costPerSession * sessionsByTempDates[j].attendance.length})
                        
                    } else {
                        
                        sessionPricesPerStudent[index].numberOfStudents += sessionsByTempDates[j].attendance.length
                        
                        sessionPricesPerStudent[index].numberOfSessions ++

                        sessionPricesPerStudent[index].total += (sessionPricesPerStudent[index].sessionPrice * sessionsByTempDates[j].attendance.length)
                        
                    }

                    for (let k = 0; k < sessionPaymentsPerTeacher.length; k++) {
                        if (sessionPaymentsPerTeacher[k].hourlyRate === thisClass.teacherHourlyRate) {
                            index = k;
                            break;
                        }
                    }

                    if (index === 0) {
                        sessionPaymentsPerTeacher.push({hourlyRate: thisClass.teacherHourlyRate, numberOfSessions: 1, total: thisClass.teacherHourlyRate})
                    } else {
                        sessionPaymentsPerTeacher[index].numberOfSessions ++
                        sessionPaymentsPerTeacher[index].total += sessionPaymentsPerTeacher[index].total
                    }



                  
                    //in each session, check if complete
                    if (sessionsByTempDates[j].attendanceComplete === 'COMPLETE' || sessionsByTempDates[j].attendanceComplete === 'PARTIALLY COMPLETE') {
                        const sessionHours = getHoursBetweenDates(sessionsByTempDates[j].startTime, sessionsByTempDates[j].endTime)
                        sessionsCompleted++
                        todayOutgoing += sessionHours * thisClass.teacherHourlyRate;
                        outgoing += todayOutgoing

                        sessionsByTempDates[j].attendance.map((item, index) => {
                            
                            if (item.present === "/" || item.present === "L") {
                               
                                todayIncome += thisClass.costPerSession
                                incoming += todayIncome
                                totalStudentsInAttendance++
                            }
                        })
                    } else {
                        cancelledClasses++
                    }
                }

                financialChartData[0].push({x: `Today`, y: todayIncome})
                financialChartData[1].push({x: `Today`, y: todayOutgoing})

                profitChartData.push({x: 'Today', y: todayIncome - todayOutgoing})
            

            averageAttendance = Math.floor(totalStudentsInAttendance / sessionsByDate.length * 100) 
            profit = incoming - outgoing - softwarePayments

            sessionPricesPerStudent = sessionPricesPerStudent.filter((item) => Object.keys(item).length !== 0)
            sessionPaymentsPerTeacher = sessionPaymentsPerTeacher.filter((item) => Object.keys(item).length !== 0)

            res.status(200).json({profitChartData, chartType, cancelledClassesTotal, sessionsCompleted, incoming, outgoing, profit, sessionPricesPerStudent, totalStudentsInAttendance, averageAttendance, sessionPricesPerStudent, sessionPaymentsPerTeacher, cancelledClasses, softwarePayments, financialChartData})
            }
    }

    catch (e) {
        console.log(e)
    }
}

export const getAdminTodayOverwiew = async (req, res) => {
    const {searchDateStart, searchDateEnd} = req.query

    const startDateObj = new Date(searchDateStart)
    const endDateObj = new Date(searchDateEnd)

    const sessionsByDate = await SessionPost.find({date: {$gte: startDateObj, $lte: endDateObj}})
    const sessionsByDateIds = (await SessionPost.find({date: {$gte: startDateObj, $lte: endDateObj}}).distinct("classRootId")).map((id) => id.toString())
    const classesBySessions = await ClassPost.find({_id: {$in: sessionsByDateIds}})

    const classesToday = sessionsByDate.length
    let studentsAttending = 0;
    let averageAttendance = 0; 
    let cancelledClasses = 0;
    let todaysStudents = 0;
    let outgoing = 0;
    let incoming = 0;
    let profit = 0;
    let overviewGridData = [];

   

    for (let i = 0; i < sessionsByDate.length; i++) {
        const thisClass = classesBySessions.filter((thisClass) => thisClass._id.toString() === sessionsByDate[i].classRootId)[0]
        
        let length = 0;
        if (sessionsByDate[i].cancelled === 'TEACHER' || sessionsByDate[i].cancelled === 'CLIENT') {
            cancelledClasses++
            outgoing += sessionsByDate[i].attendance.length * thisClass.costPerSession

        } else {
            overviewGridData.push({client: thisClass.client, group: thisClass.group, startTime: sessionsByDate[i].startTime.toString().slice(16, 24), endTime: sessionsByDate[i].endTime.toString().slice(16, 24), level: thisClass.level, numberOfStudents: sessionsByDate[i].attendance.length})
            sessionsByDate[i].attendance.map((student) => {
                if (student.present === '/' || student.present === 'L') {
                    studentsAttending++
                    length++
                }
            })
            averageAttendance += length / sessionsByDate[i].attendance.length
            todaysStudents += sessionsByDate[i].attendance.length
            incoming += sessionsByDate[i].attendance.length * thisClass.costPerSession
        }
    }

    profit = incoming - outgoing
    averageAttendance = Math.floor(averageAttendance / sessionsByDate.length * 100)
    console.log(overviewGridData)
    res.status(200).json({averageAttendance, overviewGridData, classesBySessions, cancelledClasses, profit, classesToday, studentsAttending})
    
}

export const getTeacherTodayOverview = async (req, res) => {
    console.log(req.query)
    const {searchDateStart, searchDateEnd, teacher} = req.query

    const startDateObj = new Date(searchDateStart)
    const endDateObj = new Date(searchDateEnd)

    const classesByTeacherAndDates = await ClassPost.find({$and: [{teacher: teacher}, {date: {$gte: startDateObj, $lte: endDateObj}}]})
    const classesByTeacherAndDatesIds = (await ClassPost.find({$and: [{teacher: teacher}, {date: {$gte: startDateObj, $lte: endDateObj}}]}).distinct("_id")).map((id) => id.toString())
    const sessionsByClass = await SessionPost.find({classRootId: {$in: classesByTeacherAndDatesIds}})

    const classesToday = sessionsByClass.length
    let averageAttendance = 0; 
    let cancelledClasses = 0;
    let todaysStudents = 0;
    let todaysPay = 0;
    let overviewGridData = [];

   

    for (let i = 0; i < sessionsByClass.length; i++) {
        const thisClass = classesByTeacherAndDates.filter((thisClass) => thisClass._id.toString() === sessionsByClass[i].classRootId)[0]
        
        let length = 0;
        if (sessionsByClass[i].cancelled === 'TEACHER' || sessionsByClass[i].cancelled === 'CLIENT') {
            cancelledClasses++
        } else {
            const sessionLength = getHoursBetweenDates(sessionsByClass[i].startTime, sessionsByClass[i].endTime)
            todaysPay += thisClass.teacherHourlyRate * sessionLength
            overviewGridData.push({client: thisClass.client, group: thisClass.group, startTime: sessionsByClass[i].startTime.toString().slice(16, 24), endTime: sessionsByClass[i].endTime.toString().slice(16, 24), level: thisClass.level, numberOfStudents: sessionsByClass[i].attendance.length})
            sessionsByClass[i].attendance.map((student) => {
                if (student.present === '/' || student.present === 'L') {
                    studentsAttending++
                    length++
                }
            })
            averageAttendance += length / sessionsByClass[i].attendance.length
            todaysStudents += sessionsByClass[i].attendance.length
           
        }
    }

    averageAttendance = Math.floor(averageAttendance / sessionsByClass.length * 100)
    
    res.status(200).json({averageAttendance, cancelledClasses, todaysStudents, todaysPay, overviewGridData, classesToday})
    
}