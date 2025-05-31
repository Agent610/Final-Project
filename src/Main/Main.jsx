import React, { useEffect, useState } from "react";
import "./Main.css";
import NewsCard from "../NewsCard/NewsCard.jsx";
//import About from "../About/About.jsx";

function Main({ isLoggedIn, children }) {
  const [articles, setArticles] = useState([]);
  //const [searchTerm, setSearchTerm] = useState([]);
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
            description: article.description,
            date: article.publishedAt,
            source: article.source.name,
            link: article.url,
            image: article.urlToImage,
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

  const handleSaveArticle = (title, link, description, source, image) => {
    if (!isLoggedIn) {
      alert("You must be logged in to save articles.");
      return;
    }

    const savedArticle = {
      title,
      link,
      description,
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

  const handleDeleteArticle = (link) => {
    if (!isLoggedIn) return;

    const existing = JSON.parse(localStorage.getItem("savedArticles")) || [];
    const updatedArticles = existing.filter((article) => article.link !== link);
    localStorage.setItem("savedArticles", JSON.stringify(updatedArticles));
    setArticles(updatedArticles);
    alert("Article was removed");
  };

  return (
    <div className="main">
      <div className="main__children">{children}</div>

      <section className="main__search-results">
        {loading && <p>Loading...</p>}
        {error && <p>Error</p>}
        {articles.map((article, index) => (
          <NewsCard
            key={index}
            title={article.title}
            description={article.description}
            date={new Date(article.date).toLocaleDateString()}
            source={article.source}
            link={article.link}
            image={article.image}
            isSaved={false}
            isLoggedIn={isLoggedIn}
            onSaveArticle={handleSaveArticle}
            onDeleteArticle={handleDeleteArticle}
          />
        ))}
      </section>
    </div>
  );
}
export default Main;
