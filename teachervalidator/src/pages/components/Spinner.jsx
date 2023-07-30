import { Tooltip, Spinner } from "@material-tailwind/react";

import React from 'react'

function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center h-screen">
            <Tooltip content="Loading User Data...">
                <Spinner className="h-12 w-12" />
            </Tooltip>
        </div>
    )
}

export default LoadingSpinner