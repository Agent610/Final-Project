import { useContext } from "react";
import "./Header.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ isLoggedIn, handleSigninClick }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <h1>News Explorer</h1>
      {/* <div className="header__container">
        <div className="header__user-container">
          {!isLoggedIn ? (
            <div className="header__user">
            </div>
          ) : null}
        </div>
      </div> */}
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
        {/* <a href="/profile">{isLoggedIn ? "Sign out" : "Sign In"}</a> */}
      </nav>
    </header>
  );
}

export default Header;
