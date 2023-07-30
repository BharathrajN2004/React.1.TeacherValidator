import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button
} from "@material-tailwind/react";
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { firestore } from '../../Firebase/FirebaseConfig';

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
                            {value[0].slice(0,10)}
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
                      <Button size="sm" className={"border-green-200 "} >
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
      {/* <Card>
          <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Projects Table
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["companies", "members", "budget", "completion", ""].map(
                    (el) => (
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
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {projectsTableData.map(
                  ({ img, name, members, budget, completion }, key) => {
                    const className = `py-3 px-5 ${
                      key === projectsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;
  
                    return (
                      <tr key={name}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Avatar src={img} alt={name} size="sm" />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {name}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          {members.map(({ img, name }, key) => (
                            <Tooltip key={name} content={name}>
                              <Avatar
                                src={img}
                                alt={name}
                                size="xs"
                                variant="circular"
                                className={`cursor-pointer border-2 border-white ${
                                  key === 0 ? "" : "-ml-2.5"
                                }`}
                              />
                            </Tooltip>
                          ))}
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {budget}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="w-10/12">
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600"
                            >
                              {completion}%
                            </Typography>
                            <Progress
                              value={completion}
                              variant="gradient"
                              color={completion === 100 ? "green" : "blue"}
                              className="h-1"
                            />
                          </div>
                        </td>
                        <td className={className}>
                          <Typography
                            as="a"
                            href="#"
                            className="text-xs font-semibold text-blue-gray-600"
                          >
                            <EllipsisVerticalIcon
                              strokeWidth={2}
                              className="h-5 w-5 text-inherit"
                            />
                          </Typography>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card> */}
    </div>
  );
}

export default Requests;
