import React from "react";
import "./RegistrationSuccess.css";

function RegistrationSuccess({ onClose, handleSigninClick }) {
  return (
    <div className="modal modal_opened">
      <div className="registration-success__modal">
        <button
          className="modal__close-button"
          aria-label="Close"
          onClick={onClose}
        />
        <h2 className="registration-success__message">
          Registration successfully <br />
          completed!
        </h2>
        <button
          onClick={handleSigninClick}
          className="registration-success__button"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default RegistrationSuccess;
