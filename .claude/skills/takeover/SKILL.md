---
name: takeover
description: 接手——新 session 開始、換機器、使用者說「接手」時用。只讀 HANDOFF.md、對版本，回報一段摘要再開始做事。
---

# 接手（日文練習帳）

用最少的 token 掌握現況：`CLAUDE.md` 已自動載入，**只再讀 `HANDOFF.md`**；其他檔案要動哪一塊再 grep，不要整份讀。

1. `git status -sb && git log -1 --oneline`；有 remote 的話先 `git fetch -q`，落後就 `git pull --ff-only`；`package-lock.json` 有變就 `npm install`。
   跟 HANDOFF 第 1 段對不上（多了 commit、有沒 commit 的改動）→ 先跟使用者講。
2. 要動程式才跑 `npm run build`（含型別檢查）。有正式網址的話 `curl -s -o /dev/null -w '%{http_code}\n' <網址>` 要 200。
3. 回報 ≤6 行：版本、網站、第 2 段進行中（有就預設接續）、第 3 段等決定、第 4 段要看的。
