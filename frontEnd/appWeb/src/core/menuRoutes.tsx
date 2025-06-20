import type { JSX } from "react";
import UseForm from "../modules/user/UserForm";

export interface AppRoute {
    path: string;
    element: JSX.Element;
    label?: string;
    icon?: string;
}

const routes: AppRoute[] = [
    {
        path: '/',
        element: <UseForm />,
        label: 'Inicio',
        icon: 'HomeOutlined'
    },
    {
        path: '/users',
        element: <UseForm />,
        label: 'Usuarios',
        icon: 'UserOutlined'
    },
    {
        path: '/products',
        element: <UseForm />,
        label: 'Usuarios',
        icon: 'UserOutlined'
    },
    {
        path: '/orders',
        element: <UseForm />,
        label: 'Usuarios',
        icon: 'UserOutlined'
    }
]

export default routes;