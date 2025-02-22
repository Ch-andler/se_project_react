import "./ItemCard.css";
import React from "react";
import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item = {}, onCardClick }) {
  const { currentUser } = useContext(CurrentUserContext);

  if (!item) {
    return null;
  }

  const isLiked = item.likes && item.likes.includes(currentUser?._id);

  const handleCardClick = () => {
    if (!item._id) {
      console.error("Item is missing _id", item);
      return;
    }
    onCardClick(item);
  };
  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
      />
      <div className="card__header">
        <h2 className="card__title">{item.name}</h2>
        {currentUser && (
          <button
            onClick={handleLike}
            className={`card__like-button ${
              isLiked ? "card__like-button_active" : ""
            }`}
          ></button>
        )}
      </div>
    </li>
  );
}
export default ItemCard;
