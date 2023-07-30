import React, { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import {
    Typography,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
} from "@material-tailwind/react";
import {
    ClockIcon,
} from "@heroicons/react/24/outline";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import PublicIcon from '@mui/icons-material/Public';
import TimelapseRoundedIcon from '@mui/icons-material/TimelapseRounded';
import DeveloperBoardRoundedIcon from '@mui/icons-material/DeveloperBoardRounded';
import { firestore } from "../../Firebase/FirebaseConfig";

import StatisticsCard from "../components/StaticCard";
import StatisticsChart from "../components/StaticChart";
import chartsConfig from '../components/helper/ChartConfig';
import { Dataset } from "@mui/icons-material";


function Home({ userData }) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [activeTab, setActiveTab] = useState("CasualLeave");
    const [medicalLeave, setMedicalLeave] = useState(0);
    const [casualLeave, setCasualLeave] = useState(0);
    const [lossOfPay, setLossOfPay] = useState(0);
    const [permission, setPermission] = useState(0);
    const [vacationLeave, setVacationLeave] = useState(0);
    const [graphData, setGraphData] = useState({
        'CasualLeave': Object.fromEntries(months.map((month) => [month, 0])),
        'Permission': Object.fromEntries(months.map((month) => [month, 0])),
        'MedicalLeave': Object.fromEntries(months.map((month) => [month, 0])),
        'VacationLeave': Object.fromEntries(months.map((month) => [month, 0])),
        'LossOfPay': Object.fromEntries(months.map((month) => [month, 0]))
    });
    const currentYear = new Date().getFullYear();
    const currentMonth = months[new Date().getMonth()];
    const [dataList, setDataList] = useState(new Map());
    function newValueSetter() {
        setMedicalLeave(0);
        setCasualLeave(0);
        setLossOfPay(0);
        setVacationLeave(0);
        setPermission(0);
        setGraphData({
            'CasualLeave': Object.fromEntries(months.map((month) => [month, 0])),
            'Permission': Object.fromEntries(months.map((month) => [month, 0])),
            'MedicalLeave': Object.fromEntries(months.map((month) => [month, 0])),
            'VacationLeave': Object.fromEntries(months.map((month) => [month, 0])),
            'LossOfPay': Object.fromEntries(months.map((month) => [month, 0]))
        });
        console.log("done",graphData)
    }

    useEffect(() => {
        const fetchLeaveData = async (collegeId) => {
            try {
                // Get the leave report document for the college ID
                const leaveDocRef = doc(firestore, 'leaveRecord', collegeId);
                const start = onSnapshot(leaveDocRef, (leaveDocSnap) => {
                    newValueSetter();
                    if (leaveDocSnap) {
                        if (leaveDocSnap.exists()) {
                            // Leave report document exists, retrieve the data
                            const leaveReportData = leaveDocSnap.data();
                            const leaveDataForYear = leaveReportData[currentYear];
                            const updatedGraphData = { ...graphData };
                            for (const month in leaveDataForYear) {
                                for (const day in leaveDataForYear[month]) {
                                    const dataType = leaveDataForYear[month][day].type;

                                    if (updatedGraphData[dataType] && updatedGraphData[dataType][month] !== undefined) {
                                        if (updatedGraphData[dataType][month] !== undefined) {
                                            updatedGraphData[dataType][month] += 1;
                                        } else {
                                            updatedGraphData[dataType][month] = 1;
                                        }
                                    } else {
                                        console.log('No year data found');
                                    }
                                }
                            }
                            setDataList(()=>{
                                let createMap = new Map;
                                for(const data in updatedGraphData){
                                    createMap.set(data ,Object.values(updatedGraphData[data]).map((value)=>Math.floor(value/2)));
                                }
                                return createMap;
                            })
                            setGraphData(updatedGraphData);
                            if (leaveDataForYear) {
                                const leaveDataForMonth = leaveDataForYear[currentMonth];
                                if (leaveDataForMonth) {
                                    for (const day in leaveDataForMonth) {
                                        const type = leaveDataForMonth[day]['type'];
                                        type == 'Permission' ?
                                            setPermission(before => before + 1) :
                                            type == 'CasualLeave' ?
                                                setCasualLeave(before => before + 1) :
                                                type == 'MedicalLeave' ?
                                                    setMedicalLeave(before => before + 1) :
                                                    type == 'VacationLeave' ?
                                                        setVacationLeave(before => before + 1) : setLossOfPay(before => before + 1);
                                    }
                                } else {
                                    console.log(`No leave data found for month ${currentMonth}`);
                                }
                            } else {
                                console.log(`No leave data found for year ${currentYear}`);
                            }

                        } else {
                            console.log('Leave report document does not exist.');
                        }
                    };
                })
                return () => start();
            } catch (error) {
                console.error('Error fetching leave data:', error);
            }
        };
        fetchLeaveData(userData.collegeID);
        
    }, []);

    const statisticsCardsData = [
        {
            color: "green",
            icon: MonitorHeartIcon,
            title: "Medical Leave",
            value: medicalLeave,
            footer: {
                color: "text-green-500",
                value: "+5",
                label: "than last month",
            },
        },
        {
            color: "pink",
            icon: MoneyOffIcon,
            title: "Loss Of Pay",
            value: lossOfPay,
            footer: {
                color: "text-green-500",
                value: "+5",
                label: "than last month",
            },
        },
        {
            color: "blue",
            icon: PublicIcon,
            title: "Vacation Leave",
            value: vacationLeave,
            footer: {
                color: "text-green-500",
                value: "+5",
                label: "than last month",
            },
        },
        {
            color: "yellow",
            icon: TimelapseRoundedIcon,
            title: "Permission",
            value: permission,
            footer: {
                color: "text-green-500",
                value: "+5",
                label: "than last month",
            },
        },
        {
            color: "orange",
            icon: DeveloperBoardRoundedIcon,
            title: "Casual Leave",
            value: casualLeave,
            footer: {
                color: "text-green-500",
                value: "+5",
                label: "than last month",
            },
        },
    ];
    console.log(dataList.get(activeTab));
    const dailySalesChart = {
        type: "line",
        height: 220,
        series: [
            {
                name: activeTab,
                data:dataList.size!==0? dataList.get(activeTab):[],
            },
        ],
        options: {
            ...chartsConfig,
            colors: ["#fff"],
            stroke: {
                lineCap: "round",
            },
            markers: {
                size: 5,
            },
            xaxis: {
                ...chartsConfig.xaxis,
                categories: months,
            },
        },
    };
    const statisticsChartsData =
    {
        color: "blue",
        title: "Yearly Updates",
        description: "",
        footer: "Live Updates",
        chart: dailySalesChart,
    };

    const data = [
        {
            label: "Permission",
            value: "Permission",
        },
        {
            label: "Casual Leave",
            value: "CasualLeave",
        },
        {
            label: "Medical Leave",
            value: "MedicalLeave",
        },
        {
            label: "Loss Of Pay",
            value: "LossOfPay",
        },
        {
            label: "Vacation Leave",
            value: "VacationLeave",
        },
    ];
    return (
        <>
            <div className="mb-12 mt-10 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
                    <StatisticsCard
                        key={title}
                        {...rest}
                        title={title}
                        icon={React.createElement(icon, {
                            className: "w-6 h-6 text-white",
                        })}
                    // footer={
                    //     <Typography className="font-normal text-blue-gray-600">
                    //         <strong className={footer.color}>{footer.value}</strong>
                    //         &nbsp;{footer.label}
                    //     </Typography>
                    // }
                    />
                ))}
            </div>
            <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 ">
                <Tabs value={activeTab} id="custom-animation">
                    <TabsHeader
                        className="bg-transparent"
                        indicatorProps={{
                            className: "bg-blue-500/10  text-blue-500",
                        }}
                    >
                        {data.map(({ label, value }) => (
                            <Tab key={value} value={value} onClick={() => { setActiveTab(value); console.log(activeTab) }}>
                                {label}
                            </Tab>
                        ))}
                    </TabsHeader>
                    <TabsBody animate={{
                        initial: { y: 250 },
                        mount: { y: 0 },
                        unmount: { y: 250 },
                    }}>
                        <div className="mt-8">
                            <StatisticsChart
                                {...statisticsChartsData}
                                footer={
                                    <Typography
                                        variant="small"
                                        className="flex items-center font-normal text-blue-gray-600"
                                    >
                                        <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                                        {statisticsChartsData.footer}
                                    </Typography>
                                }
                            />
                        </div>
                    </TabsBody>
                </Tabs>
            </div>
        </>
    )

}

export default Home