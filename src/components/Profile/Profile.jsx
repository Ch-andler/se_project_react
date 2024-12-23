import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./Profile.css";

function Profile({ clothingItems, onCardClick, handleAddClick }) {
  const [setIsModalOpen] = React.useState(false);

  const handleAddItemClick = () => {
    setIsModalOpen(true);
  };

  const handleAddButtonClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        items={clothingItems}
        onAddItemClick={handleAddItemClick}
        onCardClick={onCardClick}
        onClick={handleAddClick}
        onAddButtonClick={handleAddButtonClick}
        handleAddClick={handleAddClick}
      />
    </div>
  );
}

export default Profile;
