import { useState } from "react";
import "./SearchForm.css";

function SearchForm() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <form className="search-form">
      <input
        type="text"
        placeholder="Enter topic"
        className="search-input"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button type="submit" placeholder="search-button">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
