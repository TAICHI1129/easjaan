
async function loadArticles() {
  const status = document.getElementById("status");
  const list = document.getElementById("articles");

  try {
    const response = await fetch("../data/articles.json", {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Failed");
    }

    const articles = await response.json();
    list.replaceChildren();

    if (articles.length === 0) {
      status.textContent = "Non troved (404)";
      return;
    }

    for (const article of articles) {
      const item = document.createElement("li");
      const link = document.createElement("a");

      link.href = article.path;
      link.textContent = article.title;

      item.appendChild(link);
      list.appendChild(item);
    }

    status.textContent = "";
  } catch {
    status.textContent = "faile";
  }
}

loadArticles();
