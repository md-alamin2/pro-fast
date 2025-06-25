import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Authentication from "../Layout/Authentication/Authentication/Authentication";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import PrivateRoutes from "./PrivateRoute";
import SendParcel from "../Pages/SendParcel/SendParcel";

export const router = createBrowserRouter([
    {
        path:"/",
        Component: Root,
        children:[
            {
                index:true,
                Component:Home
            },
            {
                path:"/coverage",
                Component:Coverage
            },
            {
                path:"/send-parcel",
                element:<PrivateRoutes><SendParcel></SendParcel></PrivateRoutes>,
                loader:()=>fetch("/data/warehouses.json")
            }
        ]
    },
    {
        path:"/",
        Component:Authentication,
        children:[
            {
                path:"/login",
                Component:Login,
            },
            {
                path:'/register',
                Component:Register
            }
        ]
    }
])