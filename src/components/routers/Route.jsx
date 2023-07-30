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
import Credential from "../AdminPanel/Credential/Credential";
import AllCredential from "../AdminPanel/Credential/AllCredential";
import CustomerCredential from "../CustomerPanel/Credential/CustomerCredential";
import AddCategory from "../AdminPanel/Category/AddCategory";
import AllCategory from "../AdminPanel/Category/AllCategory";
import MyOrder from "../CustomerPanel/MyOrder/MyOrder";
import PaymentPage from "../CustomerPanel/Payment/PaymentPage";
import Streaming from "../Frontend/Streaming/Streaming";
import StreamingArea from "../Frontend/Streaming/StreamingArea";
import CoverArea from "../Frontend/Mcover/CoverArea";
import ErrorPage from "../Shared/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
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
        path: "/all/items/:label",
        element: <EachPackage></EachPackage>,
      },
      {
        path: "/all/streaming",
        element: <StreamingArea></StreamingArea>,
      },
      {
        path: "/all/mobile-cover",
        element: <CoverArea></CoverArea>,
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: <ADashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/admin/dashboard/add-category",
        element: (
          <AdminRoute>
            <AddCategory />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/dashboard/all-category",
        element: (
          <AdminRoute>
            <AllCategory />
          </AdminRoute>
        ),
      },
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
        path: "/admin/dashboard/credential",
        element: (
          <AdminRoute>
            <Credential />
          </AdminRoute>
        ),
      },

      {
        path: "/admin/dashboard/all/credential",
        element: (
          <AdminRoute>
            <AllCredential />
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
    element: (
      <CustomerRoute>
        <CDashboard />
      </CustomerRoute>
    ),
    errorElement: <ErrorPage />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/customer/dashboard/selected",
        element: (
          <CustomerRoute>
            <SelectedItem />
          </CustomerRoute>
        ),
      },
      {
        path: "/customer/dashboard/transaction",
        element: (
          <CustomerRoute>
            <Transaciton />
          </CustomerRoute>
        ),
      },
      {
        path: "/customer/dashboard/my-order",
        element: (
          <CustomerRoute>
            <MyOrder />
          </CustomerRoute>
        ),
      },
      {
        path: "/customer/dashboard/payment-page/:orderID",
        element: (
          <CustomerRoute>
            <PaymentPage />
          </CustomerRoute>
        ),
      },
      {
        path: "/customer/dashboard/profile",
        element: (
          <CustomerRoute>
            <Profile />
          </CustomerRoute>
        ),
      },
      {
        path: "/customer/dashboard/credential",
        element: (
          <CustomerRoute>
            <CustomerCredential />
          </CustomerRoute>
        ),
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
