import React from "react";
import "./ItemModal.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
/* import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal"; */

import { useEffect, useState } from "react";
import close from "../../assets/close-button.svg";

function ItemModal({
  activeModal,
  onClose,
  closeActiveModal,
  card = {},
  item,
  handleDeleteItem,
}) {
  const [imageUrl, setImageUrl] = useState(
    card?.imageUrl || "https://via.placeholder.com/150"
  );

  const [imageLoaded, setImageLoaded] = useState(false);
  const { currentUser } = useContext(CurrentUserContext); // Get logged-in User

  useEffect(() => {
    if (card?.imageUrl) {
      setImageUrl(card.imageUrl);
    }
  }, [card]); // Runs whenever `card` changes

  const handleDelete = () => {
    handleDeleteItem(card._id);
  };

  const isOwn = currentUser && card.owner === currentUser?._id;

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="close" />
        </button>
        <img src={imageUrl} alt="Item Image" className="modal__image__item" />

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
