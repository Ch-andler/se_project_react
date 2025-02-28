import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import React, { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({
  weatherData = {},
  clothingItems = [],
  handleCardClick,
  onCardLike,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // Debugging: Log the data to check its structure
  console.log("weatherData:", weatherData);
  console.log("clothingItems:", clothingItems);

  // Guard clauses for weatherData and clothingItems
  if (!weatherData || !weatherData.type || !weatherData.temp) {
    return <p>Loading weather data...</p>;
  }

  if (!Array.isArray(clothingItems) || clothingItems.length === 0) {
    return <p>No clothing items found</p>;
  }

  return (
    <main>
      {/* Pass weatherData to WeatherCard */}
      <WeatherCard weatherData={weatherData} />

      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp?.[currentTemperatureUnit] || "N/A"} &deg;
          {currentTemperatureUnit}
        </p>
        <ul className="cards__list">
          {/* Check each item and ensure item.weather is a valid value */}
          {clothingItems
            .filter((item) => {
              console.log("Checking item:", item); // Debugging each item
              return item?.weather && item.weather === weatherData?.type;
            })
            .map((item) => (
              <ItemCard
                key={item._id || item.id} // Assuming unique identifier (_id or id)
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
