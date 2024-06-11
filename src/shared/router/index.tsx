import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/home";
import RootLayout from "@/shared/layouts/root-layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
