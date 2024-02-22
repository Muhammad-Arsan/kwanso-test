/** @format */

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
export default App;
