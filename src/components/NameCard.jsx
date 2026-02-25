/**
 * NameCard — 생성된 한국 이름 하나를 표시하는 카드
 */

const STYLE_BADGES = {
  modern:  { label: { ko: '세련', en: 'Modern' },   color: 'bg-violet-100 text-violet-700' },
  classic: { label: { ko: '고전', en: 'Classic' },  color: 'bg-amber-100 text-amber-700' },
  cute:    { label: { ko: '귀여운', en: 'Cute' },   color: 'bg-pink-100 text-pink-700' },
  strong:  { label: { ko: '강한', en: 'Strong' },   color: 'bg-blue-100 text-blue-700' },
  elegant: { label: { ko: '우아한', en: 'Elegant' }, color: 'bg-emerald-100 text-emerald-700' },
}

export default function NameCard({ nameData, lang, selected, onSelect }) {
  const badge = STYLE_BADGES[nameData.style] || STYLE_BADGES.modern
  const badgeLabel = badge.label[lang] || badge.label.ko

  return (
    <button
      onClick={onSelect}
      className={`w-full text-left rounded-2xl border-2 p-5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-brand-400
        ${selected
          ? 'border-brand-500 bg-brand-50 shadow-md'
          : 'border-gray-200 bg-white hover:border-brand-300 hover:shadow-sm'
        }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-wide text-gray-900">
            {nameData.korean}
          </span>
          <span className="text-sm text-gray-400">{nameData.romanization}</span>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.color}`}>
          {badgeLabel}
        </span>
      </div>

      {nameData.hanja && (
        <p className="mt-1 text-sm text-gray-500">{nameData.hanja}</p>
      )}

      <p className="mt-2 text-sm font-medium text-gray-700">{nameData.meaning}</p>
      <p className="mt-1 text-xs text-gray-400">{nameData.reason}</p>

      {selected && (
        <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-brand-600">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {lang === 'ko' ? '선택됨' : 'Selected'}
        </div>
      )}
    </button>
  )
}
