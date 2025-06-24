//import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./MobileModal.css";
import { Link } from "react-router-dom";

const MobileModal = ({ isOpen, onClose, handleSigninClick }) => {
  return (
    <div className={`modal modal-mobile ${isOpen ? "modal_opened" : ""}`}>
      <div className="mobile">
        <button className="mobile__close" onClick={onClose}>
          close
        </button>
        <Link to="/" className="mobile__link" onClick={onClose}>
          Home
        </Link>
        <button
          type="button"
          className="mobile__button"
          onClick={handleSigninClick}
          //   disabled={!isFormValid || isLoading}
        >
          {/* {isLoading ? "Signing in ..." : "Sign in"} */}
        </button>
      </div>
    </div>
  );
};

export default MobileModal;
