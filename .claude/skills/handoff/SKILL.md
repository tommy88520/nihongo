---
name: handoff
description: 交接——使用者說「交接」、要離開／換機器／結束 session 時用。HANDOFF.md 照 7 段整份改寫（≤4KB）、細節接到 docs/HANDOFF_ARCHIVE.md 最上面、commit（有 remote 就 push）。
---

# 交接（日文練習帳）

目標：下一個 session（可能換機器、沒有這次對話）只讀 `HANDOFF.md` 就能接著做。**要短**：它每次接手都會被讀。

1. **收乾淨**：沒 commit 的先 commit（不 commit 就寫進第 2 段）。程式要過 `npm run build`。有部署的話部署完到網站看一次。
2. **逐條對使用者這次的每則訊息**，每句都要落到一格：做一半 → 第 2 段；問了還沒回（附建議）→ 3；下次要確認 → 4；
   新規則／偏好 → 5（穩定的直接搬進 `CLAUDE.md`「使用者的規則」）；做完 → 6；沒修的 bug、外部問題 → 7；點子 → 3。
3. **改寫 HANDOFF.md**：固定 7 段：1 版本／2 進行中／3 等決定／4 下次要看／5 新規則／6 最近做完／7 已知問題。
   - 第 1 段的 commit 用 `git log -1 --format='%h %s' -- . ':!*.md' ':!docs' ':!.claude'`，寫部署了沒。
   - 第 6 段一天一兩行、只留兩週，**不抄使用者原話**。
   - **≤4KB**（`wc -c HANDOFF.md`）。超過就把細節搬去存檔。
   - 細節（過程、取捨、原話、試過的做法）寫成 `## 🚩 YYYY-MM-DD HH:MM：標題` 插在 `docs/HANDOFF_ARCHIVE.md` 最上面。
4. **文件跟程式走**：改了資料格式、單字 id、localStorage key → 更新 `CLAUDE.md` 鐵律；新增檔案／頁面 → `CLAUDE.md`「程式在哪」。
5. **檢查**：7 段都在、≤4KB；第 1 段 commit 對得上；每個要求都有落點；沒寫 token、其他專案或機器的細節。
6. `git add -A && git commit -m "docs: 交接（<一句話>）"`，有 remote 就 `git push`。回報使用者 ≤6 行：第 2、3、4 段重點。
