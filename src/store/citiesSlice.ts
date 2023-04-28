import { Slice, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Exclude, FetchParams, loadCityData } from "../api/api";

interface City {
  name: string;
  lat: number | undefined;
  lon: number | undefined;
  weather: any;
  load?: boolean;
}

interface InitState {
  city: {
    [key: string]: City;
  };
  cities: string[];
  error: string | null;
}

interface FetchCitiesParams {
  cities: string[];
  excludes?: Exclude[];
}

const initialState: InitState = {
  city: {},
  cities: [],
  error: null,
};

export const fetchCityData = createAsyncThunk(
  "cities/fetchCityData",
  async (params: FetchParams) => {
    return loadCityData(params);
  }
);
export const fetchCitiesData = createAsyncThunk(
  "cities/fetchCitiesData",
  async (params: FetchCitiesParams) => {
    return Promise.all(
      params.cities.map((city: string) =>
        loadCityData({ name: city, excludes: params.excludes })
      )
    );
  }
);

const citiesSlice: Slice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    removeCity: (state, action) => {
      state.cities = state.cities.filter(
        (city: string) => city !== action.payload
      );
      delete state.city[action.payload];
    },
    removeError: (state, action) => {
      state.error = null;
    },
    addError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCityData.fulfilled, (state, action) => {
      const { name } = action.meta.arg;
      if (state.cities.every((city: string) => city !== name)) {
        state.cities.push(name);
      }
      state.city[name] = action.payload;
      state.city[name].load = false;
    });
    builder.addCase(fetchCityData.pending, (state, action) => {
      const { name } = action.meta.arg;
      state.error = null;
      state.city[name] = {
        load: true,
      } as City;
    });
    builder.addCase(fetchCityData.rejected, (state, action) => {
      const { name } = action.meta.arg;
      state.city[name].load = false;
      state.error = "Something went wrong... Try again!";
    });
    builder.addCase(fetchCitiesData.fulfilled, (state, action) => {
      const cities = action.payload.map((city) => {
        state.city[city.name] = city;
        return city.name;
      });
      state.cities = cities;
    });
  },
});

export const { removeCity, addError, removeError } = citiesSlice.actions;

export default citiesSlice.reducer;
