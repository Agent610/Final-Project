import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
      <ul className="nav-list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/saved-news">Saved Articles</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
