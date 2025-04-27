import React from "react";
import "./App.css";
// import About from "../About/About";
// import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useState } from "react";
// import LoginModal from "../LoginModal/LoginModal";
// import Main from "../Main/Main";
// import ModalWithForm from "../ModalWithForm/ModalWithForm";
// import Navigation from "../Navigation/Navigation";
// import NewsCard from "../NewsCard/NewsCard";
// import Preloader from "../Preloader/Preloader";
// import RegisterModal from "../RegisterModal/RegisterModal";
// import SearchForm from "../SearchForm/SearchForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <div className="app"></div>
      <div className="app__content">
        <Header isLoggedIn={isLoggedIn} />
      </div>
    </>
  );
}

export default App;
