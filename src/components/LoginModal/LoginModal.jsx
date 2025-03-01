import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { use } from "react";

const LoginModal = ({
  isOpen,
  onClose,
  closeActiveModal,
  onLogin,
  setActiveModal,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    onLogin(email, password).catch(() => setErrorMessage("Incorrect password"));
  };

  return (
    <ModalWithForm
      title="Login"
      buttonText="Sign in"
      onClose={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleFormSubmit}
      toggleModal={() => setActiveModal("register")}
      toggleText="or Sign Up"
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>

      <label
        htmlFor="password"
        className={`modal__label ${errorMessage ? "modal__label-error" : ""}`}
      >
        Password
        <input
          type="password"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {errorMessage && <p className="modal__error">{errorMessage}</p>}
    </ModalWithForm>
  );
};

export default LoginModal;
