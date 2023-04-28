import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/main/MainPage";
import NotFound from "../pages/error/NotFound";
import CityPage from "../pages/city/CityPage";

const router = createBrowserRouter([
  {
    path: "/weather-app",
    element: <MainPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/weather-app/:cityName",
    element: <CityPage />,
  },
]);

export default router;
