import { useState } from "react";
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


function LeaveRequest({ email, name, collegeID }) {
  const [leaveType, setLeaveType] = useState('Permission');
  const [startDate, setstartDate] = useState(new Date);
  const [endDate, setendDate] = useState(new Date);
  const [message, setMessage] = useState('');
  const submit = () => {
    if (startDate && endDate && message != '') {
      const date = new Date;
      requestAdd(email, leaveType, date.toISOString().slice(0, 10), startDate, endDate, message, name, collegeID);
      setstartDate(new Date);
      setendDate(new Date);
      setMessage('');
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
                <input id="endDate" type="date" value={endDate} onChange={(event) => setendDate(event.target.value)} className="w-40 py-2 pl-3 pr-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
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
            <Button className='mt-4 mb-6' onClick={submit}>Request</Button>
          </div>
        </TabsBody>
      </Tabs>
    </div>
  )
}

export default LeaveRequest