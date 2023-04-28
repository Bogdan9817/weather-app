import { SetStateAction, useState } from "react";
import { Button, CircularProgress, Input } from "@mui/material";
import { IoAddOutline } from "react-icons/io5";
import { useAppDispatch } from "../../store/hooks";
import { saveCityInStorage } from "../../local/storageActions";
import { Exclude } from "../../api/api";
import { addError, fetchCityData } from "../../store/citiesSlice";
import data from "./config.json";
import "./styles.scss";

export default function CityAdd() {
  const [city, setCity] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setCity(e.target.value);
  };

  const handleClick = async () => {
    setLoad(true);
    const excludes: Exclude[] = ["alerts", "daily", "hourly", "minutely"];
    const res = await dispatch(fetchCityData({ name: city, excludes }));
    if (res.payload) {
      // @ts-ignore
      saveCityInStorage(res.payload.name);
    } else {
      dispatch(addError("Looks like such city doesn't exist..."));
    }
    setLoad(false);
  };

  return (
    <div className='add-city'>
      {load && <CircularProgress />}
      {!load && (
        <Input
          disableUnderline
          className='city-input'
          size='small'
          onChange={handleChange}
        />
      )}
      <Button
        endIcon={<IoAddOutline />}
        className='city-button'
        size='small'
        disabled={!city}
        variant='outlined'
        onClick={handleClick}
      >
        {data.addBtnTitle}
      </Button>
    </div>
  );
}
