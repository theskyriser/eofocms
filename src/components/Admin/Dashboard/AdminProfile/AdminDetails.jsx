import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateAdmin } from '../../../../redux/actions/admins'

const AdminDetails = ({currentColor, adminId}) => {
    const admin = useSelector((state) => adminId ? state.admins.find((a) => a._id === adminId) : null)
    const dispatch = useDispatch()
    const [adminData, setAdminData] = useState(
        {image: '', firstName: '', lastName: '', position: '', dob: new Date(), phone: '', email: '', address: '', state: '', code: '', password: '', confirmPassword: ''}
      )

    useEffect(() => {
        if (admin) {
            setAdminData(admin)
        }
    }, [admin])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateAdmin(adminId, adminData))
    }

    console.log(adminData)
  return (
    <div className='shadow-md bg-slate-50 w-2/3 p-5'>
                    <h2 className='text-2xl'> Account </h2>

                <form autoComplete='off'>
                    <div className='flex justify-between mt-5 items-center'>
                        <label htmlFor='firstName'> First Name </label>
                        <input  defaultValue={adminData.firstName} type="text" id="firstName" onChange={(e) => {setAdminData({...adminData, firstName: e.target.value})}} className='appearance-none block w-2/3 bg-gray-50 text-gray-700 border border-gray-400 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'/>
                    </div>

                    <div className='flex justify-between mt-5 items-center'>
                        <label htmlFor='firstName'> Last Name </label>
                        <input defaultValue={adminData.lastName} type="text" id="firstName" onChange={(e) => {setAdminData({...adminData, lastName: e.target.value})}} className='appearance-none block w-2/3 bg-gray-50 text-gray-700 border border-gray-400 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'/>
                    </div>

                    <div className='flex justify-between mt-5 items-center'>
                        <label htmlFor='firstName'> Email </label>
                        <input  defaultValue={adminData.email} type="text" id="firstName" onChange={(e) => {setAdminData({...adminData, email: e.target.value})}} className='appearance-none block w-2/3 bg-gray-50 text-gray-700 border border-gray-400 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'/>
                    </div>

                    <div className='flex justify-between mt-5 items-center'>
                        <label htmlFor='firstName'> Password </label>
                        <input  defaultValue={adminData.password} type="password" id="firstName" onChange={(e) => {setAdminData({...adminData, password: e.target.value})}} className='appearance-none block w-2/3 bg-gray-50 text-gray-700 border border-gray-400 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'/>
                    </div>

                    <div className='flex justify-between mt-5 items-center'>
                        <label htmlFor='firstName'> Phone </label>
                        <input defaultValue={adminData.phone} type="text" id="firstName" onChange={(e) => {setAdminData({...adminData, phone: e.target.value})}} className='appearance-none block w-2/3 bg-gray-50 text-gray-700 border border-gray-400 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'/>
                    </div>

                    <div className='flex justify-between mt-5 items-center'>
                        <label htmlFor='firstName'> Position </label>
                        <input defaultValue={adminData.position} type="text" id="firstName" onChange={(e) => {setAdminData({...adminData, position: e.target.value})}} className='appearance-none block w-2/3 bg-gray-50 text-gray-700 border border-gray-400 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'/>
                    </div>

                    <div className='flex justify-between mt-5 items-center'>
                        <label htmlFor='firstName'> Address </label>
                        <input defaultValue={adminData.address} type="text" id="firstName" onChange={(e) => {setAdminData({...adminData, address: e.target.value})}} className='appearance-none block w-2/3 bg-gray-50 text-gray-700 border border-gray-400 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'/>
                    </div>

                    <div className='flex justify-between mt-5 items-center'>
                        <label htmlFor='firstName'> State </label>
                        <input defaultValue={adminData.state} type="text" id="firstName" onChange={(e) => {setAdminData({...adminData, state: e.target.value})}} className='appearance-none block w-2/3 bg-gray-50 text-gray-700 border border-gray-400 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'/>
                    </div>

                    <div className='flex justify-between mt-5 items-center'>
                        <label htmlFor='firstName'> PostCode </label>
                        <input defaultValue={adminData.code} type="text" id="firstName" onChange={(e) => {setAdminData({...adminData, code: e.target.value})}} className='appearance-none block w-2/3 bg-gray-50 text-gray-700 border border-gray-400 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'/>
                    </div>

                    <button class="py-2 px-4 mt-5 rounded-md flex justify-between mb-2  hover:shadow-md" onClick={(e) => handleSubmit(e)} style={{backgroundColor: currentColor, color: 'white'}}>
                            <p className='font-semibold'> Submit Changes </p>
                               
                     </button>
                     </form>
            </div>
  )
}

export default AdminDetails