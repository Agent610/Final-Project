import "./MobileModal.css";
import { Link } from "react-router-dom";
import CloseButton from "../../images/close.svg";

const MobileModal = ({ isOpen, onClose, handleSigninClick }) => {
  return (
    <div className={`modal modal-mobile ${isOpen ? "modal_opened" : ""}`}>
      <div className="mobile">
        <button className="mobile__close" onClick={onClose}>
          <img
            src={CloseButton}
            alt="Close-button"
            className="mobile__close-button"
          />
        </button>
        <Link to="/" className="mobile__link" onClick={onClose}>
          Home
        </Link>
        <button
          type="button"
          className="mobile__button"
          onClick={handleSigninClick}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default MobileModal;
