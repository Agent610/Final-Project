import React from "react";
import NewsCardList from "../NewsCardList/NewsCardList";
import NewsCard from "../NewsCard/NewsCard";

const SavedNews = ({
  savedArticles,
  isLoggedIn,
  onSaveArticle,
  currentUser,
  onDeleteArticle,
}) => {
  const userName = currentUser?.name || "User";

  return (
    <div>
      <h2>
        {userName} , you have {savedArticles.length} saved articles{" "}
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
          onDeleteArticle={onDeleteArticle}
        />
      )}
    </div>
  );
};

export default SavedNews;
