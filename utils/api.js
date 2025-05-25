export const baseUrl = "http://localhost:3000";

const token = localStorage.getItem("jwt");

const API_KEY = "fb6cff6571004bdb8d9f0274dc7989a1";
const News_URL = "https://newsapi.org/v2/everything";

//Getting the article(s)
export function getItems() {
  return new Promise((resolve) => {
    const saved = localStorage.getItem("savedArticles");
    const items = saved ? JSON.parse(saved) : [];
    resolve(items);
  });
}

//Saving article
export function saveArticle(article) {
  return new Promise((resolve) => {
    const existing = JSON.parse(localStorage.getItem("savedArticles")) || [];

    const newArticle = {
      ...article,
      _id: crypto.randomUUID(),
      savedAt: new Date().toISOString(),
    };
    existing.push(newArticle);
    localStorage.setItem("savedArticles", JSON.stringify(existing));
    resolve(newArticle);
  });
}

// Deleting article
export function deleteArticle(articleId) {
  return new Promise((resolve) => {
    let items = JSON.parse(localStorage.getItem("savedArticles")) || [];
    items = items.filter((item) => item._id !== articleId);
    localStorage.setItem("savedArticles", JSON.stringify(items));
    resolve({ message: "Article was deleted", articleId });
  });
}

// Search query function
export function searchNews(query) {
  const url = `${News_URL}?q=${encodeURIComponent(query)}&apiKey=${API_KEY}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Please enter a keyword : ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => data.articles)
    .catch((error) => {
      console.error(
        "Sorry, something went wrong during the request. Please try again later.",
        error
      );
      throw error;
    });
}

const api = {
  getItems,
  saveArticle,
  deleteArticle,
  searchNews,
};

export default api;

export function handleServerResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}
