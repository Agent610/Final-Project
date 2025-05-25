import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";
import { register } from "../../utils/auth";

const RegisterModal = ({ isOpen, onSubmit, onClose, handleSigninClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const handleEmailOnChange = (e) => setEmail(e.target.value);
  const handlePasswordOnChange = (e) => setPassword(e.target.value);
  const handleUserNameOnChange = (e) => setUserName(e.target.value);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit({ email, password, userName });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
    >
      <div>
        <label htmlFor="register-email" className="modal__label">
          Email{""}
          <input
            type="email"
            className="modal__input"
            id="register-email"
            placeholder="Enter email"
            onChange={handleEmailOnChange}
            value={email}
            required
          />
        </label>
        <label htmlFor="register-password" className="modal__label">
          Password{""}
          <input
            type="password"
            className="modal__input"
            id="register-password"
            placeholder="Enter password"
            onChange={handlePasswordOnChange}
            value={password}
            required
          />
        </label>
        <label htmlFor="register-username" className="modal__label">
          Username{""}
          <input
            type="text"
            className="modal__input"
            id="register-username"
            placeholder="Enter your username"
            onChange={handleUserNameOnChange}
            value={userName}
            required
          />
        </label>
        <button
          type="button"
          className="register__link"
          onClick={handleSigninClick}
        >
          or Sign in{""}
        </button>
      </div>
      <button type="submit" className="modal__submit">
        Signup
      </button>
    </ModalWithForm>
  );
};
export default RegisterModal;
