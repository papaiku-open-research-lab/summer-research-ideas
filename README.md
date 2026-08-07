# AIと発見！夏休み自由研究ラボ

パパ育コミュの子どもたちに向けた、AIを使う自由研究アイデア集です。
AIに答えを作らせるのではなく、親子で予想・観察・比較・検証することを大切にしています。

## ローカルで確認

静的サイトのためビルドは不要です。ローカルサーバーを起動して確認します。

```sh
python -m http.server 8000
```

ブラウザで `http://localhost:8000/` を開いてください。

## 構成

- `index.html` — 研究ネタ一覧、AI研究の進め方、安全上の約束
- `detail.html` — 各研究の詳細ページ
- `data.js` — 自由研究アイデアのデータ
- `styles.css` — 共通デザイン
- `script.js` / `detail.js` — 一覧の絞り込みと詳細表示

## GitHub Pagesへ公開

1. GitHubリポジトリの **Settings → Pages** を開く
2. **Source** に **GitHub Actions** を選ぶ
3. `main` ブランチへpushする

`.github/workflows/deploy-pages.yml` が自動でサイトを公開します。
