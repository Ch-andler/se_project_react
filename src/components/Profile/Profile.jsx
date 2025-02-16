import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Profile({
  clothingItems,
  onCardClick,
  handleAddClick,
  onCardLike,
  setActiveModal,
  handleLogOut,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  if (!currentUser || !currentUser.name) {
    console.error("currentUser is undefined or missing props: ", currentUser);
  }
  return (
    <div className="profile">
      <SideBar avatar={currentUser.avatar} name={currentUser.name} />
      <button
        onClick={() => setActiveModal("edit-profile")}
        className="profile__edit-button"
      >
        Change profile data
      </button>
      <button className="profile__signout-button" onClick={handleLogOut}>
        Sign Out
      </button>
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onClick={handleAddClick}
        handleAddClick={handleAddClick}
        onCardLike={onCardLike}
      />
    </div>
  );
}

export default Profile;
