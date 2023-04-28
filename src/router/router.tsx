import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/main/MainPage";
import NotFound from "../pages/error/NotFound";
import CityPage from "../pages/city/CityPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/:cityName",
    element: <CityPage />,
  },
]);

export default router;
