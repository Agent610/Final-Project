import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation({
  isLoggedIn,
  currentUser,
  handleSigninClick,
  handleSignoutClick,
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const SignInButton = () => (
    <button className="nav-list__button" onClick={handleSigninClick}>
      Sign in
    </button>
  );

  return (
    <nav className="navigation">
      <button className="hamburger-menu" onClick={toggleMenu}>
        {isMenuOpen ? (
          /*Close (X) icon */
          <div className="close-icon">
            <span className="close-icon__line"></span>
            <span className="close-icon__line"></span>{" "}
          </div>
        ) : (
          /*Hamburger menu lines */
          <>
            <span className="hamburger-menu__line"></span>
            <span className="hamburger-menu__line"></span>
            <span className="hamburger-menu__line"></span>
          </>
        )}
      </button>

      {/*Mobile menu */}
      {window.innerWidth <= 320 && (
        <div className={`mobile-menu ${isMenuOpen ? "mobile-menu-open" : ""}`}>
          <div className="mobile-menu__content">
            <ul className="mobile-menu__list">
              <li className="nav-list__item">
                <Link to="/" className="nav-list__link nav-list__link-home">
                  Home
                </Link>
              </li>
              {!isLoggedIn && (
                <li className="nav-list__item">
                  <SignInButton />
                </li>
              )}
              {isLoggedIn && (
                <>
                  <li className="nav-list__item">
                    <Link to="/saved-news" className="nav-list__link">
                      Saved Articles
                    </Link>
                  </li>
                  <li className="nav-list__item">
                    <button
                      className="nav-list__button"
                      onClick={handleSignoutClick}
                    >
                      {currentUser.name}
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Desktop Menu */}
      <ul className="nav-list">
        <li className="nav-list__item">
          <Link to="/" className="nav-list__link nav-list__link-home">
            Home
          </Link>
        </li>

        {isLoggedIn ? (
          /* Logged in state */
          <div className="nav-list__auth">
            <li className="nav-list__item">
              <Link to="/saved-news" className="nav-list__link">
                Saved Articles
              </Link>
            </li>
            <li className="nav-list__item">
              <button className="nav-list__button" onClick={handleSignoutClick}>
                {currentUser.name}
              </button>
            </li>
          </div>
        ) : (
          /* Logged out state */
          <div className="nav-list__auth">
            <li className="nav-list__item">
              <SignInButton />
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
