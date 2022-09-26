import React, {useState, useEffect} from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective} from '@syncfusion/ej2-react-grids'
import {studentGrid, teacherGrid } from '../../../../data/gridHeaders'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import {AnimatePresence} from 'framer-motion'
// import AttendanceAdd from './AttendanceAdd'
import { languageLevels } from '../../../../data/gridHeaders'


import { DatePickerComponent } from '@syncfusion/ej2-react-calendars'


import {MdOutlineCancel} from 'react-icons/md'
import {motion} from 'framer-motion'
import Backdrop from '../../../Backdrop'
import { useDispatch, useSelector } from 'react-redux'
import ClassAdd from './ClassAdd'

const ClassSearch = ({setOpenFilter, searchPost, setSearchParams, searchParams}) => {
  const dispatch = useDispatch()
  const currentColor = useSelector(state => state.appState.currentColor)
  const [addStudent, setAddStudent] = useState(false)
  const [addCoor, setAddCoor] = useState(false)
  const [addTeacher, setAddTeacher] = useState(false)
  const [filterDisplay, setFilterDisplay] = useState({student: '', teacher: '', coor: ''})



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

  const handleFilterSubmit = (type, data) => {    
    switch(type) {
      
      case 'teacher':
      setSearchParams({...searchParams, teacher: data.currentId})
      setFilterDisplay({...filterDisplay, teacher: {firstName: data.firstName, lastName: data.lastName}})
      setAddTeacher(false)
      break;

      case 'coor':
      setSearchParams({...searchParams, coOrdinator: data.currentId})
      setFilterDisplay({...filterDisplay, coor: {firstName: data.firstName, lastName: data.lastName}})
      setAddCoor(false)
      break;

      case 'student':
      setSearchParams({...searchParams, students: data.currentId})
      setFilterDisplay({...filterDisplay, student: {firstName: data.firstName, lastName: data.lastName}})
      setAddStudent(false)
      break;

      default: 
      setSearchParams({...searchParams})
      break;

    }
  }

  const handleClose = () => {
    setOpenFilter(prev => !prev)
    setSearchParams({group: '', level: '', searchDateStart: '', searchDateEnd: '', teacher: '', coOrdinator: '', students: ''})
  }

  const handleSubmit = () => {
    setOpenFilter(false)
    searchPost()
  }

  return (
    <Backdrop>
        <motion.div animate="visible" initial="hidden" exit="exit" variants={dropIn} onClick={(e) => e.stopPropagation()}>

         <div className='px-5 z-10'>
          <div className='w-full bg-white rounded-lg shadow-lg p-4'>
                <div className='mb-5 flex justify-between items-center'>
                  <h1 className='text-2xl'> Add Filters </h1>
                  
                  <TooltipComponent content="Menu" position='BottomCenter'>
                    <button type="button"
                      className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block" onClick={() => handleClose()}>
                      <MdOutlineCancel/>
                    </button>
                  </TooltipComponent>
                </div>

            <form className='grid grid-cols-4 gap-4'>
                <div >
                    <input value={searchParams.group} type="text" placeholder='Search Group' className='h-full text-md p-1 border-1 border-color rounded-md' onChange={(e) => {setSearchParams({...searchParams, group: e.target.value})}}/>
                </div>

                <div className='relative col-start-2 col-span-1'>
                    <select defaultValue={"default"}  onChange={(e) => {setSearchParams({...searchParams, level: e.target.value})}} className='rounded-md appearance-none block w-full text-gray-700 border-1 border-color p-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>
                          <option value={"default"} disabled>
                            Level
                          </option>
                      {languageLevels.map((item) => (
                        <option key={item} value={item}> {item} </option>
                      ))}
                    </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                  </div>

                <div className='col-start-3 col-span-1'>
                    <DatePickerComponent id='datepickerEnd' placeholder='Enter Start Date' value={searchParams.startDate} change={(data) => setSearchParams({...searchParams, searchDateStart: new Date(data.value)})}/>
                </div>

                <div className='col-start-4 col-span-1'>
                    <DatePickerComponent id='datepickerEnd' placeholder='Enter Final Date' value={searchParams.endDate} change={(data) => setSearchParams({...searchParams, searchDateEnd: new Date(data.value)})}/>
                </div>

                <div className='col-start-1 col-span-1 text-center border-color border-1 p-2 rounded-md'>
                    <button type="button" className='text-sm p-2 border-color border-1 rounded-md hover:shadow-lg hover:bg-slate-200 w-full' onClick={() => setAddTeacher((prev) => !prev)}> By Teacher </button>
                
                    <p className='mt-3'>
                        {filterDisplay.teacher ? filterDisplay?.teacher?.firstName + ' ' + filterDisplay?.teacher?.lastName : 'Not Selected'}
                    </p>
                </div>

                <div className='col-start-2 col-span-1 text-center border-color border-1 p-2 rounded-md'>
                    <button type="button" className='text-sm p-2 border-color border-1 rounded-md hover:shadow-lg hover:bg-slate-200 w-full' onClick={() => setAddCoor(prev => !prev)}> By Co-Ordinator </button>
                
                    <p className='mt-3'>
                      {filterDisplay.coor ? filterDisplay?.coor?.firstName + ' ' + filterDisplay?.coor?.lastName : 'Not Selected'}
                    </p>
                </div>

                <div className='col-start-3 col-span-1 text-center border-color border-1 p-2 rounded-md'>
                    <button type="button" className='text-sm p-2 border-color border-1 rounded-md hover:shadow-lg hover:bg-slate-200 w-full' onClick={() => setAddStudent(prev => !prev)}> By Student </button>
                
                    <p className='mt-3'>
                    {filterDisplay.student ? filterDisplay?.student?.firstName + ' ' + filterDisplay?.student?.lastName : 'Not Selected'}
                    </p>
                </div>

                <div className='col-start-4 col-span-1 rounded-md flex flex-col-reverse'>
                    <button type="button" className={`text-sm p-2 border-color border-1 rounded-md hover:shadow-lg text-semibold text-white`} style={{backgroundColor: currentColor}} onClick={handleSubmit}> Search </button>
                </div>
            </form>

            </div>

            <AnimatePresence intial={false} exitBeforeEnter={true} onExitComplete={(() => null)}>
                {addTeacher && 
                    <ClassAdd type="teacher" toggle={setAddTeacher} grid={teacherGrid} title="Select Teacher" handleFilterSubmit={handleFilterSubmit}/>
                }

                {addCoor && 
                    <ClassAdd type="coor" toggle={setAddCoor} grid={teacherGrid} title="Select Co-ordinator" handleFilterSubmit={handleFilterSubmit}/>
                }

                {addStudent && 
                    <ClassAdd type="student" toggle={setAddStudent} grid={studentGrid} title="Select Student" handleFilterSubmit={handleFilterSubmit}/>
                }


            </AnimatePresence>
      </div>
   
      </motion.div>
    </Backdrop>
  )}

  export default ClassSearch;