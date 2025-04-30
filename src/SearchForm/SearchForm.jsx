import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError("Please enter a search term");
      return;
    }
    setError("");
    if (onSearch) onSearch(searchQuery);
    if (onClose) onClose();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter topic"
        className="search-input"
        value={searchQuery}
        onChange={handleInputChange}
      />
      {error && <p className="search-form__error">{error}</p>}
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
