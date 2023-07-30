import { useState } from "react";
import {
    Navbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuHandler,
} from "@material-tailwind/react";
import {
    BellIcon,
} from "@heroicons/react/24/solid";

import { userSignOut } from "../../Firebase/auth";
import { useNavigate } from "react-router-dom";
import Notification from "./helper/Notification";

function NavBar({ userDetail }) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const navigate = useNavigate();
    const handleUserSignOut = () => {
        userSignOut().then((success) => success && navigate('/auth/login')
        );
    }
    return (
        <Navbar
            color="transparent"
            className="rounded-xl transition-all px-0 pl-4 py-1"
            fullWidth
        >
            <div className="flex flex-row justify-between gap-6 md:flex-row md:items-center">
                <div className="capitalize flex flex-row justify-evenly gap-3 items-center">
                    <Typography
                        variant="h6"
                        color="blue-gray"
                        className="font-normal opacity-50"
                    >
                        Welcome
                    </Typography>
                    <Typography variant="h6" color="blue-gray">
                        {userDetail.name}
                    </Typography>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="opacity-0 font-normal lg:opacity-50 ml-2"
                    >
                        {userDetail.access + " of " + userDetail.department + " department"}
                    </Typography>
                </div>

                <div className="flex items-center">
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="opacity-0 font-normal lg:opacity-50 mr-3 "
                    >
                        {currentTime.toDateString()}
                    </Typography>
                    <Menu>
                        <MenuHandler>
                            <IconButton variant="text" color="blue-gray" className="mr-4">
                                <BellIcon className="h-5 w-5 text-blue-gray-500" />
                            </IconButton>
                        </MenuHandler>
                        <Notification/>
                    </Menu>
                    <Button onClick={handleUserSignOut}>SignOut</Button>
                </div>
            </div>
        </Navbar>
    );
}

export default NavBar;