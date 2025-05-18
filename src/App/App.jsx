import React from "react";
import "./App.css";
import About from "../About/About";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
//import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Navigation from "../Navigation/Navigation";
// import NewsCard from "../NewsCard/NewsCard";
// import Preloader from "../Preloader/Preloader";
import RegisterModal from "../RegisterModal/RegisterModal";
import SearchForm from "../SearchForm/SearchForm";
//import CurrentUserContext from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewsCardList from "../NewsCardList/NewsCardList";

function App() {
  //If logged in
  const [isLoggedIn, setLoggedIn] = useState(false);
  //SearchForm.jsx
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchForm, setShowSearchForm] = useState(true);

  //Modals
  const [activeModal, setActiveModal] = useState("");
  const handleActiveModal = (modal) => {
    console.log("modal being set to open", modal);
    setActiveModal(modal);
  };
  const handleCloseModal = () => {
    setActiveModal("");
  };

  // React.useEffect(() => {
  //   if (activeModal) {
  //     // Handle Escape Key
  //     const handleEscape = (event) => {
  //       if (event.key === "Escape") {
  //         handleCloseModal();
  //       }
  //     };

  //     // Handle click outside key
  //     const handleClickOutside = (event) => {
  //       if (event.target.classList.contains("modal")) {
  //         handleCloseModal();
  //       }
  //     };

  //     // Event Listenters
  //     document.addEventListener("keydown", handleEscape);
  //     document.addEventListener("mousedown", handleClickOutside);

  //     return () => {
  //       document.removeEventListener("keydown", handleEscape);
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }
  // }, [activeModal]);

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    const mockArticles = [
      {
        title: `News about "${query}"`,
        description: "Sample",
        url: "https://Testing.com",
        urlToImage: "https://via.image.com/300",
        publishedAt: new Date().toISOString(),
        source: { name: "Sample Source" },
      },
    ];
    setSearchResults(mockArticles);
    setShowSearchForm(false);
  };

  const handleLogin = ({ email, password }) => {
    // fire "fake" api functionality to simulate signin.
  };

  const handleRegister = ({ email, password, userName }) => {
    // fire "fake" api functionality to simulate register
  };

  return (
    <BrowserRouter>
      <div className="app">
        <div className="app__content">
          <Header
            isLoggedIn={isLoggedIn}
            //currentUser={currentUser}
            handleSigninClick={() => handleActiveModal("login")}
          />
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
                    <NewsCardList articles={searchResults} />
                    <ul>
                      {searchResults.map((result, index) => (
                        <li key={index}>{result}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              }
            />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer></Footer>

          <LoginModal
            isOpen={activeModal === "login"}
            onSubmit={handleLogin}
            onClose={handleCloseModal}
            handleSignupClick={() => handleActiveModal("register")}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onSubmit={handleRegister}
            onClose={handleCloseModal}
            handleSigninClick={() => handleActiveModal("login")}
          />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

//Escape button
// function closeWithEsc(event) {
//   if (event.key === "Escape") {
//     const modal = document.querySelector(".modal_opened");
//     closeModal(modal);
//   }
// }

// function closeModalOnRemoteClick(event) {
//   if (event.target === event.currentTarget) {
//     closeModal(event.currentTarget);
//   }
// }

// function openModal(modal) {
//   // add class to modal
//   document.addEventListener("keydown", closeWithEsc);
//   modal.addEventListener("mousedown", closeModalOnRemoteClick);
//   modal.classList.add("modal_opened");
// }

// function closeModal(modal) {
//   //remove class from modal
//   document.removeEventListener("keydown", closeWithEsc);
//   modal.removeEventListener("mousedown", closeModalOnRemoteClick);
//   modal.classList.remove("modal_opened");
// }
