import React, { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ClothesSection({
  clothingItems = [],
  handleCardClick,
  handleAddClick,
  onCardLike,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  // Debugging: Log the items to inspect the data

  // Guard clause to check for currentUser and clothingItems validity
  if (!currentUser) {
    return <div>Please log in to view your items.</div>;
  }

  if (!Array.isArray(clothingItems) || clothingItems.length === 0) {
    return <div>No clothing items available.</div>;
  }

  // Filter clothingItems by the current user's id
  const filteredItems = clothingItems.filter((item) => {
    // Debugging: Log each item to ensure it has the 'owner' property
    return item && item.owner && item.owner === currentUser._id;
  });

  // Check if there are any items after filtering
  if (filteredItems.length === 0) {
    return <div>You have no items to display.</div>;
  }

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
        {filteredItems.map((item) => (
          <ItemCard
            key={item._id || item.id} // Unique key for each item
            item={item}
            onCardClick={handleCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;
