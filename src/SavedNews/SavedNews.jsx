import React from "react";
import NewsCardList from "../NewsCardList/NewsCardList";

const SavedNews = ({
  savedArticles,
  isLoggedIn,
  onSaveArticle,
  currentUser,
}) => {
  const userName = currentUser?.name || "User";

  return (
    <div>
      <h2>
        {userName} has {savedArticles.length} saved{" "}
        {savedArticles.length === 1 ? "article" : "articles"}
      </h2>

      {savedArticles.length === 0 ? (
        <p>You haven't saved any articles </p>
      ) : (
        <NewsCardList
          articles={savedArticles}
          isLoggedIn={isLoggedIn}
          onSaveArticle={onSaveArticle}
          savedArticles={savedArticles}
        />
      )}
    </div>
  );
};

export default SavedNews;
