import React from "react";
import "./App.css";
import About from "../About/About";
// import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useState } from "react";
// import LoginModal from "../LoginModal/LoginModal";
//import Main from "../Main/Main";
// import ModalWithForm from "../ModalWithForm/ModalWithForm";
// import Navigation from "../Navigation/Navigation";
// import NewsCard from "../NewsCard/NewsCard";
// import Preloader from "../Preloader/Preloader";
// import RegisterModal from "../RegisterModal/RegisterModal";
import SearchForm from "../SearchForm/SearchForm";
//import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  //If logged in
  const [isLoggedIn, setLoggedIn] = useState(false);
  //SearchForm.jsx
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchForm, setShowSearchForm] = useState(true);
  const handleSearch = (query) => {
    console.log("Searching for:", query);
    setSearchResults([`Result for "${query}"`]);
  };
  const handleClose = () => {
    setShowSearchForm(false);
  };

  return (
    <>
      <div className="app"></div>
      <div className="app__content">
        <Header isLoggedIn={isLoggedIn} />
        <About></About>
      </div>

      <div>
        {showSearchForm ? (
          <SearchForm onSearch={handleSearch} onClose={handleClose} />
        ) : (
          <button onClick={() => setShowSearchForm(true)}>Search</button>
        )}
        <div>
          <h2>Search Results</h2>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
