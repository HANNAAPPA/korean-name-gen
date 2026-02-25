# 나만의 한국 이름 (My Korean Name)

외국인을 위한 한국어 이름 작명 서비스 — 수익형 웹앱
**배포 주소**: https://korean-name-gen.pages.dev
**GitHub**: https://github.com/HANNAAPPA/korean-name-gen

---

## 현재 진행 상황 (2026-02)

### ✅ 완료
- React + Vite + Tailwind + Cloudflare Pages 배포 완료
- Cloudflare Workers AI 이름 생성 (3단계 플로우: 입력 → 뜻 확인 → 결과)
- AI 프롬프트: 2글자 한국 이름 강제
- 영어/일본어 UI (브라우저 언어 자동 감지)
- 국기 드롭다운 언어 전환 (🇺🇸 🇯🇵)
- 인기 이름 순위 탭 (남/여 Top 20, 2024 정적 데이터)
- 8비트 픽셀 아트 공유 카드 (스타일별 5종 캐릭터 + 가슴 명찰)
- SNS 공유: X(트위터), Reddit, Web Share API(인스타 등)
- 이미지 PNG 저장 (html2canvas)
- 개인정보처리방침 모달 (한/영/일)
- robots.txt, sitemap.xml
- 광고 단위 4개 배치 (AdSense Placeholder)

### 🔜 다음 할 일
- [ ] 커스텀 도메인 연결 (Cloudflare에서 .com 구매)
- [ ] AdSense 사이트 추가 신청 (도메인 연결 후)
- [ ] AdUnit.jsx 슬롯 ID 4개 입력 (승인 후)
- [ ] 서브페이지: 12간지, 띠별 운세, 삼재 계산기 (React Router)

---

## 프로젝트 구조

```
korean-name-gen/
├── src/
│   ├── components/
│   │   ├── AdUnit.jsx          광고 단위 (개발 중 placeholder)
│   │   ├── NameGenerator.jsx   메인: 3단계 이름 생성 플로우
│   │   ├── NameCard.jsx        이름 결과 카드
│   │   ├── NameRanking.jsx     인기 이름 순위 탭
│   │   ├── ShareCard.jsx       8비트 공유 카드 + SNS 버튼
│   │   └── PrivacyPolicy.jsx   개인정보처리방침 모달
│   ├── data/popularNames.js    남/여 인기이름 Top 20
│   ├── i18n/{en,ja,index}.js   영/일 번역 + 언어 감지
│   ├── App.jsx                 탭 네비게이션 + 언어 스위처
│   └── main.jsx
├── functions/api/
│   └── generate-name.js        Cloudflare Workers AI 백엔드
└── index.html                  AdSense 스크립트 주석처리됨
```

---

## 로컬 개발

```bash
cd F:/claudecode/korean-name-gen
npm install      # 최초 1회
npm run dev      # http://localhost:5173
# ※ Workers AI는 로컬 미동작 — 배포 후 테스트
```

## 배포 (자동)

```bash
git add -A
git commit -m "변경 내용"
git push         # → Cloudflare Pages 자동 재배포
```

---

## AdSense 연동 (승인 후)

1. `index.html` 21번째 줄 주석 해제 → `ca-pub-XXXXXXXX` 입력
2. `src/components/AdUnit.jsx` 상단 `AD_CLIENT` + `AD_SLOTS` 슬롯 ID 4개 입력

### 광고 위치

| type | 위치 |
|------|------|
| `top_banner` | 각 탭 상단 |
| `in_feed` | 결과 목록 중간 |
| `sidebar` | 데스크탑 우측 160×600 |
| `result_bottom` | 결과 하단 |

---

## 도메인 구매 (Cloudflare)

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Domain Registration** → **Register Domains**
2. 원하는 `.com` 도메인 검색 → 구매
3. Pages 프로젝트 → **Custom domains** → 도메인 입력 → DNS 자동 설정
4. `public/sitemap.xml`의 URL을 실제 도메인으로 업데이트

---

## 서브페이지 계획 (추후)

```
/           한국 이름 작명 (현재)
/zodiac     12간지 정보
/fortune    띠별 운세
/samjae     삼재 계산기
```
→ React Router 추가 + 각 페이지에 광고 배치
