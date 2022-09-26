import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import teacherRoutes from './routes/teachers.js'
import userRoutes from './routes/users.js'
import adminRoutes from './routes/admins.js'
import studentRoutes from './routes/students.js'
import classRoutes from './routes/classes.js'
import sessionRoutes from './routes/sessions.js'
import gradeRoutes from './routes/grades.js'
import payrollRoutes from './routes/payroll.js'
import financialRoutes from './routes/financials.js'
import homeworkRoutes from './routes/homework.js'

const app = express()

app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
app.use(cors())

app.use('/teachers', teacherRoutes)
app.use('/users', userRoutes)
app.use('/admins', adminRoutes)
app.use('/students', studentRoutes)
app.use('/classes', classRoutes)
app.use('/sessions', sessionRoutes)
app.use('/grades', gradeRoutes)
app.use('/payroll', payrollRoutes)
app.use('/financials', financialRoutes)
app.use('/homework', homeworkRoutes)

app.get('/', (req, res) => {
    res.send('APP IS RUNNING')
})



const CONNECTION_URL = "mongodb+srv://eOfe:valery01@eofedb.uqyzm.mongodb.net/?retryWrites=true&w=majority"
const PORT = process.env.PORT || 3000

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`)))
.catch((e) => console.log(e))