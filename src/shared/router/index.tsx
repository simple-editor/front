import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/home";
import RootLayout from "@/shared/layouts/root-layout";
import SignUpPage from "@/pages/sign-up";
import LibraryPage from "@/pages/library";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
      {
        path: "/lib",
        element: <LibraryPage />,
      },
    ],
  },
]);

export default router;
