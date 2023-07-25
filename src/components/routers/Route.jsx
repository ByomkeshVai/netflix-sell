import { createBrowserRouter } from "react-router-dom";
import Main from "../Frontend/Main";
import Home from "../Frontend/Layouts/Home";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import AdminRoute from "./AdminRoute";
import CustomerRoute from "./CustomerRoute";
import ADashboard from "../AdminPanel/ADashboard";
import CDashboard from "../CustomerPanel/CDashboard";
import AddItems from "../AdminPanel/AddItems";
import AllItems from "../AdminPanel/AllItems";
import EachPackage from "../Frontend/EachPackage/EachPackage";
import SelectedItem from "../CustomerPanel/SelectedItem";
import PaymentSuccess from "../CustomerPanel/Payment/PaymentSuccess";
import PaymentFailed from "../CustomerPanel/Payment/PaymentFailed";
import AddPromo from "../AdminPanel/Promo/AddPromo";
import AllPromo from "../AdminPanel/Promo/AllPromo";
import Transaciton from "../CustomerPanel/Transaciton/Transaciton";
import ManageOrder from "../AdminPanel/ManageOrder/ManageOrder";
import Profile from "../CustomerPanel/Profile/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Signup></Signup>,
      },
      {
        path: "/all/items/:category",
        element: <EachPackage></EachPackage>,
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: <ADashboard />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/admin/dashboard/add",
        element: (
          <AdminRoute>
            <AddItems />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/dashboard/allItem",
        element: (
          <AdminRoute>
            <AllItems />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/dashboard/addpromo",
        element: (
          <AdminRoute>
            <AddPromo />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/dashboard/allpromo",
        element: (
          <AdminRoute>
            <AllPromo />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/dashboard/manage-order",
        element: (
          <AdminRoute>
            <ManageOrder />
          </AdminRoute>
        ),
      },
      //   {
      //     path: "/admin/dashboard/users",
      //     element: (
      //       <AdminRoute>
      //         <ManageInstructor />
      //       </AdminRoute>
      //     ),
      //   },
    ],
  },
  {
    path: "/customer/dashboard",
    element: <CDashboard />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/customer/dashboard/selected",
        element: <SelectedItem />,
      },
      {
        path: "/customer/dashboard/transaction",
        element: <Transaciton />,
      },
      {
        path: "/customer/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/customer/dashboard/payment/success/:tranId",
        element: <PaymentSuccess></PaymentSuccess>,
      },

      {
        path: "/customer/dashboard/payment/fail/:tranId",
        element: <PaymentFailed></PaymentFailed>,
      },
    ],
  },
]);
