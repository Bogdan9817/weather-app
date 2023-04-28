import { colorCounter } from "./temperature";

const testingValues = [
  {
    temp: 10,
    res: {
      red: 179,
      green: 0,
      blue: 77,
    },
  },
  {
    temp: -10,
    res: {
      red: 77,
      green: 0,
      blue: 179,
    },
  },
  {
    temp: 0,
    res: {
      red: 127,
      green: 0,
      blue: 127,
    },
  },
];

describe("ColorCounter:", () => {
  test("should return appropriate values", () => {
    testingValues.map((test) =>
      expect(colorCounter(test.temp)).toStrictEqual(test.res)
    );
  });
});
