/**
 * HanbokCharacter — 픽셀아트 한복 캐릭터 (레퍼런스: @haemi_pixel 스타일)
 * 치비 비율 + 얼굴 디테일 + 한복 디테일 + 경복궁/오브제 배경
 */

/* ── 배경 장식 오브제 ── */
function Decorations() {
  return (
    <g>
      {/* 달 */}
      <rect x="72" y="4"  width="12" height="12" rx="6" fill="#fffacc" opacity="0.85"/>
      <rect x="78" y="5"  width="4"  height="10" rx="2" fill="#ffe066" opacity="0.4"/>

      {/* 별 */}
      <rect x="4"  y="6"  width="3" height="3" fill="#fffacc" opacity="0.7"/>
      <rect x="14" y="2"  width="2" height="2" fill="#fffacc" opacity="0.5"/>
      <rect x="60" y="3"  width="2" height="2" fill="#fffacc" opacity="0.6"/>
      <rect x="52" y="8"  width="3" height="3" fill="#fffacc" opacity="0.4"/>
      <rect x="8"  y="14" width="2" height="2" fill="#fffacc" opacity="0.4"/>

      {/* 매화꽃 (왼쪽 상단) — 5점 꽃잎 */}
      <rect x="6"  y="24" width="4" height="4" fill="#ffaacc" opacity="0.8"/>
      <rect x="2"  y="20" width="4" height="4" fill="#ffaacc" opacity="0.8"/>
      <rect x="10" y="20" width="4" height="4" fill="#ffaacc" opacity="0.8"/>
      <rect x="2"  y="28" width="4" height="4" fill="#ffaacc" opacity="0.8"/>
      <rect x="10" y="28" width="4" height="4" fill="#ffaacc" opacity="0.8"/>
      <rect x="6"  y="24" width="4" height="4" fill="#ffeeee" opacity="0.9"/> {/* 중앙 */}
      {/* 매화꽃 줄기 */}
      <rect x="8"  y="32" width="2" height="8" fill="#886644" opacity="0.6"/>

      {/* 매화꽃 (오른쪽 상단) */}
      <rect x="78" y="24" width="4" height="4" fill="#ffaacc" opacity="0.8"/>
      <rect x="74" y="20" width="4" height="4" fill="#ffaacc" opacity="0.8"/>
      <rect x="82" y="20" width="4" height="4" fill="#ffaacc" opacity="0.8"/>
      <rect x="74" y="28" width="4" height="4" fill="#ffaacc" opacity="0.8"/>
      <rect x="82" y="28" width="4" height="4" fill="#ffaacc" opacity="0.8"/>
      <rect x="78" y="24" width="4" height="4" fill="#ffeeee" opacity="0.9"/>
      <rect x="80" y="32" width="2" height="8" fill="#886644" opacity="0.6"/>

      {/* 나비 (왼쪽) */}
      <rect x="2"  y="52" width="6" height="4" fill="#cc88ff" opacity="0.75"/>
      <rect x="8"  y="50" width="4" height="8" fill="#aa66ee" opacity="0.75"/>
      <rect x="12" y="52" width="6" height="4" fill="#cc88ff" opacity="0.75"/>
      <rect x="10" y="53" width="2" height="3" fill="#221100" opacity="0.8"/> {/* 몸통 */}

      {/* 등롱 (오른쪽) */}
      <rect x="80" y="48" width="2" height="6"  fill="#886644" opacity="0.7"/> {/* 줄 */}
      <rect x="76" y="54" width="10" height="14" rx="2" fill="#ff6600" opacity="0.75"/>
      <rect x="78" y="56" width="6"  height="10" fill="#ffaa00" opacity="0.5"/>
      <rect x="77" y="68" width="8"  height="3"  fill="#cc4400" opacity="0.7"/>
      <rect x="80" y="71" width="2"  height="4"  fill="#cc4400" opacity="0.6"/> {/* 술 */}

      {/* 연꽃잎 (하단 왼쪽) */}
      <rect x="2"  y="126" width="8"  height="10" rx="3" fill="#ff88aa" opacity="0.6"/>
      <rect x="6"  y="122" width="8"  height="12" rx="3" fill="#ffaacc" opacity="0.7"/>
      <rect x="12" y="126" width="8"  height="10" rx="3" fill="#ff88aa" opacity="0.6"/>
      <rect x="8"  y="136" width="6"  height="4"  fill="#88cc44" opacity="0.6"/> {/* 줄기 */}

      {/* 연꽃잎 (하단 오른쪽) */}
      <rect x="74" y="126" width="8"  height="10" rx="3" fill="#ff88aa" opacity="0.6"/>
      <rect x="78" y="122" width="8"  height="12" rx="3" fill="#ffaacc" opacity="0.7"/>
      <rect x="82" y="126" width="6"  height="10" rx="3" fill="#ff88aa" opacity="0.6"/>
      <rect x="80" y="136" width="6"  height="4"  fill="#88cc44" opacity="0.6"/>

      {/* 꽃잎 흩날림 */}
      <rect x="20" y="40" width="4" height="4" rx="1" fill="#ffccdd" opacity="0.5" transform="rotate(20,22,42)"/>
      <rect x="68" y="36" width="4" height="4" rx="1" fill="#ffccdd" opacity="0.5" transform="rotate(-15,70,38)"/>
      <rect x="16" y="88" width="3" height="3" rx="1" fill="#ffccdd" opacity="0.4"/>
      <rect x="74" y="92" width="3" height="3" rx="1" fill="#ffccdd" opacity="0.4"/>

      {/* 경복궁 처마선 (하단 배경) */}
      <rect x="0"  y="142" width="92" height="6"  fill="#7a2800" opacity="0.5"/>
      <rect x="4"  y="138" width="84" height="4"  fill="#aa3800" opacity="0.5"/>
      <rect x="18" y="134" width="56" height="4"  fill="#cc4400" opacity="0.45"/>
      <rect x="30" y="130" width="32" height="4"  fill="#cc4400" opacity="0.4"/>
      {/* 추녀마루 */}
      <rect x="0"  y="134" width="6" height="8" fill="#aa3800" opacity="0.5"/>
      <rect x="86" y="134" width="6" height="8" fill="#aa3800" opacity="0.5"/>
    </g>
  )
}

/* ── 공통 얼굴 ── */
function Face({ cx, skin = '#ffcc99' }) {
  const x = cx - 18
  return (
    <g>
      {/* 얼굴 */}
      <rect x={x}    y="24" width="36" height="30" rx="4" fill={skin}/>
      {/* 눈썹 */}
      <rect x={x+6}  y="29" width="10" height="2"  fill="#331100"/>
      <rect x={x+20} y="29" width="10" height="2"  fill="#331100"/>
      {/* 눈 흰자 */}
      <rect x={x+5}  y="32" width="12" height="8"  rx="2" fill="#ffffff"/>
      <rect x={x+19} y="32" width="12" height="8"  rx="2" fill="#ffffff"/>
      {/* 홍채 */}
      <rect x={x+7}  y="33" width="8"  height="6"  rx="1" fill="#4a2800"/>
      <rect x={x+21} y="33" width="8"  height="6"  rx="1" fill="#4a2800"/>
      {/* 동공 */}
      <rect x={x+8}  y="34" width="5"  height="4"  fill="#111100"/>
      <rect x={x+22} y="34" width="5"  height="4"  fill="#111100"/>
      {/* 눈 하이라이트 */}
      <rect x={x+12} y="34" width="2"  height="2"  fill="#ffffff"/>
      <rect x={x+26} y="34" width="2"  height="2"  fill="#ffffff"/>
      {/* 코 */}
      <rect x={x+15} y="42" width="6"  height="3"  fill="#e8aa80"/>
      {/* 입 */}
      <rect x={x+10} y="46" width="16" height="2"  fill="#cc6655"/>
      <rect x={x+12} y="48" width="12" height="3"  rx="1" fill="#ee8877"/>
      {/* 볼터치 */}
      <rect x={x+3}  y="40" width="8"  height="5"  fill="#ffaaaa" opacity="0.55"/>
      <rect x={x+25} y="40" width="8"  height="5"  fill="#ffaaaa" opacity="0.55"/>
    </g>
  )
}

/* ── 여성 한복 ── */
function FemaleFigure({ cx = 46 }) {
  const x = cx - 46
  return (
    <g transform={`translate(${x},0)`}>
      {/* 댕기 / 머리 장식 */}
      <rect x="38" y="2"  width="16" height="3"  fill="#cc0000"/>
      <rect x="36" y="5"  width="4"  height="10" fill="#cc0000" opacity="0.7"/>
      <rect x="52" y="5"  width="4"  height="10" fill="#cc0000" opacity="0.7"/>
      {/* 머리카락 번 */}
      <rect x="28" y="6"  width="36" height="18" rx="8" fill="#111100"/>
      {/* 옆머리 */}
      <rect x="20" y="18" width="10" height="22" rx="2" fill="#111100"/>
      <rect x="62" y="18" width="10" height="22" rx="2" fill="#111100"/>

      {/* 얼굴 */}
      <Face cx={46}/>

      {/* 목 */}
      <rect x="40" y="54" width="12" height="8"  fill="#ffcc99"/>

      {/* 저고리 — 빨강 */}
      <rect x="22" y="58" width="48" height="26" rx="2" fill="#cc2244"/>
      {/* 동정 (흰 깃) — V넥 */}
      <rect x="38" y="58" width="10" height="18" fill="#ffffff"/>
      <rect x="44" y="58" width="10" height="18" fill="#ffffff" opacity="0.9"/>
      <rect x="42" y="58" width="8"  height="22" fill="#ffffff"/>
      {/* 왼쪽 소매 */}
      <rect x="6"  y="60" width="16" height="18" rx="2" fill="#cc2244"/>
      <rect x="6"  y="72" width="16" height="8"  fill="#ffffff"/> {/* 끝동 */}
      <rect x="8"  y="80" width="12" height="6"  fill="#ffcc99"/> {/* 손 */}
      {/* 오른쪽 소매 */}
      <rect x="70" y="60" width="16" height="18" rx="2" fill="#cc2244"/>
      <rect x="70" y="72" width="16" height="8"  fill="#ffffff"/>
      <rect x="72" y="80" width="12" height="6"  fill="#ffcc99"/>
      {/* 고름 (노랑 리본) */}
      <rect x="40" y="74" width="6"  height="22" fill="#ffcc00"/>
      <rect x="46" y="74" width="6"  height="16" fill="#ffcc00"/>
      <rect x="38" y="80" width="16" height="8"  rx="2" fill="#ffdd22"/>

      {/* 치마 — 청색, 아래로 퍼짐 */}
      <rect x="28" y="84" width="36" height="5"  fill="#1a3a88"/> {/* 허리띠 */}
      <rect x="24" y="89" width="44" height="8"  fill="#2255bb"/>
      <rect x="18" y="97" width="56" height="10" fill="#2266cc"/>
      <rect x="12" y="107" width="68" height="11" fill="#1a55bb"/>
      <rect x="8"  y="118" width="76" height="11" fill="#194fa8"/>
      <rect x="6"  y="129" width="80" height="8"  fill="#183d90"/>
      {/* 치마 주름선 */}
      <rect x="30" y="90" width="2"  height="46" fill="#4477dd" opacity="0.2"/>
      <rect x="44" y="89" width="2"  height="48" fill="#4477dd" opacity="0.2"/>
      <rect x="58" y="90" width="2"  height="46" fill="#4477dd" opacity="0.2"/>

      {/* 꽃신 */}
      <rect x="24" y="135" width="16" height="6"  rx="2" fill="#ffffff"/>
      <rect x="52" y="135" width="16" height="6"  rx="2" fill="#ffffff"/>
      <rect x="22" y="139" width="18" height="4"  rx="1" fill="#dddddd"/>
      <rect x="52" y="139" width="18" height="4"  rx="1" fill="#dddddd"/>
    </g>
  )
}

/* ── 남성 한복 ── */
function MaleFigure({ cx = 46 }) {
  const x = cx - 46
  return (
    <g transform={`translate(${x},0)`}>
      {/* 갓 — 넓은 챙 */}
      <rect x="30" y="4"  width="32" height="8"  rx="2" fill="#1a1100"/> {/* 모자통 */}
      <rect x="18" y="10" width="56" height="5"  rx="1" fill="#111100"/> {/* 챙 */}
      <rect x="16" y="14" width="60" height="3"  fill="#1a1100" opacity="0.7"/>

      {/* 옆머리 */}
      <rect x="26" y="18" width="8"  height="8"  fill="#111100"/>
      <rect x="58" y="18" width="8"  height="8"  fill="#111100"/>

      {/* 얼굴 */}
      <Face cx={46} skin="#ffcc88"/>

      {/* 목 */}
      <rect x="40" y="54" width="12" height="8"  fill="#ffcc88"/>

      {/* 도포/두루마기 — 흑색 */}
      <rect x="20" y="58" width="52" height="32" rx="2" fill="#1a1a2e"/>
      {/* 동정 */}
      <rect x="39" y="58" width="10" height="20" fill="#ffffff"/>
      <rect x="43" y="58" width="10" height="22" fill="#ffffff" opacity="0.9"/>
      <rect x="41" y="58" width="10" height="24" fill="#ffffff"/>
      {/* 금색 무늬 (도포 장식) */}
      <rect x="24" y="66" width="14" height="2"  fill="#ccaa00" opacity="0.6"/>
      <rect x="24" y="70" width="14" height="2"  fill="#ccaa00" opacity="0.6"/>
      <rect x="24" y="74" width="14" height="2"  fill="#ccaa00" opacity="0.6"/>
      <rect x="54" y="66" width="14" height="2"  fill="#ccaa00" opacity="0.6"/>
      <rect x="54" y="70" width="14" height="2"  fill="#ccaa00" opacity="0.6"/>
      <rect x="54" y="74" width="14" height="2"  fill="#ccaa00" opacity="0.6"/>
      {/* 소매 */}
      <rect x="4"  y="60" width="16" height="22" rx="2" fill="#1a1a2e"/>
      <rect x="72" y="60" width="16" height="22" rx="2" fill="#1a1a2e"/>
      <rect x="6"  y="78" width="12" height="6"  fill="#ffcc88"/>
      <rect x="74" y="78" width="12" height="6"  fill="#ffcc88"/>

      {/* 바지 — 감청색 */}
      <rect x="26" y="90" width="40" height="5"  fill="#222244"/>
      <rect x="26" y="95" width="18" height="24" rx="1" fill="#2a2a66"/>
      <rect x="48" y="95" width="18" height="24" rx="1" fill="#2a2a66"/>
      <rect x="44" y="95" width="4"  height="24" fill="#222255"/>

      {/* 버선 + 혜 (신발) */}
      <rect x="24" y="117" width="20" height="6"  fill="#ffffff"/>
      <rect x="48" y="117" width="20" height="6"  fill="#ffffff"/>
      <rect x="22" y="121" width="22" height="6"  rx="2" fill="#eeeeee"/>
      <rect x="48" y="121" width="22" height="6"  rx="2" fill="#eeeeee"/>
      <rect x="20" y="125" width="24" height="5"  rx="2" fill="#222222"/>
      <rect x="48" y="125" width="24" height="5"  rx="2" fill="#222222"/>
    </g>
  )
}

/* ── 중성/미선택 한복 ── */
function NeutralFigure({ cx = 46 }) {
  const x = cx - 46
  return (
    <g transform={`translate(${x},0)`}>
      {/* 머리카락 */}
      <rect x="26" y="6"  width="40" height="20" rx="6" fill="#221100"/>
      <rect x="20" y="18" width="8"  height="18" rx="2" fill="#221100"/>
      <rect x="64" y="18" width="8"  height="18" rx="2" fill="#221100"/>

      {/* 얼굴 */}
      <Face cx={46}/>

      {/* 목 */}
      <rect x="40" y="54" width="12" height="8"  fill="#ffcc99"/>

      {/* 저고리 — 옥색 */}
      <rect x="22" y="58" width="48" height="26" rx="2" fill="#2a9090"/>
      <rect x="40" y="58" width="12" height="22" fill="#ffffff" opacity="0.9"/>
      <rect x="6"  y="60" width="16" height="18" rx="2" fill="#2a9090"/>
      <rect x="6"  y="72" width="16" height="8"  fill="#aaeedd"/>
      <rect x="8"  y="80" width="12" height="6"  fill="#ffcc99"/>
      <rect x="70" y="60" width="16" height="18" rx="2" fill="#2a9090"/>
      <rect x="70" y="72" width="16" height="8"  fill="#aaeedd"/>
      <rect x="72" y="80" width="12" height="6"  fill="#ffcc99"/>
      {/* 고름 */}
      <rect x="40" y="74" width="12" height="18" fill="#aaeecc"/>
      <rect x="38" y="80" width="16" height="6"  rx="1" fill="#ccffee"/>

      {/* 치마/바지 — 민트그린 */}
      <rect x="28" y="84" width="36" height="5"  fill="#1a6655"/>
      <rect x="24" y="89" width="44" height="8"  fill="#1e8870"/>
      <rect x="18" y="97" width="56" height="10" fill="#228877"/>
      <rect x="12" y="107" width="68" height="11" fill="#1e7766"/>
      <rect x="8"  y="118" width="76" height="11" fill="#1a6655"/>
      <rect x="6"  y="129" width="80" height="8"  fill="#155544"/>
      {/* 주름 */}
      <rect x="30" y="90" width="2"  height="46" fill="#44bbaa" opacity="0.2"/>
      <rect x="44" y="89" width="2"  height="48" fill="#44bbaa" opacity="0.2"/>
      <rect x="58" y="90" width="2"  height="46" fill="#44bbaa" opacity="0.2"/>

      {/* 신발 */}
      <rect x="24" y="135" width="16" height="6"  rx="2" fill="#ffffff"/>
      <rect x="52" y="135" width="16" height="6"  rx="2" fill="#ffffff"/>
      <rect x="22" y="139" width="18" height="4"  rx="1" fill="#cceecc"/>
      <rect x="52" y="139" width="18" height="4"  rx="1" fill="#cceecc"/>
    </g>
  )
}

/* ── 메인 컴포넌트 ── */
export default function HanbokCharacter({ gender = 'unspecified' }) {
  return (
    <svg
      viewBox="0 0 92 148"
      width="92"
      height="148"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated', display: 'block', flexShrink: 0 }}
    >
      <Decorations />
      {gender === 'female'      && <FemaleFigure  cx={46} />}
      {gender === 'male'        && <MaleFigure    cx={46} />}
      {gender === 'unspecified' && <NeutralFigure cx={46} />}
    </svg>
  )
}
