import React from "react";
import NewsCardList from "../NewsCardList/NewsCardList";
import NewsCard from "../NewsCard/NewsCard";
import "./SavedNews.css";

const SavedNews = ({
  savedArticles,
  isLoggedIn,
  onSaveArticle,
  currentUser,
  onDeleteArticle,
}) => {
  const userName = currentUser?.name || "User";

  const normalizedSavedArticles = savedArticles.map((article) => ({
    ...article,
    publishedAt:
      article.date || article.publishedAt || new Date().toISOString(),
  }));

  return (
    <main className="saved-news-page">
      <div className="saved-news-header">
        <h2>
          {userName} , you have {savedArticles.length} saved{" "}
          {savedArticles.length === 1 ? "article" : "articles"}
        </h2>
      </div>

      {savedArticles.length === 0 ? (
        <p>You haven't saved any articles </p>
      ) : (
        <NewsCardList
          articles={normalizedSavedArticles}
          isLoggedIn={isLoggedIn}
          onSaveArticle={onSaveArticle}
          savedArticles={savedArticles}
          onDeleteArticle={onDeleteArticle}
        />
      )}
    </main>
  );
};

export default SavedNews;
