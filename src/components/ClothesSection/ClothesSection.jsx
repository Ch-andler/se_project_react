import React, { useState } from "react";
import ItemCard from "../ItemCard/ItemCard";
import AddItemModal from "../AddItemModal/AddItemModal";
import "./ClothesSection.css";

function ClothesSection({ items, onCardClick }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [setItems] = useState([]);

  const handleAddItemClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, { ...newItem, id: Date.now() }]); // Add item with a unique id
    setIsAddModalOpen(false); // Close modal after submission
  };

  const handleOpenModal = () => setIsAddModalOpen(true);

  return (
    <section className="clothes-section">
      <h2 className="clothes-section__title">Your Items /</h2>
      <button onClick={handleAddItemClick} className="header__add-clothes-btn">
        + Add new
      </button>
      <ul className="clothes-section__list">
        {items.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>

      <AddItemModal
        isOpen={isModalOpen}
        onAddItem={handleAddItem}
        onCloseModal={handleCloseModal}
      />
    </section>
  );
}

export default ClothesSection;
