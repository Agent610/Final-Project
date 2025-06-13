import { useContext } from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header({
  isLoggedIn,
  currentUser,
  handleSigninClick,
  handleSignoutClick,
}) {
  return (
    <header className="header">
      <h1 className="header__logo">News Explorer</h1>
      <Navigation
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        handleSigninClick={handleSigninClick}
        handleSignoutClick={handleSignoutClick}
      />
    </header>
  );
}

export default Header;
