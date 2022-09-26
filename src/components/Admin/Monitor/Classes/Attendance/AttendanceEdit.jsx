import React, {useState, useEffect} from 'react'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import { AnimatePresence } from 'framer-motion'

import {MdOutlineCancel} from 'react-icons/md'
import {motion} from 'framer-motion'
import Backdrop from '../../../../Backdrop'
import { useDispatch, useSelector } from 'react-redux'
import { updateSession } from '../../../../../redux/actions/sessions'
import AttendanceCancel from './AttendanceCancel'

const AttendanceEdit = ({currentSessionId, setOpenWindow}) => {
  const dispatch = useDispatch()
  const classes = useSelector(state => state.classes)
  const {sessions} = useSelector(state => state.sessions)
  const students = useSelector(state => state.students)
  const user = JSON.parse(localStorage.getItem("profile"))
  
    const thisSession = sessions.filter(session => session._id === currentSessionId)[0]
    const thisClass = classes.filter(singleClass => singleClass._id === thisSession.classRootId)[0]
    const [openCancel, setOpenCancel] = useState(false)
  

  const [currentMarks, setCurrentMarks] = useState({})
 
  useEffect(() => {

    let temp = {}

    if (thisSession) {
      thisSession.attendance.map((student) => {
        temp = {...temp, [student._id]: student.present}
      })
    }

    setCurrentMarks(temp)
  }, [])

  const dropIn = {
    hidden:{
      y: '-100vh',
      opacity: 0
    },
    visible: {
      y: '0',
      opacity: 1,
      transition: {
        duraction: 0.2
      }
    },
    exit: {
      y: '100vh',
      opacity: 0
    }
  }

  const handleChange =  (e, studentId) => {
     setCurrentMarks({...currentMarks, [studentId]: e.target.value})
  }

const handleSubmit = async (e) => {
  e.preventDefault()
  const user = JSON.parse(localStorage.getItem("profile"))
  let re = /[\/AL]/
  let incorrectCharFlag = false;
  let characterNoFlag = 0;
  let session = thisSession
 
    //loop over current marks
    for (const student in currentMarks) {
      if(re.test(currentMarks[student]) || currentMarks[student] === "") {
          //get current student in session
        const thisStudent = session.attendance.filter((thisStudent) => thisStudent._id === student)[0]
        //update student with present data
        const updatedStudent = {...thisStudent, present: currentMarks[student]}
    
        const attendanceWithoutUpdate = session.attendance.filter((thisStudent) => thisStudent._id !== student)
    
        const attendanceWithUpdate = [...attendanceWithoutUpdate, updatedStudent]
    
        session = {...session, attendance: attendanceWithUpdate}

        
      } else {
        incorrectCharFlag = true;
      }
    }

    if(!incorrectCharFlag) {
      session.attendance.map((student) => {
        if (student.present === "") {
          characterNoFlag++;
        }
      })
  
      
      if (characterNoFlag === session.attendance.length) {
        session = {...session, attendanceComplete: 'NOT COMPLETE'}
      } else if (characterNoFlag > 0 && characterNoFlag < session.attendance.length) {
        session = {...session, attendanceComplete: 'PARTIALLY COMPLETE'}
      } else if (characterNoFlag === 0) {
        session = {...session, attendanceComplete: 'COMPLETE'}
      }
    }
    

    if(!incorrectCharFlag) {
      dispatch(updateSession(session._id, session))
      setOpenWindow(false)
    } else {
      alert("Incorrect char")
    }
}

const handleCancel = (type) => {
  switch(type) {
    case "CLIENT":
      dispatch(updateSession(thisSession._id, {...thisSession, cancelled: "CLIENT"}))
      break;
    case "TEACHER":
      dispatch(updateSession(thisSession._id, {...thisSession, cancelled: "TEACHER"}))
      break;
    default:
    
  }
  setOpenCancel(false)
}

const handleReInstate = () => {
  dispatch(updateSession(thisSession._id, {...thisSession, cancelled: ""}))
  setOpenWindow(false)
}

const handleAdminCheck = () => {
  if (user?.result?.accountType !== 'ADMIN') {
    alert('Please contact your administrator to cancel this class')
  } else {
    setOpenCancel(true)
  }
}


  return (
    <Backdrop>
        <motion.div animate="visible" initial="hidden" exit="exit" variants={dropIn} onClick={(e) => e.stopPropagation()}>

         <div className='p-5'>
          <div className='w-full bg-white rounded-lg shadow-lg p-4'>
                <div className=' flex justify-between items-center'>
                  <h1 className='text-2xl'> Add Attendance </h1>

                  <TooltipComponent content="Menu" position='BottomCenter'>
                    <button type="button"
                      className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block" onClick={() => setOpenWindow(prev => !prev)}>
                      <MdOutlineCancel/>
                    </button>
                  </TooltipComponent>
                </div>

              <div className=' mb-5'>
                <h1 className='text-xl'> Date: {thisSession.date.slice(0, 10)} </h1>
              </div>
                
                
              <form onSubmit={(e) => handleSubmit(e)}>
                
              {sessions &&
                thisSession.attendance.map((student) => {

                const thisStudent = students.filter((singleStudent) => singleStudent._id === student.studentRootId)[0]
                
                return (
                <div className='grid grid-cols-2 mb-2' key={thisStudent._id}>
                  <div className='col-span-1' >
                    <p> {thisStudent?.firstName} {thisStudent?.lastName} </p>
                  </div>

                  <div >
                    <input className='border-1 p-1 border-color rounded-sm' value={currentMarks[student._id] || ""} type="text" onChange={(e) => handleChange(e, student._id)} />
                  </div>
                </div>
                )
              })}

                        
                          
              <div className='flex justify-between'>
                <button type="sumbit" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"> SUBMIT </button>
              {thisSession.cancelled !== '' ?
                <button type="button" class="bg-green-500 hover:green-red-600 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => handleReInstate()}> RE-INSTATE CLASS </button>
              : 
               <button type="button" class="bg-red-500 hover:bg-red-600 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => handleAdminCheck()} > CANCEL CLASS </button>}
              </div>   
                
              </form>
            </div>
      </div>

      <AnimatePresence intial={false} exitBeforeEnter={true} onExitComplete={(() => null)}>
                {openCancel && <AttendanceCancel setOpenCancel={setOpenCancel} handleCancel={handleCancel}/>}
      </AnimatePresence>
   
      </motion.div>
    </Backdrop>
  )}

  export default AttendanceEdit;