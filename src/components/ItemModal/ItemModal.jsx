import React from "react";
import "./ItemModal.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
/* import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal"; */

import { useEffect, useState } from "react";

function ItemModal({
  activeModal,
  onClose,
  closeActiveModal,
  card = {},
  item,
  onDelete,
}) {
  const [imageUrl, setImageUrl] = useState(null); // State to store image URL
  const [imageLoaded, setImageLoaded] = useState(false);
  const { currentUser } = useContext(CurrentUserContext); // Get logged-in User

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
  const handleImageError = () => setImageUrl("https://via.placeholder.com/150");

  const handleDelete = () => {
    console.log(item);
    if (!item || !item._id) {
      console.error("Item is missing _id", item);
      return;
    }

    onDelete(item);
  };

  const isOwn = currentUser && card.owner === currentUser?._id;

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img
            src={close}
            alt="close"
            className="modal__image modal__image_small_x"
          />
        </button>
        <img
          src={card.imageUrl}
          alt="Item Image"
          className="modal__image__item"
        />

        <div className="modal__footer">
          <div className="modal__caption-and-delete_button">
            <h2 className="modal__caption">{card.name}</h2>
            {isOwn && ( // Show Delete ONLY if user is the owner of this item
              <button className="modal__delete_button" onClick={handleDelete}>
                Delete item
              </button>
            )}
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
