import React from "react";
import "./ConfirmationModal.css"; // Style the modal

function ConfirmationModal({ active, onConfirm, onCancel, itemName }) {
  if (!active) return null;

  return (
    <div className="confirmation-modal">
      <div className="confirmation-modal__content">
        <h3>Are you sure you want to delete {itemName}?</h3>
        <div className="confirmation-modal__actions">
          <button onClick={onConfirm} className="confirmation-modal__confirm">
            Yes, Delete
          </button>
          <button onClick={onCancel} className="confirmation-modal__cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
