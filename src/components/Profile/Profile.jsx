import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Profile({
  handleCardClick,
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
      <div className="profile__container">
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
      </div>

      <div className="clothing__items-profile">
        <ClothesSection
          clothingItems={clothingItems}
          handleCardClick={handleCardClick}
          onClick={handleAddClick}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
        />
      </div>
    </div>
  );
}

export default Profile;
