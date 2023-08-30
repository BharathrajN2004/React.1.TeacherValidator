import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { authProvider } from "../Providers/AuthProvider";
import Home from './home/Home'
import LeaveEntry from './home/LeaveEntry'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import Requests from './home/Requests'
import LeaveRequest from './home/LeaveRequest'
import ViewOthersData from './home/ViewOthersData'

function Routing() {
    const { userDetail } = useContext(authProvider);

    return (
        <div className="min-h-screen max-w-full bg-blue-gray-50/50">
            <SideBar access={userDetail.access} />
            <div className="p-4 ml-60">
                <NavBar />
                <div className="m-6">
                    <Routes>
                        {userDetail.access != "Principal" && <Route exact path='/user/home' element={<Home />} />}
                        <Route exact path='/user/leaveEntry' element={<LeaveEntry />} />
                        {userDetail.access != "Principal" && <Route exact path='/user/leaveRequest' element={<LeaveRequest collegeID={userDetail.collegeID} email={userDetail.email} name={userDetail.name} />} />}
                        <Route exact path='/user/viewData' element={<ViewOthersData />} />
                        <Route exact path='/user/requests' element={<Requests />} />
                        <Route path='/*' element={<Navigate to={userDetail.access == "Principal" ? "/user/viewData" : '/user/home'} replace />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Routing
