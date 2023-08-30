import { useState, useEffect } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  Textarea,
  Typography,
  Button
} from "@material-tailwind/react";
import { requestAdd } from '../../Firebase/requestAdd';
import { doc, onSnapshot } from 'firebase/firestore';
import { firestore } from "../../Firebase/FirebaseConfig";



function LeaveRequest({ email, name, collegeID }) {
  const dateObject = new Date();

  // Extract year, month, and day from the Date object
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Adding 1 to month since it's zero-based
  const day = String(dateObject.getDate()).padStart(2, '0');

  // Format the date in "yyyy-MM-dd" format
  const formattedDate = `${year}-${month}-${day}`;

  const [leaveType, setLeaveType] = useState('Permission');
  const [leaveCount, setLeaveCount] = useState(0);
  const [fulldata, setFullData] = useState(null);
  const [startDate, setstartDate] = useState(formattedDate);
  const [endDate, setendDate] = useState(formattedDate);
  const [message, setMessage] = useState('');
  const date = new Date();

  useEffect(() => {
    const unsub = () => onSnapshot(doc(firestore, "leaveRecord", collegeID), (doc) => {
      if (doc.data != null) {
        const data = doc.data();
        setFullData(data);
      } else {
        console.lof("Data doesn't exists");
      }
    });
    return () => unsub();
  }, [collegeID]);

  useEffect(() => {
    setLeaveCount(0);
    for (const isoDate in fulldata) {
      if (fulldata.hasOwnProperty(isoDate)) {
        const entry = fulldata[isoDate];
        const date = new Date(isoDate);
        if (entry.type == leaveType) {
          if (date.getMonth() == new Date(startDate).getMonth() || date.getMonth() == new Date(endDate).getMonth()) {
            setLeaveCount((prev) => prev += 1);
          }
        }
      }
    }
  }, [fulldata, leaveType, startDate, endDate]);


  const submit = () => {
    if (startDate && endDate && message != '') {
      if (new Date(startDate) <= new Date(endDate)) {
        const date = new Date;
        const canValidate = 3 - leaveCount > 0;
        requestAdd(email, leaveType, date.toISOString().slice(0, 10), startDate, endDate, message, name, collegeID, canValidate);
        setstartDate(formattedDate);
        setendDate(formattedDate);
        setMessage('');
      } else {
        alert("Start date must be less than End date");
      }
    }
    else {
      alert("Kindly enter all the details");
    }
  }
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

  function dateProvider(str, add) {
    const dateObject = new Date(str);

    // Extract year, month, and day from the Date object
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Adding 1 to month since it's zero-based
    const day = String(dateObject.getDate() + add).padStart(2, '0');

    // Format the date in "yyyy-MM-dd" format
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  return (
    <div className="mt-12">
      <Tabs value="Permission">
        <TabsHeader>
          {data.map(({ label, value }) => (
            <Tab key={value} value={value} onClick={() => setLeaveType(value)}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          <div className="h-full flex flex-col justify-center items-center">
            <div className="w-full flex flex-row justify-evenly mt-6 mb-6">
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  htmlFor='startDate'
                  className="mb-2 font-normal opacity-50"
                >
                  Start Date
                </Typography>
                <input id="startDate" type="date" value={startDate} onChange={(event) => setstartDate(event.target.value)} className="w-40 py-2 pl-3 pr-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
              </div>
              <div>
                <Typography
                  variant="small"
                  htmlFor='endDate'
                  color="blue-gray"
                  className="mb-2 font-normal opacity-50"
                >
                  End Date
                </Typography>
                <input id="endDate" type="date" min={startDate} max={dateProvider(startDate, 2 - leaveCount)} value={endDate} onChange={(event) => setendDate(event.target.value)} className="w-40 py-2 pl-3 pr-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
              </div>
            </div>
            <div className='w-1/3'>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-normal opacity-50"
              >
                Message
              </Typography>
              <Textarea color="blue" value={message} onChange={(value) => setMessage(value.target.value)} label="Content for Request" />
            </div>
            <div className='mt-4'>
              <Typography
                variant="small"
                color={3 - leaveCount > 0 ? "blue-gray" : "red"}
                className="mb-2 font-normal opacity-50"
              >
                You have {3 - leaveCount} remaining leave count for the selected month.
              </Typography>
            </div>
            <Button className='mt-2 mb-6' onClick={submit} disabled={leaveCount >= 3 ? true : false}>Request</Button>

          </div>
        </TabsBody>
      </Tabs>
    </div>
  )
}

export default LeaveRequest