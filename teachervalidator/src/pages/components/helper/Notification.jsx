import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { firestore } from '../../../Firebase/FirebaseConfig';
import { MenuItem, MenuList,Typography } from '@material-tailwind/react';
import MenuRequest from './MenuRequest';

function Notification() {
    const [notificationData, setNotificationData] = useState(null);
    useEffect(() => {
        const getRequest = async () => {
            const ref = doc(firestore, 'leaveRecord', 'request');
            const runner =
                onSnapshot(ref, (requestDataSnap) => {
                    if (requestDataSnap.exists) {
                        const requestData = requestDataSnap.data();
                        const mapOfRequestData = new Map(Object.entries(requestData));
                        const dataList = [...mapOfRequestData.entries()];
                        dataList.length>0? setNotificationData(dataList):null;
                    } else {
                        console.log('Empty request');
                    }
                })
            return () => runner();
        }
        return () => getRequest();
    }, [])
    return (
        <MenuList className="w-max border-0">
            {notificationData != null ? notificationData.map((value) =>
                <MenuRequest from={value[1]['name']} request={`Need for ${value[1]['leaveType']}`} time={value[1]['date']} key={value[0]} />
            ) : <MenuItem className="flex items-center gap-3"> <Typography
                variant="small"
                color="blue-gray"
                className="mb-1 font-normal"
            >
                No requests Found
            </Typography></MenuItem>}
        </MenuList>

    )
}

export default Notification