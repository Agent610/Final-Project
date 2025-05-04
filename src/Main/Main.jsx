import React, { useState } from "react";
import "./Main.css";
import NewsCard from "../NewsCard/NewsCard.jsx";
import About from "../About/About.jsx";

function Main() {
  const [articles, setArticles] = useState([]);
  const handleSaveArticle = (title, link, summary, source, image) => {
    const savedArticle = {
      title,
      link,
      summary,
      source,
      image,
      date: new Date().toISOString(),
    };
    alert(`Article "${title}" saved!`);
  };

  return (
    <main className="main">
      <section className="search-results">
        {articles.map((article) => (
          <NewsCard
            key={article._id}
            title={article.title}
            summary={article.summary}
            date={article.date}
            source={article.source}
            link={article.link}
            image={article.image}
            isSaved={false}
            isLoggedIn={true}
            onSaveArticle={handleSaveArticle}
          />
        ))}
      </section>
      <section className="about">
        <About />
      </section>
    </main>
  );
}
export default Main;
