/**
 * PrivacyPolicy — 모달 형태의 개인정보처리방침
 * AdSense 심사 필수 요건
 */

const TITLE = { ko: '개인정보처리방침', en: 'Privacy Policy', ja: 'プライバシーポリシー' }

export default function PrivacyPolicy({ lang, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">
            {TITLE[lang] || TITLE.en}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {lang === 'ko' ? <KoreanContent /> : lang === 'ja' ? <JapaneseContent /> : <EnglishContent />}
      </div>
    </div>
  )
}

function KoreanContent() {
  return (
    <div className="space-y-4 text-sm text-gray-600">
      <p className="text-xs text-gray-400">최종 수정일: 2024년 12월</p>

      <section>
        <h3 className="font-semibold text-gray-800">1. 수집하는 개인정보</h3>
        <p className="mt-1">본 서비스는 이름 작명 기능 제공을 위해 사용자가 직접 입력한 이름 텍스트를 일시적으로 처리합니다. 이 데이터는 서버에 저장되지 않으며, AI 처리 후 즉시 삭제됩니다.</p>
      </section>

      <section>
        <h3 className="font-semibold text-gray-800">2. Google AdSense</h3>
        <p className="mt-1">본 서비스는 Google AdSense를 통해 광고를 표시합니다. Google은 쿠키를 사용하여 사용자의 관심사에 맞는 광고를 게재할 수 있습니다. Google의 개인정보 처리방침은 <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">이곳</a>에서 확인하실 수 있습니다.</p>
      </section>

      <section>
        <h3 className="font-semibold text-gray-800">3. 쿠키</h3>
        <p className="mt-1">본 서비스는 광고 게재 목적으로 제3자(Google) 쿠키를 사용합니다. 브라우저 설정에서 쿠키를 비활성화할 수 있으나, 일부 기능이 제한될 수 있습니다.</p>
      </section>

      <section>
        <h3 className="font-semibold text-gray-800">4. 외부 서비스</h3>
        <p className="mt-1">이름 생성 기능은 Cloudflare Workers AI를 통해 처리됩니다. Cloudflare의 개인정보 처리방침은 <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">이곳</a>에서 확인하실 수 있습니다.</p>
      </section>

      <section>
        <h3 className="font-semibold text-gray-800">5. 미성년자</h3>
        <p className="mt-1">본 서비스는 13세 미만의 아동으로부터 의도적으로 개인정보를 수집하지 않습니다.</p>
      </section>

      <section>
        <h3 className="font-semibold text-gray-800">6. 문의</h3>
        <p className="mt-1">개인정보 처리에 관한 문의사항은 아래 이메일로 연락해주세요.<br />
          <a href="mailto:contact@mykoreanname.kr" className="text-brand-600 underline">contact@mykoreanname.kr</a>
        </p>
      </section>
    </div>
  )
}

function JapaneseContent() {
  return (
    <div className="space-y-4 text-sm text-gray-600">
      <p className="text-xs text-gray-400">最終更新: 2024年12月</p>
      <section>
        <h3 className="font-semibold text-gray-800">1. 収集する個人情報</h3>
        <p className="mt-1">本サービスは、名前生成機能の提供のために、お客様が入力された名前テキストを一時的に処理します。このデータはサーバーに保存されず、AI処理後に直ちに削除されます。</p>
      </section>
      <section>
        <h3 className="font-semibold text-gray-800">2. Google AdSense</h3>
        <p className="mt-1">本サービスはGoogle AdSenseを通じて広告を表示します。Googleはクッキーを使用して、お客様の興味に合わせた広告を配信する場合があります。GoogleのプライバシーポリシーはA<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">こちら</a>でご確認ください。</p>
      </section>
      <section>
        <h3 className="font-semibold text-gray-800">3. クッキー</h3>
        <p className="mt-1">本サービスは広告配信目的で第三者（Google）のクッキーを使用します。ブラウザの設定でクッキーを無効にできますが、一部機能が制限される場合があります。</p>
      </section>
      <section>
        <h3 className="font-semibold text-gray-800">4. 外部サービス</h3>
        <p className="mt-1">名前生成機能はCloudflare Workers AIを通じて処理されます。CloudflareのプライバシーポリシーはA<a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">こちら</a>でご確認ください。</p>
      </section>
      <section>
        <h3 className="font-semibold text-gray-800">5. 未成年者</h3>
        <p className="mt-1">本サービスは13歳未満の児童から意図的に個人情報を収集しません。</p>
      </section>
      <section>
        <h3 className="font-semibold text-gray-800">6. お問い合わせ</h3>
        <p className="mt-1">プライバシーに関するご質問は下記メールアドレスまでお問い合わせください。<br />
          <a href="mailto:pekh1228@gmail.com" className="text-brand-600 underline">pekh1228@gmail.com</a>
        </p>
      </section>
    </div>
  )
}

function EnglishContent() {
  return (
    <div className="space-y-4 text-sm text-gray-600">
      <p className="text-xs text-gray-400">Last updated: December 2024</p>

      <section>
        <h3 className="font-semibold text-gray-800">1. Information We Collect</h3>
        <p className="mt-1">This service temporarily processes the name text you enter to provide the name generation feature. This data is not stored on our servers and is deleted immediately after AI processing.</p>
      </section>

      <section>
        <h3 className="font-semibold text-gray-800">2. Google AdSense</h3>
        <p className="mt-1">This service displays ads through Google AdSense. Google may use cookies to serve ads based on your interests. Google's Privacy Policy can be found <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">here</a>.</p>
      </section>

      <section>
        <h3 className="font-semibold text-gray-800">3. Cookies</h3>
        <p className="mt-1">This service uses third-party (Google) cookies for advertising purposes. You can disable cookies in your browser settings, but some features may be limited.</p>
      </section>

      <section>
        <h3 className="font-semibold text-gray-800">4. Third-Party Services</h3>
        <p className="mt-1">The name generation feature is processed through Cloudflare Workers AI. Cloudflare's Privacy Policy can be found <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">here</a>.</p>
      </section>

      <section>
        <h3 className="font-semibold text-gray-800">5. Children</h3>
        <p className="mt-1">This service does not intentionally collect personal information from children under 13.</p>
      </section>

      <section>
        <h3 className="font-semibold text-gray-800">6. Contact</h3>
        <p className="mt-1">For questions about privacy, please contact us at:<br />
          <a href="mailto:contact@mykoreanname.kr" className="text-brand-600 underline">contact@mykoreanname.kr</a>
        </p>
      </section>
    </div>
  )
}
