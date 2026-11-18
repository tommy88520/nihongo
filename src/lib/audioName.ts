// 音檔檔名：每個字的 Unicode 碼（例：あ → 3042、おはよう → 304a-306f-3088-3046）
// scripts/gen-audio.ts 和 lib/speak.ts 共用，兩邊要一致
export function audioName(text: string): string {
  return [...text].map((c) => c.codePointAt(0)!.toString(16)).join('-')
}
