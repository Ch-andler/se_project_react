import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onCardLike,
}) {
  console.log("clothingItems:", clothingItems); // Check if it's defined and an array
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <section className="clothes-section">
      <h2 className="clothes-section__title">Your Items</h2>
      <button
        type="button"
        onClick={handleAddClick}
        className="header__add-clothes-btn"
      >
        + Add new
      </button>
      <ul className="clothes-section__list">
        {clothingItems
          .filter((item) => item.owner === currentUser?._id)
          .map((item) => {
            return (
              <ItemCard
                key={item._id || item.id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
              />
            );
          })}
      </ul>
    </section>
  );
}

export default ClothesSection;
