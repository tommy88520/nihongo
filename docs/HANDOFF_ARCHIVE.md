# 交接存檔（新的在最上面）

## 🚩 2026-11-18：部署到 Cloudflare Pages
- 問過放家機負擔：靜態檔幾乎沒負擔，但家機關機就掛、要手動部署，所以選 Cloudflare Pages（免費、push 自動上線）。
- Cloudflare 新版「建立應用程式」預設是 Workers，要點底下「前往 Pages」走 Pages 流程。建置：`npm run build`、輸出 `dist`、`NODE_VERSION=22`。
- 他嫌 `nihongo-9nf.pages.dev` 醜，改用自訂網域 nihongo.huangyanming.com。剛設好會先 522 一兩分鐘再變 200。
- 他問能不能把 Vercel 的專案也搬過來，評估後他決定先不要（結論在 HANDOFF 第 3 段）。

## 🚩 2026-11-18：專案建立
- 使用者說「幫我建一個專案，學習日文的」，沒指定內容。我選了：Vue 3＋Vite＋TS＋Tailwind（跟 Focus Island 同一套）、純前端 localStorage、手機優先。
- 第一版功能：五十音表（平／片假名、清濁拗音、點了發音）、五十音測驗（雙向、可選範圍與題數、記最佳成績）、N5 單字 127 個（13 類）SRS 單字卡、單字表搜尋、首頁統計。
- SRS 是簡化 SM-2：忘了 1 分鐘後同輪再考；困難／記得／簡單第一次 12 小時／1 天／4 天，之後乘 ease。
- 使用者要求把 Focus Island 的 CLAUDE.md、skill（takeover／handoff）格式也搬過來，已照這個專案改寫。
