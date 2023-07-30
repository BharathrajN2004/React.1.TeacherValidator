import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

import {
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";


function LeaveEntry() {

    const location = useLocation();
    const header = location.state;
    console.log(header);

    const [validate, setValidation] = useState(false);

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
                    <Input type="text" label="College ID" />
                </div>
                <Button>
                    Generate
                </Button>
            </div>
            <div className="flex flex-wrap justify-between items-center mt-4 w-full px-4">
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
                        Bharathraj N
                    </Typography>
                </div>
                <div className="w-2/6  flex flex-col items-center">
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-normal opacity-50"
                    >
                        Email ID:
                    </Typography>
                    <Typography
                        variant="h6"
                        color="blue-gray"
                        className="mb-2 font-medium  transition-all hover:text-light-blue-400 hover:opacity-100"
                    >
                        bharathraj@gmail.com
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
                        HOD of CSE
                    </Typography>
                </div>
            </div>
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
                    3
                </Typography>
                <Typography
                    variant="h6"
                    color="blue-gray"
                    className="mb-2 font-medium opacity-50"
                >
                    {header} remaining 
                </Typography>
                <Button className={`ml-4  ${!validate && "bg-blue-gray-200 shadow-none hover:shadow-none"} `} disabled={!validate}>
                    {validate?"Validate":"NO Validation"}
                </Button>
            </div>

        </div>
    )
}

export default LeaveEntry







