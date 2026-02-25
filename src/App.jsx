import { useState } from 'react'
import NameGenerator from './components/NameGenerator.jsx'
import NameRanking from './components/NameRanking.jsx'
import AdUnit from './components/AdUnit.jsx'
import PrivacyPolicy from './components/PrivacyPolicy.jsx'
import { t, detectLang } from './i18n/index.js'

const TABS = ['generator', 'ranking']

const LANGS = [
  { code: 'ko', flag: '🇰🇷', label: '한국어' },
  { code: 'en', flag: '🇺🇸', label: 'EN' },
  { code: 'ja', flag: '🇯🇵', label: '日本語' },
]

export default function App() {
  const [lang, setLang] = useState(detectLang)
  const [activeTab, setActiveTab] = useState('generator')
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showLangMenu, setShowLangMenu] = useState(false)

  const currentLang = LANGS.find((l) => l.code === lang) || LANGS[0]

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-gray-50">
      {/* 헤더 */}
      <header className="sticky top-0 z-30 border-b border-brand-100 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-xl font-black tracking-tight text-brand-700">
              {t(lang, 'site.title')}
            </h1>
            <p className="hidden text-xs text-gray-400 sm:block">
              {t(lang, 'site.tagline')}
            </p>
          </div>

          {/* 언어 선택 드롭다운 */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu((v) => !v)}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              <span>{currentLang.flag}</span>
              <span>{currentLang.label}</span>
              <svg className={`h-3.5 w-3.5 text-gray-400 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showLangMenu && (
              <>
                {/* 바깥 클릭 시 닫기 */}
                <div className="fixed inset-0 z-10" onClick={() => setShowLangMenu(false)} />
                <div className="absolute right-0 z-20 mt-1.5 w-36 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                  {LANGS.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setShowLangMenu(false) }}
                      className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-sm transition hover:bg-gray-50
                        ${lang === l.code ? 'bg-brand-50 font-semibold text-brand-700' : 'text-gray-700'}`}
                    >
                      <span className="text-base">{l.flag}</span>
                      <span>{l.label}</span>
                      {lang === l.code && (
                        <svg className="ml-auto h-3.5 w-3.5 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="mx-auto max-w-2xl px-4">
          <nav className="flex">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-2.5 text-sm font-semibold transition
                  ${activeTab === tab
                    ? 'text-brand-700'
                    : 'text-gray-500 hover:text-gray-700'}`}
              >
                {t(lang, `tabs.${tab}`)}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-brand-600" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* 메인 레이아웃 */}
      <div className="mx-auto max-w-5xl px-4 py-6 lg:flex lg:gap-6">
        <main className="flex-1 min-w-0 max-w-2xl">
          {activeTab === 'generator' && <NameGenerator lang={lang} />}
          {activeTab === 'ranking'   && <NameRanking   lang={lang} />}
        </main>

        {/* 데스크탑 사이드바 광고 */}
        <aside className="hidden lg:block lg:w-44 shrink-0">
          <div className="sticky top-28">
            <AdUnit type="sidebar" />
          </div>
        </aside>
      </div>

      {/* 푸터 */}
      <footer className="mt-8 border-t border-gray-200 bg-white py-6 text-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} {t(lang, 'site.title')}</p>
        <div className="mt-1 flex justify-center gap-4">
          <button
            onClick={() => setShowPrivacy(true)}
            className="underline-offset-2 hover:underline"
          >
            {t(lang, 'footer.privacy')}
          </button>
          <a
            href="mailto:pekh1228@gmail.com"
            className="underline-offset-2 hover:underline"
          >
            {t(lang, 'footer.contact')}
          </a>
        </div>
      </footer>

      {/* 개인정보처리방침 모달 */}
      {showPrivacy && (
        <PrivacyPolicy lang={lang} onClose={() => setShowPrivacy(false)} />
      )}
    </div>
  )
}
