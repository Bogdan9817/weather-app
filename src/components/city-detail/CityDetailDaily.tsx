import {
  WiHorizonAlt,
  WiHorizon,
  WiDaySunny,
  WiNightClear,
} from "react-icons/wi";
import data from "./config.json";

const values = data.daily.values;
const size = data.iconSize * 0.7;

export default function CityDetailDaily(dailyWeatherData: any) {
  const { dt, temp } = dailyWeatherData;
  const { main, description, icon } = dailyWeatherData.weather[0];

  return (
    <div className='daily-data-card column'>
      <h4 className='header fw-500'>
        {new Date(dt * 1000).toLocaleDateString()}
      </h4>
      <div className='row w-100 justify-sb'>
        <span className='fw-300'>{main}</span>
        <img
          src={`https://openweathermap.org/img/wn/${icon}.png`}
          alt={description}
        />
      </div>
      <div className='row w-100 justify-sb'>
        <span className='fw-300'>
          {values.min}: <span className='fw-500'>{Math.round(temp.min)}°C</span>
        </span>
        <span className='fw-300'>
          {values.max}: <span className='fw-500'>{Math.round(temp.max)}°C</span>
        </span>
      </div>
      <div className='row w-100 justify-sb'>
        <span className='daily-values fw-500'>
          <WiHorizonAlt color='#1A120B' size={size} />
          {Math.round(temp.morn)}°C
        </span>
        <span className='daily-values fw-500'>
          <WiDaySunny color='#1A120B' size={size} />
          {Math.round(temp.day)}°C
        </span>
        <span className='daily-values fw-500'>
          <WiHorizon color='#1A120B' size={size} />
          {Math.round(temp.eve)}
          °C
        </span>
        <span className='daily-values fw-500'>
          <WiNightClear color='#1A120B' size={size} />
          {Math.round(temp.night)}°C
        </span>
      </div>
    </div>
  );
}
