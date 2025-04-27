import "./Header.css";

function Header({ isLoggedIn }) {
  return (
    <header className="header">
      <h1>News Explorer</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/saved-articles">Saved Articles</a>
        <a href="/profile">{isLoggedIn ? "Sign out" : "Sign In"}</a>
      </nav>
    </header>
  );
}

export default Header;
