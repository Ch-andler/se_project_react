import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  openRegisterModal,
  openLoginModal,
  isLoggedIn,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const getInitials = (name) => (name ? name.charAt(0).toUpperCase() : "?");
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <Link to="/">
        {" "}
        {}
        <img src={logo} alt="wtwr logo" className="header__logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {isLoggedIn && (
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
      )}

      {!isLoggedIn && (
        <>
          <button onClick={openRegisterModal} className="header__signup-btn">
            Sign Up
          </button>
          <button onClick={openLoginModal} className="header__login-btn">
            Log In
          </button>
        </>
      )}

      {isLoggedIn && currentUser && (
        <Link to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__username">{currentUser.name}</p>
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt="{currentUser.name}"
                className="header__avatar"
              />
            ) : (
              <div className="header__avatar-placeholder">
                {getInitials(currentUser.name)}
              </div>
            )}
          </div>
        </Link>
      )}
    </header>
  );
}
export default Header;
