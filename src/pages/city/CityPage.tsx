import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress, Paper } from "@mui/material";
import { IoRefreshOutline } from "react-icons/io5";
import CityDetail from "../../components/city-detail/CityDetail";
import withErrorHandler from "../../hocs/WithErrorHandler";
import { isCityInStorage } from "../../local/storageActions";
import { fetchCityData } from "../../store/citiesSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./styles.scss";

function CityPage() {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const cityData = useAppSelector((state) => state.cities.city[cityName || ""]);
  const dispatch = useAppDispatch();

  const uploadWeatherData = useCallback(() => {
    if (cityName && typeof cityName === "string") {
      dispatch(
        fetchCityData({
          name: cityName || "",
          lat: cityData?.lat,
          lon: cityData?.lon,
          excludes: ["alerts", "minutely"],
        })
      );
    }
  }, [cityName, cityData?.lat, cityData?.lon, dispatch]);

  useEffect(() => {
    !isCityInStorage(cityName) && navigate("/");
    if (!cityData?.weather?.hourly || !cityData?.weather?.daily) {
      uploadWeatherData();
    }
  }, [
    cityName,
    navigate,
    cityData?.weather?.daily,
    cityData?.weather?.hourly,
    uploadWeatherData,
  ]);

  return (
    <Paper elevation={3} className='city-container'>
      <div className='header'>
        <h1>{cityName?.toUpperCase()}</h1>
        <IoRefreshOutline
          cursor='pointer'
          size={36}
          onClick={uploadWeatherData}
        />
      </div>
      {cityData?.load && <CircularProgress />}
      {!cityData?.load && cityData?.weather && (
        <CityDetail weather={cityData.weather} />
      )}
    </Paper>
  );
}

export default withErrorHandler(CityPage);
