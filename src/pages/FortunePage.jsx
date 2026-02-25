import { useState } from 'react'
import { ZODIAC, getZodiacByYear, starsToEmoji } from '../data/zodiacData.js'
import AdUnit from '../components/AdUnit.jsx'

export default function FortunePage({ lang }) {
  const [birthYear, setBirthYear] = useState('')
  const [animal, setAnimal]       = useState(null)
  const [tab, setTab]             = useState('year') // 'year' | 'pick'

  const handleFind = (e) => {
    e.preventDefault()
    const y = parseInt(birthYear)
    if (!y || y < 1924 || y > 2024) return
    setAnimal(getZodiacByYear(y))
  }

  return (
    <div className="space-y-5">
      <AdUnit type="top_banner" className="w-full" />

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-gray-900">
          {lang === 'ja' ? '🔮 2026年の運勢' : '🔮 2026 Fortune'}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {lang === 'ja'
            ? '十二支別・2026年の詳しい運勢を確認しよう'
            : 'Your detailed Korean zodiac fortune for 2026'}
        </p>

        {/* 탭 */}
        <div className="mt-4 flex rounded-xl bg-gray-100 p-1">
          {[
            { id: 'year', ko: '생년으로 찾기', en: 'By birth year', ja: '生まれ年で探す' },
            { id: 'pick', ko: '띠 직접 선택', en: 'Pick your zodiac', ja: '干支を選ぶ' },
          ].map(t2 => (
            <button
              key={t2.id}
              onClick={() => setTab(t2.id)}
              className={`flex-1 rounded-lg py-2 text-sm font-semibold transition
                ${tab === t2.id ? 'bg-white text-brand-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {lang === 'ja' ? t2.ja : t2.en}
            </button>
          ))}
        </div>

        {/* 생년 입력 */}
        {tab === 'year' && (
          <form onSubmit={handleFind} className="mt-4 flex gap-2">
            <input
              type="number"
              value={birthYear}
              onChange={e => setBirthYear(e.target.value)}
              placeholder={lang === 'ja' ? '生まれ年 (例: 1990)' : 'Birth year (e.g. 1990)'}
              min="1924" max="2024"
              className="flex-1 rounded-xl border-2 border-gray-200 px-4 py-3 text-base focus:border-brand-400 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-brand-600 px-5 py-3 font-bold text-white hover:bg-brand-700"
            >
              {lang === 'ja' ? '見る' : 'Check'}
            </button>
          </form>
        )}

        {/* 띠 직접 선택 */}
        {tab === 'pick' && (
          <div className="mt-4 grid grid-cols-4 gap-2">
            {ZODIAC.map(z => (
              <button
                key={z.index}
                onClick={() => setAnimal(z)}
                className={`flex flex-col items-center rounded-xl border-2 py-2.5 transition
                  ${animal?.index === z.index
                    ? 'border-brand-500 bg-brand-50'
                    : 'border-gray-200 hover:border-brand-300'}`}
              >
                <span className="text-xl">{z.emoji}</span>
                <span className="mt-0.5 text-xs font-semibold text-gray-700">
                  {lang === 'ja' ? z.ja : z.en}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 운세 결과 */}
      {animal && <FortuneResult animal={animal} lang={lang} />}

      <AdUnit type="result_bottom" className="w-full" />
    </div>
  )
}

function FortuneResult({ animal, lang }) {
  const f = animal.fortune2026
  const categories = [
    {
      icon: '⭐',
      label: lang === 'ja' ? '総合運' : 'Overall',
      score: f.overall,
      desc: lang === 'ja'
        ? ['波乱万丈', '少し難しい', '平穏な年', '好調な年', '最高の年！']
        : ['Turbulent', 'Challenging', 'Steady', 'Great year', 'Exceptional!'],
    },
    {
      icon: '❤️',
      label: lang === 'ja' ? '恋愛運' : 'Love',
      score: f.love,
      desc: lang === 'ja'
        ? ['冷却期', 'ゆっくり', '安定', '情熱的', '運命の出会い']
        : ['Cool period', 'Slow', 'Stable', 'Passionate', 'Destined love'],
    },
    {
      icon: '💼',
      label: lang === 'ja' ? '仕事運' : 'Career',
      score: f.career,
      desc: lang === 'ja'
        ? ['要注意', '地道に', '着実に', '昇進チャンス', '大躍進']
        : ['Be careful', 'Steady pace', 'Stable growth', 'Promotion ahead', 'Big leap'],
    },
    {
      icon: '🌿',
      label: lang === 'ja' ? '健康運' : 'Health',
      score: f.health,
      desc: lang === 'ja'
        ? ['要受診', '要注意', '普通', '活力あり', '絶好調']
        : ['See a doctor', 'Take care', 'Normal', 'Energetic', 'Peak health'],
    },
  ]

  return (
    <div className="space-y-4">
      {/* 동물 + 총평 */}
      <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-violet-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">{animal.emoji}</span>
          <div>
            <p className="text-xl font-black">
              {lang === 'ja' ? animal.ja : animal.en} {animal.hanja}
            </p>
            <p className="text-sm text-white/70">
              2026 {lang === 'ja' ? '年の運勢' : 'Fortune'}
            </p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-white/90">
          {f[lang] || f.en}
        </p>
      </div>

      {/* 카테고리별 */}
      <div className="grid grid-cols-2 gap-3">
        {categories.map(c => (
          <div key={c.label} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-gray-700">{c.icon} {c.label}</span>
              <span className="text-xs font-semibold text-brand-600">{c.score}/5</span>
            </div>
            <div className="text-base text-amber-400 mb-1">{starsToEmoji(c.score)}</div>
            <p className="text-xs text-gray-500">{c.desc[c.score - 1]}</p>
          </div>
        ))}
      </div>

      {/* 행운 아이템 */}
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <p className="text-sm font-bold text-gray-700 mb-3">
          {lang === 'ja' ? '🍀 ラッキーアイテム' : '🍀 Lucky Items for 2026'}
        </p>
        <div className="flex gap-4 text-sm text-gray-600">
          <span>🎨 {animal.lucky.color[lang] || animal.lucky.color.en}</span>
          <span>🔢 {animal.lucky.number}</span>
        </div>
      </div>

      <AdUnit type="in_feed" className="w-full" />
    </div>
  )
}
