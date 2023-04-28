export const saveCityInStorage = (city: string) => {
  const cities = localStorage.getItem("cities");
  if (!cities) {
    localStorage.setItem("cities", city.toLowerCase());
  } else {
    if (cities.includes(city.toLowerCase())) return;
    localStorage.setItem(
      "cities",
      [...cities.split(","), city.toLowerCase()].join()
    );
  }
};

export const deleteCityFromStorage = (cityToDelete: string) => {
  const cities = localStorage.getItem("cities")?.split(",");
  const filteredCities = cities
    ?.filter((city: string) => city !== cityToDelete.toLowerCase())
    .join(",") as string;

  localStorage.setItem("cities", filteredCities);
};

export const isCityInStorage = (city: string | undefined) => {
  if (!city) return;
  const cities = localStorage.getItem("cities")?.split(",");
  return cities?.some((c: string) => c === city.toLowerCase());
};

export const cityStorageSize = () => {
  return localStorage.getItem("cities")?.split(",").length || 0;
};
