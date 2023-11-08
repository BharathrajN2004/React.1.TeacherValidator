import React from "react";

// Imports
import MainDashboard from "views/user/home";
import NFTMarketplace from "views/user/validator";
import Profile from "views/user/profile";
import DataTables from "views/user/inbox";
import CreateUser from "views/user/createUser";
import Request from "views/user/request";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";

const routes = [
  {
    name: "Home",
    layout: "/user",
    path: "home",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Validate",
    layout: "/user",
    path: "validate",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Inbox",
    layout: "/user",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "request_inbox",
    component: <DataTables />,
  },
  {
    name: "Create USER",
    layout: "/user",
    path: "create_user",
    icon: <MdLock className="h-6 w-6" />,
    component: <CreateUser />,
  },
  {
    name: "Profile",
    layout: "/user",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
];

const normal_user_routes = [
  {
    name: "Home",
    layout: "/user",
    path: "home",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Request",
    layout: "/user",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "request",
    component: <Request />,
  },
  {
    name: "Profile",
    layout: "/user",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
];

const super_user_routes = [
  {
    name: "Home",
    layout: "/user",
    path: "home",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Request",
    layout: "/user",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "request",
    component: <Request />,
  },
  {
    name: "Validate",
    layout: "/user",
    path: "validate",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Inbox",
    layout: "/user",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "request_inbox",
    component: <DataTables />,
  },
  {
    name: "Create USER",
    layout: "/user",
    path: "create_user",
    icon: <MdLock className="h-6 w-6" />,
    component: <CreateUser />,
  },
  {
    name: "Profile",
    layout: "/user",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
];

const heigher_user_routes = [
  {
    name: "Home",
    layout: "/user",
    path: "home",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Validate",
    layout: "/user",
    path: "validate",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Inbox",
    layout: "/user",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "request_inbox",
    component: <DataTables />,
  },
  {
    name: "Create USER",
    layout: "/user",
    path: "create_user",
    icon: <MdLock className="h-6 w-6" />,
    component: <CreateUser />,
  },
  {
    name: "Profile",
    layout: "/user",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
];

export default routes;
