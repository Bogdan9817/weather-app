import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
} from "@mui/material";
import { IoTrashOutline, IoRefreshOutline } from "react-icons/io5";
import { deleteCityFromStorage } from "../../local/storageActions";
import { Exclude } from "../../api/api";
import { fetchCityData, removeCity } from "../../store/citiesSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import data from "./config.json";
import "./styles.scss";

export default function CityCard({ name }: { name: string }) {
  const navigate = useNavigate();
  const { lat, lon, load, weather } = useAppSelector(
    (state) => state.cities.city[name]
  );
  const dispatch = useAppDispatch();

  const reloadWeather = (e: any) => {
    e.stopPropagation();
    const excludes: Exclude[] = ["alerts", "daily", "hourly", "minutely"];
    dispatch(fetchCityData({ name, lat, lon, excludes }));
  };

  const deleteCity = (e: any) => {
    e.stopPropagation();
    deleteCityFromStorage(name);
    dispatch(removeCity(name));
  };
  return (
    <Card className='city-card' onClick={() => navigate(`${name}`)}>
      <CardHeader title={name.toUpperCase()} />
      {load && <CircularProgress />}
      {!load && (
        <CardContent>
          <div className='row justify-sb w-100'>
            <span className='fw-300'>{data.values.temp} </span>
            <span className='fw-500'>{Math.round(weather.current.temp)}°C</span>
          </div>
          <div className='row justify-sb w-100'>
            <span className='fw-300'>{data.values.weather} </span>
            <span className='fw-500'>{weather.current.weather[0].main}</span>
          </div>
        </CardContent>
      )}
      <CardActions>
        <Button
          startIcon={<IoTrashOutline />}
          onClick={deleteCity}
          color='error'
        >
          {data.btns.deleteBtnTitle}
        </Button>
        <Button
          startIcon={<IoRefreshOutline />}
          onClick={reloadWeather}
          color='primary'
        >
          {data.btns.reloadBtnTitle}
        </Button>
      </CardActions>
    </Card>
  );
}
