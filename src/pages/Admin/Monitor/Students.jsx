import React, {useState} from 'react'
import { GridComponent, ColumnsDirective, Selection, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, ColumnDirective } from '@syncfusion/ej2-react-grids'
import { AnimatePresence } from 'framer-motion'

import {studentGrid} from '../../../data/gridHeaders'
import { useEffect } from 'react'

import {useDispatch, useSelector} from 'react-redux'
import ChangeCredentials from '../../../components/Auth/ChangeCredentials'
import { getStudentsByTeacher, getStudents, deleteStudent } from '../../../redux/actions/students'
import StudentGrades from '../../../components/Admin/Monitor/Students/StudentGrades'

import { MdOutlinePersonAddAlt, MdInfoOutline, MdOutlineModeEdit, MdOutlineGrade, MdOutlineAssignment, MdTextSnippet, MdFolder, MdAccountCircle } from "react-icons/md";
import { resetPasswordCheck } from '../../../redux/actions/auth'
import {SparklineComponent, SparklineTooltip} from '@syncfusion/ej2-react-charts'
import profile from '../../../data/profile.svg'
import AddStudent from '../../../components/Admin/Monitor/Students/AddStudent'
import ExpandStudent from '../../../components/Admin/Monitor/Students/ExpandStudent'
import AddHomework from '../../../components/Admin/Monitor/Students/AddHomework'
import { getHomework, getHomeworkByStudent } from '../../../redux/actions/homework'
import ShowLatestHomework from '../../../components/Admin/Monitor/Students/ShowLatestHomework'
import SeeAllHomeworks from '../../../components/Admin/Monitor/Students/SeeAllHomeworks'

const Students = () => {
    const dispatch = useDispatch()
    const currentColor = useSelector(state => state.appState.currentColor)
    const students = useSelector(state => state.students)
    const [activeAddStudent, setActiveAddStudent] = useState(false)
    const [activeExpand, setActiveExpand] = useState(false)
    const [currentEdit, setCurrentEdit] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState('')
    const [openInfo, setOpenInfo] = useState(false)
    const [openGrades, setOpenGrades] = useState(false)
    const [activeCredentials, setActiveCredentials] = useState(false)
    const thisStudent = students.filter((student) => student._id === selectedStudent)[0]
    const [openAddHomework, setOpenAddHomework] = useState(false)
    const [openLatestHomework, setOpenLatestHomework] = useState(false)
    const [openAllHomework, setOpenAllHomework] = useState(false)
    
    useEffect(() => {
        dispatch(getStudents())
    }, [])

    const handleRowSelect = (rowData) => {
        setSelectedStudent(rowData.data._id)
    }

    const handleRowDeselect = (e) => {  
        setSelectedStudent('')
    }

    const handleOpenGrades = () => {
        if (selectedStudent !== '') {
            setOpenGrades(true)
        } else {
            alert('Please select student')
        }
    }

    const handleEdit = () => {
        if (selectedStudent) {
            setCurrentEdit(true)
            setActiveAddStudent(true)
        } else {
            alert('Select Student')
        }
    }

    const handleAdd = () => {
        setCurrentEdit(false)
        setActiveAddStudent(true)
    }

    const handleActiveExpand = () => {
        if (selectedStudent) {
            setActiveExpand(true)
        } else {
            alert('Select Student')
        }
        

        
    }

    const handleCredentials = () => {
        if (selectedStudent) {
            dispatch(resetPasswordCheck())
            setActiveCredentials(true)
        } else {
            alert('Select Student')
        }
    }

    const handleDelete = () => {
        if (selectedStudent) {
            dispatch(deleteStudent(selectedStudent))
        } else {
            alert('Select Teacher')
        }  
    }

    const handleAddHomework = () => {
        if (selectedStudent) {
            setOpenAddHomework(true)
            setCurrentEdit(false)
        } else {
            alert('Select Teacher')
        }  
    }

    const handleSeeLatest = () => {
        if (selectedStudent) {
            setOpenLatestHomework(true)
        } else {
            alert('Select Teacher')
        }  
    }

    const handleSeeAllHomework = () => {
        if (selectedStudent) {
            setOpenAllHomework(true)
        } else {
            alert('Select Teacher')
        }  
    }

    

  return (
    <div>
        <div className='p-4'>
            <div className=' bg-main-bg rounded-lg shadow-lg p-4'>
                <div className='mb-5'>
                    <h1 className='text-2xl font-extrabold'> Students </h1>

                    <h2> Set grades, View Info, Set Homework?</h2>
                </div>

                <div className='grid grid-cols-7 gap-4'>
                    <div className='col-span-3 bg-white rounded-lg shadow-lg p-5 flex gap-4'>

                        <div className='text-center flex flex-col justify-between'>
                            <div>
                                <img src={profile} width={200}/>
                            </div>
                            
                            <button className="py-2 px-4 rounded-md flex justify-between w-full hover:shadow-md" onClick={() => handleCredentials()} style={{backgroundColor: currentColor, color: 'white'}}>
                            <p className='font-semibold'> Credentials </p>
                                <div className='text-2xl mr-2'>
                                    <MdInfoOutline/>
                                </div>
                            </button>
                        </div>

                        <div className='text-lg grid grid-cols-4 gap-4 w-full bg-main-bg rounded-lg shadow-lg p-2'>
                            <div className='col-span-2 font-semibold text-right' style={{color: currentColor}}>
                                <p> Full name </p>
                                <p> Level </p>
                                <p> Email </p>
                                <p> Phone </p>
                                <p> Native Language </p>
                                <p> Address </p>
                                <p> State </p>
                                <p> Post Code </p>
                            </div>

                            <div className='col-span-3 col-start-3 font-small text-left'>
                                <p> {thisStudent?.firstName && thisStudent?.lastName ? thisStudent?.firstName + ' ' + thisStudent?.lastName : 'No record'} </p>
                                <p> {thisStudent?.level ? thisStudent?.level : 'No record'} </p>
                                <p> {thisStudent?.grade ? thisStudent?.grade : 'No record'} </p>
                                <p> {thisStudent?.phone ? thisStudent?.phone : 'No record'} </p>
                                <p> {thisStudent?.nativeLanguage ? thisStudent?.nativeLanguage : 'No record'} </p>
                                <p> {thisStudent?.address ? thisStudent?.address : 'No record'} </p>
                                <p> {thisStudent?.state ? thisStudent?.state : 'No record'} </p>
                                <p> {thisStudent?.code ? thisStudent?.code : 'No record'} </p>
                            </div>
                        </div>
                    </div>

                    <div className='col-start-4 col-span-5'>
                        <GridComponent selectedRowIndex={0} dataSource={students} rowSelected={(rowData) => handleRowSelect(rowData)} rowDeselected={() => handleRowDeselect()}>
                            <ColumnsDirective>
                                {studentGrid.map((item, index) => (
                            <ColumnDirective key={index} {...item} />
                            ))}
                            </ColumnsDirective>
                            <Inject services={[Selection, Edit, Sort, ContextMenu]}/>
                        </GridComponent>
                    </div>
                </div>

                <div className='grid grid-cols-4 gap-8'>
                    <div className='col-start-1 col-span-1 shadow-lg bg-white mt-5 p-4 flex flex-col justify-evenly'>
                        <h2 className='text-xl font-semibold mb-3'> Options </h2>
                        {/* <button className="py-2 px-4 rounded-md flex justify-between w-full hover:shadow-md" onClick={() => handleActiveExpand()} style={{backgroundColor: currentColor, color: 'white'}}>
                            <p className='font-semibold'> See Student Class Information </p>
                                <div className='text-2xl mr-2'>
                                    <MdInfoOutline/>
                                </div>
                        </button> */}

                        <button class="py-2 px-4 rounded-md flex justify-between w-ful hover:shadow-mdl" onClick={() => handleAdd()} style={{backgroundColor: currentColor, color: 'white'}}>
                                <p className='font-semibold'> Add New Student </p>
                                <div className='text-2xl mr-2'>
                                    <MdOutlinePersonAddAlt/>
                                </div>
                        </button>

                        <button class="py-2 px-4 rounded-md flex justify-between w-full hover:shadow-md" onClick={() => handleEdit()} style={{backgroundColor: currentColor, color: 'white'}}>
                                <p className='font-semibold'> Edit Student </p>
                                <div className='text-2xl mr-2'>
                                    <MdOutlineModeEdit/>
                                </div>            
                        </button>

                        <button class="py-2 px-4 rounded-md flex justify-between mb-2 w-full hover:shadow-md" onClick={() => handleDelete()} style={{backgroundColor: currentColor, color: 'white'}}>
                            <p className='font-semibold'> Delete Student </p>
                                <div className='text-2xl mr-2'>
                                    <MdOutlineGrade/>
                                </div>
                        </button>
                    </div>

                    <div className='col-start-2 col-span-1 shadow-lg bg-white mt-5 p-4 flex flex-col justify-evenly '>
                        <div className='flex justify-between'>
                            <h2 className='text-xl font-semibold mb-3'> Homework </h2>
                            <h2 className='font-semibold'> Active </h2>
                        </div>
                         

                        <button class="py-2 px-4 rounded-md flex justify-between w-full hover:shadow-md" onClick={() => handleSeeLatest()} style={{backgroundColor: '#097CD3', color: 'white'}}>
                                <p className='font-semibold'> See Latest </p>
                                <div className='text-2xl mr-2'>
                                    <MdTextSnippet/>
                                </div>            
                        </button>

                        <button class="py-2 px-4 rounded-md flex justify-between w-full hover:shadow-md" onClick={() => handleAddHomework()} style={{backgroundColor: '#097CD3', color: 'white'}}>
                                <p className='font-semibold'> Set New </p>
                                <div className='text-2xl mr-2'>
                                    <MdOutlineAssignment/>
                                </div>            
                        </button>

                        <button class="py-2 px-4 rounded-md flex justify-between w-full hover:shadow-md" onClick={() => handleSeeAllHomework()} style={{backgroundColor: '#097CD3', color: 'white'}}>
                                <p className='font-semibold'> See All </p>
                                <div className='text-2xl mr-2'>
                                    <MdFolder/>
                                </div>            
                        </button>
                        
                    </div>

                    <div className='col-start-3 col-span-1 shadow-lg bg-white mt-5 p-4'>
                        <h2 className='text-xl font-semibold mb-3'> Grades </h2>
                        <div className='mb-6'>
                            <SparklineComponent id='sparkline' height='100px' width='100%' dataSource={[
                                { x: 0, xval: '2005', yval: 20090440 },
                                { x: 1, xval: '2006', yval: 20264080 },
                                { x: 2, xval: '2007', yval: 20434180 },
                                { x: 3, xval: '2008', yval: 21007310 },
                                { x: 4, xval: '2009', yval: 21262640 },
                                { x: 5, xval: '2010', yval: 21515750 },
                                { x: 6, xval: '2011', yval: 21766710 },
                                { x: 7, xval: '2012', yval: 22015580 },
                                { x: 8, xval: '2013', yval: 22262500 },
                                { x: 9, xval: '2014', yval: 22507620 },
                                ]} xName='xval' yName='yval'>
                            </SparklineComponent>
                        </div>

                        <button class="py-2 px-4 rounded-md flex justify-between mb-2 w-full hover:shadow-md" onClick={() => handleOpenGrades()} style={{backgroundColor: currentColor, color: 'white'}}>
                            <p className='font-semibold'> Student Grades </p>
                                <div className='text-2xl mr-2'>
                                    <MdOutlineGrade/>
                                </div>
                        </button>
                    </div>

                    <div className='col-start-4 col-span-1 shadow-lg bg-white mt-5 p-4'>
                        <h2 className='text-xl font-semibold mb-3'> Payments </h2>
                    </div>
                </div>
            </div>
        </div>
            <AnimatePresence intial={false} exitBeforeEnter={true} onExitComplete={(() => null)}>
                {openGrades && <StudentGrades selectedStudent={selectedStudent} openGrades={openGrades} setOpenGrades={setOpenGrades} currentColor={currentColor}/>}

                {activeAddStudent && 
                    <AddStudent setActiveAddStudent={setActiveAddStudent} currentEdit={currentEdit} selectedStudent={selectedStudent} currentColor={currentColor}/>     
                }

                {activeExpand &&
                    <ExpandStudent selectedStudent={selectedStudent} setActiveExpand={setActiveExpand} currentColor={currentColor}/>
                }

                {activeCredentials &&
                    <ChangeCredentials id={selectedStudent} type={"STUDENT"} setActiveCredentials={setActiveCredentials}/>
                }

                {openAddHomework &&
                    <AddHomework selectedStudent={selectedStudent} currentEdit={currentEdit} currentColor={currentColor} setOpenAddHomework={setOpenAddHomework}/>
                }

                {openLatestHomework &&
                    <ShowLatestHomework selectedStudent={selectedStudent} currentColor={currentColor} setOpenLatestHomework={setOpenLatestHomework}/>
                }

                {openAllHomework &&
                    <SeeAllHomeworks selectedStudent={selectedStudent} currentColor={currentColor} setOpenAllHomework={setOpenAllHomework}/>
                }
            </AnimatePresence>
        </div>
  )
}

export default Students