import {
  cityStorageSize,
  deleteCityFromStorage,
  isCityInStorage,
  saveCityInStorage,
} from "./storageActions";

describe("Storage actions test", () => {
  afterEach(() => {
    window.localStorage.removeItem("cities");
  });

  test("should save city in storage", () => {
    saveCityInStorage("Mykolaiv");
    expect(window.localStorage.getItem("cities")).toBe("mykolaiv");
    saveCityInStorage("Lviv");
    expect(window.localStorage.getItem("cities")).toBe("mykolaiv,lviv");
    saveCityInStorage("Lviv");
    expect(window.localStorage.getItem("cities")).toBe("mykolaiv,lviv");
  });

  test("should delete city from storage", () => {
    saveCityInStorage("Mykolaiv");
    saveCityInStorage("Lviv");
    saveCityInStorage("Kyiv");
    deleteCityFromStorage("Lviv");
    expect(window.localStorage.getItem("cities")).toBe("mykolaiv,kyiv");
  });

  test("should check is city in storage", () => {
    saveCityInStorage("Mykolaiv");
    saveCityInStorage("Lviv");
    saveCityInStorage("Kyiv");
    expect(isCityInStorage("Odessa")).toBeFalsy();
    expect(isCityInStorage("Kyiv")).toBeTruthy();
  });

  test("should return amount of all cities in storage", () => {
    saveCityInStorage("Mykolaiv");
    saveCityInStorage("Lviv");
    saveCityInStorage("Kyiv");
    expect(cityStorageSize()).toBe(3);
    deleteCityFromStorage("Mykolaiv");
    expect(cityStorageSize()).toBe(2);
  });
});
