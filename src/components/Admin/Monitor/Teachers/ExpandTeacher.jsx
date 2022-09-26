import React, {useState, useEffect} from 'react'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import {MdOutlineCancel} from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

import {motion} from 'framer-motion'
import Backdrop from '../../../Backdrop'
import {ScheduleComponent, Inject, Day, Week, Month, Agenda, Resize} from '@syncfusion/ej2-react-schedule'

import {getSessionsForCalendar} from '../../../../redux/actions/sessions'

const ExpandTeacher = ({setActiveSchedule, selectedTeacher, currentColor}) => {
  const dispatch = useDispatch()
  const teachers = useSelector(state => state.teachers)
  const currentTeacher = teachers.filter((item) => item._id === selectedTeacher)[0]
  const sessionCalendarData = useSelector(state => state.sessions.calendar)

  let calendar;

  useEffect(() => {
    handleCalendarChange()
    
  }, [])

  const handleCalendarChange = () => {
    let dates
    if (calendar) {
      dates = calendar?.getCurrentViewDates()
    }
    
    if (dates) {
      const firstDate = dates[0]
      const lastDate = dates[dates.length - 1]
      console.log(firstDate, lastDate)
      dispatch(getSessionsForCalendar(`searchDateStart=${firstDate}&searchDateEnd=${lastDate}&type=teacher&id=${currentTeacher?._id}`))
    }
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

        <div className='px-5 z-10'>
          <div className='w-full bg-white rounded-lg shadow-lg p-4' >
                <div className='mb-5 flex justify-between items-center '>
                  <h1 className='text-2xl'> Class Schedule for: {currentTeacher?.firstName + ' ' +  currentTeacher?.lastName}</h1>

                  <TooltipComponent content="Menu" position='BottomCenter'>
                    <button type="button" onClick={() => {setActiveSchedule(prev => !prev)}} 
                      className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block">
                      <MdOutlineCancel/>
                    </button>
                  </TooltipComponent>
                </div>

                <div className='p-2'>
                  <div className='mt-2'>
                    <ScheduleComponent style={{backgroundColor: currentColor}} ref={(c) => (calendar = c)} eventSettings={{dataSource: sessionCalendarData}} readonly={true} height={650} actionComplete={() => handleCalendarChange()} startHour={'08:00'} endHour={'22:00'}>
                      <Inject services={[Day, Week, Month, Agenda, Resize]}/>
                    </ScheduleComponent>
                  </div>
              </div>
            </div>
        </div>
   
      </motion.div>
    </Backdrop>
  )
}

export default ExpandTeacher