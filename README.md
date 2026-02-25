# 나만의 한국 이름 (My Korean Name)

외국인을 위한 한국어 이름 작명 서비스 — 수익형 웹앱

---

## 목차
1. [프로젝트 구조](#1-프로젝트-구조)
2. [로컬 개발 시작](#2-로컬-개발-시작)
3. [Cloudflare 배포](#3-cloudflare-배포)
4. [Google AdSense 연동](#4-google-adsense-연동)
5. [AdSense 승인 최적화 체크리스트](#5-adsense-승인-최적화-체크리스트)
6. [다음 작업 목록](#6-다음-작업-목록)

---

## 1. 프로젝트 구조

```
korean-name-gen/
│
├── public/
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── AdUnit.jsx          ← 광고 단위 (개발 중 placeholder)
│   │   ├── NameGenerator.jsx   ← 메인: 3단계 이름 생성 플로우
│   │   ├── NameCard.jsx        ← 이름 결과 카드 1개
│   │   ├── NameRanking.jsx     ← 인기 이름 순위 탭
│   │   ├── ShareCard.jsx       ← 이미지 저장/공유
│   │   └── PrivacyPolicy.jsx   ← 개인정보처리방침 (AdSense 필수)
│   │
│   ├── data/
│   │   └── popularNames.js     ← 남/여 인기이름 Top 20 (정적)
│   │
│   ├── i18n/
│   │   ├── ko.js               ← 한국어 텍스트
│   │   ├── en.js               ← 영어 텍스트
│   │   └── index.js            ← t(lang, 'key') 헬퍼 함수
│   │
│   ├── App.jsx                 ← 탭 네비게이션 + 레이아웃
│   ├── main.jsx                ← React 진입점
│   └── index.css               ← Tailwind 기본 설정
│
├── functions/
│   └── api/
│       └── generate-name.js    ← Cloudflare Workers AI 백엔드
│                                  POST /api/generate-name
│
├── index.html                  ← AdSense 스크립트 삽입 위치
├── wrangler.toml               ← Cloudflare AI 바인딩 설정
├── vite.config.js
├── tailwind.config.js
└── package.json
```

### 광고 배치 구조 (AdUnit type)

| type | 위치 | 크기 |
|------|------|------|
| `top_banner` | 각 탭 최상단 | 반응형 배너 |
| `in_feed` | 결과 목록 중간 | 인피드 |
| `sidebar` | 데스크탑 우측 | 160×600 |
| `result_bottom` | 결과 하단 | 반응형 배너 |

---

## 2. 로컬 개발 시작

```bash
cd F:/claudecode/korean-name-gen

# 의존성 설치 (최초 1회)
npm install

# 개발 서버 실행
npm run dev
# → http://localhost:5173
```

> **주의**: 로컬에서는 `/api/generate-name` 호출이 실패합니다.
> Workers AI는 Cloudflare 서버에서만 동작합니다.
> 로컬 테스트가 필요하면 아래 명령어를 사용하세요:
> ```bash
> npm run build && npm run pages:dev
> # Cloudflare 계정 로그인 필요: npx wrangler login
> ```

---

## 3. Cloudflare 배포

### 3-1. GitHub에 올리기
```bash
cd F:/claudecode/korean-name-gen
git init
git add .
git commit -m "initial commit"
# GitHub에서 새 저장소 만든 후:
git remote add origin https://github.com/YOUR_ID/korean-name-gen.git
git push -u origin main
```

### 3-2. Cloudflare Pages 연결
1. [Cloudflare Dashboard](https://dash.cloudflare.com) 로그인
2. **Workers & Pages** → **Create application** → **Pages**
3. GitHub 저장소 선택
4. 빌드 설정:
   - Build command: `npm run build`
   - Build output directory: `dist`
5. **Save and Deploy**

### 3-3. Workers AI 바인딩 (이름 생성 기능 활성화)
1. Pages 프로젝트 → **Settings** → **Functions**
2. **AI Bindings** 섹션 → **Add binding**
3. Variable name: `AI` (대문자, 정확히)
4. **Save** → 재배포 자동 실행

---

## 4. Google AdSense 연동

### Step 1 — AdSense 계정 준비
- 기존 승인된 계정 있으면 바로 사이트 추가 가능
- **Publishers 탭** → **사이트 추가** → 도메인 입력

### Step 2 — index.html 수정
`index.html` 21번째 줄 주석 해제 후 `ca-pub-XXXXXXXXXXXXXXXX` 교체:

```html
<!-- 이걸 -->
<!-- <script async src="https://pagead2.googlesyndication.com/...?client=ca-pub-XXXXXXXXXXXXXXXX"...></script> -->

<!-- 이렇게 바꾸기 -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-여기에실제ID입력"
  crossorigin="anonymous"></script>
```

### Step 3 — AdUnit.jsx 슬롯 ID 입력
`src/components/AdUnit.jsx` 상단 `AD_CLIENT`와 `AD_SLOTS`:

```js
const AD_CLIENT = 'ca-pub-여기에실제ID입력'   // ← 교체

const AD_SLOTS = {
  top_banner:    { slot: '1111111111', ... },  // ← AdSense에서 발급받은 슬롯 ID
  in_feed:       { slot: '2222222222', ... },
  sidebar:       { slot: '3333333333', ... },
  result_bottom: { slot: '4444444444', ... },
}
```

슬롯 ID 발급 방법:
- AdSense → **광고** → **광고 단위** → **새 광고 단위 만들기**
- 단위 4개 생성 (디스플레이 / 인피드 / 디스플레이 / 디스플레이)
- 각각의 `data-ad-slot` 숫자를 복사해서 붙여넣기

### Step 4 — 배포
```bash
npm run build
# Git push → Cloudflare 자동 재배포
```

---

## 5. AdSense 승인 최적화 체크리스트

> 기존 계정에 사이트를 추가할 경우에도 **사이트 검토**를 거칩니다. 통상 1~14일.

### 필수 항목 (미달 시 거절 사유)
- [x] 개인정보처리방침 페이지 존재 (앱 내 구현됨)
- [ ] 도메인 실제 연결 (Cloudflare Pages 기본 도메인 or 커스텀 도메인)
- [ ] HTTPS 적용 (Cloudflare Pages 자동 적용)
- [ ] 콘텐츠 충분히 존재 (이름 생성 + 순위 페이지)
- [ ] 연락처 정보 (푸터 Contact 링크 → 실제 이메일 연결 필요)

### 권장 항목 (승인률 향상)
- [ ] 커스텀 도메인 연결 (무료 .pages.dev 도메인보다 유리)
- [ ] robots.txt 추가
- [ ] sitemap.xml 추가
- [ ] Open Graph 이미지 (SNS 공유 미리보기)
- [ ] 콘텐츠 영문 병행 (이미 구현됨 ✓)

### 주의사항
- 광고 단위는 AdSense 검토 **전에** 코드를 넣어도 됩니다
- 단, 검토 중에 클릭을 유도하는 문구("광고를 클릭해주세요" 등) 금지
- 단일 페이지 앱(SPA)은 크롤러가 콘텐츠를 못 읽을 수 있음
  → 개인정보처리방침은 별도 라우트 없이 모달로 처리함 (현재 구현 방식)

---

## 6. 다음 작업 목록

| 우선순위 | 작업 | 이유 |
|---------|------|------|
| 🔴 높음 | 푸터 Contact → 실제 이메일 연결 | AdSense 검토 필수 |
| 🔴 높음 | robots.txt / sitemap.xml 추가 | AdSense 크롤링 |
| 🟡 중간 | 커스텀 도메인 연결 | 신뢰도 향상 |
| 🟡 중간 | 카카오/X(트위터) 공유 버튼 | 바이럴 유입 |
| 🟢 낮음 | 이름 즐겨찾기 (localStorage) | 재방문 유도 |
| 🟢 낮음 | 로딩 스켈레톤 UI | UX 개선 |
