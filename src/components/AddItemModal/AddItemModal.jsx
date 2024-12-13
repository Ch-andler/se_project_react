import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";

const AddItemModal = ({ isOpen, onSubmit, onClose }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameOnChange = (e) => setName(e.target.value);
  const handleImageUrlOnChange = (e) => setImageUrl(e.target.value);
  const handleWeatherOnChange = (e) => setWeather(e.target.value);

  function handleFormSubmit(e) {
    e.preventDefault();
    onSubmit({ name, imageUrl, weather });
  }
  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
    }
  }, [isOpen]);
  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleFormSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          onChange={handleNameOnChange}
          value={name}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          onChange={handleImageUrlOnChange}
          value={imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="Hot" className="modal__label modal__label_type_radio">
          <input
            id="Hot"
            type="radio"
            name="weather"
            className="modal__radio-input"
            onChange={handleWeatherOnChange}
            value={"hot"}
          />
          Hot
        </label>
        <label htmlFor="Warm" className="modal__label modal__label_type_radio">
          <input
            id="Warm"
            type="radio"
            name="weather"
            className="modal__radio-input"
            onChange={handleWeatherOnChange}
            value={"warm"}
          />
          Warm
        </label>
        <label htmlFor="Cold" className="modal__label modal__label_type_radio">
          <input
            id="Cold"
            type="radio"
            name="weather"
            className="modal__radio-input"
            onChange={handleWeatherOnChange}
            value={"cold"}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
