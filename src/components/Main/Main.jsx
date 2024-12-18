import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import React, { useContext, useEffect, useState } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
/* import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal"; */

function Main({ weatherData, clothingItems, handleCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />

      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} &deg;
          {currentTemperatureUnit}
        </p>
        <ul className="cards__list">
          {clothingItems.length === 0 ? (
            <p>No items available.</p>
          ) : (
            clothingItems
              .filter(
                (item) =>
                  item.weather.toLowerCase() === weatherData.type.toLowerCase()
              )
              .map((item) => (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                  /* onDelete={() => handleShowConfirmationModal(item)} */
                />
              ))
          )}
          {/*  <ConfirmationModal
            active={isModalActive}
            itemName={itemToDelete?.name}
            onConfirm={() => handleDelete(itemToDelete._id)}
            onCancel={handleCancelDelete}
          /> */}
        </ul>
      </section>
    </main>
  );
}
export default Main;
