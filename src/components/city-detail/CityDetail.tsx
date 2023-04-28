import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import CityDetailCurrent from "./CityDetailCurrent";
import CityDetailDaily from "./CityDetailDaily";
import CityDetailHourly from "./CityDetailHourlyGraphic";
import data from "./config.json";
import "./styles.scss";

export default function CityDetail({ weather }: { weather: any }) {
  return (
    <div>
      <CityDetailCurrent {...weather.current} />
      <CityDetailHourly {...weather.hourly} />
      {weather?.daily && (
        <Carousel
          className='city-detail-daily'
          responsive={data.responsiveDaily}
        >
          {weather?.daily?.map((day: any) => {
            return <CityDetailDaily key={day.dt} {...day} />;
          })}
        </Carousel>
      )}
    </div>
  );
}
