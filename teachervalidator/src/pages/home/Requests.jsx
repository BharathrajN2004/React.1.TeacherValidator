import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button
} from "@material-tailwind/react";
import { doc, onSnapshot, updateDoc, deleteField, setDoc, FieldValue } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { firestore } from '../../Firebase/FirebaseConfig';
import { Delete } from "@mui/icons-material";

function Requests() {
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
            setNotificationData(dataList);
          } else {
            console.log('Empty request');
          }
        })
      return () => runner();
    }
    return () => getRequest();
  }, [])

  async function Validate(value) {
    const collegeID = value['collegeID'];
    const validation = value['canValidate'];
    const leaveType = value['leaveType'];
    const reason = value['message'];
    const startDate = value['startDate'];
    const endDate = value['endDate'];
    console.log(collegeID, validation, leaveType, reason, startDate, endDate);
    try {
      const recordRef = doc(firestore, 'leaveRecord', collegeID);
      if (validation) {
        for (let date = new Date(startDate); date <= new Date(endDate); date.setDate(date.getDate() + 1)) {
          console.log(date);
          const isoString = date.toISOString();
          const leaveData = { [isoString]: { "type": leaveType, "reason": reason } };
          await setDoc(recordRef, leaveData, { merge: true });
        }
        console.log('leave added successfully.');

        const ref = doc(firestore, 'leaveRecord', 'request');
        const deleteRef = { [collegeID]: deleteField() };
        await updateDoc(ref, deleteRef).then((value) => console.log(value)).catch((error) => console.log(error));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding user:', error);
      return false;
    }
  }

  return (
    <div className=" mt-16 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-2 p-3 capitalize flex flex-row justify-center">
          <Typography variant="h6" color="white" >
            Past Validation Requests
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full table-auto">
            <thead>
              <tr>
                {["Teachers", "Leave Type", "Requested On", "From & To Date", "Reason", "Validate"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {notificationData && notificationData.map((value) => {
                const className = `py-3 px-5 ${notificationData.indexOf(value) === notificationData.length - 1
                  ? ""
                  : "border-b border-blue-gray-50"
                  }`;

                return (
                  <tr key={value[0]}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {value[1]['name']}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {value[1]['collegeID']}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {value[1]['leaveType']}
                      </Typography>
                    </td>

                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {value[1]['date']}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {value[1]['startDate']}
                      </Typography>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {value[1]['endDate']}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        as="a"
                        href="#"
                        className="text-xs font-semibold text-blue-gray-600"
                      >
                        {value[1]['message']}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Button size="sm" className={"border-green-200 "} onClick={() => Validate(value[1])}>
                        Validate
                      </Button>
                    </td>
                  </tr>
                );
              }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Requests;
