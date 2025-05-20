import React, { useState } from "react";
import PropTypes from "prop-types";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

function NewsCardList({ articles, isLoggedIn, onSaveArticle, savedArticles }) {
  const [visibleCards, setVisibleCards] = useState(3);

  if (!articles || articles.length === 0) {
    return <p className="newscard-list__no-results">No articles found</p>;
  }

  const handleShowMore = () => {
    setVisibleCards((prev) => prev + 3);
  };

  const checkIfArticleIsSaved = (article) => {
    return savedArticles.some((saved) => saved.url === article.url);
  };

  return (
    <section className="newscard-list">
      <div className="newscard-list__container">
        {articles.slice(0, visibleCards).map((article) => {
          return (
            <NewsCard
              key={article.url}
              title={article.title}
              summary={article.summary}
              date={new Date(article.publishedAt).toLocaleDateString()}
              source={article.source.name}
              link={article.url}
              image={article.urlToImage}
              isSaved={checkIfArticleIsSaved(article)}
              isLoggedIn={isLoggedIn}
              onSaveArticle={onSaveArticle}
            />
          );
        })}
      </div>
      {visibleCards < articles.length && (
        <button className="newscard-list__show-more" onClick={handleShowMore}>
          Show more
        </button>
      )}
    </section>
  );
}

NewsCardList.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      summary: PropTypes.string,
      publishedAt: PropTypes.string,
      source: PropTypes.shape({ name: PropTypes.string }),
      url: PropTypes.string,
      urlToImage: PropTypes.string,
    })
  ).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onSaveArticle: PropTypes.func.isRequired,
  savedArticles: PropTypes.array.isRequired,
};

export default NewsCardList;
