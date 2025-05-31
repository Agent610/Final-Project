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
            //summary: article.summary,
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

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   if (searchTerm.trim() !== "") {
  //     fetchArticles(searchTerm);
  //   }
  // };

  // useEffect(() => {
  //   const saved = localStorage.getItem("savedArticles");
  //   if (saved) {
  //     setArticles(JSON.parse(saved));
  //   }
  // }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    const saved = localStorage.getItem("savedArticles");
    if (saved) {
      const parsed = JSON.parse(saved);
      const mapped = parsed.map((article) => ({
        title: article.title || "No title",
        description:
          article.description ||
          article.summary ||
          "No description/summary available for this article",
        date: article.date || new Date().toISOString(),
        source:
          typeof article.source === "object"
            ? article.source.name
            : article.source || "Unknown",
        link: article.link || article.url || "#",
        image:
          article.image ||
          article.urlToImage ||
          "https://via.placeholder.com/600*400?text=No+Image",
      }));
      setArticles(mapped);
    }
  }, [isLoggedIn]);

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
      {/* <form onSubmit={handleSearch} className="main__search-form">
        <input
          type="text"
          placeholder="Search news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form> */}

      <div className="main__children">{children}</div>

      <section className="main__search-results">
        {loading && <p>Loading...</p>}
        {error && <p>Error</p>}
        {articles.map((article, index) => (
          <NewsCard
            //key={article._id || index}
            key={index}
            title={article.title}
            //summary={article.summary}
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

      {/* <section className="main__about">
        <About />
      </section> */}
    </div>
  );
}
export default Main;
