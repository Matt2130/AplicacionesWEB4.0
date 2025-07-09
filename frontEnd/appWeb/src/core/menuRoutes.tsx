import type { JSX } from "react";
import SelectProducts from "../modules/product/SelectProduct";
import RadioOrder from "../modules/order/RadioOrder";
import UserTable from "../modules/user/UserTable";
import UserForm from "../modules/user/UserForm";
import Dashboard from "../modules/dashboard/Dashboard";

export interface AppRoute {
    path: string;
    element: JSX.Element;
    label?: string;
    icon?: string;
    role?: string[];
}

const routes: AppRoute[] = [
    {
      path: "/dashboard",
      element: <Dashboard />,
      label: "Dashboard",
      icon: "dashboard-icon",
      role: ["Administrador", "Cliente", "Empleado"] 
    },
    {
      path: "/register",
      element: <UserForm />,
      label: "Register",
      icon: "UserAddOutlined",
      role: ["Administrador"]
    },
    {
      path: "/users",
      element: <UserTable />,
      label: "System Users",
      icon: "TeamOutlined",
      role: ["Administrador"]
    },
    {
      path: "/products",
      element: <SelectProducts />,
      label: "Products",
      icon: "SearchOutlined",
      role: ["Empleado", "Administrador"]
    },
    {
      path: "/orders",
      element: <RadioOrder />,
      label: "Orders",
      icon: "MenuFoldOutlined",
      role: ["Cliente", "Administrador"]
    },
];

export default routes;