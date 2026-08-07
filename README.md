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

## Cloudflare Pagesへ公開

Cloudflare DashboardからGitHubリポジトリを接続します。

1. **Workers & Pages → Create → Pages → Connect to Git** を開く
2. `papaiku-open-research-lab/summer-research-ideas` を選ぶ
3. デプロイ設定を次のようにする
   - Production branch: `main`
   - Framework preset: `None`
   - Build command: 空欄
   - Build output directory: `/`
4. **Save and Deploy** を押す

以後は`main`ブランチへのpushごとに自動デプロイされます。

`_headers`ではCloudflare Pages用のセキュリティヘッダーと静的ファイルのキャッシュを設定しています。
