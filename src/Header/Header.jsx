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
        {isLoggedIn && <a href="/saved-articles">Saved Articles</a>}
        <a href="/profile">{isLoggedIn ? "Sign out" : "Sign In"}</a>
      </nav>
    </header>
  );
}

export default Header;
