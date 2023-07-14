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
        path: "/admin/dashboard/all",
        element: (
          <AdminRoute>
            <AllItems />
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
    // children: [
    //   {
    //     path: "/customer/dashboard",
    //     element: (
    //       <CustomerRoute>
    //         <AddClass />
    //       </CustomerRoute>
    //     ),
    //   },
    // ],
  },
]);
