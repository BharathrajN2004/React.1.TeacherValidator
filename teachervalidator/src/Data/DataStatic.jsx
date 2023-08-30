import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import PublicIcon from '@mui/icons-material/Public';
import TimelapseRoundedIcon from '@mui/icons-material/TimelapseRounded';
import DeveloperBoardRoundedIcon from '@mui/icons-material/DeveloperBoardRounded';


export const TabFields = [
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

export const statisticsCardsData = [
    {
        color: "green",
        icon: MonitorHeartIcon,
        title: "Medical Leave",

    },
    {
        color: "pink",
        icon: MoneyOffIcon,
        title: "Loss Of Pay",

    },
    {
        color: "blue",
        icon: PublicIcon,
        title: "Vacation Leave",

    },
    {
        color: "yellow",
        icon: TimelapseRoundedIcon,
        title: "Permission",

    },
    {
        color: "orange",
        icon: DeveloperBoardRoundedIcon,
        title: "Casual Leave",

    },
];