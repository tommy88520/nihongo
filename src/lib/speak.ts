let jaVoice: SpeechSynthesisVoice | undefined

function pickVoice() {
  const voices = speechSynthesis.getVoices()
  jaVoice = voices.find((v) => v.lang === 'ja-JP' && /Kyoko|O-ren|Google/.test(v.name)) ?? voices.find((v) => v.lang.startsWith('ja'))
}

if (typeof speechSynthesis !== 'undefined') {
  pickVoice()
  speechSynthesis.addEventListener?.('voiceschanged', pickVoice)
}

export function speak(text: string) {
  if (typeof speechSynthesis === 'undefined') return
  speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'ja-JP'
  u.rate = 0.85
  if (jaVoice) u.voice = jaVoice
  speechSynthesis.speak(u)
}
