import React, { useEffect, useState, useContext } from "react";
import { doc, onSnapshot } from 'firebase/firestore';

import { authProvider } from "../../Providers/AuthProvider";
import { firestore } from "../../Firebase/FirebaseConfig";

import { statisticsCardsData } from "../../Data/DataStatic";
import StatisticsCard from "../components/StaticCard";
import { MembersTable } from "../components/Table";

function Home() {
    const { userDetail } = useContext(authProvider);

    const [activeTab, setActiveTab] = useState("CasualLeave");

    // count of leave per month
    const [medicalLeave, setMedicalLeave] = useState(0);
    const [casualLeave, setCasualLeave] = useState(0);
    const [lossOfPay, setLossOfPay] = useState(0);
    const [permission, setPermission] = useState(0);
    const [vacationLeave, setVacationLeave] = useState(0);
    const LeaveList = [medicalLeave, lossOfPay, vacationLeave, permission, casualLeave];

    // graph construction data
    const [tableData, setTableData] = useState(null);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    // delection function
    function newValueSetter() {
        setMedicalLeave(0);
        setCasualLeave(0);
        setLossOfPay(0);
        setVacationLeave(0);
        setPermission(0);
        setTableData(null);
    }

    useEffect(() => {
        const unsub = (collegeID) => onSnapshot(doc(firestore, "leaveRecord", collegeID), (doc) => {
            // it clears all the old data
            newValueSetter();
            // data set calculation
            if (doc.data != null) {
                const data = doc.data();
                setTableData(data);
                for (let dateTime in data) {
                    const year = new Date(dateTime).getFullYear();
                    const month = new Date(dateTime).getMonth() + 1;
                    // console.log(year,month,currentYear,currentMonth);
                    if (year == currentYear && month == currentMonth) {
                        switch (data[dateTime].type) {
                            case "CasualLeave":
                                // console.log(data[dateTime]);
                                setCasualLeave((prev) => prev += 1);
                                break;
                            case "MedicalLeave":
                                // console.log(data[dateTime]);
                                setMedicalLeave((prev) => prev += 1);
                                break;
                            case "VacationLeave":
                                // console.log(data[dateTime]);
                                setVacationLeave((prev) => prev += 1);
                                break;
                            case "LossOfPay":
                                // console.log(data[dateTime]);
                                setLossOfPay((prev) => prev += 1);
                                break;
                            case "Permission":
                                // console.log(data[dateTime]);
                                setPermission((prev) => prev += 1);
                                break;
                        };
                    }
                }
            } else {
                console.lof("Data doesn't exists");
            }
        });
        return () => unsub(userDetail.collegeID);
    }, []);

    return (
        <>
            <div className="mb-12 mt-10 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                {statisticsCardsData.map(({ icon, title, color }, index) => (
                    <StatisticsCard
                        key={title}
                        color={color}
                        title={title}
                        value={LeaveList[index]}
                        icon={React.createElement(icon, {
                            className: "w-6 h-6 text-white",
                        })}
                    />
                ))}
            </div>
            <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 ">
                <MembersTable dataList={tableData || {}} userName={userDetail.name} />
            </div>
        </>
    )

}

export default Home