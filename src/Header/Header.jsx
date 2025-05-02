import { useContext } from "react";
import "./Header.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ isLoggedIn, handleSigninClick }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <h1>News Explorer</h1>
      <nav>
        <a href="/">Home</a>
        <button
          onClick={handleSigninClick}
          type="button"
          className="header__signIn"
        >
          Sign In
        </button>
        {isLoggedIn && <a href="/saved-articles">Saved Articles</a>}
      </nav>
    </header>
  );
}

export default Header;
