# AI Dart Academy Beginner

中文名稱：AI 飛鏢闖關學院｜初階版

這是一個開源 AI 初階學習專案。使用者可以打開 `index.html`，用飛鏢闖關、Prompt 拼圖、語音播放、動畫回饋和徽章進度，從零練習 ChatGPT 基本任務委託、Prompt 基本寫法，以及 Codex 基本操作。

本專案不代表任何 AI 公司官方課程。

## 適合誰使用

- 10 到 60 歲，想用遊戲方式開始學 AI 的使用者
- 想練習把需求講清楚的新手
- 想帶學生、同事或家人入門 AI 任務委託的人
- 想參考純 HTML、CSS、JavaScript 靜態網站的開源貢獻者

## 學完會得到什麼能力

- 知道 AI 不是只能聊天，也能協助完成任務
- 會說明目標、對象、用途、限制與輸出格式
- 資訊不足時，會要求 AI 先追問
- 會把常用 Prompt 整理成模板
- 知道 Codex 適合做檔案、程式、修改、測試與交付
- 能整理第一份簡單專案需求，並做基本驗收

## 功能

- 初階 10 關
- 每關 15 題，共 150 題
- 遊戲 A：黑猩猩射飛鏢，8 題選擇題
- 遊戲 B：Prompt 拼圖，7 題排序題
- Web Speech API 文字轉語音
- CSS / JavaScript 飛鏢、徽章、彩帶動畫
- localStorage 保存同一台裝置的進度
- 不需要登入、不需要後台、不需要資料庫
- 不串接外部 AI API

## 如何在本機開啟

1. 下載或複製本專案。
2. 直接雙擊 `index.html`。
3. 選擇 Level 1 開始。

本專案沒有使用 npm，也不需要安裝套件。

## 如何部署到 GitHub Pages

請參考 [DEPLOY.md](DEPLOY.md)。

簡短版本：

1. 建立 GitHub repository。
2. 上傳本專案全部檔案。
3. 到 repository 的 Settings → Pages。
4. 選擇 main branch 與 root。
5. 等待 GitHub Pages 產生網址。

GitHub 介面、Pages 設定位置與政策可能變更，實際步驟需要驗證。

## 如何貢獻題目

請參考 [CONTRIBUTING.md](CONTRIBUTING.md)。

題目資料放在 `data/beginner-levels.js`。每題必須包含：

- `id`
- `level`
- `gameType`
- `question`
- `options`
- `answer`
- `hint`
- `explanation`
- `voiceText`
- `rewardText`

## 隱私說明

- 不登入
- 不收集個資
- 不串接 AI API
- 不把資料送到外部伺服器
- 進度只存在同一台裝置的瀏覽器 localStorage

清除瀏覽器資料可能會刪除進度。

## 語音支援

本專案使用瀏覽器 Web Speech API。若瀏覽器不支援語音，畫面仍可閱讀文字與操作。

語音在不同瀏覽器、作業系統、語音包與手機環境的支援情況需要驗證。

## 限制說明

- 不提供官方 AI 產品政策、價格、模型差異或商店規則保證。
- 工具政策、價格、模型差異、商店規則等資訊需要驗證。
- 題目內容以初學觀念為主，不取代正式產品文件。
- 本專案第一版為靜態網站，沒有帳號同步功能。

## 授權

本專案使用 MIT License。詳見 [LICENSE](LICENSE)。