import "./ItemCard.css";
import React from "react";
import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item = {}, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);
  console.log("Item imageUrl:", item.imageUrl);

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
      <div className="card__image-container">
        <img
          className="card__image"
          src={item.imageUrl}
          alt={item.name}
          onClick={handleCardClick}
        />
        <div className="card__header">
          <h2 className="card__name">{item.name}</h2>
          {currentUser && (
            <button
              onClick={handleLike}
              className={`card__like-button ${
                isLiked ? "card__like-button_active" : ""
              }`}
            ></button>
          )}
        </div>
      </div>
    </li>
  );
}

export default ItemCard;
