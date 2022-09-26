import React from 'react'

import { DatePickerComponent } from '@syncfusion/ej2-react-calendars'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'


import {MdOutlineCancel} from 'react-icons/md'
import {motion} from 'framer-motion'
import Backdrop from '../Backdrop'

const PayRollFilter = ({setOpenFilter, currentColor, handleSearch, searchParams, setSearchParams}) => {
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

         <div className='p-5'>
          <div className='w-full bg-white rounded-lg shadow-lg p-4'>
                <div className=' flex justify-between items-center'>
                  <h1 className='text-2xl'> Select Time Frame </h1>

                  <TooltipComponent content="Menu" position='BottomCenter'>
                    <button type="button"
                      className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block" onClick={() => setOpenFilter(prev => !prev)}>
                      <MdOutlineCancel/>
                    </button>
                  </TooltipComponent>
                </div>

                <form onSubmit={(e) => handleSearch('CUSTOM', e)}>
                  <div className='grid grid-cols-2 gap-5'> 
                    <div className='col-start-1 col-span-1'>
                        <DatePickerComponent id='datepickerEnd' placeholder='Enter Start Date'  change={(data) => setSearchParams({...searchParams, searchDateStart: new Date(data.value)})}/>
                    </div>

                    <div className='col-start-2 col-span-1'>
                        <DatePickerComponent id='datepickerEnd' placeholder='Enter Final Date' change={(data) => setSearchParams({...searchParams, searchDateEnd: new Date(data.value)})}/>
                    </div>

                    
                  </div>
                <div className='flex flex-row-reverse mt-4'>
                  <button style={{backgroundColor: currentColor, color: 'white'}} class={`font-bold py-2 px-4 rounded inline-flex items-center hover:shadow-lg`}>
                      Search
                  </button>
                </div>
                  
                </form>

                
              </div>
          </div>
      </motion.div>
    </Backdrop>
  )}

  export default PayRollFilter;