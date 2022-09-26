import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTeachers } from '../../../../../redux/actions/teachers'

const AttendanceCard = ({handleClick, singleClass, session}) => {

    const dispatch = useDispatch()
    const teachers = useSelector(state => state.teachers)
    const coor = teachers.filter(teacher => teacher._id === singleClass?.coOrdinator)

    
    useEffect(() => {
        dispatch(getTeachers())
    }, [dispatch])



  return (
        <div>
            <button type="button" className={`text-left ${session.cancelled !== '' ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-200 hover:bg-gray-300'} shadow-md rounded-lg p-3 hover:bg-gray-300 hover:shadow-xl text-center w-full`} onClick={(e) => handleClick(e, session._id)}> 
                    <div>
                            <h1 className='font-extrabold mb-1 text-xl'> GROUP: {singleClass?.group} </h1>
                            <h2 className='font-bold mb-2 text-lg'> Date: {session?.date.slice(0, 10)} </h2>
                            
                            <h3 className='font-semibold text-md'> Coodinator:  {coor[0]?.firstName} {coor[0]?.lastName}</h3>
                            <h3 className='font-semibold mb-1 text-md'> </h3>
                    </div>

                    <div>
                            <p className='mb-1'>  Level: {singleClass?.level} </p>

                            <p className='mb-1'>  Client: {singleClass?.client} </p>

                            <p className='mb-1'> Starts: {session?.startTime.slice(11, 19)} </p>

                            <p className='mb-1'> Ends: {session?.endTime.slice(11, 19)} </p>

                            <p className='mb-2'> No. Of Students: {singleClass?.students.length} </p>

                            <p> Attendance Recorded: {session?.attendanceComplete} </p>

                    </div>
                

            </button> 
        </div>
    
  )
}

export default AttendanceCard