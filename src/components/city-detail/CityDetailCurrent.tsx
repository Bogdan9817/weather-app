import { WiHumidity, WiStrongWind, WiBarometer, WiFog } from "react-icons/wi";

import data from "./config.json";

export default function CityDetailCurrent(currentWeatherData: any) {
  const { temp, feels_like, humidity, wind_speed, visibility, pressure } =
    currentWeatherData;
  const { icon, main, description } = currentWeatherData.weather[0];
  return (
    <div className='city-detail-current'>
      <div className='row wrappable w-100 justify-sb'>
        <div className='row left'>
          <img
            src={`https://openweathermap.org/img/wn/${icon}.png`}
            alt={description}
          />
          <div className='column'>
            <div className='temp current'>
              <span className='fw-300'>{Math.round(temp)}°C</span>
            </div>
            <div className='weather'>
              <span className='main fw-500'>{main}</span>
            </div>
            <div className='row'>
              <span className='temp fw-300'>
                Feels like:{" "}
                <span className='fw-500'>{Math.round(feels_like)}°C</span>
              </span>
            </div>
          </div>
        </div>
        <div className='row wrappable right justify-sb'>
          <div className='row center-justify fw-300'>
            <WiHumidity color='#1A120B' size={data.iconSize} />
            {humidity}%
          </div>
          <div className='row center-justify fw-300'>
            <WiStrongWind color='#1A120B' size={data.iconSize} /> {wind_speed}
            m/s
          </div>
          <div className='row center-justify fw-300'>
            <WiFog color='#1A120B' size={data.iconSize} /> {visibility}m
          </div>
          <div className='row center-justify fw-300'>
            <WiBarometer color='#1A120B' size={data.iconSize} /> {pressure}hPa
          </div>
        </div>
      </div>
    </div>
  );
}
