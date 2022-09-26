import React, {useEffect, useState} from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { FiSettings } from 'react-icons/fi'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import { useSelector } from 'react-redux/es/exports'
import { useDispatch } from 'react-redux'
import {Navbar, Footer, SidebarTeacher, ThemeSettings} from './components'



import './App.css'
import { setThemeSettingsAction } from './redux/actions/appState'


import TeacherProfile from './pages/Teachers/Dashboard/TeacherProfile'
import MyStudents from './pages/Teachers/MyStudents/MyStudents'
import MyClasses from './pages/Teachers/MyClasses/MyClasses'
import MyPayroll from './pages/Teachers/MyPayroll/MyPayroll'
import TeacherOverview from './pages/Teachers/Dashboard/TeacherOverview'

const Empty = () => {
  return (
    <div>
      Empty
    </div>

  )
}


const TeacherRoute = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [login, setLogin] = useState(true)
  const  [user, setUser] = useState(null)
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
      <div className="w-72 fixed sidebar dar:bg-secondary-dark-bg bg-white">
        <SidebarTeacher/>
      </div>

    ) : (
      <div className="w-0 dark-mode:bg-secondary-dark-bg">
        <SidebarTeacher/>
      </div>
    )}
    <div className={ 
      `dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${activeMenu 
      ? "md:ml-72" : "flex-2"}`}>
      <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
        <Navbar user={user} setUser={setUser}/>
      </div>
    
    
    <div>
      {themeSettings && <ThemeSettings/>}

      <Routes>
        {/* Dashboard */}
        <Route path="/overview" element={<TeacherOverview/>}/> 
        <Route path="/teacherprofile" element={<TeacherProfile/>}/> 
  
        {/* Monitor */}
        <Route path="/mystudents" element={<MyStudents/>}/>
        <Route path="/myclasses" element={<MyClasses/>}/>
        <Route path="/mypayroll" element={<MyPayroll/>}/>
      </Routes>
      </div>
    </div>
  </div> 
  : 
  <div> NO USER </div>}
      
      
  </div>
  )
}

export default TeacherRoute