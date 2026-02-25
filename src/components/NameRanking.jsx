/**
 * NameRanking — 인기 이름 순위 탭 (정적 데이터 기반)
 */

import { useState } from 'react'
import { popularNames } from '../data/popularNames.js'
import { t } from '../i18n/index.js'
import AdUnit from './AdUnit.jsx'

export default function NameRanking({ lang }) {
  const [gender, setGender] = useState('girl')

  const names = popularNames[gender]

  return (
    <div className="space-y-5">
      {/* 상단 광고 */}
      <AdUnit type="top_banner" className="w-full" />

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">{t(lang, 'ranking.title')}</h2>
        <p className="mt-0.5 text-sm text-gray-500">{t(lang, 'ranking.subtitle')}</p>

        {/* 성별 토글 */}
        <div className="mt-4 flex rounded-xl bg-gray-100 p-1">
          {['girl', 'boy'].map((g) => (
            <button
              key={g}
              onClick={() => setGender(g)}
              className={`flex-1 rounded-lg py-2 text-sm font-semibold transition
                ${gender === g
                  ? 'bg-white text-brand-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'}`}
            >
              {g === 'boy' ? t(lang, 'ranking.genderBoy') : t(lang, 'ranking.genderGirl')}
            </button>
          ))}
        </div>

        {/* 순위 리스트 */}
        <div className="mt-4 divide-y divide-gray-100">
          {names.map((item, i) => (
            <div key={item.rank} className="flex items-center gap-4 py-3">
              {/* 순위 */}
              <div className={`w-8 shrink-0 text-center text-sm font-bold
                ${item.rank <= 3 ? 'text-brand-600' : 'text-gray-400'}`}>
                {item.rank <= 3 ? ['🥇', '🥈', '🥉'][item.rank - 1] : item.rank}
              </div>

              {/* 이름 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-gray-900">{item.name}</span>
                  <span className="text-sm text-gray-400">{item.hanja}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {item.meaning[lang] || item.meaning.ko}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 광고 — 리스트 중간 (10위 이후) */}
        <AdUnit type="in_feed" className="my-4 w-full" />

        <p className="mt-4 text-center text-xs text-gray-400">
          {t(lang, 'ranking.source')}
        </p>
      </div>
    </div>
  )
}
