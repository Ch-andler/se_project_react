import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import React, { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, clothingItems, handleCardClick, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // Guard clauses for weatherData and clothingItems
  if (!weatherData || !weatherData.type) {
    return <p>Loading weather data...</p>;
  }

  if (!Array.isArray(clothingItems) || clothingItems.length === 0) {
    return <p>No clothing items found</p>;
  }

  return (
    <main>
      <WeatherCard weatherData={weatherData} />

      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp?.[currentTemperatureUnit] || "N/A"} &deg;
          {currentTemperatureUnit}
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter(
              (item) => item.weather && item.weather === weatherData?.type
            ) // Safe check for item.weather
            .map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
