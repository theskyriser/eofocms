import React from 'react'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import {MdOutlineCancel} from 'react-icons/md'
import Backdrop from '../../../../Backdrop'
import {motion} from 'framer-motion'

const AttendanceCancel = ({setOpenCancel, handleCancel}) => {

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
                        <h1 className='text-2xl'> Cancel Class </h1>

                        <TooltipComponent content="Menu" position='BottomCenter'>
                            <button type="button"
                            className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block" onClick={() => setOpenCancel(prev => !prev)}>
                            <MdOutlineCancel/>
                            </button>
                        </TooltipComponent>
                    </div>

                    <div className='grid grid-cols-2 gap-5 text-xl'>
                        <button type="sumbit" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => handleCancel('TEACHER')}> Cancelled By Teacher </button>
                        <button type="sumbit" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => handleCancel('CLIENT')}> Cancelled By Client </button>
                    </div>


                </div>
            </div>
        </motion.div>
    </Backdrop>
  )
}

export default AttendanceCancel