import React, {useEffect, useState} from 'react'
import {Routes, Route, useNavigate } from 'react-router-dom'
import { FiSettings } from 'react-icons/fi'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import { useSelector } from 'react-redux/es/exports'
import { useDispatch } from 'react-redux'
import {Navbar, ThemeSettings} from './components'
import SidebarAdmin from './components/SidebarAdmin'


import './App.css'
import { setThemeSettingsAction } from './redux/actions/appState'

import Classes from './pages/Admin/Monitor/Classes'
import Teachers from './pages/Admin/Monitor/Teachers'
import Students from './pages/Admin/Monitor/Students'
import AdminProfile from './pages/Admin/Dashboard/AdminProfile'
import Overview from './pages/Admin/Dashboard/Overview'
import Center from './pages/Admin/Financials/Center'

const Empty = () => {
  return (
    <div>
      Empty
    </div>

  )
}


const AdminRoute = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [login, setLogin] = useState(JSON.parse(localStorage.getItem("profile")))
  const [user, setUser] = useState(null)
  const currentMode = useSelector(state => state.appState.currentMode)
  const currentColor = useSelector(state => state.appState.currentColor)
  const themeSettings = useSelector(state => state.appState.themeSettings)
  const activeMenu = useSelector(state => state.appState.activeMenu)



  useEffect(() => {
    const token = user?.token
    
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [])


  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      {true ?
      <div className="flex relative dark:bg-main-dark-bg">
      <div className="fixed right-4 bottom-4" style={{zIndex: '1000'}}>
      <TooltipComponent content="Settings" position='Top'>
        <button type="button" className='text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white' style={{background: currentColor, borderRadius: '50%'}} onClick={() => dispatch(setThemeSettingsAction(true))}>
          <FiSettings/>
        </button>
      </TooltipComponent>
    </div>
    {activeMenu ? (
      <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
        <SidebarAdmin/>
      </div>

    ) : (
      <div className="w-0 dark-mode:bg-secondary-dark-bg">
        <SidebarAdmin/>
      </div>
    )}

    <div className={ 
      `dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${activeMenu 
      ? "md:ml-72" : "flex-2"}`}>
      <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full '>
        <Navbar user={user} setUser={setUser}/>
      </div>
    <div>
      
      {themeSettings && <ThemeSettings/>}

      <Routes>
        {/* Dashboard */}
        <Route path="/overview" element={<Overview/>}/> 
        <Route path="/adminprofile" element={<AdminProfile/>}/> 
  
        {/* Monitor */}
        <Route path="/students" element={<Students/>}/>
        <Route path="/teachers" element={<Teachers/>}/>
        <Route path="/classes" element={<Classes/>}/>

        {/* Financials*/}
        
        <Route path="/financialcenter" element={<Center/>}/>
        <Route path="/incoming" element={<Empty/>}/>
        <Route path="/outgoing" element={<Empty/>}/>
      </Routes>
      </div>
    </div>
  </div> 
  : 
  <div> NO USER </div>}
      
      
  </div>
  )
}

export default AdminRoute