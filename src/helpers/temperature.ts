export const colorCounter = (temp: number) => {
  const maxTemp = 50;
  const minTemp = 50;
  let red,
    green,
    blue = 0;

  if (temp > 0) {
    const plusPercent = (temp / maxTemp) * 100 + 50;
    red = Math.round((255 / 100) * plusPercent);
    blue = Math.round((255 / 100) * (100 - plusPercent));
  } else {
    const minusPercent = (Math.abs(temp) / minTemp) * 100 + 50;
    blue = Math.round((255 / 100) * minusPercent);
    red = Math.round((255 / 100) * (100 - minusPercent));
  }
  green = 0;

  return { red, green, blue };
};
