# チュートリアルコンテンツ管理ガイド

## 📝 記事の編集方法

### 1. ディレクトリ構造

```
content/
├── chapters/
│   ├── chapter-1/
│   │   ├── metadata.json     # チャプター情報
│   │   ├── step-1-1.md      # 各ステップの内容
│   │   ├── step-1-2.md
│   │   └── step-1-3.md
│   ├── chapter-2/
│   │   ├── metadata.json
│   │   ├── step-2-1.md
│   │   └── ...
│   └── ...
```

### 2. Markdownファイルの形式

各ステップのMarkdownファイルは以下の形式で記述します：

```markdown
---
id: step-1-1
chapterId: chapter-1
stepNumber: 1-1
title: ステップのタイトル
description: ステップの説明
badge:                    # オプション：バッジ情報
  id: badge-id
  name: バッジ名
  description: バッジの説明
  icon: 🎯
---

# メインコンテンツ

ここに記事の内容を書きます。

## 見出し2

通常のMarkdown記法が使えます。

- リスト項目
- **太字**
- *斜体*
- `コード`

\```bash
# コードブロック
walrus store myfile.pdf
\```
```

### 3. 新しいステップの追加

1. 該当するチャプターディレクトリに新しいMarkdownファイルを作成
2. ファイル名は `step-X-Y.md` の形式で
3. フロントマター（---で囲まれた部分）を必ず記入

### 4. チャプター情報の編集

`metadata.json`ファイルでチャプターの基本情報を管理：

```json
{
  "id": "chapter-1",
  "title": "チャプタータイトル",
  "description": "チャプターの説明",
  "icon": "",
  "color": "from-blue-400 to-blue-600"
}
```

### 5. 画像の追加

画像は`public/images/`ディレクトリに配置し、Markdownから参照：

```markdown
![説明テキスト](/images/example.png)
```

### 6. 編集のヒント

- VS Codeの拡張機能「Markdown All in One」を使うとプレビューしながら編集可能
- GitHub上で直接編集も可能（小さな修正に便利）
- 長い記事は適度に見出しで区切る
- コード例は実際に動作するものを記載

### 7. デプロイ

1. 編集が完了したらコミット
2. `main`ブランチにプッシュ
3. GitHub Actionsが自動的にサイトを更新

## 🚀 よく使うコマンド

```bash
# ローカルで確認
npm run dev

# ビルド
npm run build

# 新しいステップ作成例
echo "---
id: step-3-1
chapterId: chapter-3
stepNumber: 3-1
title: 新しいステップ
description: 説明文
---

# コンテンツ
" > content/chapters/chapter-3/step-3-1.md
```