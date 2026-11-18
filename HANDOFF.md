# 交接（2026-11-18——v0.2.0 假名分課教學）

> 固定 7 段、整份改寫、**≤4KB**。細節在 `docs/HANDOFF_ARCHIVE.md`（grep）。步驟見 `.claude/skills/`。

## 1. 版本
- v0.2.0，GitHub `tommy88520/nihongo`（公開）。已上線 https://nihongo.huangyanming.com （Cloudflare Pages，push 到 master 自動部署）。

## 2. 進行中
- 無。

## 3. 等使用者決定
1. 課程 `docs/CURRICULUM.md`（16 週）寫好了，但他說連五十音都不會，先做了假名分課教學。之後照文末「App 要補的功能」繼續（下一個：課程地圖、單字帶例句）。
2. 其他點子：N4 單字、例句、平假名手寫筆順、助詞／文法小測驗、PWA 離線＋加到主畫面、進度匯出／匯入（換手機不會丟）。
3. Vercel 上其他專案搬 Cloudflare：他說先不要。評估過：food-chosing、moon-bbq 好搬（純靜態），mazu-online 1 個 API，ptt／tommy-blog／COMEANC13 有伺服器端功能、不建議。

## 4. 下次要看
- 請他從首頁「從這裡開始」上平假名第 1 課：注音近似音、來源漢字的說法有沒有幫助；聽音選字在 iPhone 上發音正不正常。
- 請他用 iPhone 實際用一輪：五十音測驗、單字複習（發音在 iPhone Safari 要點過一次才會出聲）。

## 5. 使用者新規則
- 他完全零基礎（連五十音都不會），功能要先教再考（已寫進 `CLAUDE.md`）。
- 沿用 Focus Island 的規則（繁中、手機優先、直接做），已寫進 `CLAUDE.md`。

## 6. 最近做完
- 11-18 v0.2.0：假名分課教學（平／片假名各 14 課，先認字再小考，80% 解鎖下一課），首頁改成零基礎先學假名。
- 11-18 課程設計 `docs/CURRICULUM.md`。
- 11-18 上線 Cloudflare Pages＋自訂網域 nihongo.huangyanming.com。
- 11-18 v0.1.0：五十音表＋測驗、N5 單字 SRS、單字表、首頁統計；CLAUDE.md＋takeover／handoff skill。

## 7. 已知問題
- 進度只在這個瀏覽器的 localStorage，清資料或換裝置就沒了（還沒有匯出／同步）。
- 沒有測試（使用者不要）。
