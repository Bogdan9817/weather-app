import axios from "axios";

export type Exclude =
  | "current"
  | "minutely"
  | "hourly"
  | "daily"
  | "alerts"
  | "";

export interface FetchParams {
  name: string;
  lat?: number | undefined;
  lon?: number | undefined;
  excludes?: Exclude[];
}

const weatherApi = axios.create({
  baseURL: "https://api.openweathermap.org",
  params: {
    appid: "80d7e0896fca883842258d8d9346e5fa",
  },
});

const loadWeather = (
  loc: { lat: number | undefined; lon: number | undefined },
  excludes?: string[]
) => {
  return weatherApi("data/3.0/onecall", {
    params: {
      lat: loc.lat,
      lon: loc.lon,
      units: "metric",
      exclude: excludes?.join(",").toLowerCase() || "",
    },
  });
};

export const loadCityData = async (params: FetchParams) => {
  const { name, lat, lon, excludes } = params;
  let location = { name, lat, lon };
  if (!lat || !lon) {
    const res = await weatherApi("geo/1.0/direct", { params: { q: name } });
    location.name = res.data[0].name;
    location.lat = res.data[0].lat;
    location.lon = res.data[0].lon;
  }
  const response = await loadWeather(
    { lat: location.lat, lon: location.lon },
    excludes
  );
  return { ...location, weather: response.data };
};
