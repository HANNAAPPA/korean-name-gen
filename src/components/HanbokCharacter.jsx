/**
 * HanbokCharacter — 경복궁 배경 + 성별별 한복 실루엣 (8비트 스타일)
 */

export default function HanbokCharacter({ gender = 'unspecified' }) {
  return (
    <svg
      viewBox="0 0 80 112"
      width="80"
      height="112"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated', display: 'block', flexShrink: 0 }}
    >
      {/* ── 경복궁 배경 ── */}
      {/* 하늘 별 */}
      <rect x="4"  y="2"  width="2" height="2" fill="#ffffff" opacity="0.6"/>
      <rect x="20" y="6"  width="2" height="2" fill="#ffffff" opacity="0.4"/>
      <rect x="60" y="4"  width="2" height="2" fill="#ffffff" opacity="0.6"/>
      <rect x="72" y="10" width="2" height="2" fill="#ffffff" opacity="0.4"/>
      <rect x="44" y="2"  width="2" height="2" fill="#ffffff" opacity="0.5"/>

      {/* 달 */}
      <rect x="64" y="2" width="10" height="10" rx="5" fill="#ffffcc" opacity="0.7"/>

      {/* 산 실루엣 (배경) */}
      <polygon points="0,72 16,52 32,72" fill="#1a2a1a" opacity="0.5"/>
      <polygon points="48,72 68,44 80,60 80,72" fill="#1a2a1a" opacity="0.5"/>

      {/* 경복궁 지붕 (팔작지붕 8비트) */}
      {/* 지붕 꼭대기 */}
      <rect x="28" y="66" width="24" height="4"  fill="#8b1a00"/>
      {/* 지붕 중단 */}
      <rect x="20" y="70" width="40" height="4"  fill="#aa2200"/>
      {/* 처마 끝 (양쪽 반전) */}
      <rect x="12" y="74" width="56" height="4"  fill="#cc3300"/>
      {/* 처마 양끝 추녀마루 */}
      <rect x="8"  y="72" width="4"  height="6"  fill="#cc3300"/>
      <rect x="68" y="72" width="4"  height="6"  fill="#cc3300"/>
      <rect x="4"  y="74" width="4"  height="4"  fill="#aa2200"/>
      <rect x="72" y="74" width="4"  height="4"  fill="#aa2200"/>

      {/* 궁궐 기둥 + 벽 */}
      <rect x="16" y="78" width="48" height="34" fill="#5c3d11"/>
      {/* 기둥 */}
      <rect x="16" y="78" width="6"  height="34" fill="#7a4e15"/>
      <rect x="58" y="78" width="6"  height="34" fill="#7a4e15"/>
      <rect x="36" y="78" width="8"  height="34" fill="#7a4e15"/>
      {/* 문 아치 */}
      <rect x="29" y="88" width="22" height="24" fill="#1a0a00"/>
      <rect x="31" y="86" width="18" height="4"  fill="#1a0a00" rx="2"/>

      {/* ── 한복 인물 ── */}
      {gender === 'female' ? <FemaleFigure /> : gender === 'male' ? <MaleFigure /> : <NeutralFigure />}
    </svg>
  )
}

/* 여성 한복 */
function FemaleFigure() {
  return (
    <g>
      {/* 얹은머리 */}
      <rect x="30" y="8"  width="20" height="6"  fill="#1a0a00" rx="2"/>
      <rect x="33" y="6"  width="14" height="4"  fill="#1a0a00" rx="2"/>
      {/* 얼굴 */}
      <rect x="29" y="12" width="22" height="18" fill="#ffcc99"/>
      {/* 눈 */}
      <rect x="32" y="18" width="5"  height="4"  fill="#221100"/>
      <rect x="43" y="18" width="5"  height="4"  fill="#221100"/>
      <rect x="33" y="19" width="2"  height="2"  fill="#ffffff"/>
      <rect x="44" y="19" width="2"  height="2"  fill="#ffffff"/>
      {/* 볼 */}
      <rect x="29" y="24" width="4"  height="3"  fill="#ffaabb" opacity="0.6"/>
      <rect x="47" y="24" width="4"  height="3"  fill="#ffaabb" opacity="0.6"/>
      {/* 저고리 (빨강) */}
      <rect x="25" y="30" width="30" height="14" fill="#cc2244"/>
      {/* 고름 */}
      <rect x="37" y="32" width="6"  height="10" fill="#ffcc00"/>
      <rect x="36" y="40" width="8"  height="4"  fill="#ffcc00"/>
      {/* 치마 (파랑, 넓게 퍼짐) */}
      <rect x="27" y="44" width="26" height="4"  fill="#2255aa"/>
      <rect x="22" y="48" width="36" height="6"  fill="#2255aa"/>
      <rect x="18" y="54" width="44" height="6"  fill="#1a4499"/>
      <rect x="16" y="60" width="48" height="6"  fill="#153888"/>
      {/* 발 */}
      <rect x="30" y="64" width="8"  height="4"  fill="#ffcc99"/>
      <rect x="42" y="64" width="8"  height="4"  fill="#ffcc99"/>
    </g>
  )
}

/* 남성 한복 */
function MaleFigure() {
  return (
    <g>
      {/* 갓 */}
      <rect x="32" y="6"  width="16" height="4"  fill="#111111"/>
      <rect x="26" y="8"  width="28" height="4"  fill="#111111"/>
      <rect x="30" y="10" width="20" height="2"  fill="#333333"/>
      {/* 얼굴 */}
      <rect x="29" y="12" width="22" height="18" fill="#ffcc99"/>
      {/* 눈 */}
      <rect x="32" y="18" width="5"  height="4"  fill="#221100"/>
      <rect x="43" y="18" width="5"  height="4"  fill="#221100"/>
      <rect x="33" y="19" width="2"  height="2"  fill="#ffffff"/>
      <rect x="44" y="19" width="2"  height="2"  fill="#ffffff"/>
      {/* 저고리 (하늘색) */}
      <rect x="25" y="30" width="30" height="16" fill="#88bbee"/>
      {/* 동정 (흰 깃) */}
      <rect x="37" y="30" width="6"  height="8"  fill="#ffffff"/>
      {/* 바지 (감색, 넉넉하게) */}
      <rect x="25" y="46" width="30" height="4"  fill="#334499"/>
      <rect x="25" y="50" width="13" height="18" fill="#2a3a88"/>
      <rect x="42" y="50" width="13" height="18" fill="#2a3a88"/>
      <rect x="38" y="50" width="4"  height="18" fill="#223377"/>
      {/* 버선 */}
      <rect x="25" y="66" width="13" height="4"  fill="#ffffff"/>
      <rect x="42" y="66" width="13" height="4"  fill="#ffffff"/>
    </g>
  )
}

/* 성별 미선택 — 옥색 한복 */
function NeutralFigure() {
  return (
    <g>
      {/* 머리 */}
      <rect x="30" y="8"  width="20" height="8"  fill="#1a0a00" rx="2"/>
      {/* 얼굴 */}
      <rect x="29" y="12" width="22" height="18" fill="#ffcc99"/>
      <rect x="32" y="18" width="5"  height="4"  fill="#221100"/>
      <rect x="43" y="18" width="5"  height="4"  fill="#221100"/>
      <rect x="33" y="19" width="2"  height="2"  fill="#ffffff"/>
      <rect x="44" y="19" width="2"  height="2"  fill="#ffffff"/>
      {/* 저고리 (옥색) */}
      <rect x="25" y="30" width="30" height="14" fill="#44aaaa"/>
      <rect x="37" y="32" width="6"  height="8"  fill="#aaffee"/>
      {/* 치마/바지 혼합 (옥색 계열) */}
      <rect x="25" y="44" width="30" height="4"  fill="#338899"/>
      <rect x="22" y="48" width="36" height="6"  fill="#2d7788"/>
      <rect x="20" y="54" width="40" height="6"  fill="#256677"/>
      <rect x="20" y="60" width="40" height="6"  fill="#1e5566"/>
      {/* 발 */}
      <rect x="30" y="64" width="8"  height="4"  fill="#ffcc99"/>
      <rect x="42" y="64" width="8"  height="4"  fill="#ffcc99"/>
    </g>
  )
}
