import React from "react";
import "./ItemModal.css";
import { deleteItem } from "../../utils/weatherApi";
/* import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal"; */

import { useEffect, useState } from "react";

function ItemModal({ activeModal, onClose, card = {}, item, onDelete }) {
  const [imageUrl, setImageUrl] = useState(null); // State to store image URL
  const [imageLoaded, setImageLoaded] = useState(false); // State to track image loading
  const [isModalActive, setIsModalActive] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Fetch or set the image URL when the component mounts or item changes
  useEffect(() => {
    if (item?.imageUrl) {
      // If item already has an image URL, set it immediately
      setImageUrl(item.imageUrl);
    } else {
      // If there's no image URL, use a placeholder or handle the case
      setImageUrl("https://via.placeholder.com/150");
    }
  }, [item]); // Dependency on `item` to re-run when `item` changes

  // Handle image load (optional, for loading indicators)
  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => setImageUrl("https://via.placeholder.com/150"); // Fallback image on error

  const handleDelete = () => {
    console.log(item);
    if (!item || !item._id) {
      console.error("Item is missing _id", item);
      return;
    }

    onDelete(item);
    onClose();
  };

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <img
          src={item?.imageUrl || "https://via.placeholder.com/150"}
          alt={item?.name}
          className="modal__image"
          onLoad={handleImageLoad} // Set loading state to true once image is loaded
          onError={handleImageError} // Set fallback image if the image fails to load
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {item?.weather}</p>
          <button className="modal__delete-button" onClick={handleDelete}>
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
