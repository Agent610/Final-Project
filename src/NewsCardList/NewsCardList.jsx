import React, { useState } from "react";
import PropTypes from "prop-types";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

function NewsCardList({ articles }) {
  const [visibleCards, setVisibleCards] = useState(3);

  if (!articles || articles.length === 0) {
    return <p className="newscard-list__no-results">No articles found</p>;
  }

  const handleShowMore = () => {
    setVisibleCards((prev) => prev + 3);
  };

  return (
    <section className="newscard-list">
      <div className="newscard-list__container">
        {articles.slice(0, visibleCards).map((article) => (
          <NewsCard key={article.url} article={article} />
        ))}
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
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NewsCardList;
