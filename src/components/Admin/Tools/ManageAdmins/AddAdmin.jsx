import React, {useState, useEffect} from 'react'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import {MdOutlineCancel} from 'react-icons/md'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'

import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';

import {motion} from 'framer-motion'
import Backdrop from '../../../Backdrop'

import { createAdmin, updateAdmin } from '../../../../redux/actions/admins'



const AddAdmin = ({setActiveAddAdmin, activeAddAdmin, currentEdit, currentId}) => {
  const admin = useSelector((state) => currentId ? state.admins.find((a) => a._id === currentId) : null)
  const dispatch = useDispatch();
  const [adminData, setAdminData] = useState(
    {image: '', firstName: '', lastName: '', position: '', dob: new Date(), phone: '', email: '', address: '', state: '', code: '', password: '', confirmPassword: ''}
  )
  
  useEffect(() => {
    if(admin) setAdminData(admin)
  }, [admin])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(currentEdit) {
      
      dispatch(updateAdmin(currentId, adminData))
    } else {
      dispatch(createAdmin(adminData))
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

  const uploadImage = async (file) => {
    const base64image = await convertBase64(file)
    setAdminData({...adminData, image: base64image})
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.onloadend = () => {
        resolve(fileReader.result)
      }
      fileReader.readAsDataURL(file)

      fileReader.onerror = () => {
        reject(error)
      }

    })
  }

  return (
    <Backdrop>
        <motion.div animate="visible" initial="hidden" exit="exit" variants={dropIn} onClick={(e) => e.stopPropagation()}>


         <div className='px-5 z-10'>
          <div className='w-full bg-white rounded-lg shadow-lg p-4'>
                <div className='mb-5 flex justify-between items-center'>
                <h1 className='text-2xl'> {`${currentEdit ? 'Edit' : 'Add New'}  Administrator `} </h1>

                  <TooltipComponent content="Menu" position='BottomCenter'>
                    <button type="button" onClick={() => {setActiveAddAdmin(prev => !prev)}} 
                      className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block">
                      <MdOutlineCancel/>
                    </button>
                  </TooltipComponent>
                </div>

              <form onSubmit={(e) => handleSubmit(e)} >
                <div className='grid grid-cols-4 gap-3'>
                  <div className='col-span-2'>
                    <label htmlFor="firstName"> First Name </label>
                    <input value={adminData.firstName} type="text" id="firstName" onChange={(e) => {setAdminData({...adminData, firstName: e.target.value})}} className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'/>
                  </div>

                  <div className='col-start-3 col-span-2'>
                    <label htmlFor="lastName"> Last Name </label>
                    <input value={adminData.lastName} type="text" id="lastName" onChange={(e) => {setAdminData({...adminData, lastName: e.target.value})}} className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'/>
                  </div>

                  

                  <div className=' col-start-2 col-span-1'>
                    <label htmlFor="nationality"> Position </label>
                    <input value={adminData.position} id="nationality" onChange={(e) => {setAdminData({...adminData, position: e.target.value})}} type="text" className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'/>
                  </div>

                  <div className=' col-start-3 col-span-1'>
                    <label htmlFor="phone"> Phone </label>
                    <input value={adminData.phone} id="phone" onChange={(e) => {setAdminData({...adminData, phone: e.target.value})}} type="text" className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'/>
                  </div>

                  <div className=' col-start-4 col-span-1'>
                    <label htmlFor="email" > Email </label>
                    <input value={adminData.email} id="email" onChange={(e) => {setAdminData({...adminData, email: e.target.value})}} type="text" className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'/>
                  </div>

                  <div className=' col-start-1 col-span-2'>
                    <label htmlFor="address" > Address </label>
                    <input value={adminData.address} id="address" onChange={(e) => {setAdminData({...adminData, address: e.target.value})}} type="text" className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'/>
                  </div>

                  <div className='col-start-3 col-span-1 relative'>
                        <label htmlFor="state"> State </label>
                        <select defaultValue={"default"} id="state" onChange={(e) => setAdminData({...adminData, state: e.target.value})} className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>
                          <option value={"default"} disabled>
                            Choose an option
                          </option>
                        <option value={'CDMX'} key={'CDMX'}> CDMX </option>
                        <option value={'Estado de Mexico'} key={'Estado de Mexico'}> Estado de Mexico </option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                  </div>

                  <div className=' col-start-4 col-span-1'>
                    <label htmlFor="code"> Post Code </label>
                    <input value={adminData.code} id="code" onChange={(e) => {setAdminData({...adminData, code: e.target.value})}} type="text" className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'/>
                  </div>

                  <div className=' col-start-1 col-span-1'>
                    <label> UPLOAD IMAGE SOMEHOW FUCK </label>
                    <input type="file" onChange={(e) => uploadImage(e.target.files[0])}/>
                  </div>

                 
                  <div className="col-start-2 col-span-1 justify-center items-center appearance-none flex w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <label className='mr-5 text-center'> Date of Birth </label>
                    <DatePickerComponent id='datepicker' placeholder='Enter Date' change={(data) => setAdminData({...adminData, dob: data.value})}/>
                  </div>
                  
 
                  <div className=' col-start-3 col-span-1'>
                    <label htmlFor="code"> Password </label>
                    <input value={adminData.password} id="code" onChange={(e) => {setAdminData({...adminData, password: e.target.value})}} type="text" className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'/>
                  </div>

                  <div className=' col-start-4 col-span-1'>
                    <label htmlFor="code"> Confirm Password </label>
                    <input value={adminData.confirmPassword} id="code" onChange={(e) => setAdminData({...adminData, confirmPassword: e.target.value})} type="text" className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'/>
                  </div>

                  <div className='col-start-1 col-span-1 flex justify-evenly flex-col'>
                    <button type="submit" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mt-10">
                      <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                      <span>{`${currentEdit ? 'EDIT' : 'ADD'} ADMINISTRATOR` }</span>
                    </button> 
                  </div>
              </div>
              </form>
            </div>
      </div>
   
      </motion.div>
    </Backdrop>
    
       
    
  )
}

export default AddAdmin