import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__copyright">
          © 2024 Supersite Powered by News API
        </p>
        <nav className="footer__nav">
          <ul className="footer__nav-list">
            <li className="footer__nav-item">
              <Link to="/" className="footer__nav-link">
                Home
              </Link>
            </li>
            <li className="footer__nav-item">
              <Link to="/about" className="footer__nav-link">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
export default Footer;
