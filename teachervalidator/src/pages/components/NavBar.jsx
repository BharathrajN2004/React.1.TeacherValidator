import { useState } from "react";
import { useSelector } from "react-redux";
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

import { authProvider } from "../../Providers/AuthProvider";
import { userSignOut } from "../../Firebase/auth";
import { useNavigate } from "react-router-dom";

function NavBar() {
    const { userDetail } = useSelector(state => state.auth);
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
                        {userDetail.access + " of " + userDetail.department + (userDetail.access == "Principal" ? "" : " department")}
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
                    <Button onClick={handleUserSignOut}>SignOut</Button>
                </div>
            </div>
        </Navbar>
    );
}

export default NavBar;