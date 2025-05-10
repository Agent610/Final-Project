import { useContext } from "react";
import "./Header.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";

function Header({ isLoggedIn, handleSigninClick }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <h1>News Explorer</h1>
      <li>
        <Link to="/">Home</Link>
      </li>
      <Navigation isLoggedIn={!!currentUser} />
      {!currentUser && (
        <button
          onClick={handleSigninClick}
          type="button"
          className="header__signIn"
        >
          Sign In
        </button>
      )}
    </header>
  );
}

export default Header;
