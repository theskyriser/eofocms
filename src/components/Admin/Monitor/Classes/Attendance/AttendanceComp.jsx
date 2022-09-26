import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {MdOutlineCancel} from 'react-icons/md'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import { getClasses } from '../../../../../redux/actions/classes'
import { getTeachers } from '../../../../../redux/actions/teachers'
import {getStudents} from '../../../../../redux/actions/students'
import { getSessions, getSessionsByPage, getSessionsBySearch } from '../../../../../redux/actions/sessions'
import Backdrop from '../../../../Backdrop'
import {motion} from 'framer-motion'

import { useLocation, useNavigate } from 'react-router-dom'

import AttendanceCards from './AttendanceCards'

const AttendanceComp = ({selectedClass, setOpenAttendance}) => {
  const dispatch = useDispatch()
  const classes = useSelector(state => state.classes)
  const {sessions, numberOfPages} = useSelector(state => state.sessions)
 

  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
  }


  const query = useQuery()

  const navigate = useNavigate()
  const page = query.get('page') || 1
  const searchQuery = query.get("searchQuery")

  const [currentClassId, setCurrentClassId] = useState('')
  const [currentSessionId, setCurrentSessionId] = useState('')
  const [openWindow, setOpenWindow] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)
  const [byAccount, setByAccount] = useState(false)
  
  const user = JSON.parse(localStorage.getItem("profile"))
  const [searchParams, setSearchParams] = useState({group: '', level: '', searchDateStart: '', searchDateEnd: '', teacher: '', coOrdinator: '', students: ''})
  
  useEffect(() => {
    if(page) {
        dispatch(getSessionsByPage(page, selectedClass))
      } 
      dispatch(getClasses())
    
    dispatch(getStudents())
    dispatch(getTeachers())
  }, [page, openFilter, byAccount])

  const searchPost = () => {

    let url = 'search?'

    for (const query in searchParams) {
      if (searchParams[query] !== '') {
        url = url + `${query}=${searchParams[query]}&`
      }
  }
  
  
    dispatch(getSessionsBySearch(url))
    navigate(`/main/attendance/${url}`)
  }

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

  return (
    <Backdrop>
        <motion.div animate="visible" initial="hidden" exit="exit" variants={dropIn} onClick={(e) => e.stopPropagation()}>
        <div className='p-4 flex flex-col h-screen justify-between'>
        <div className=' bg-main-bg rounded-lg shadow-lg p-4'>
        <div className='flex justify-between'>
              <h1 className='text-2xl font-bold'> Attendance for: </h1>
              <TooltipComponent content="Menu" position='BottomCenter'>
                    <button type="button" onClick={() => {setOpenAttendance(prev => !prev)}} 
                      className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block">
                      <MdOutlineCancel/>
                    </button>
                  </TooltipComponent>
            </div>
    <div>





        <AttendanceCards byAccount={byAccount} setByAccount={setByAccount} openWindow={openWindow} setOpenWindow={setOpenWindow} searchPost={searchPost} searchParams={searchParams} setSearchParams={setSearchParams} page={page} numberOfPages={numberOfPages} sessions={sessions} classes={classes} currentClassId={currentClassId} setCurrentClassId={setCurrentClassId} currentSessionId={currentSessionId} setCurrentSessionId={setCurrentSessionId}/>
    </div>
    </div>
    </div>
    </motion.div>
  </Backdrop>
  )
}

export default AttendanceComp