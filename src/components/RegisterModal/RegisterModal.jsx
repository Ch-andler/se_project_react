import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  closeActiveModal,
  isOpen,
  onRegister,
  setActiveModal,
}) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Wait for the registration to complete
      await onRegister(name, avatar, email, password);
      // If registration is successful, close the modal
      closeActiveModal();
    } catch (error) {
      // Handle errors that occur during registration
      setErrorMessage("Registration failed. Please try again.");
      console.error("Registration failed: ", error);
    }
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      toggleModal={() => setActiveModal("login")}
      toggleText="or Log In"
    >
      <label htmlFor="regname" className="modal__label">
        Name *{" "}
        <input
          id="regname"
          type="text"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label htmlFor="regimageUrl" className="modal__label">
        Avatar URL *{" "}
        <input
          id="regimageUrl"
          type="url"
          className="modal__input"
          placeholder="Image URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
        />
      </label>
      <label htmlFor="email" className="modal__label">
        Email *{" "}
        <input
          id="email"
          type="email"
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label htmlFor="regpassword" className="modal__label">
        Password *
        <input
          id="regpassword"
          name="password"
          type="password"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
