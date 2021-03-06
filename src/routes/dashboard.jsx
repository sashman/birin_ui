// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";

import Callback from "views/Callback/Callback.jsx";
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import RingSeriesList from "views/RingSeriesList/RingSeriesList";
import UsersList from "views/UsersList/UsersList";
import UsersStats from "views/UsersList/UserStats";

const dashboardRoutes = [
  {
    path: "/callback",
    sidebarName: "Callback",
    navbarName: "Birin Dashboard",
    icon: Dashboard,
    component: Callback,
    hidden: true
  },
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Birin Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/ring_series",
    sidebarName: "Ring Series",
    navbarName: "Ring Series",
    icon: "list",
    component: RingSeriesList
  },
  {
    path: "/users/:id",
    hidden: true,
    component: UsersStats
  },
  {
    path: "/users",
    sidebarName: "Users",
    navbarName: "Users",
    icon: "list",
    component: UsersList
  },
  {
    path: "/profile",
    sidebarName: "Profile",
    navbarName: "Profile",
    icon: Person,
    component: UserProfile
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
