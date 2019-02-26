// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";

import Callback from "views/Callback/Callback.jsx";
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";

const dashboardRoutes = [
  {
    path: "/callback",
    sidebarName: "Callback",
    navbarName: "Birin Dashboard",
    icon: Dashboard,
    component: Callback
  },
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Birin Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/user",
    sidebarName: "User Profile",
    navbarName: "Profile",
    icon: Person,
    component: UserProfile
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
