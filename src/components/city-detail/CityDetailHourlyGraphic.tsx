import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { colorCounter } from "../../helpers/temperature";
import data from "./config.json";
import "./styles.scss";

export default function CityDetailHourly(hourWeatherData: any) {
  const hours = Object.values(hourWeatherData);
  return (
    <Carousel
      className='city-detail-hour-graphic'
      responsive={data.responsiveHourly}
    >
      {hours.map((hour: any, idx) => {
        return (
          <GraphColumn key={hour.dt + idx} dt={hour.dt} temp={hour.temp} />
        );
      })}
    </Carousel>
  );
}

function GraphColumn({ dt, temp }: { dt: number; temp: number }) {
  const time = new Date(dt * 1000).toTimeString().slice(0, 5);
  const roundedTemp = Math.round(temp);
  const mid = 100;
  const { red, green, blue } = colorCounter(roundedTemp);
  return (
    <div className='hour-column'>
      <div className='hour-time fw-400'>{time}</div>
      <div className='hour-temp fw-400'>{roundedTemp}°C</div>
      <div className='hour-bar'>
        <div
          style={{
            background: `rgb(${red},${green}, ${blue})`,
            width: "100%",
            height: mid + roundedTemp * 5,
          }}
        ></div>
      </div>
    </div>
  );
}
