import "./ItemCard.css";
import React from "react";

function ItemCard({ item = {}, onCardClick }) {
  const handleCardClick = () => {
    if (!item._id) {
      console.error("Item is missing _id", item);
      return;
    }
    onCardClick(item);
  };
  return (
    <li className="card">
      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
      />
      <h2 className="card__title">{item.name}</h2>
    </li>
  );
}
export default ItemCard;
