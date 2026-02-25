/**
 * ShareCard — 8비트 픽셀 아트 공유 카드
 * - 스타일별 5종 캐릭터 (가슴 명찰에 한국 이름)
 * - X, Reddit, Web Share API 공유
 * - html2canvas PNG 저장
 */

import { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import HanbokCharacter from './HanbokCharacter.jsx'

/* ─── 언어별 라벨 ─── */
const LABELS = {
  en: { download: 'Save Image', share: 'Share', copied: 'Copied!' },
  ja: { download: '画像を保存', share: 'シェア',  copied: 'コピー済み' },
}

/* ─── 스타일별 캐릭터 색상 팔레트 ─── */
const PALETTES = {
  modern:  { body: '#3355ee', hair: '#1122bb', badge: '#00ffcc', pant: '#223388' },
  classic: { body: '#33aa44', hair: '#1a6622', badge: '#ffee00', pant: '#1a5522' },
  cute:    { body: '#ff77bb', hair: '#cc3388', badge: '#ffff88', pant: '#cc4499' },
  strong:  { body: '#cc2222', hair: '#881111', badge: '#ffaa00', pant: '#881111' },
  elegant: { body: '#8833cc', hair: '#551188', badge: '#ffccff', pant: '#551188' },
}
const SKIN = '#ffcc99'

/* ─── 8비트 픽셀 캐릭터 SVG ─── */
function PixelCharacter({ style, name }) {
  const p = PALETTES[style] || PALETTES.modern
  // 이름이 너무 길면 자르기 (뱃지 공간)
  const badgeText = name?.slice(0, 3) || ''

  return (
    <svg
      viewBox="0 0 56 92"
      width="72"
      height="116"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated', display: 'block', flexShrink: 0 }}
    >
      {/* 머리카락 */}
      <rect x="12" y="0"  width="32" height="10" fill={p.hair} />
      <rect x="8"  y="4"  width="4"  height="6"  fill={p.hair} />
      <rect x="44" y="4"  width="4"  height="6"  fill={p.hair} />
      {/* 머리 */}
      <rect x="10" y="8"  width="36" height="28" fill={SKIN} />
      {/* 눈 */}
      <rect x="16" y="17" width="7"  height="7"  fill="#111122" />
      <rect x="33" y="17" width="7"  height="7"  fill="#111122" />
      {/* 눈 하이라이트 */}
      <rect x="18" y="19" width="3"  height="3"  fill="#ffffff" />
      <rect x="35" y="19" width="3"  height="3"  fill="#ffffff" />
      {/* 볼터치 */}
      <rect x="12" y="28" width="6"  height="4"  fill="#ffaabb" opacity="0.45" />
      <rect x="38" y="28" width="6"  height="4"  fill="#ffaabb" opacity="0.45" />
      {/* 입 */}
      <rect x="20" y="30" width="16" height="3"  fill="#cc7777" />
      {/* 목 */}
      <rect x="22" y="36" width="12" height="6"  fill={SKIN} />
      {/* 몸통 */}
      <rect x="8"  y="40" width="40" height="32" fill={p.body} />
      {/* 왼팔(뷰어 기준 왼쪽) */}
      <rect x="0"  y="40" width="8"  height="28" fill={p.body} />
      <rect x="0"  y="66" width="8"  height="8"  fill={SKIN} />
      {/* 오른팔 */}
      <rect x="48" y="40" width="8"  height="28" fill={p.body} />
      <rect x="48" y="66" width="8"  height="8"  fill={SKIN} />
      {/* 명찰 — 캐릭터 오른쪽 가슴 (뷰어 기준 왼쪽) */}
      <rect x="9"  y="47" width="20" height="14" fill={p.badge} rx="1" />
      <rect x="10" y="48" width="18" height="12" fill={p.badge} opacity="0.9" />
      {/* 명찰 이름 텍스트 */}
      <text
        x="19" y="57"
        textAnchor="middle"
        fontSize="7"
        fontWeight="bold"
        fill="#111122"
        fontFamily="'Noto Sans KR', monospace"
        style={{ letterSpacing: '1px' }}
      >
        {badgeText}
      </text>
      {/* 허리 선 */}
      <rect x="8"  y="70" width="40" height="3"  fill={p.pant} />
      {/* 바지/다리 */}
      <rect x="10" y="72" width="16" height="16" fill={p.pant} />
      <rect x="30" y="72" width="16" height="16" fill={p.pant} />
      {/* 신발 */}
      <rect x="8"  y="86" width="18" height="6"  fill="#222233" />
      <rect x="30" y="86" width="18" height="6"  fill="#222233" />
    </svg>
  )
}

/* ─── SNS 공유 함수들 ─── */
function shareToX(nameData) {
  const text = `My Korean name is ${nameData.korean} (${nameData.romanization})! 🇰🇷\n"${nameData.meaning}"\n\nGet your Korean name:`
  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`,
    '_blank', 'width=550,height=450,noopener'
  )
}

function shareToReddit(nameData) {
  const title = `My Korean name is ${nameData.korean} (${nameData.romanization}) — "${nameData.meaning}"`
  window.open(
    `https://reddit.com/submit?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(title)}`,
    '_blank', 'noopener'
  )
}

async function shareNative(nameData) {
  if (!navigator.share) return false
  try {
    await navigator.share({
      title: `My Korean Name: ${nameData.korean}`,
      text: `My Korean name is ${nameData.korean} (${nameData.romanization})!\n"${nameData.meaning}"\n\nGet yours:`,
      url: window.location.href,
    })
    return true
  } catch { return false }
}

/* ─── 메인 컴포넌트 ─── */
export default function ShareCard({ nameData, originalName, lang, gender = 'unspecified' }) {
  const cardRef = useRef(null)
  const [copied, setCopied]       = useState(false)
  const [capturing, setCapturing] = useState(false)
  const label      = LABELS[lang] || LABELS.en
  const hasNative  = typeof navigator !== 'undefined' && !!navigator.share

  const downloadImage = async () => {
    if (!cardRef.current || capturing) return
    setCapturing(true)
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, useCORS: true, backgroundColor: null, logging: false,
      })
      const link = document.createElement('a')
      link.download = `korean-name-${nameData.korean}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (e) { console.error('capture failed', e) }
    finally { setCapturing(false) }
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
      {/* ── 캡처 대상 카드 ── */}
      <div
        ref={cardRef}
        style={{
          background: '#0d0d1a',
          border: '4px solid #00ff88',
          boxShadow: '0 0 0 4px #0d0d1a, 0 0 0 8px #00ff88, 6px 6px 0 8px #0d0d1a, 6px 6px 0 12px #4444bb',
          fontFamily: '"Noto Sans KR", monospace',
          padding: '28px 24px 24px',
          borderRadius: '4px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 픽셀 격자 배경 */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.035,
          backgroundImage: 'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 8px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 8px)',
          pointerEvents: 'none',
        }} />

        {/* 콘텐츠 + 캐릭터 2단 */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', position: 'relative', zIndex: 1 }}>

          {/* 왼쪽: 텍스트 */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* 레이블 */}
            <div style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '7px', color: '#ffff00',
              letterSpacing: '2px', marginBottom: '18px',
            }}>
              ▶ MY KOREAN NAME
            </div>

            {/* 한국 이름 */}
            <div style={{
              fontSize: '52px', fontWeight: 900,
              color: '#00ff88', lineHeight: 1.1,
              marginBottom: '14px',          /* ← 줄간격 수정 */
              textShadow: '3px 3px 0 #005533',
              wordBreak: 'keep-all',
            }}>
              {nameData.korean}
            </div>

            {/* 로마자 발음 */}
            <div style={{
              fontSize: '15px', color: '#aaaaff',
              fontStyle: 'italic', marginBottom: '12px',  /* ← 줄간격 수정 */
              letterSpacing: '1px',
            }}>
              {nameData.romanization}
            </div>

            {/* 한자 */}
            {nameData.hanja && (
              <div style={{ fontSize: '20px', color: '#ff88aa', marginBottom: '14px' }}>
                {nameData.hanja}
              </div>
            )}

            {/* 뜻 박스 */}
            <div style={{
              background: 'rgba(0,255,136,0.07)',
              border: '2px solid rgba(0,255,136,0.25)',
              borderRadius: '2px',
              padding: '10px 12px',
              fontSize: '12px', color: '#dddddd',
              lineHeight: 1.6, marginBottom: '12px',
            }}>
              {nameData.meaning}
            </div>

            {/* 원래 이름 */}
            {originalName && (
              <div style={{ fontSize: '10px', color: '#555577' }}>
                {lang === 'ja' ? `元の名前: ${originalName}` : `Original: ${originalName}`}
              </div>
            )}
          </div>

          {/* 오른쪽: 한복 캐릭터 + 경복궁 */}
          <div style={{ paddingTop: '8px' }}>
            <HanbokCharacter gender={gender} />
          </div>
        </div>

        {/* 하단 레인보우 픽셀 바 */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px',
          background: 'linear-gradient(90deg,#00ff88,#4444ff,#ff44aa,#ffff00,#00ff88)',
        }} />
      </div>

      {/* ── 공유 버튼 ── */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {/* 저장 */}
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

        {/* X */}
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
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
          </svg>
          Reddit
        </button>

        {/* 모바일 공유 or 링크 복사 */}
        {hasNative ? (
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
            {copied
              ? <><svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>{label.copied}</>
              : <><svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>Copy Link</>
            }
          </button>
        )}
      </div>
    </div>
  )
}
