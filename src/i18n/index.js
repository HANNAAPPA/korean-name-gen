import { ko } from './ko.js'
import { en } from './en.js'
import { ja } from './ja.js'

export const translations = { ko, en, ja }

export function t(lang, path) {
  const keys = path.split('.')
  let result = translations[lang] || translations.en
  for (const key of keys) {
    result = result?.[key]
    if (result === undefined) {
      // fallback to English
      let fallback = translations.en
      for (const k of keys) { fallback = fallback?.[k] }
      return fallback ?? path
    }
  }
  return result
}

// 브라우저 언어 자동 감지 (한국어 UI 제거 — 외국인 타겟)
export function detectLang() {
  const lang = (navigator.language || navigator.userLanguage || 'en').toLowerCase()
  if (lang.startsWith('ja')) return 'ja'
  return 'en'
}
