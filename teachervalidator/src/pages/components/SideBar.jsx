import React from "react";
import { Link } from "react-router-dom";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    InboxIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

function SideBar({ access }) {
    const [open, setOpen] = React.useState(0);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <Card className="fixed top-4 left-4 h-[calc(100vh-2rem)] max-w-[14rem]  shadow-xl  shadow-blue-gray-900/5 border-white/20">
            <div className="mb-4 pl-10 pt-5">
                <Link to='/user/home'>
                    <Typography variant="h6" color="blue-gray">
                        Teacher Validator
                    </Typography>
                </Link>
            </div>
            <List >
                {access != "Principal" &&
                    <Link to="/user/home">
                        <ListItem className="max-w-[12rem]">
                            <ListItemPrefix>
                                <PresentationChartBarIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Home
                            </Typography>
                        </ListItem>
                    </Link>
                }
                {access != 'Principal' && <Link to="/user/leaveRequest">
                    <ListItem className="max-w-[12rem]">
                        <ListItemPrefix>
                            <PresentationChartBarIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        <Typography color="blue-gray" className="mr-auto font-normal">
                            Leave Request
                        </Typography>
                    </ListItem>
                </Link>}
                {access != 'Staff' && <Link to="/user/viewData">
                    <ListItem className="max-w-[12rem]">
                        <ListItemPrefix>
                            <PresentationChartBarIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        <Typography color="blue-gray" className="mr-auto font-normal">
                            View Others Data
                        </Typography>
                    </ListItem>
                </Link>}
                {access == 'Principal' && <Accordion
                    className="max-w-[12rem]"
                    open={open === 2}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 2}>
                        <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <ShoppingBagIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Validater
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <Link to='/user/leaveEntry' state='Medical Leave' >
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Medical Leave
                                </ListItem>
                            </Link>
                            <Link to='/user/leaveEntry' state='Casual Leave'>
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Casual Leave
                                </ListItem>
                            </Link>
                            <Link to='/user/leaveEntry' state='Leave on loss of Pay' >
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Leave on Loss of Pay
                                </ListItem>
                            </Link>
                            <Link to='/user/leaveEntry' state='Permission' >
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Permission
                                </ListItem>
                            </Link>
                            <Link to='/user/leaveEntry' state='Vacation Leave' >
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Vacation Leave
                                </ListItem>
                            </Link>
                        </List>
                    </AccordionBody>
                </Accordion>}
                {access == 'Principal' && <hr className="my-2 border-blue-gray-50" />}
                {access == 'Principal' && <Link to="/user/requests">
                    <ListItem className="max-w-[12rem]">

                        <ListItemPrefix>
                            <InboxIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Inbox
                    </ListItem>
                </Link>
                }
            </List>
        </Card>
    );
}

export default SideBar;