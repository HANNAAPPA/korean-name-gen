/**
 * ShareCard — 결과를 이미지로 저장/공유하는 컴포넌트
 * html2canvas를 사용해 DOM → Canvas → PNG
 */

import { useRef, useState } from 'react'
import html2canvas from 'html2canvas'

export default function ShareCard({ nameData, originalName, lang }) {
  const cardRef = useRef(null)
  const [copied, setCopied] = useState(false)
  const [capturing, setCapturing] = useState(false)

  const downloadImage = async () => {
    if (!cardRef.current || capturing) return
    setCapturing(true)
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      })
      const link = document.createElement('a')
      link.download = `my-korean-name-${nameData.korean}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (e) {
      console.error('Screenshot failed', e)
    } finally {
      setCapturing(false)
    }
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      // clipboard 실패 시 무시
    }
  }

  return (
    <div className="mt-6 space-y-4">
      {/* 공유 카드 미리보기 (캡처 대상) */}
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-500 to-violet-600 p-8 text-white shadow-xl"
        style={{ fontFamily: '"Noto Sans KR", sans-serif' }}
      >
        {/* 배경 장식 */}
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-12 -left-8 h-52 w-52 rounded-full bg-white/5" />

        <div className="relative z-10">
          <p className="text-sm font-medium tracking-widest text-white/70 uppercase">
            {lang === 'ko' ? '나의 한국 이름은' : 'My Korean Name is'}
          </p>
          <p className="mt-1 text-6xl font-bold tracking-wider">{nameData.korean}</p>
          <p className="mt-1 text-lg text-white/80">{nameData.romanization}</p>

          {nameData.hanja && (
            <p className="mt-2 text-2xl text-white/60">{nameData.hanja}</p>
          )}

          <div className="mt-4 rounded-2xl bg-white/15 p-4 backdrop-blur-sm">
            <p className="text-sm font-medium">{nameData.meaning}</p>
            {originalName && (
              <p className="mt-1 text-xs text-white/60">
                {lang === 'ko' ? `원래 이름: ${originalName}` : `Original: ${originalName}`}
              </p>
            )}
          </div>

          <p className="mt-4 text-xs text-white/40">mykoreanname.kr</p>
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex gap-3">
        <button
          onClick={downloadImage}
          disabled={capturing}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
        >
          {capturing ? (
            <span className="animate-spin">⏳</span>
          ) : (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          )}
          {lang === 'ko' ? '이미지 저장' : 'Save Image'}
        </button>

        <button
          onClick={copyLink}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-brand-200 px-4 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
        >
          {copied ? (
            <>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {lang === 'ko' ? '복사됨!' : 'Copied!'}
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              {lang === 'ko' ? '링크 복사' : 'Copy Link'}
            </>
          )}
        </button>
      </div>
    </div>
  )
}
