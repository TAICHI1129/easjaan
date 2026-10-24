
"use strict";

const list = document.getElementById("articles");
const status = document.getElementById("list-status");

async function loadArticles() {
  try {
    const response = await fetch("../data/articles.json", {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const articles = await response.json();

    if (!Array.isArray(articles)) {
      throw new Error("Invalid article data");
    }

    articles.sort((a, b) => a.number - b.number);

    if (articles.length === 0) {
      status.textContent = "No articles yet.";
      return;
    }

    const fragment = document.createDocumentFragment();

    for (const article of articles) {
      if (
        !Number.isInteger(article.number) ||
        typeof article.title !== "string" ||
        typeof article.path !== "string" ||
        !/^\.\/[^/]+\.html$/.test(article.path)
      ) {
        continue;
      }

      const item = document.createElement("li");
      const link = document.createElement("a");
      const number = document.createElement("span");
      const title = document.createElement("span");
      const arrow = document.createElement("span");

      number.className = "article-number";
      number.textContent = String(article.number).padStart(2, "0");

      title.className = "article-name";
      title.textContent = article.title;

      arrow.className = "article-arrow";
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "↗";

      link.href = article.path;
      link.append(number, title, arrow);
      item.append(link);
      fragment.append(item);
    }

    list.append(fragment);

    status.textContent = list.children.length
      ? `${list.children.length} article(s)`
      : "No articles yet.";
  } catch (error) {
    console.error("Unable to load articles:", error);
    status.textContent = "faile";
  }
}

loadArticles();
