
import Category from "views/Category.js";
import UserProfile from "views/UserProfile.js";
import Island from "views/Island.js";
import SubCategory from "views/SubCategory.js";
import PaymentPlans from "views/PaymentPlans.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";

const dashboardRoutes = [
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-alien-33",
  //   component: Upgrade,
  //   layout: "/admin"
  // },
  {
    path: "/category",
    name: "Category",
    icon: "nc-icon nc-chart-pie-35",
    component: Category,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "Users Profiles",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/island",
    name: "Island",
    icon: "nc-icon nc-notes",
    component: Island,
    layout: "/admin"
  },
  {
    path: "/sub-category",
    name: "Sub Category",
    icon: "nc-icon nc-paper-2",
    component: SubCategory,
    layout: "/admin"
  },
  {
    path: "/payment-plans",
    name: "Payment Plans",
    icon: "nc-icon nc-atom",
    component: PaymentPlans,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin"
  }
];

export default dashboardRoutes;
