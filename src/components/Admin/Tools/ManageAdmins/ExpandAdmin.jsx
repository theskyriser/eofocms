import React, {useState, useEffect} from 'react'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import {MdOutlineCancel} from 'react-icons/md'
import { useSelector } from 'react-redux'

import { getAge } from '../../../../functions'

import {motion} from 'framer-motion'
import Backdrop from '../../../Backdrop'

import { GridComponent, ColumnsDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, ColumnDirective, fltrPrevent } from '@syncfusion/ej2-react-grids'
import { scheduleGrid, studentGrid } from '../../../../data/gridHeaders'
import {classData, studentData} from '../../../../data/dummyTableData'


import dummyImg from '../../../../data/avatar.jpg'


const ExpandAdmin = ({setExpand, currentId}) => {

  const admin = useSelector(state => state.admins)
  const currentAdmin = admin.filter((item) => item._id === currentId)
  
  console.log(currentAdmin)

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
                  <h1 className='text-2xl'> Information for: Jacob Woodcock </h1>
                   
                  <TooltipComponent content="Menu" position='BottomCenter'>
                    <button type="button" onClick={() => {setExpand(prev => !prev)}} 
                      className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block">
                      <MdOutlineCancel/>
                    </button>
                  </TooltipComponent>
                </div>

                
              
                <div className='grid grid-cols-1 gap-2 border-color border-1 p-2'>
                    <div className='col-span-3 items-center flex flex-col '>
                        <img src={dummyImg}/>
                        <h2> Jacob Woodcock </h2>
                        <h3> Director </h3>

                        <div className='bg-main-bg rounded-lg shadow-lg p-4 grid grid-cols-2 gap-2'>
                            <div className='col-span-1 text-blue-700 text-right'>
                                <p> Age </p>
                                <p> Email </p>
                                <p> Phone </p>
                                <p> Address </p>
                                <p> State </p>
                                <p> Post Code </p>
                               

                            </div>

                            <div className='col-span-1 col-start-2'>
                                <p> {getAge(currentAdmin[0].dob)} </p>
                                <p> {currentAdmin[0].email} </p>
                                <p> {currentAdmin[0].phone} </p>
                                <p> {currentAdmin[0].address} </p>
                                <p> {currentAdmin[0].state} </p>
                                <p> {currentAdmin[0].code} </p>
                                

                            </div>
                        </div>
                    </div>


                    

                   
                    
                    
                  
                  
                 
           

                    
                    
              </div>
              
            </div>
      </div>
   
      </motion.div>
    </Backdrop>
    
       
    
  )
}

export default ExpandAdmin