import React from "react";
import "./App.css";
import About from "../About/About";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Navigation from "../Navigation/Navigation";
import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/Preloader";
import RegisterModal from "../RegisterModal/RegisterModal";
import SearchForm from "../SearchForm/SearchForm";
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NewsCardList from "../NewsCardList/NewsCardList";
import {
  login,
  register,
  checkToken,
  setToken,
  getToken,
  removeToken,
} from "../../utils/auth";
import { getItems, saveArticle, deleteArticle } from "../../utils/api";
import { searchNews } from "../../utils/news";
import SavedNews from "../SavedNews/SavedNews";

function App() {
  const location = useLocation();

  // User
  const [currentUser, setCurrentUser] = useState({});

  //If logged in
  const [isLoggedIn, setLoggedIn] = useState(false);
  //SearchForm.jsx
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(true);
  const [message, setMessage] = useState("");

  //Modals
  const [activeModal, setActiveModal] = useState("");

  const handleCloseModal = () => {
    setActiveModal("");
  };

  React.useEffect(() => {
    if (activeModal) {
      // Handle Escape Key
      const handleEscape = (event) => {
        if (event.key === "Escape") {
          handleCloseModal();
        }
      };

      // Handle click outside key
      const handleClickOutside = (event) => {
        if (event.target.classList.contains("modal")) {
          handleCloseModal();
        }
      };

      // Event Listenters
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [activeModal]);

  //Article work
  const handleSearch = (query) => {
    setIsSearchLoading(true);
    setHasSearched(true);

    searchNews(query)
      .then((response) => {
        setSearchResults(response);
        setShowSearchForm(false);
      })
      .catch((error) => {
        console.error("Error loading news:", error);
        setSearchResults([]);
      })
      .finally(() => {
        setIsSearchLoading(false);
      });
  };

  //Article save functionality
  const [savedArticles, setSavedArticles] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const handleSaveArticle = (title, link, description, source, image) => {
    if (!isLoggedIn) {
      return;
    }

    const alreadySaved = savedArticles.some((article) => article.url === link);

    if (alreadySaved) {
      setSavedArticles((prev) =>
        prev.filter((article) => article.url !== link)
      );
    } else {
      setSavedArticles((prev) => [
        ...prev,
        {
          title,
          url: link,
          description: description,
          source: { name: source },
          urlToImage: image,
        },
      ]);
    }
  };

  const handleDeleteArticle = (link) => {
    if (!isLoggedIn) {
      return;
    }

    setSavedArticles((prev) => prev.filter((article) => article.url !== link));
  };

  //Authentication

  const handleLogin = ({ email, password }) => {
    setIsAuthLoading(true);

    login({ email, password })
      .then((response) => {
        if (response.token) {
          setToken(response.token);
          setLoggedIn(true);
          setCurrentUser(response.user);
          localStorage.setItem("currentUser", JSON.stringify(response.user));
          handleCloseModal();
        }
      })
      .catch((error) => {
        console.error("Login failed", error);
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  };

  const handleRegister = ({ email, password, userName }) => {
    setIsAuthLoading(true);

    register({ email, password, userName })
      .then((response) => {
        if (response) {
          setMessage("Registration successfully completed !");
          setActiveModal("registerSuccess");
          setTimeout(() => {
            setActiveModal("login");
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Registration failed", error);
        setMessage("Registration failed");
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  };

  const handleSignoutClick = () => {
    removeToken();
    setLoggedIn(false);
  };

  React.useEffect(() => {
    const token = getToken();
    const savedUser = localStorage.getItem("currentUser");

    if (token && savedUser) {
      setLoggedIn(true);
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const [isSavedArticlesLoaded, setIsSavedArticlesLoaded] = useState(false);

  React.useEffect(() => {
    if (isSavedArticlesLoaded) {
      localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
    }
  }, [savedArticles, isSavedArticlesLoaded]);

  React.useEffect(() => {
    const saved = localStorage.getItem("savedArticles");
    if (saved) {
      setSavedArticles(JSON.parse(saved));
    }
    setIsSavedArticlesLoaded(true);
  }, []);

  //Preloader
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  //Location in the App

  return (
    <div className="app">
      {isSearchLoading && (
        <div className="modal">
          <div className="modal__content modal_opened">
            <Preloader />
            <p>Loading ...</p>
          </div>
        </div>
      )}
      <div className="app__content">
        <Header
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          handleSigninClick={() => setActiveModal("login")}
          handleSignoutClick={handleSignoutClick}
          showSearchForm={showSearchForm}
          handleSearch={handleSearch}
          setShowSearchForm={setShowSearchForm}
        />

        <Main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {hasSearched && (
                    <>
                      <h2 className="search__title">Search Results</h2>
                      <NewsCardList
                        articles={searchResults}
                        isLoggedIn={isLoggedIn}
                        onSaveArticle={handleSaveArticle}
                        savedArticles={savedArticles}
                        onDeleteArticle={handleDeleteArticle}
                      />
                    </>
                  )}
                  <About />
                </>
              }
            />
            {/* <Route path="/about" element={<About />} /> */}
            <Route
              path="/saved-news"
              element={
                <SavedNews
                  savedArticles={savedArticles}
                  isLoggedIn={isLoggedIn}
                  onSaveArticle={handleSaveArticle}
                  currentUser={currentUser}
                  onDeleteArticle={handleDeleteArticle}
                />
              }
            />
          </Routes>
          {/* {location.pathname === "/" && <About />} */}
        </Main>

        <Footer></Footer>

        {activeModal === "registerSuccess" && (
          <div className="modal modal_opened">
            <div className="modal__content">
              <p>Registration successfully completed !</p>
            </div>
          </div>
        )}

        <LoginModal
          isOpen={activeModal === "login"}
          onSubmit={handleLogin}
          onClose={handleCloseModal}
          handleSignupClick={() => setActiveModal("register")}
        />
        <RegisterModal
          isOpen={activeModal === "register"}
          onSubmit={handleRegister}
          onClose={handleCloseModal}
          handleSigninClick={() => setActiveModal("login")}
        />
      </div>
    </div>
  );
}

export default App;
