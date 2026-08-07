const detailColors = {
  coral: { main: "#f47d65", background: "#fff0e8" },
  mint: { main: "#6fc5a5", background: "#eaf8f2" },
  sky: { main: "#66b9d9", background: "#eaf7fb" },
  violet: { main: "#9b87d5", background: "#f2effb" }
};

const params = new URLSearchParams(window.location.search);
const idea = RESEARCH_IDEAS.find((item) => item.id === params.get("id"));
const view = document.querySelector("#detail-view");

function renderNotFound() {
  document.title = "研究ネタが見つかりません | AIと発見！夏休み自由研究ラボ";
  view.innerHTML = `
    <section class="not-found">
      <span aria-hidden="true">🧭</span>
      <h1>研究ネタが見つかりませんでした</h1>
      <p>リンクが変わったかもしれません。研究ネタ一覧から、気になるテーマを選び直してください。</p>
      <a class="button button-primary" href="index.html#ideas">研究ネタ一覧へ戻る <span>→</span></a>
    </section>
  `;
}

function renderDetail(item) {
  const colors = detailColors[item.color];
  document.title = `${item.title} | AIと発見！夏休み自由研究ラボ`;
  document.documentElement.style.setProperty("--detail-color", colors.main);
  document.documentElement.style.setProperty("--detail-bg", colors.background);

  const steps = item.steps.map(([title, description]) => `
    <li>
      <h3>${title}</h3>
      <p>${description}</p>
    </li>
  `).join("");

  const materials = item.materials.map((material) => `<li>${material}</li>`).join("");
  const records = item.record.map((record) => `<div class="record-item">${record}</div>`).join("");

  view.innerHTML = `
    <section class="detail-hero">
      <div>
        <div class="detail-tags">
          ${item.field ? `<span>📖 ${item.field}</span>` : ""}
          <span>🎒 ${item.grades}</span>
          <span>🕐 ${item.days}</span>
          <span>★ ${item.difficulty}</span>
          <span>🤖 ${item.aiTools}</span>
        </div>
        <h1>${item.title}</h1>
        <p class="detail-catch">${item.catchphrase}</p>
        <p class="detail-summary">${item.summary}</p>
      </div>
      <div class="detail-visual" aria-hidden="true">
        <span class="detail-icon">${item.icon}</span>
      </div>
    </section>

    <div class="detail-layout">
      <article class="detail-content">
        <section id="question">
          <div class="research-question">
            <small>🔎 今回の研究の問い</small>
            <p>${item.question}</p>
          </div>
          <div class="goal-box"><b>研究のゴール：</b> ${item.goal}</div>
        </section>

        <section id="materials">
          <h2>用意するもの</h2>
          <ul class="materials">${materials}</ul>
        </section>

        <section id="steps">
          <h2>研究の進め方</h2>
          <ol class="detail-steps">${steps}</ol>
        </section>

        <section id="prompt">
          <h2>AIにはこう聞いてみよう</h2>
          <div class="prompt-box">
            <p id="prompt-text">${item.prompt}</p>
            <button class="copy-button" type="button" data-copy-prompt>質問例をコピー</button>
          </div>
        </section>

        <section id="record">
          <h2>記録しておくこと</h2>
          <div class="record-grid">${records}</div>
        </section>

        <section id="finish">
          <h2>こんな作品にまとめよう</h2>
          <div class="output-box">
            <span aria-hidden="true">🏆</span>
            <p><b>おすすめの完成形</b>${item.output}</p>
          </div>
        </section>

        <section>
          <div class="tip-box">
            <b>👨‍👩‍👧 保護者の方へ</b>
            ${item.parentTip}
          </div>
        </section>
      </article>

      <aside class="detail-sidebar">
        <div class="sidebar-card">
          <h2>研究データ</h2>
          <ul class="fact-list">
            <li><span>対象</span><b>${item.grades}</b></li>
            <li><span>期間</span><b>${item.days}</b></li>
            <li><span>難しさ</span><b>${item.difficulty}</b></li>
            <li><span>タイプ</span><b>${item.category}</b></li>
          </ul>
        </div>
        <div class="sidebar-card">
          <h2>このページの目次</h2>
          <ul class="toc">
            <li><a href="#question">研究の問い</a></li>
            <li><a href="#materials">用意するもの</a></li>
            <li><a href="#steps">研究の進め方</a></li>
            <li><a href="#prompt">AIへの質問例</a></li>
            <li><a href="#record">記録すること</a></li>
            <li><a href="#finish">まとめ方</a></li>
          </ul>
        </div>
        <div class="sidebar-card caution-card">
          <b>⚠️ 確かめるポイント</b>
          ${item.check}
        </div>
        <a class="button button-primary" href="index.html#ideas">ほかの研究も見る <span>→</span></a>
      </aside>
    </div>
  `;

  const copyButton = document.querySelector("[data-copy-prompt]");
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(item.prompt);
      copyButton.textContent = "コピーしました！";
      window.setTimeout(() => {
        copyButton.textContent = "質問例をコピー";
      }, 1800);
    } catch {
      copyButton.textContent = "選択してコピーしてください";
    }
  });
}

if (idea) {
  renderDetail(idea);
} else {
  renderNotFound();
}
