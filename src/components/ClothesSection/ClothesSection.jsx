import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ items, onCardClick, handleAddClick }) {
  return (
    <section className="clothes-section">
      <h2 className="clothes-section__title">Your Items /</h2>
      <button
        type="button"
        onClick={handleAddClick}
        className="header__add-clothes-btn"
      >
        + Add new
      </button>
      <ul className="clothes-section__list">
        {items.map((item) => (
          <ItemCard
            key={item._id || item.id}
            item={item}
            onCardClick={onCardClick}
          />
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;
