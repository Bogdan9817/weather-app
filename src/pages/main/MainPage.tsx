import { useEffect } from "react";
import { Alert, AlertTitle, Container, Grid } from "@mui/material";
import CityCard from "../../components/city-card/CityCard";
import CityAdd from "../../components/city-add/CityAdd";
import withErrorHandler from "../../hocs/WithErrorHandler";
import { cityStorageSize } from "../../local/storageActions";
import { Exclude } from "../../api/api";
import { fetchCitiesData } from "../../store/citiesSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./styles.scss";

function MainPage() {
  const dispatch = useAppDispatch();
  const cities = useAppSelector((state) => state.cities.cities);
  const error = useAppSelector((state) => state.cities.error);

  useEffect(() => {
    if (cities.length === cityStorageSize()) return;
    const savedCities = localStorage.getItem("cities")?.split(",") || [];
    const excludes: Exclude[] = ["alerts", "daily", "hourly", "minutely"];
    dispatch(fetchCitiesData({ cities: savedCities, excludes }));
  }, [dispatch, cities.length]);

  return (
    <div className='main-wrapper'>
      <CityAdd />
      <Container className='main-wrapper-container'>
        <Grid container spacing={2}>
          {cities?.map((city: string) => {
            return (
              <Grid item xs={12} md={6} lg={4} key={`city-name-${city}`}>
                <CityCard name={city} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
      {error && (
        <Alert severity='error'>
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
    </div>
  );
}

export default withErrorHandler(MainPage);
