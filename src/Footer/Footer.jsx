import React from "react";
import "./footer.css";

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
              <a href="/" className="footer__nav-link">
                Home
              </a>
            </li>
            <li className="footer__nav-item">
              <a href="/about" className="footer__nav-link">
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
export default Footer;
