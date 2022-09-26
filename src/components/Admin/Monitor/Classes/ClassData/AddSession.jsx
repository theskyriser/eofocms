import React, {useState} from 'react'

import { TooltipComponent } from '@syncfusion/ej2-react-popups'

import {MdOutlineCancel} from 'react-icons/md'

import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { days } from '../../../../../data/gridHeaders';

import {motion} from 'framer-motion'
import Backdrop from '../../../../Backdrop'

const AddSession = ({setAddSession, handleSessionSubmit}) => {

    const [sessionData, setSessionData] = useState({currentDay: '', currentStartTime: '', currentEndTime: ''})

   

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

  //[{Monday: 18, Tuesday: 17}, {Monday: 18}]


  

  return (
    <Backdrop>
        <motion.div animate="visible" initial="hidden" exit="exit" variants={dropIn} onClick={(e) => e.stopPropagation()}>




         <div className='px-5 z-10'>
            <div className='w-full bg-white rounded-lg shadow-lg p-4'>
                <div className='mb-5 flex justify-between items-center'>
                  <h1 className='text-2xl'> ADD NEW CLASS</h1>

                  <TooltipComponent content="Menu" position='BottomCenter'>
                    <button type="button" onClick={() => {setAddSession(prev => !prev)}} 
                      className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block">
                      <MdOutlineCancel/>
                    </button>
                  </TooltipComponent>
                </div>
              <form onSubmit={(e) => {handleSessionSubmit(e, sessionData)}}>

                <div className='grid grid-cols-1 gap-5'>

                <div className='col-start-1 col-span-1'>
                <label> Day </label>
                <select defaultValue={"default"} onChange={(e) => {setSessionData({...sessionData, currentDay: e.target.value})}} className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>
                      <option value={"default"} disabled>
                        Choose a day
                      </option>
                  {days.map((item) => (
                    <option key={item} value={item}> {item} </option>
                  ))}
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>

                <div className='mt-5'>
                  <p> Start Time </p>
                    <TimePickerComponent id="timepicker" placeholder="Select a Time"  change={(data) => setSessionData({...sessionData, currentStartTime: data.value})}/>
                </div>

                <div className='mt-5'>
                  <p> End Time </p>
                    <TimePickerComponent id="timepicker" placeholder="Select a Time"  change={(data) => setSessionData({...sessionData, currentEndTime: data.value})}/>
                </div>

                <div className='col-start-1 col-span-1 flex justify-evenly flex-col'>
                    <button type="submit" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mt-10">
                      <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                      <span> Add Session </span>
                    </button> 
                </div>
            </div>

                </div>
              </form>
            </div>
      </div>
   
      </motion.div>
    </Backdrop>
    
       
    
  )
}

export default AddSession