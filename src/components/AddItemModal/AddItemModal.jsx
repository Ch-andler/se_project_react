import React, { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";
import { useForm } from "../../utils/useForm";

const AddItemModal = ({ isOpen, closeActiveModal, handleAddItemSubmit }) => {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  function handleFormSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!values.weather) {
      alert("Please select a weather type");
      return;
    }

    handleAddItemSubmit(values);
    resetForm(); // Clear the form after submitting
  }

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add Garment"
      onClose={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleFormSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={values.name}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          onChange={handleChange}
          value={values.imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        {["hot", "warm", "cold"].map((type) => (
          <label
            key={type}
            htmlFor={type}
            className="modal__label modal__label_type_radio"
          >
            <input
              id={type}
              type="radio"
              name="weather"
              className="modal__radio-input"
              onChange={handleChange}
              value={type}
              checked={values.weather === type}
            />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
