import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'


import Home from './home/Home'
import LeaveEntry from './home/LeaveEntry'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import Requests from './home/Requests'
import LeaveRequest from './home/LeaveRequest'
import ViewOthersData from './home/ViewOthersData'

function Routing({ userDetail }) {
    return (
        <div className="min-h-screen max-w-full bg-blue-gray-50/50">
            <SideBar access={userDetail.access} />
            <div className="p-4 ml-60">
                <NavBar userDetail={userDetail} />
                <div className="m-6">
                    <Routes>
                        <Route path='/' element={<Navigate to='/user/home' replace />} />
                        <Route exact path='/user/home' element={<Home userData={userDetail} />} />
                        <Route exact path='/user/leaveEntry' element={<LeaveEntry />} />
                        <Route exact path='/user/leaveRequest' element={<LeaveRequest email={userDetail.email} name={userDetail.name} collegeID={userDetail.collegeID} />} />
                        <Route exact path='/user/viewData' element={<ViewOthersData />} />
                        <Route exact path='/user/requests' element={<Requests />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Routing
