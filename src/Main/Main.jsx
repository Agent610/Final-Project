import React, { useEffect, useState } from "react";
import "./Main.css";
import NewsCard from "../NewsCard/NewsCard.jsx";
import About from "../About/About.jsx";

function Main({ isLoggedIn }) {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState([]);

  const fetchArticles = async (query) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=Key;`
      );
      const data = await response.json();
      if (data.articles) {
        setArticles(
          data.articles.map((article) => ({
            title: article.title,
            summary: article.summary,
            date: article.date,
            source: article.source,
            link: article.link,
            image: article.image,
          }))
        );
      } else {
        setError("No articles found");
      }
    } catch (err) {
      setError("Error fetching articles");
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      fetchArticles(searchTerm);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("savedArticles");
    if (saved) {
      setArticles(JSON.parse(saved));
    }
  }, []);

  const handleSaveArticle = (title, link, summary, source, image) => {
    if (!isLoggedIn) {
      alert("You must be logged in to save articles.");
      return;
    }

    const savedArticle = {
      title,
      link,
      summary,
      source,
      image,
      date: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("savedArticles")) || [];
    const updatedArticles = [...existing, savedArticle];
    localStorage.setItem("savedArticles", JSON.stringify(updatedArticles));
    setArticles(updatedArticles);

    alert(`Article "${title}" saved!`);
  };

  return (
    <main className="main">
      <form onSubmit={handleSearch} className="main__search-form">
        <input
          type="text"
          placeholder="Search news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <section className="main__search-results">
        {loading && <p>Loading...</p>}
        {error && <p>Error</p>}
        {articles.map((article, index) => (
          <NewsCard
            key={article._id || index}
            title={article.title}
            summary={article.summary}
            date={article.date}
            source={article.source}
            link={article.link}
            image={article.image}
            isSaved={false}
            isLoggedIn={isLoggedIn}
            onSaveArticle={handleSaveArticle}
          />
        ))}
      </section>
      <section className="main__about">
        <About />
      </section>
    </main>
  );
}
export default Main;
