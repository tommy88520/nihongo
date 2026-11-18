# 日文練習帳（nihongo）

> 每個 session 都整份載入，只放每次都用得到的。現況在 `HANDOFF.md`（**接手先讀**）；過去的交接 grep `docs/HANDOFF_ARCHIVE.md`。

學日文的個人 web app：五十音表＋測驗、N5 單字卡（間隔重複 SRS）、日文發音。Vue 3＋TS（`<script setup>`）＋Vite＋Tailwind v4＋vue-router（hash 模式）。
**純前端、沒有後端**，進度存在瀏覽器 localStorage。正式網址 https://nihongo.huangyanming.com 。

- **接手**：「接手」／`/takeover`；**交接**：「交接」／`/handoff`（`.claude/skills/`）。Claude 的記憶每台機器各自的，跨機器的規則寫這份。
- 指令：`npm run dev`、`npm run build`（`vue-tsc -b` 型別檢查＋打包到 `dist/`）。沒有測試、沒有 lint。
  這台的 node 是 nvm 裝的，非互動 shell 要先 `export PATH=~/.nvm/versions/node/v24.22.2/bin:$PATH`。
- 版號：`package.json` 的 version，發版 bump＋`git tag vX.Y.Z`。
- **部署**：Cloudflare Pages（專案 `nihongo`，接 GitHub）。**push 到 `master` 就自動建置上線**（`npm run build` → `dist`，環境變數 `NODE_VERSION=22`）。
  push 完 1～2 分鐘到正式網址實際看一次；壞了就 revert 再 push。設定改動要使用者在 Cloudflare 後台動手。

## 鐵律
1. **單字 id、假名課 id 不能改**：假名課 `hira-1`…`kata-14`（`data/lessons.ts`）是過關進度的 key。
   `src/data/words.ts` 每個字的 `id`（`w001`…）是 SRS 進度的 key，改了使用者的進度就對不上。新單字只能加在最後、給新 id。
2. **localStorage 格式要相容**：key 是 `nihongo:v1`（`lib/store.ts`），載入時跟預設值合併；加欄位要有預設值，不相容的改動要換 key 並寫搬移。
   讀寫 localStorage 一律包 try/catch（私密模式會丟例外）。
3. **repo 是公開的**（GitHub `tommy88520/nihongo`）：文件、commit 不寫機密、不寫其他專案或機器的細節。
4. 發音播預錄音檔 `public/audio/*.m4a`（`npm run audio`＝`scripts/gen-audio.ts`，只能在 Mac 跑，用內建 Kyoko 產生、音量正規化；單一假名唸兩次）。
   沒音檔的字才退回瀏覽器 Web Speech API（`lib/speak.ts`）。**加新單字／假名後要跑 `npm run audio` 一起 commit**。不要接要金鑰的 TTS 服務。

## 使用者的規則
- **他完全零基礎，連五十音都不會**：任何功能都不能假設他已經會；先教再考，說明用中文、附注音近似音。
- 一律繁體中文（含進度回報）；回覆短，先講結論和要他做什麼。
- 交代的事做得到就直接做，不要列步驟叫他做；只有要他帳號的才請他動手。
- **手機優先**（他常用 iPhone，~375–402px 寬）：按鈕列不能爆版，觸控目標夠大，不能只有 icon 沒字；
  做完用手機尺寸（chrome-devtools emulate `390x844x3,mobile,touch`）實際截圖看過再交。不要等他提醒。
- 畫面醜他會在意：統一用 `style.css` 的 `paper／ink／shu`（朱色）色票和圓角卡片風格。
- 不要加自動化測試（他說過不需要）。

## 坑
- 日文字要套 `.jp` class（Hiragino Sans／Noto Sans JP），不然在中文字型下會用中文字形顯示漢字。
- iPhone 點到字小於 16px 的輸入框會自動放大，輸入框一律 `text-base` 以上。
- 底部 tab bar 是 fixed，`main` 有 `pb-28`；新頁面的底部按鈕別被擋到，要考慮 `safe-area-inset-bottom`。
- 拗音／ぢづ：測驗干擾選項用 romaji 排除同音（ぢ=じ=ji、づ=ず=zu）。

## 程式在哪
- 課程設計 `docs/CURRICULUM.md`（16 週）：新功能、單字、文法照它的順序做；使用者完全零基礎。
- `src/data/lessons.ts` 假名課（平／片假名各 14 課：清音一行一課、濁音、拗音）＋來源漢字、注音近似音、發音提醒；`lib/progress.ts` 解鎖規則（前一課 ≥80% 才開，片假名要平假名清音學完）。
- `src/data/kana.ts` 五十音表（清音、濁音、拗音）；`src/data/words.ts` N5 單字（分類、假名、漢字、中文）。
- `src/lib/store.ts` 進度狀態＋簡化 SM-2（`grade`、`previewInterval`、連續天數）；`lib/queue.ts` 今日待複習／新字；`lib/speak.ts` 發音。
- `src/views/`：`Learn`（課程列表）、`Lesson`（一課：認字→小考，錯的排到最後重考）、`Home`（統計、7 天長條、每日新字數）、`Kana`（表）、`KanaQuiz`（測驗）、`Review`（單字卡，鍵盤 空白鍵／1–4）、`Words`（單字表搜尋）。
