import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { PencilIcon, UserPlusIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { TabFields } from "../../Data/DataStatic";
import { useEffect, useState } from "react";

const TABLE_HEAD = ["Leave Type", "Date", "Reason"];

export function MembersTable({ dataList, userName }) {
    const [filteredData, setFilteredData] = useState([]);
    const [activeTab, setActiveTab] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [viewAll, setViewAll] = useState(true);

    useEffect(() => {
        setFilteredData([]);
        for (const isoDate in dataList) {
            if (dataList.hasOwnProperty(isoDate)) {
                const entry = dataList[isoDate];
                const date = new Date(isoDate);
                if (viewAll) {
                    setFilteredData((prev) => [...prev, [entry.type, isoDate, entry.reason]]);
                }
                else if (entry.type === activeTab) {
                    if ((startDate != null && date >= new Date(startDate)) && (endDate != null && date <= new Date(endDate))) {
                        setFilteredData((prev) => [...prev, [null, isoDate, entry.reason]]);
                    } else if (startDate == null && endDate == null) {
                        setFilteredData((prev) => [...prev, [null, isoDate, entry.reason]]);
                    }
                }
            }
        }
    }, [viewAll, activeTab, startDate, endDate]);

    const generateAndDownloadPDF = (data, name) => {
        const pdf = new jsPDF();

        // Add content to the PDF
        pdf.text('Leave Data PDF', 10, 10); // Title
        pdf.setFontSize(12);
        // Define the columns for the table
        const columns = data.length == 3 ? ["LeaveType", "Date", "Reason"] : ["Date", "Reason"];

        pdf.autoTable({
            head: [columns],
            body: data,
            startY: 30, // Adjust the starting Y position
        });

        pdf.save(name + "_leave_Data.pdf");
    };

    // Function to generate an Excel file
    function generateExcel(data, name) {
        const ws = XLSX.utils.aoa_to_sheet([data.length == 3 ? ["LeaveType", "Date", "Reason"] : ["Date", "Reason"], ...data]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, name + "_leave_Data.xlsx", { bookType: 'xlsx' });
    }

    function viewAllFun() {
        setActiveTab('');
        setViewAll((prev) => !prev);
    }

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Leave Data
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See all your data
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Button className="flex items-center gap-3 " color={viewAll == true ? "green" : "blue"} size="sm" onClick={() => viewAllFun()}>
                            <MagnifyingGlassIcon className="h-5 w-5" />{!viewAll ? "View All" : "Open Select"}
                        </Button>
                        <Button className="flex items-center gap-3" size="sm" onClick={() => generateExcel(filteredData.map((value) => (value[0] == null ? [new Date(value[1]).toDateString(), value[2]] : [value[0], new Date(value[1]).toDateString(), value[2]])), userName)}>
                            <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Excel
                        </Button>
                        <Button className="flex items-center gap-3" size="sm" onClick={() => generateAndDownloadPDF(filteredData.map((value) => (value[0] == null ? [new Date(value[1]).toDateString(), value[2]] : [value[0], new Date(value[1]).toDateString(), value[2]])), userName)}>
                            <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> PDF
                        </Button>
                    </div>
                </div>

                <div className=" flex flex-col items-center justify-around gap-4 md:flex-row">
                    <section className="flex flex-row gap-5 items-center">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none"
                        >
                            StartDate
                        </Typography>
                        <input className="border-gray-300 py-1 px-3 rounded-md" type="date" onChange={(event) => setStartDate(event.target.value)} />
                    </section>
                    <section className="flex flex-row gap-5 items-center">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none"
                        >
                            EndDate
                        </Typography>
                        <input className="border-gray-300 py-1 px-3 rounded-md" type="date" onChange={(event) => setEndDate(event.target.value)} />
                    </section>
                </div>
                <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
                    {!viewAll &&
                        <Tabs value={activeTab} className="w-full">
                            <TabsHeader>
                                {TabFields.map(({ label, value }) => (
                                    <Tab key={value} value={value} onClick={(event) => setActiveTab(value)}>
                                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </Tabs>}

                </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.slice(viewAll ? 0 : 1).map((head) => (
                                <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map(
                            ([type, isoDate, reason], index) => {
                                const isLast = index === filteredData.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";
                                const date = new Date(isoDate).toDateString();
                                const leaveType = viewAll == true ? type : null;

                                return (
                                    <tr key={isoDate + reason}>
                                        {leaveType != null &&
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {leaveType}
                                                </Typography>
                                            </td>}
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {date}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {reason}
                                            </Typography>
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
            </CardBody>
        </Card >
    );
}