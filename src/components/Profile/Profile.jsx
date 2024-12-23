import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({ clothingItems, onCardClick, handleAddClick }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        items={clothingItems}
        onCardClick={onCardClick}
        onClick={handleAddClick}
        handleAddClick={handleAddClick}
      />
    </div>
  );
}

export default Profile;
