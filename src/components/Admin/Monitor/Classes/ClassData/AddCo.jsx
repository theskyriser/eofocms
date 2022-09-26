import React, {useState, useEffect} from 'react'
import { GridComponent, ColumnsDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, ColumnDirective, fltrPrevent, gridActionHandler } from '@syncfusion/ej2-react-grids'
import { studentGrid, days } from '../../../../../data/gridHeaders';
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import {MdOutlineCancel} from 'react-icons/md'
import {AnimatePresence} from 'framer-motion'
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';


import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux';

import {motion} from 'framer-motion'
import Backdrop from '../../../../Backdrop'
import { getTeachers } from '../../../../../redux/actions/teachers';



const AddCo = ({setAddCo, handleCoSubmit}) => {
    const dispatch = useDispatch()
    const teachers = useSelector(state => state.teachers)
    const [currentId, setCurrentId] = useState(undefined)


    useEffect(() => {
        dispatch(getTeachers())
    }, [dispatch])

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

  const handleRowSelect = (rowData) => {
    if(rowData.data) {
        setCurrentId(rowData.data._id)
    }
  }

  const handleRowDeselect = () => {
    setCurrentId(undefined)
  }


  

  return (
    <Backdrop>
        <motion.div animate="visible" initial="hidden" exit="exit" variants={dropIn} onClick={(e) => e.stopPropagation()}>




         <div className='px-5 z-10'>
            <div className='w-full bg-white rounded-lg shadow-lg p-4'>
                <div className='mb-5 flex justify-between items-center'>
                  <h1 className='text-2xl'> ADD TEACHER</h1>

                  <TooltipComponent content="Menu" position='BottomCenter'>
                    <button type="button" onClick={() => {setAddCo(prev => !prev)}} 
                      className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block">
                      <MdOutlineCancel/>
                    </button>
                  </TooltipComponent>
                </div>
              <form onSubmit={(e) => {handleCoSubmit(e, currentId)}}>

            <div className='grid grid-cols-5 gap-2'>

                <div className='col-start-1 col-span-5'>
                    <GridComponent id="gridcomp" allowPaging allowSorting dataSource={teachers} rowSelected={(rowData) => handleRowSelect(rowData)} rowDeselected={() => handleRowDeselect()}>
                          <ColumnsDirective>
                            {studentGrid.map((item, index) => (
                          <ColumnDirective key={index} {...item} />
                          ))}
                          </ColumnsDirective>
                    </GridComponent>
                  </div>

                <div className='col-start-1 col-span-1'>
                    <div className='col-start-1 col-span-1 flex justify-evenly flex-col'>
                    <button type="submit" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mt-10">
                      <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                      <span> Add Co-ordinator </span>
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

export default AddCo