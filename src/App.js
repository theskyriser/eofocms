import React, {useEffect} from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { useSelector } from 'react-redux/es/exports'
import { useDispatch } from 'react-redux'
import Auth from './pages/Auth'

import './App.css'

import AdminRoute from './AdminRoute'
import TeacherRoute from './TeacherRoute'


const App = () => {

  const dispatch = useDispatch()
  const currentMode = useSelector(state => state.appState.currentMode)
  const currentColor = useSelector(state => state.appState.currentColor)
  const themeSettings = useSelector(state => state.appState.themeSettings)
  const activeMenu = useSelector(state => state.appState.activeMenu)
  const authLogin = useSelector(state => state.authReducer.authLogin)

  const user = JSON.parse(localStorage.getItem("profile"))

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
      
          <Routes>
            <Route path="/auth" element={
              !user ? <Auth/>  
              : user?.result?.accountType === 'ADMIN' ? <Navigate to="/admin/adminprofile"/> :
              user?.result?.accountType === 'TEACHER' ? <Navigate to ="/teacher/teacherprofile"/> :
            <Navigate to="/auth"/>}/>
            <Route path= "/" element={<Navigate to="/auth" />}/>
            <Route path= "/admin/*" element={user ? <AdminRoute/> : <Navigate to="/auth/"/>} />
            <Route path= "/teacher/*" element={user ? <TeacherRoute/> : <Navigate to="/auth/"/>} />
          </Routes>
        
    </BrowserRouter> 
  </div>
  )
}

export default App