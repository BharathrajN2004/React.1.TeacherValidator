import React from 'react'
import {
    Typography,
    MenuItem,
} from "@material-tailwind/react";
import {
    ClockIcon,
} from "@heroicons/react/24/solid";


function MenuRequest({request, from, time}) {
    return (
        <MenuItem className="flex items-center gap-3" key={request}>
            <div>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                >
                    <strong>{request}</strong> by {from}
                </Typography>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                >
                    <ClockIcon className="h-3.5 w-3.5" />on {time}
                </Typography>
            </div>
        </MenuItem>
    )
}

export default MenuRequest