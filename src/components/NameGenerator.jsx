/**
 * NameGenerator — 메인 이름 생성 탭
 * 단계: 입력 → 뜻 확인/수정 → 결과 → 공유
 */

import { useState } from 'react'
import AdUnit from './AdUnit.jsx'
import NameCard from './NameCard.jsx'
import ShareCard from './ShareCard.jsx'
import { t } from '../i18n/index.js'

const STEP = { INPUT: 'input', MEANING: 'meaning', RESULT: 'result' }

export default function NameGenerator({ lang }) {
  const [step, setStep] = useState(STEP.INPUT)
  const [inputName, setInputName] = useState('')
  const [originalMeaning, setOriginalMeaning] = useState('')
  const [editedMeaning, setEditedMeaning] = useState('')
  const [isEditingMeaning, setIsEditingMeaning] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [generatedNames, setGeneratedNames] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showShare, setShowShare] = useState(false)

  // 1단계: 이름 제출 → 뜻 가져오기 (AI 첫 호출)
  const handleSubmitName = async (e) => {
    e.preventDefault()
    const trimmed = inputName.trim()
    if (!trimmed) { setError(t(lang, 'generator.errorEmpty')); return }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/generate-name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmed }),
      })
      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      setOriginalMeaning(data.originalMeaning || '')
      setEditedMeaning(data.originalMeaning || '')
      setGeneratedNames(data.names || [])
      setSelectedIndex(0)
      setShowShare(false)
      setStep(STEP.MEANING)
    } catch {
      setError(t(lang, 'generator.errorGeneric'))
    } finally {
      setLoading(false)
    }
  }

  // 2단계: 뜻 확인 후 결과 표시 (뜻 수정이 없으면 기존 names 사용)
  const handleConfirmMeaning = async () => {
    const meaningChanged = editedMeaning.trim() !== originalMeaning.trim()
    if (!meaningChanged) {
      setStep(STEP.RESULT)
      return
    }
    // 뜻이 수정됐으면 재생성
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/generate-name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: inputName.trim(), customMeaning: editedMeaning.trim() }),
      })
      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      setGeneratedNames(data.names || [])
      setSelectedIndex(0)
      setShowShare(false)
      setStep(STEP.RESULT)
    } catch {
      setError(t(lang, 'generator.errorGeneric'))
    } finally {
      setLoading(false)
    }
  }

  const handleRegenerate = () => {
    setStep(STEP.INPUT)
    setGeneratedNames([])
    setShowShare(false)
  }

  return (
    <div className="space-y-6">
      {/* 상단 배너 광고 */}
      <AdUnit type="top_banner" className="w-full" />

      {/* STEP 1: 이름 입력 */}
      {step === STEP.INPUT && (
        <form onSubmit={handleSubmitName} className="rounded-2xl bg-white p-6 shadow-sm">
          <label className="block text-sm font-semibold text-gray-700">
            {t(lang, 'generator.inputLabel')}
          </label>
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder={t(lang, 'generator.inputPlaceholder')}
            maxLength={80}
            className="mt-2 w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-lg transition focus:border-brand-400 focus:outline-none"
          />
          <p className="mt-1.5 text-xs text-gray-400">{t(lang, 'generator.inputHelper')}</p>

          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-xl bg-brand-600 py-3 text-base font-bold text-white transition hover:bg-brand-700 disabled:opacity-60"
          >
            {loading ? t(lang, 'generator.generating') : t(lang, 'generator.generateBtn')}
          </button>
        </form>
      )}

      {/* STEP 2: 뜻 확인 및 수정 */}
      {step === STEP.MEANING && (
        <div className="rounded-2xl bg-white p-6 shadow-sm space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              {lang === 'ko' ? '입력한 이름' : 'Your name'}
            </p>
            <p className="mt-0.5 text-2xl font-bold text-gray-900">{inputName}</p>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">
                {t(lang, 'generator.meaningLabel')}
              </label>
              <button
                onClick={() => setIsEditingMeaning((v) => !v)}
                className="text-xs text-brand-600 underline underline-offset-2"
              >
                {isEditingMeaning
                  ? (lang === 'ko' ? '완료' : 'Done')
                  : t(lang, 'generator.meaningEdit')}
              </button>
            </div>

            {isEditingMeaning ? (
              <textarea
                value={editedMeaning}
                onChange={(e) => setEditedMeaning(e.target.value)}
                rows={3}
                className="mt-2 w-full rounded-xl border-2 border-brand-300 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none"
              />
            ) : (
              <p className="mt-2 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700">
                {editedMeaning || t(lang, 'generator.meaningPlaceholder')}
              </p>
            )}
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-3">
            <button
              onClick={() => setStep(STEP.INPUT)}
              className="rounded-xl border-2 border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              {lang === 'ko' ? '← 돌아가기' : '← Back'}
            </button>
            <button
              onClick={handleConfirmMeaning}
              disabled={loading}
              className="flex-1 rounded-xl bg-brand-600 py-3 text-sm font-bold text-white transition hover:bg-brand-700 disabled:opacity-60"
            >
              {loading
                ? t(lang, 'generator.generating')
                : (lang === 'ko' ? '이 뜻으로 이름 만들기 →' : 'Create name with this meaning →')}
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: 결과 */}
      {step === STEP.RESULT && generatedNames.length > 0 && (
        <>
          <div className="rounded-2xl bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                {t(lang, 'generator.resultTitle')}
              </h2>
              <span className="text-sm text-gray-400">{inputName}</span>
            </div>

            <div className="space-y-3">
              {generatedNames.map((name, i) => (
                <NameCard
                  key={i}
                  nameData={name}
                  lang={lang}
                  selected={selectedIndex === i}
                  onSelect={() => { setSelectedIndex(i); setShowShare(false) }}
                />
              ))}
            </div>

            {/* 인피드 광고 */}
            <AdUnit type="in_feed" className="w-full" />

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleRegenerate}
                className="rounded-xl border-2 border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
              >
                {t(lang, 'generator.regenerateBtn')}
              </button>
              <button
                onClick={() => setShowShare((v) => !v)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 text-sm font-bold text-white transition hover:bg-brand-700"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                {t(lang, 'generator.shareBtn')}
              </button>
            </div>

            <p className="text-center text-xs text-gray-400">{t(lang, 'generator.adHint')}</p>
          </div>

          {/* 공유 카드 */}
          {showShare && (
            <ShareCard
              nameData={generatedNames[selectedIndex]}
              originalName={inputName}
              lang={lang}
            />
          )}

          {/* 결과 하단 광고 */}
          <AdUnit type="result_bottom" className="w-full" />
        </>
      )}
    </div>
  )
}
