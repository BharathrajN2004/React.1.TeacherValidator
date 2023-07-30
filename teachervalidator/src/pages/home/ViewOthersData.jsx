import React from 'react'
import {
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";

function ViewOthersData() {
    return (
        <div className="p-3 flex flex-col justify-center items-center gap-2">
            <div className="flex flex-row items-end justify-between gap-4 mt-4">
                <div>
                    <Input type="text" label="College ID" />
                </div>
                <Button>
                    Generate
                </Button>
            </div>
        </div>
    )
}

export default ViewOthersData