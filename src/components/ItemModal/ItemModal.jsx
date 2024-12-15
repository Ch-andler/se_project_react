import React from "react";
import "./ItemModal.css";
import { deleteItem } from "../../utils/weatherApi";

import { useEffect, useState } from "react";

function ItemModal({ activeModal, onClose, card = {}, item, onDelete }) {
  const [imageUrl, setImageUrl] = useState(null); // State to store image URL
  const [imageLoaded, setImageLoaded] = useState(false); // State to track image loading

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
    if (!card || !card._id) {
      console.log("Item:", item);
      console.error("Item is missing _id", item);
      return;
    }

    deleteItem(card._id) // Assuming `deleteItem` expects an ID
      .then(() => {
        console.log("Item deleted successfully");
        onDelete(item);
        onClose();
      })
      .catch((error) => console.error("Error deleting item:", error));
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
          src={card?.imageUrl || "https://via.placeholder.com/150"}
          alt={card?.name}
          className="modal__image"
          onLoad={handleImageLoad} // Set loading state to true once image is loaded
          onError={handleImageError} // Set fallback image if the image fails to load
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card?.weather}</p>
          <button className="modal__delete-button" onClick={handleDelete}>
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
