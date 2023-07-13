import { createBrowserRouter } from "react-router-dom";
import Main from "../Frontend/Main";
import Home from "../Frontend/Layouts/Home";

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
    ],
  },
]);
