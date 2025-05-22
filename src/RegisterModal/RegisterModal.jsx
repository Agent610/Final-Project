import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";
import { register } from "../../utils/auth";

const RegisterModal = ({ isOpen, onSubmit, onClose, handleSigninClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailOnChange = (e) => setEmail(e.target.value);
  const handlePasswordOnChange = (e) => setPassword(e.target.value);
  const handleUserNameOnChange = (e) => setUserName(e.target.value);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(email, password, userName);
      setIsRegistered(true);
      setEmail("");
      setPassword("");
      setUserName("");
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalWithForm
      title={isRegistered ? "" : "Sign Up"}
      buttonText={isRegistered ? "Close" : "Sign Up"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      isLoading={isLoading}
    >
      {isRegistered ? (
        <div className="registration-success">
          <p>Registration successfully completed !</p>
        </div>
      ) : (
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
            //to="login"
            onClick={handleSigninClick}
          >
            or Sign in{""}
          </button>
        </div>
      )}
    </ModalWithForm>
  );
};
export default RegisterModal;
