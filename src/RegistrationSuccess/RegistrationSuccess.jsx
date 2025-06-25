import React from "react";
import "./RegistrationSuccess.css";

function RegistrationSuccess({ onClose }) {
  return (
    <div className="registration-success">
      <div className="registration-success__content">
        <h2>Registration successfully completed!</h2>
        <button onClick={onClose} className="registration-success__button">
          Sign In
        </button>
      </div>
    </div>
  );
}

export default RegistrationSuccess;
