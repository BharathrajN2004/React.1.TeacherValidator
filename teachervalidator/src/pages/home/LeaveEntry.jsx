import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { doc, onSnapshot, getDocs, collection, setDoc } from 'firebase/firestore';
import { firestore } from '../../Firebase/FirebaseConfig';
import {
    Input,
    Button,
    Typography,
    Textarea
} from "@material-tailwind/react";


function LeaveEntry() {

    const location = useLocation();
    const header = location.state;
    let leaveType = header.replace(" ", "");
    if (leaveType == "Leaveon loss of Pay") {
        leaveType = "LossOfPay";
    }

    const date = new Date().toISOString();
    const [count, setCount] = useState(0);
    const [id, setId] = useState(null);
    const [userData, setUserData] = useState(null);
    const [reason, setReason] = useState('');

    useEffect(() => { setId(null); setUserData(null); setCount(0); }, [header]);

    async function fetchData() {
        if (id) {
            const docs = await getDocs(collection(firestore, "users"));
            docs.docs.forEach((value) => {
                const userData = value.data();
                if (userData.collegeID == id) {
                    setUserData(userData);
                }
            });

            const unsub = onSnapshot(doc(firestore, "leaveRecord", id), (doc) => {
                setCount(0);
                if (doc.exists()) {
                    const data = doc.data();
                    if (data != null) {
                        for (const isoDate in data) {
                            if (data.hasOwnProperty(isoDate)) {
                                const entry = data[isoDate];
                                if (entry.type === leaveType) {
                                    setCount((prev) => prev += 1);
                                }
                            }
                        }
                    }
                } else {
                    console.log("Data doesn't exist");
                }
            });
        }
    }

    async function validate() {
        if (reason != "") {
            try {
                const leaveRef = doc(firestore, 'leaveRecord', userData.collegeID);
                const data = { [date]: { "type": leaveType, "reason": reason } };
                await setDoc(leaveRef, data, { merge: true });
                setId(null); setUserData(null); setCount(0);
            } catch (error) {
                console.error('Error adding leave data:', error);
            }
        } else {
            alert("Enter the reason");
        }
    }

    return (
        <div className="p-3 flex flex-col justify-center items-center gap-2">
            <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2 font-medium mt-4"
            >
                {header}
            </Typography>
            <div className="flex flex-row items-end justify-between gap-4 mt-4">
                <div>
                    <Input type="text" label="College ID" value={id == null ? "" : id} onChange={(event) => setId(event.target.value)} />
                </div>
                <Button onClick={() => fetchData()}>
                    Generate
                </Button>
            </div>
            {userData != null &&
                <div className="flex flex-wrap justify-center items-center gap-4 mt-4 w-full px-4">
                    <div className="w-2/6 flex flex-col items-center">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-2 font-normal opacity-50"
                        >
                            Name:
                        </Typography>
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="mb-2 font-medium  transition-all hover:text-purple-200 hover:opacity-100"
                        >
                            {userData.name}
                        </Typography>
                    </div>

                    <div className="w-2/6  flex flex-col items-center ">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-2 font-normal opacity-50"
                        >
                            Access:
                        </Typography>
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="mb-2 font-medium  transition-all hover:text-orange-200 hover:opacity-100"
                        >
                            {userData.access} of {userData.department}
                        </Typography>
                    </div>
                </div>
            }
            {userData != null &&
                <div className='w-1/3'>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-normal opacity-50"
                    >
                        Reason
                    </Typography>
                    <Textarea color="blue" value={reason} onChange={(value) => setReason(value.target.value)} label="Content for Request" />
                </div>
            }
            {userData != null &&
                <div className="flex flex-row items-center justify-center gap-2 mt-4 w-full px-6">
                    <Typography
                        variant="h6"
                        color="blue-gray"
                        className="mb-2 font-medium opacity-50"
                    >
                        There are
                    </Typography>
                    <Typography
                        variant="h4"
                        color="blue-gray"
                        className="mb-2 font-medium"
                    >
                        {3 - count}
                    </Typography>
                    <Typography
                        variant="h6"
                        color="blue-gray"
                        className="mb-2 font-medium opacity-50"
                    >
                        {header} remaining
                    </Typography>
                    <Button onClick={() => validate()} className={`ml-4  ${!(3 - count > 0) && "bg-blue-gray-200 shadow-none hover:shadow-none"} `} disabled={!(3 - count > 0)}>
                        {(3 - count > 0) ? "Validate" : "NO Validation"}
                    </Button>
                </div>
            }
        </div>
    )
}

export default LeaveEntry







