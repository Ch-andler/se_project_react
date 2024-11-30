import Sunny from "../../assets/sunnyy.png";
import "./WeatherCard.css";
function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F} &deg;</p>
      <img src={Sunny} alt="Sunny" className="weather-card__image" />
    </section>
  );
}
export default WeatherCard;
