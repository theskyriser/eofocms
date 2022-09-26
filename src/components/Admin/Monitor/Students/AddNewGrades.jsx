import React, {useState, useEffect} from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Inject} from '@syncfusion/ej2-react-grids'
import {studentGrid } from '../../../../data/gridHeaders'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'

import { DatePickerComponent } from '@syncfusion/ej2-react-calendars'


import {MdInfoOutline, MdOutlineCancel} from 'react-icons/md'
import {motion} from 'framer-motion'
import Backdrop from '../../../Backdrop'
import { useDispatch, useSelector } from 'react-redux'
import {updateClass} from '../../../../redux/actions/classes'

const AddNewGrades = ({currentColor, setAddNew, addNewData, name, handleSubmit, handleChange, handleAverage}) => {

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

      <div className='w-screen px-5 z-10'>
          <div className='w-full bg-white rounded-lg shadow-lg p-4'>
            <div className='mb-5 flex justify-between items-center'>
                  <h1 className='text-4xl font-bold'> Input New Grades For: {name}  </h1>
                  <h2 className='text-xl font-semibold'> Calculated Average: {addNewData.average} </h2>
                  <button type="submit" className="py-2 px-4 rounded-md flex justify-between hover:shadow-md" onClick={() => handleAverage()} style={{backgroundColor: currentColor, color: 'white'}}>
                            <p className='font-semibold'> Calculate Average </p>
                                <div className='text-2xl ml-3'>
                                    <MdInfoOutline/>
                                </div>
                            </button>
                  <TooltipComponent content="Menu" position='BottomCenter'>
                    <button type="button"
                      className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block" onClick={() => setAddNew(prev => !prev)}>
                      <MdOutlineCancel/>
                    </button>
                  </TooltipComponent>
                </div>

              <hr className='border-1 border-color mb-4'/>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className='grid grid-cols-5 gap-4'>
                  <div className='col-start-1 col-span-1 mx-4'>
                    <label htmlFor="writing"> Writing </label>
                    <input name="writing" value={addNewData.writing} type="text" id="writing" onChange={(e) => handleChange(e)} style={{backgroundColor: currentColor + '40'}} className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'/>
                  </div>

                  <div className='col-start-2 col-span-1 mx-4'>
                    <label htmlFor="reading"> Reading </label>
                    <input name="reading" value={addNewData.reading} type="text" id="reading" onChange={(e) => handleChange(e)} style={{backgroundColor: currentColor + '40'}} className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'/>
                  </div>

                  <div className='col-start-3 col-span-1 mx-4'>
                    <label htmlFor="listening"> Listening </label>
                    <input name="listening" value={addNewData.listening} type="text" id="listening" onChange={(e) => handleChange(e)} style={{backgroundColor: currentColor + '40'}} className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'/>
                  </div>

                  <div className='col-start-4 col-span-1 mx-4'>
                    <label htmlFor="speaking"> Speaking </label>
                    <input name="speaking" value={addNewData.speaking} type="text" id="speaking" onChange={(e) => handleChange(e)} style={{backgroundColor: currentColor + '40'}} className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'/>
                  </div>

                  <div className='col-start-5 col-span-1 mx-4'>
                    <label htmlFor="exam"> Exam Percentage </label>
                    <input name="examPer" value={addNewData.exam} type="text" id="exam" onChange={(e) => handleChange(e)} style={{backgroundColor: currentColor + '40'}} className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'/>
                  </div>

                  <div className='col-start-1 col-span-2 mx-4'>
                    <label htmlFor="excellence"> Excellence </label>
                    <textarea name="excellence" id="excellence" value={addNewData.excellence} onChange={(e) => handleChange(e)} style={{backgroundColor: currentColor + '40'}} rows="4" class="mt-1 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add excellence..."></textarea>
                  </div>

                  <div className='col-start-3 col-span-2 mx-4'>
                    <label htmlFor="improvements"> Improvements </label>
                    <textarea name="improvements" id="improvements" value={addNewData.improvements} onChange={(e) => handleChange(e)} style={{backgroundColor: currentColor + '40'}}  rows="4" class="mt-1 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add improvements..."></textarea>
                  </div>

                  <div className='col-start-5 col-span-1 flex justify-evenly flex-col'>
                          <button type="submit" className="py-2 px-4 rounded-md flex justify-between hover:shadow-md" style={{backgroundColor: currentColor, color: 'white'}}>
                            <p className='font-semibold'> Submit </p>
                                <div className='text-2xl ml-3'>
                                    <MdInfoOutline/>
                                </div>
                            </button>
                  </div>
                </div>
              </form>
            </div> 
      </div>

      </motion.div>
    </Backdrop>
  )}

  export default AddNewGrades;