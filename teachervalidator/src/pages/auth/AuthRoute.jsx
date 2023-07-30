import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Login from './Login'
import SignUp from './Signup'

function AuthRoute() {
  return (
    <Routes>
        <Route exact path='/auth/login' element={<Login/>}/>
        <Route exact path='/auth/signup' element={<SignUp/>}/>
        <Route path='/auth' element={<Navigate to='/auth/login' replace/>}/>
    </Routes>
  )
}

export default AuthRoute