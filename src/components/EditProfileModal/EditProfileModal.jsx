import { useState, useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { updateUserProfile } from "../../utils/api";

function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");

  useEffect(() => {
    if (isOpen) {
      setName(currentUser?.name || "");
      setAvatar(currentUser?.avatar || "");
    }
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");

    if (!token) {
      console.error("No token found. user not authenticated.");
      return;
    }

    updateUserProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        onUpdateUser(updatedUser);
        onClose();
      })
      .catch((err) => console.error("Error updating profile:", err));
  };

  return (
    <ModalWithForm
      title="Change Profile Data"
      buttonText="Save"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="editname" className="modal__label">
        Name:{" "}
        <input
          id="editname"
          type="text"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label htmlFor="editImageUrl" className="modal__label">
        Avatar URL:{" "}
        <input
          id="editImageUrl"
          type="Url"
          className="modal__input"
          placeholder="Image URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
