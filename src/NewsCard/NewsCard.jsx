import React from "react";
import PropTypes from "prop-types";
import "./NewsCard.css";

function NewsCard({
  title,
  summary,
  date,
  source,
  link,
  image,
  isSaved,
  isLoggedIn,
  onSaveArticle,
}) {
  return (
    <article className="news-card">
      <div className="news-card__image-container">
        <img src={image} alt={title} className="news-card__image" />
      </div>
      <div className="news-card__content">
        <p className="news-card__date">{date}</p>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__summary">{summary}</p>
        <div className="news-card__footer">
          <span className="news-card__source">{source}</span>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="news-card__link"
          >
            Show more
          </a>
          {isLoggedIn && (
            <button
              className={`news-card__save-button ${
                isSaved ? "news-card__save-button_saved" : ""
              }`}
              onClick={() => onSaveArticle(title, link, summary, source, image)}
            >
              {isSaved ? "Remove from saved" : "Save Article"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

//PropTypes Validation information:

NewsCard.propTypes = {
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isSaved: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onSaveArticle: PropTypes.func.isRequired,
};
export default NewsCard;
