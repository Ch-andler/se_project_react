import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import AddItemModal from "../AddItemModal/AddItemModal";
import "./ClothesSection.css";

function ClothesSection({
  items,
  onCardClick,
  isOpen,
  onClose,
  handleFormSubmit,
  onAddButtonClick,
  handleAddClick,
}) {
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

      {isOpen && (
        <AddItemModal
          title="New garment"
          buttonText="Add garment"
          onClose={onClose}
          isOpen={isOpen}
          onSubmit={handleFormSubmit}
        />
      )}
    </section>
  );
}

export default ClothesSection;
