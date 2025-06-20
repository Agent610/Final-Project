import { useContext } from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import { useLocation } from "react-router-dom";

function Header({
  isLoggedIn,
  currentUser,
  handleSigninClick,
  handleSignoutClick,
  showSearchForm,
  handleSearch,
  setShowSearchForm,
}) {
  const location = useLocation();
  const isNewsPage = location.pathname === "/saved-news";

  return (
    <header className={isNewsPage ? "header__saved-news" : "header"}>
      <div className="header__nav-bar">
        <h1 className={isNewsPage ? "header__saved-news-logo" : "header__logo"}>
          News Explorer
        </h1>

        <Navigation
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          handleSigninClick={handleSigninClick}
          handleSignoutClick={handleSignoutClick}
        />
      </div>

      {!isNewsPage && (
        <div>
          <h1 className="main__title">What's going on in the world ?</h1>
          <p className="main__info">
            Find the latest news on any topic and save them into your account
          </p>
          {showSearchForm ? (
            <SearchForm onSearch={handleSearch} />
          ) : (
            <button onClick={() => setShowSearchForm(true)}>Search</button>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
