const colorMap = {
  coral: "#f47d65",
  mint: "#6fc5a5",
  sky: "#66b9d9",
  violet: "#9b87d5"
};

const categoryIcons = {
  "つくる": "🎨",
  "くらべる": "⚖️",
  "しらべる": "🔎",
  "ためす": "🧪"
};

const grid = document.querySelector("#idea-grid");
const resultCount = document.querySelector("#result-count");
const emptyMessage = document.querySelector("#empty-message");
const searchInput = document.querySelector("#idea-search");
let activeCategory = "all";

function createCard(idea) {
  const article = document.createElement("article");
  article.className = "idea-card";
  article.style.setProperty("--card-color", colorMap[idea.color]);
  const fieldMeta = idea.field ? `<span>📖 ${idea.field}</span>` : "";
  article.innerHTML = `
    <div class="card-visual">
      <span class="card-category">${categoryIcons[idea.category]} ${idea.category}</span>
      <span class="card-icon" aria-hidden="true">${idea.icon}</span>
    </div>
    <div class="card-body">
      <h3>${idea.title}</h3>
      <p class="card-catchphrase">${idea.catchphrase}</p>
      <div class="card-meta">
        ${fieldMeta}
        <span>🎒 ${idea.grades}</span>
        <span>🕐 ${idea.days}</span>
        <span>★ ${idea.difficulty}</span>
      </div>
      <a class="card-link" href="detail.html?id=${encodeURIComponent(idea.id)}" aria-label="${idea.title}の詳しい進め方を見る">
        詳しい進め方を見る <span aria-hidden="true">→</span>
      </a>
    </div>
  `;
  return article;
}

function renderIdeas() {
  const query = searchInput.value.trim().toLocaleLowerCase("ja");
  const visibleIdeas = RESEARCH_IDEAS.filter((idea) => {
    const matchesCategory = activeCategory === "all" || idea.category === activeCategory;
    const searchableText = [
      idea.title,
      idea.field,
      idea.catchphrase,
      idea.summary,
      idea.question
    ].filter(Boolean).join(" ").toLocaleLowerCase("ja");
    return matchesCategory && (!query || searchableText.includes(query));
  });

  grid.replaceChildren(...visibleIdeas.map(createCard));
  resultCount.textContent = String(visibleIdeas.length);
  emptyMessage.hidden = visibleIdeas.length > 0;
}

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".filter.active")?.classList.remove("active");
    button.classList.add("active");
    activeCategory = button.dataset.category;
    renderIdeas();
  });
});

searchInput.addEventListener("input", renderIdeas);
document.querySelector("#hero-idea-count").textContent = String(RESEARCH_IDEAS.length);
renderIdeas();
