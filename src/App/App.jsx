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
//import CurrentUserContext from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewsCardList from "../NewsCardList/NewsCardList";
import { getToken, login, register, removeToken } from "../../utils/auth";

function App() {
  //If logged in
  const [isLoggedIn, setLoggedIn] = useState(false);
  //SearchForm.jsx
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchForm, setShowSearchForm] = useState(true);

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
    console.log("Searching for:", query);
    setIsLoading(true);

    setTimeout(() => {
      const mockArticles = [
        {
          title: `News about "${query}"`,
          summary: "Sample",
          url: "https://Testing.com",
          urlToImage: "https://placehold.co/600x400",
          publishedAt: new Date().toISOString(),
          source: { name: "Sample Source" },
        },
      ];
      setSearchResults(mockArticles);
      setShowSearchForm(false);
      setIsLoading(false);
    }, 2000);
  };

  const [savedArticles, setSavedArticles] = useState([]);
  const handleSaveArticle = (title, link, summary, source, image) => {
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
          summary: summary,
          source: { name: source },
          urlToImage: image,
        },
      ]);
    }
  };
  //Authentication

  const handleLogin = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const response = await login(email, password);
      if (response.token) {
        setToken(response.token);
        setLoggedIn(true);
        handleCloseModal();
      }
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async ({ email, password, userName }) => {
    setIsLoading(true);
    try {
      const response = await register(email, password, userName);
      if (response.message) {
        setActiveModal("registerSuccess");
      }
      setTimeout(() => {
        setActiveModal("login");
      }, 2000);
    } catch (error) {
      console.error("Registration failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignoutClick = () => {
    removeToken();
    setLoggedIn(false);
  };

  //Preloader
  const [isLoading, setIsLoading] = useState(false);

  return (
    <BrowserRouter>
      <div className="app">
        {isLoading && <Preloader />}
        <div className="app__content">
          <Header
            isLoggedIn={isLoggedIn}
            //currentUser={currentUser}
            handleSigninClick={() => setActiveModal("login")}
            handleSignoutClick={handleSignoutClick}
          />
          <Main isLoggedIn={isLoggedIn}>
            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    {showSearchForm ? (
                      <SearchForm onSearch={handleSearch} />
                    ) : (
                      <button onClick={() => setShowSearchForm(true)}>
                        Search
                      </button>
                    )}
                    <div>
                      <h2>Search Results</h2>
                      <NewsCardList
                        articles={searchResults}
                        isLoggedIn={isLoggedIn}
                        onSaveArticle={handleSaveArticle}
                        savedArticles={savedArticles}
                      />
                      {/* <ul>
                        {searchResults.map((result, index) => (
                          <li key={index}>{result}</li>
                        ))}
                      </ul> */}
                    </div>
                  </div>
                }
              />
              <Route path="/about" element={<About />} />
            </Routes>
          </Main>
          <Footer></Footer>

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
    </BrowserRouter>
  );
}

export default App;
