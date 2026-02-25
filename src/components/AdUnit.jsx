/**
 * AdUnit — Google AdSense 광고 단위 래퍼
 *
 * 배포 전 교체 필요:
 *   data-ad-client: "ca-pub-XXXXXXXXXXXXXXXX"
 *   data-ad-slot:   각 광고 단위 슬롯 ID
 *
 * 개발 중에는 placeholder UI를 보여줌
 */

import { useEffect, useRef } from 'react'

const IS_DEV = import.meta.env.DEV

// 광고 단위 설정 (슬롯 ID는 AdSense 대시보드에서 발급)
const AD_CLIENT = 'ca-pub-XXXXXXXXXXXXXXXX'

const AD_SLOTS = {
  top_banner:    { slot: '1111111111', style: { display: 'block' }, format: 'auto', fullWidthResponsive: true },
  in_feed:       { slot: '2222222222', style: { display: 'block' }, format: 'fluid', layout: 'in-article' },
  sidebar:       { slot: '3333333333', style: { display: 'inline-block', width: '160px', height: '600px' } },
  result_bottom: { slot: '4444444444', style: { display: 'block' }, format: 'auto', fullWidthResponsive: true },
}

const PLACEHOLDER_COLORS = {
  top_banner:    'h-[90px]  bg-gray-100',
  in_feed:       'h-[250px] bg-gray-100',
  sidebar:       'w-[160px] h-[600px] bg-gray-100',
  result_bottom: 'h-[90px]  bg-gray-100',
}

export default function AdUnit({ type, className = '' }) {
  const adRef = useRef(null)

  useEffect(() => {
    if (IS_DEV || !adRef.current) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      // 광고 초기화 실패 무시
    }
  }, [])

  if (IS_DEV) {
    return (
      <div className={`flex items-center justify-center rounded border border-dashed border-gray-300 text-xs text-gray-400 ${PLACEHOLDER_COLORS[type]} ${className}`}>
        AD · {type}
      </div>
    )
  }

  const config = AD_SLOTS[type]
  if (!config) return null

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={config.style}
      data-ad-client={AD_CLIENT}
      data-ad-slot={config.slot}
      data-ad-format={config.format}
      data-ad-layout={config.layout}
      data-full-width-responsive={config.fullWidthResponsive ? 'true' : undefined}
    />
  )
}
