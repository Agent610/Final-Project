import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

const RegisterModal = ({ isOpen, onSubmit, onClose, handleSigninClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  //errors
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    userName: "",
  });

  const handleEmailOnChange = (e) => setEmail(e.target.value);
  const handlePasswordOnChange = (e) => setPassword(e.target.value);
  const handleUserNameOnChange = (e) => setUserName(e.target.value);

  function handleFormSubmit(e) {
    e.preventDefault();
    onSubmit({ email, password, userName });
  }

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
    >
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
        to="login"
        onClick={handleSigninClick}
      >
        or Sign in{""}
      </button>
    </ModalWithForm>
  );
};
export default RegisterModal;
