import { ko } from './ko.js'
import { en } from './en.js'

export const translations = { ko, en }

export function t(lang, path) {
  const keys = path.split('.')
  let result = translations[lang] || translations.ko
  for (const key of keys) {
    result = result?.[key]
    if (result === undefined) return path
  }
  return result
}
