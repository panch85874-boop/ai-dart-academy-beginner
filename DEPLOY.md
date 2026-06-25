# 部署說明

本專案是純靜態網站，可以部署到 GitHub Pages。

## 1. 建立 GitHub repository

1. 登入 GitHub。
2. 點選 New repository。
3. Repository name 可使用 `ai-dart-academy-beginner`。
4. Visibility 可依需求選 Public 或 Private。
5. 建立 repository。

需要人工登入 GitHub。GitHub 介面與規則可能變更，實際位置需要驗證。

## 2. 把專案推到 GitHub

如果使用 Git 指令，常見流程如下：

```bash
git init
git add .
git commit -m "Initial release v0.1.0"
git branch -M main
git remote add origin https://github.com/YOUR_NAME/ai-dart-academy-beginner.git
git push -u origin main
```

`YOUR_NAME` 需要換成實際 GitHub 帳號或組織名稱。

也可以在 GitHub 網頁上傳檔案，這需要人工確認上傳內容。

## 3. 開啟 GitHub Pages

1. 進入 repository。
2. 打開 Settings。
3. 找到 Pages。
4. Source 選擇 Deploy from a branch。
5. Branch 選擇 `main`。
6. Folder 選擇 `/root`。
7. 儲存設定。

GitHub Pages 的設定名稱、位置與等待時間需要驗證。

## 4. 取得分享網址

設定完成後，GitHub Pages 通常會顯示網站網址。常見格式如下：

```text
https://YOUR_NAME.github.io/ai-dart-academy-beginner/
```

實際網址以 GitHub 顯示為準，需要人工確認。

## 5. 檢查 index.html 是否正常

部署後請檢查：

- 首頁是否顯示專案名稱
- Level 1 是否可開啟
- 射飛鏢選擇題是否可答題
- Prompt 拼圖是否可操作
- 答錯是否顯示提示
- 過關後是否顯示徽章
- 重新整理頁面後進度是否保留
- README 是否適合公開閱讀

## 6. 哪些地方需要人工登入 GitHub

- 建立 repository
- 設定 GitHub Pages
- 檢查 Pages 部署狀態
- 若 repository 是 private，確認 Pages 可用性與限制

Private repository 的 GitHub Pages 規則可能和帳號方案有關，需要驗證。

## 7. 哪些地方需要人工確認

- GitHub Pages 實際分享網址
- 手機與電腦瀏覽器畫面
- Web Speech API 語音是否可播放
- README / LICENSE / CONTRIBUTING 是否符合公開分享需求
- 題目文字是否適合目標族群