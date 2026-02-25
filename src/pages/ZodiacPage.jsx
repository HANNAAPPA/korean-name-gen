import { useState } from 'react'
import { ZODIAC, getZodiacByYear, starsToEmoji } from '../data/zodiacData.js'
import AdUnit from '../components/AdUnit.jsx'
import { t } from '../i18n/index.js'

export default function ZodiacPage({ lang }) {
  const [birthYear, setBirthYear] = useState('')
  const [result, setResult]       = useState(null)
  const [selected, setSelected]   = useState(null) // browse all

  const handleFind = (e) => {
    e.preventDefault()
    const y = parseInt(birthYear)
    if (!y || y < 1924 || y > 2024) return
    setResult(getZodiacByYear(y))
    setSelected(null)
  }

  const active = selected || result

  return (
    <div className="space-y-5">
      <AdUnit type="top_banner" className="w-full" />

      {/* 헤더 */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-gray-900">
          {lang === 'ja' ? '🐯 十二支を調べる' : '🐯 Korean Zodiac (12간지)'}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {lang === 'ja' ? '生まれ年から干支と2026年の運勢を確認しよう'
                         : 'Find your zodiac animal and 2026 fortune by birth year'}
        </p>

        {/* 생년 입력 */}
        <form onSubmit={handleFind} className="mt-4 flex gap-2">
          <input
            type="number"
            value={birthYear}
            onChange={e => setBirthYear(e.target.value)}
            placeholder={lang === 'ja' ? '生まれ年 (例: 1995)' : 'Birth year (e.g. 1995)'}
            min="1924" max="2024"
            className="flex-1 rounded-xl border-2 border-gray-200 px-4 py-3 text-base focus:border-brand-400 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-xl bg-brand-600 px-5 py-3 font-bold text-white hover:bg-brand-700"
          >
            {lang === 'ja' ? '調べる' : 'Find'}
          </button>
        </form>
      </div>

      {/* 결과 카드 */}
      {active && <ZodiacCard animal={active} lang={lang} />}

      <AdUnit type="in_feed" className="w-full" />

      {/* 12개 모두 보기 */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-base font-bold text-gray-800">
          {lang === 'ja' ? 'すべての干支' : 'All 12 Zodiac Animals'}
        </h3>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {ZODIAC.map(z => (
            <button
              key={z.index}
              onClick={() => { setSelected(z); setResult(null) }}
              className={`flex flex-col items-center rounded-xl border-2 py-3 text-center transition
                ${active?.index === z.index
                  ? 'border-brand-500 bg-brand-50'
                  : 'border-gray-200 hover:border-brand-300'}`}
            >
              <span className="text-2xl">{z.emoji}</span>
              <span className="mt-1 text-xs font-semibold text-gray-700">
                {lang === 'ja' ? z.ja : z.en}
              </span>
              <span className="text-xs text-gray-400">{z.hanja}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function ZodiacCard({ animal, lang }) {
  const f = animal.fortune2026
  const rows = [
    { label: lang === 'ja' ? '総合運' : 'Overall',  val: f.overall },
    { label: lang === 'ja' ? '恋愛運' : 'Love',     val: f.love },
    { label: lang === 'ja' ? '仕事運' : 'Career',   val: f.career },
    { label: lang === 'ja' ? '健康運' : 'Health',   val: f.health },
  ]
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm space-y-4">
      {/* 동물 헤더 */}
      <div className="flex items-center gap-4">
        <span className="text-6xl">{animal.emoji}</span>
        <div>
          <p className="text-2xl font-black text-gray-900">
            {lang === 'ja' ? animal.ja : animal.en}
            <span className="ml-2 text-lg text-gray-400">{animal.hanja}</span>
          </p>
          <p className="text-sm text-gray-500">{animal.traits[lang] || animal.traits.en}</p>
        </div>
      </div>

      {/* 출생년도 */}
      <div className="flex flex-wrap gap-1">
        {animal.years.map(y => (
          <span key={y} className="rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-medium text-brand-700">{y}</span>
        ))}
      </div>

      {/* 행운 */}
      <div className="flex gap-4 text-sm text-gray-600">
        <span>🎨 {animal.lucky.color[lang] || animal.lucky.color.en}</span>
        <span>🔢 {animal.lucky.number}</span>
      </div>

      {/* 2026 운세 */}
      <div className="rounded-xl bg-gradient-to-br from-brand-50 to-violet-50 p-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-600">
          2026 {lang === 'ja' ? '年の運勢' : 'Fortune'}
        </p>
        {rows.map(r => (
          <div key={r.label} className="mb-1.5 flex items-center gap-2">
            <span className="w-16 text-xs font-semibold text-gray-600">{r.label}</span>
            <span className="text-sm text-amber-400">{starsToEmoji(r.val)}</span>
          </div>
        ))}
        <p className="mt-3 text-sm text-gray-700 leading-relaxed">
          {f[lang] || f.en}
        </p>
      </div>
    </div>
  )
}
