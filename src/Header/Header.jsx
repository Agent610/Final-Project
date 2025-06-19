import { useContext } from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";

function Header({
  isLoggedIn,
  currentUser,
  handleSigninClick,
  handleSignoutClick,
  showSearchForm,
  handleSearch,
  setShowSearchForm,
}) {
  return (
    <header className="header">
      <div className="header__nav-bar">
        <h1 className="header__logo">News Explorer</h1>

        <Navigation
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          handleSigninClick={handleSigninClick}
          handleSignoutClick={handleSignoutClick}
        />
      </div>

      <h1 className="main__title">What's going on in the world ?</h1>
      <p className="main__info">
        Find the latest news on any topic and save them into your account
      </p>
      {showSearchForm ? (
        <SearchForm onSearch={handleSearch} />
      ) : (
        <button onClick={() => setShowSearchForm(true)}>Search</button>
      )}
    </header>
  );
}

export default Header;
