import { useState } from 'react'
import NameGenerator from './components/NameGenerator.jsx'
import NameRanking from './components/NameRanking.jsx'
import AdUnit from './components/AdUnit.jsx'
import PrivacyPolicy from './components/PrivacyPolicy.jsx'
import { t } from './i18n/index.js'

const TABS = ['generator', 'ranking']

export default function App() {
  const [lang, setLang] = useState('ko')
  const [activeTab, setActiveTab] = useState('generator')
  const [showPrivacy, setShowPrivacy] = useState(false)

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

          {/* 언어 전환 */}
          <button
            onClick={() => setLang((l) => (l === 'ko' ? 'en' : 'ko'))}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
          >
            {lang === 'ko' ? 'EN' : 'KR'}
          </button>
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

      {/* 메인 레이아웃 — 모바일 단일 컬럼, 데스크탑 사이드바 */}
      <div className="mx-auto max-w-5xl px-4 py-6 lg:flex lg:gap-6">
        {/* 콘텐츠 영역 */}
        <main className="flex-1 min-w-0 max-w-2xl">
          {activeTab === 'generator' && <NameGenerator lang={lang} />}
          {activeTab === 'ranking'   && <NameRanking   lang={lang} />}
        </main>

        {/* 데스크탑 사이드바 광고 */}
        <aside className="hidden lg:block lg:w-44 shrink-0 pt-0">
          <div className="sticky top-28">
            <AdUnit type="sidebar" />
          </div>
        </aside>
      </div>

      {/* 푸터 */}
      <footer className="mt-8 border-t border-gray-200 bg-white py-6 text-center text-xs text-gray-400">
        <p>{t(lang, 'footer.copy')}</p>
        <div className="mt-1 flex justify-center gap-4">
          <button
            onClick={() => setShowPrivacy(true)}
            className="underline-offset-2 hover:underline"
          >
            {t(lang, 'footer.privacy')}
          </button>
          <a
            href="mailto:contact@mykoreanname.kr"
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
