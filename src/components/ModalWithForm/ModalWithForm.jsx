import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  toggleModal,
  toggleText,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <form className="modal__form" onSubmit={onSubmit}>
          {" "}
          {}
          {children}
          <div className="modal__submit_container">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
            {toggleModal && (
              <button
                type="button"
                className="modal__toggle"
                onClick={toggleModal}
              >
                {toggleText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
