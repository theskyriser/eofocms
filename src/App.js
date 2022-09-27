import React from 'react'
import {Routes, Route, Navigate, HashRouter } from 'react-router-dom'

import { useSelector } from 'react-redux/es/exports'
import { useDispatch } from 'react-redux'
import Auth from './pages/Auth'

import './App.css'

import AdminRoute from './AdminRoute'
import TeacherRoute from './TeacherRoute'


const App = () => {
  const currentMode = useSelector(state => state.appState.currentMode)


  const user = JSON.parse(localStorage.getItem("profile"))


  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <HashRouter>
          <Routes>
            <Route path="/auth" element={
              !user ? <Auth/>  
              : user?.result?.accountType === 'ADMIN' ? <Navigate to="/admin/adminprofile"/> :
              user?.result?.accountType === 'TEACHER' ? <Navigate to ="/teacher/teacherprofile"/> :
            <Navigate to="/"/>}/>
            <Route path= "/admin/*" element={user ? <AdminRoute/> : <Navigate to="/auth/"/>} />
            <Route path= "/teacher/*" element={user ? <TeacherRoute/> : <Navigate to="/auth/"/>} />
            <Route path= "/" element={<Navigate to="/auth" />}/>
          </Routes>
        
    </HashRouter> 
  </div>
  )
}

export default App