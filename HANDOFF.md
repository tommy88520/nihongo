# 交接（2026-11-18——專案剛建立）

> 固定 7 段、整份改寫、**≤4KB**。細節在 `docs/HANDOFF_ARCHIVE.md`（grep）。步驟見 `.claude/skills/`。

## 1. 版本
- v0.1.0，本機 git（還沒有 remote）。還沒部署。

## 2. 進行中
- 無。

## 3. 等使用者決定
1. 要不要開 GitHub repo（公開／私人）並 push。
2. 部署：放家機＋Cloudflare Tunnel（跟 Focus Island 一樣），還是靜態站（Cloudflare Pages 之類）。純前端，哪個都行。
3. 下一步功能點子：N4 單字、例句、平假名手寫筆順、助詞／文法小測驗、PWA 離線＋加到主畫面、進度匯出／匯入（換手機不會丟）。

## 4. 下次要看
- 請他用 iPhone 實際用一輪：五十音測驗、單字複習（發音在 iPhone Safari 要點過一次才會出聲）。

## 5. 使用者新規則
- 沿用 Focus Island 的規則（繁中、手機優先、直接做），已寫進 `CLAUDE.md`。

## 6. 最近做完
- 11-18 v0.1.0：五十音表＋測驗、N5 單字 SRS、單字表、首頁統計；CLAUDE.md＋takeover／handoff skill。

## 7. 已知問題
- 進度只在這個瀏覽器的 localStorage，清資料或換裝置就沒了（還沒有匯出／同步）。
- 沒有測試（使用者不要）。
