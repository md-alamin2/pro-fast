import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Authentication from "../Layout/Authentication/Authentication/Authentication";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import PrivateRoutes from "./PrivateRoute";
import SendParcel from "../Pages/SendParcel/SendParcel";
import Dashboard from "../Layout/dashboard";
import MyParcel from "../Pages/MyParcel/MyParcel";
import MyPayment from "../Pages/MyPayment/MyPayment";
import PaymentHistory from "../Pages/PaymentHistory/PaymentHistory";
import BeARider from "../Pages/BeARider/BeARider";
import PendingRider from "../Pages/PendingRider/PendingRider";
import MakeAdmin from "../Pages/MakeAdmin/MakeAdmin";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        Component: Coverage,
      },
      {
        path: "/send-parcel",
        element: (
          <PrivateRoutes>
            <SendParcel></SendParcel>
          </PrivateRoutes>
        ),
        loader: () => fetch("/data/warehouses.json"),
      },
      {
        path: "/be-a-rider",
        element: (
          <PrivateRoutes>
            <BeARider></BeARider>
          </PrivateRoutes>
        ),
        loader: () => fetch("/data/warehouses.json"),
      },
    ],
  },
  {
    path: "/",
    Component: Authentication,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard></Dashboard>
      </PrivateRoutes>
    ),
    children: [
      {
        path: "/dashboard/my-parcels",
        element: (
          <PrivateRoutes>
            <MyParcel></MyParcel>
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/payment-history",
        element: (
          <PrivateRoutes>
            <PaymentHistory></PaymentHistory>
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/pending-riders",
        element: (
          <PrivateRoutes>
            <PendingRider></PendingRider>
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/make-admin",
        Component: MakeAdmin,
      },
    ],
  },
]);
