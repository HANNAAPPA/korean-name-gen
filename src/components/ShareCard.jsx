/**
 * ShareCard — 8비트 픽셀 아트 스타일 공유 카드
 * html2canvas로 PNG 저장 + SNS 공유 버튼
 */

import { useRef, useState } from 'react'
import html2canvas from 'html2canvas'

const LABELS = {
  en: { title: 'MY KOREAN NAME', sub: 'Get yours →', download: 'Save Image', share: 'Share' },
  ja: { title: 'MY KOREAN NAME', sub: 'Get yours →', download: '画像を保存', share: 'シェア' },
}

// X(트위터) 공유
function shareToX(nameData) {
  const text = `My Korean name is ${nameData.korean} (${nameData.romanization})! 🇰🇷\n"${nameData.meaning}"\n\nGet your Korean name:`
  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`,
    '_blank', 'width=550,height=450,noopener'
  )
}

// Reddit 공유
function shareToReddit(nameData) {
  const title = `My Korean name is ${nameData.korean} (${nameData.romanization}) — "${nameData.meaning}"`
  window.open(
    `https://reddit.com/submit?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(title)}`,
    '_blank', 'noopener'
  )
}

// 모바일 네이티브 공유 (인스타그램, 카카오 등 포함)
async function shareNative(nameData) {
  if (!navigator.share) return false
  try {
    await navigator.share({
      title: `My Korean Name: ${nameData.korean}`,
      text: `My Korean name is ${nameData.korean} (${nameData.romanization})!\n"${nameData.meaning}"\n\nGet yours:`,
      url: window.location.href,
    })
    return true
  } catch {
    return false
  }
}

export default function ShareCard({ nameData, originalName, lang }) {
  const cardRef = useRef(null)
  const [copied, setCopied] = useState(false)
  const [capturing, setCapturing] = useState(false)
  const label = LABELS[lang] || LABELS.en
  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share

  const downloadImage = async () => {
    if (!cardRef.current || capturing) return
    setCapturing(true)
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      })
      const link = document.createElement('a')
      link.download = `korean-name-${nameData.korean}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (e) {
      console.error('capture failed', e)
    } finally {
      setCapturing(false)
    }
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <div className="mt-6 space-y-4">
      {/* 8비트 픽셀 공유 카드 (캡처 대상) */}
      <div
        ref={cardRef}
        style={{
          background: '#0d0d1a',
          border: '4px solid #00ff88',
          boxShadow: '0 0 0 4px #0d0d1a, 0 0 0 8px #00ff88, 8px 8px 0 8px #0d0d1a, 8px 8px 0 12px #4444bb',
          fontFamily: '"Noto Sans KR", monospace',
          padding: '28px 24px',
          borderRadius: '4px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 픽셀 격자 배경 */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 8px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 8px)',
        }} />

        {/* 헤더 레이블 */}
        <div style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '8px', color: '#ffff00', letterSpacing: '2px', marginBottom: '16px' }}>
          ▶ {label.title}
        </div>

        {/* 한국 이름 (메인) */}
        <div style={{ fontSize: '56px', fontWeight: 900, color: '#00ff88', lineHeight: 1, marginBottom: '4px', textShadow: '3px 3px 0 #006644' }}>
          {nameData.korean}
        </div>

        {/* 로마자 발음 */}
        <div style={{ fontSize: '16px', color: '#aaaaff', marginBottom: '16px', fontStyle: 'italic' }}>
          {nameData.romanization}
        </div>

        {/* 한자 */}
        {nameData.hanja && (
          <div style={{ fontSize: '20px', color: '#ff88aa', marginBottom: '8px' }}>
            {nameData.hanja}
          </div>
        )}

        {/* 뜻 */}
        <div style={{
          background: 'rgba(0,255,136,0.08)',
          border: '2px solid #00ff8844',
          borderRadius: '2px',
          padding: '10px 12px',
          fontSize: '13px',
          color: '#e0e0e0',
          lineHeight: 1.5,
          marginBottom: '16px',
        }}>
          {nameData.meaning}
        </div>

        {/* 원래 이름 */}
        {originalName && (
          <div style={{ fontSize: '11px', color: '#666699' }}>
            {lang === 'ja' ? `元の名前: ${originalName}` : `Original: ${originalName}`}
          </div>
        )}

        {/* 픽셀 하단 바 */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg,#00ff88,#4444ff,#ff44aa,#ffff00)' }} />
      </div>

      {/* 공유 버튼 그룹 */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {/* 이미지 저장 */}
        <button
          onClick={downloadImage}
          disabled={capturing}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-gray-900 px-3 py-3 text-xs font-bold text-white transition hover:bg-gray-700 disabled:opacity-50"
        >
          <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {capturing ? '...' : label.download}
        </button>

        {/* X (트위터) */}
        <button
          onClick={() => shareToX(nameData)}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-black px-3 py-3 text-xs font-bold text-white transition hover:bg-gray-800"
        >
          <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
          </svg>
          X / Twitter
        </button>

        {/* Reddit */}
        <button
          onClick={() => shareToReddit(nameData)}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-orange-600 px-3 py-3 text-xs font-bold text-white transition hover:bg-orange-500"
        >
          <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
          </svg>
          Reddit
        </button>

        {/* 모바일 네이티브 공유 or 링크 복사 */}
        {hasNativeShare ? (
          <button
            onClick={() => shareNative(nameData)}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-orange-400 px-3 py-3 text-xs font-bold text-white transition hover:opacity-90"
          >
            <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            {label.share}
          </button>
        ) : (
          <button
            onClick={copyLink}
            className="flex items-center justify-center gap-1.5 rounded-xl border-2 border-brand-200 px-3 py-3 text-xs font-bold text-brand-700 transition hover:bg-brand-50"
          >
            {copied ? (
              <><svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Copied!</>
            ) : (
              <><svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> Copy Link</>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
