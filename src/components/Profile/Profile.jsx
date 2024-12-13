import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./Profile.css";

function Profile({ clothingItems, onCardClick }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleAddItemClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        items={clothingItems}
        onAddItemClick={handleAddItemClick}
        onCardClick={onCardClick}
      />
      <ModalWithForm
        title="Add Item"
        buttonText="Add"
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        {}
      </ModalWithForm>
    </div>
  );
}

export default Profile;
