// 12간지 데이터 + 2026년 운세

export const ZODIAC = [
  {
    index: 0, emoji: '🐭',
    ko: '쥐', hanja: '子',
    en: 'Rat',  ja: 'ねずみ',
    years: [1948,1960,1972,1984,1996,2008,2020],
    traits: { en: 'Quick-witted, resourceful, adaptable', ja: '機知に富み、臨機応変' },
    lucky: { color: { en: 'Blue, Gold', ja: 'ブルー、ゴールド' }, number: '2, 3' },
    fortune2026: {
      overall: 4, love: 3, career: 5, health: 3,
      en: 'A breakthrough year! Your sharp instincts lead to major career wins. Stay focused in Q2.',
      ja: '飛躍の年！鋭い直感がキャリアに大きな成果をもたらします。',
    },
  },
  {
    index: 1, emoji: '🐮',
    ko: '소', hanja: '丑',
    en: 'Ox', ja: 'うし',
    years: [1949,1961,1973,1985,1997,2009,2021],
    traits: { en: 'Diligent, dependable, strong', ja: '勤勉で頼りになる' },
    lucky: { color: { en: 'White, Yellow', ja: 'ホワイト、イエロー' }, number: '1, 4' },
    fortune2026: {
      overall: 3, love: 4, career: 3, health: 4,
      en: 'Steady progress rewards your hard work. Love life blooms — be open to new connections.',
      ja: '着実な努力が報われます。恋愛運上昇中。新しい出会いに積極的に。',
    },
  },
  {
    index: 2, emoji: '🐯',
    ko: '호랑이', hanja: '寅',
    en: 'Tiger', ja: 'とら',
    years: [1950,1962,1974,1986,1998,2010,2022],
    traits: { en: 'Brave, confident, charismatic', ja: '勇敢で自信に満ち溢れる' },
    lucky: { color: { en: 'Orange, White', ja: 'オレンジ、ホワイト' }, number: '1, 7' },
    fortune2026: {
      overall: 5, love: 4, career: 4, health: 3,
      en: 'Your year to roar! Bold moves pay off. Romance sizzles. Watch your energy levels.',
      ja: '大活躍の年！大胆な行動が実を結びます。恋愛も情熱的に。',
    },
  },
  {
    index: 3, emoji: '🐰',
    ko: '토끼', hanja: '卯',
    en: 'Rabbit', ja: 'うさぎ',
    years: [1951,1963,1975,1987,1999,2011,2023],
    traits: { en: 'Gentle, elegant, lucky', ja: '優しく上品で幸運に恵まれる' },
    lucky: { color: { en: 'Pink, Purple', ja: 'ピンク、パープル' }, number: '3, 9' },
    fortune2026: {
      overall: 3, love: 5, career: 3, health: 4,
      en: 'Love is your superpower this year. Relationships deepen beautifully. Career needs patience.',
      ja: '恋愛運が最高潮！関係が深まります。仕事は焦らず着実に。',
    },
  },
  {
    index: 4, emoji: '🐲',
    ko: '용', hanja: '辰',
    en: 'Dragon', ja: 'たつ',
    years: [1952,1964,1976,1988,2000,2012,2024],
    traits: { en: 'Powerful, lucky, imaginative', ja: '力強く幸運、想像力豊か' },
    lucky: { color: { en: 'Gold, Silver', ja: 'ゴールド、シルバー' }, number: '1, 6' },
    fortune2026: {
      overall: 5, love: 3, career: 5, health: 4,
      en: 'Peak power year! Financial gains and recognition at work. Focus on self-care in H2.',
      ja: '絶頂期！財運・仕事運ともに絶好調。後半は健康管理を忘れずに。',
    },
  },
  {
    index: 5, emoji: '🐍',
    ko: '뱀', hanja: '巳',
    en: 'Snake', ja: 'へび',
    years: [1953,1965,1977,1989,2001,2013,2025],
    traits: { en: 'Wise, intuitive, graceful', ja: '賢明で直感が鋭く優雅' },
    lucky: { color: { en: 'Black, Red', ja: 'ブラック、レッド' }, number: '2, 8' },
    fortune2026: {
      overall: 4, love: 4, career: 4, health: 3,
      en: 'Wisdom guides you to smart choices. Stable growth in career. Trust your gut in love.',
      ja: '智恵が正しい選択に導きます。仕事は安定成長。恋愛は直感を信じて。',
    },
  },
  {
    index: 6, emoji: '🐴',
    ko: '말', hanja: '午',
    en: 'Horse', ja: 'うま',
    years: [1954,1966,1978,1990,2002,2014,2026],
    traits: { en: 'Energetic, free-spirited, loyal', ja: 'エネルギッシュで自由奔放' },
    lucky: { color: { en: 'Yellow, Green', ja: 'イエロー、グリーン' }, number: '3, 4' },
    fortune2026: {
      overall: 4, love: 3, career: 4, health: 5,
      en: '2026 is YOUR year — full speed ahead! Vitality is sky-high. Set ambitious goals.',
      ja: '2026年はあなたの年！エネルギー全開。野心的な目標を立てましょう。',
    },
  },
  {
    index: 7, emoji: '🐑',
    ko: '양', hanja: '未',
    en: 'Goat', ja: 'ひつじ',
    years: [1955,1967,1979,1991,2003,2015,2027],
    traits: { en: 'Creative, compassionate, calm', ja: '創造力豊かで思いやりがある' },
    lucky: { color: { en: 'Green, Red', ja: 'グリーン、レッド' }, number: '2, 7' },
    fortune2026: {
      overall: 3, love: 4, career: 3, health: 3,
      en: 'Creativity flows — pursue artistic projects. Harmonious relationships bless you.',
      ja: '創造力が開花する年。芸術的な活動を。人間関係に恵まれます。',
    },
  },
  {
    index: 8, emoji: '🐵',
    ko: '원숭이', hanja: '申',
    en: 'Monkey', ja: 'さる',
    years: [1956,1968,1980,1992,2004,2016,2028],
    traits: { en: 'Clever, curious, versatile', ja: '賢く好奇心旺盛で多才' },
    lucky: { color: { en: 'White, Blue', ja: 'ホワイト、ブルー' }, number: '4, 9' },
    fortune2026: {
      overall: 4, love: 3, career: 5, health: 4,
      en: 'Your cleverness unlocks unexpected opportunities. Innovation wins. Love needs attention.',
      ja: '才知が思わぬチャンスを開きます。革新的な発想が勝負に。',
    },
  },
  {
    index: 9, emoji: '🐔',
    ko: '닭', hanja: '酉',
    en: 'Rooster', ja: 'とり',
    years: [1957,1969,1981,1993,2005,2017,2029],
    traits: { en: 'Confident, hardworking, precise', ja: '自信家で勤勉、几帳面' },
    lucky: { color: { en: 'Gold, Brown', ja: 'ゴールド、ブラウン' }, number: '5, 7' },
    fortune2026: {
      overall: 3, love: 4, career: 3, health: 4,
      en: 'Precision and persistence pay off mid-year. Social life thrives — networking opens doors.',
      ja: '年央から成果が出始めます。社交運上昇、人脈が広がります。',
    },
  },
  {
    index: 10, emoji: '🐶',
    ko: '개', hanja: '戌',
    en: 'Dog', ja: 'いぬ',
    years: [1958,1970,1982,1994,2006,2018,2030],
    traits: { en: 'Loyal, honest, courageous', ja: '忠実で正直、勇気がある' },
    lucky: { color: { en: 'Red, Green', ja: 'レッド、グリーン' }, number: '3, 4' },
    fortune2026: {
      overall: 4, love: 5, career: 3, health: 4,
      en: 'Loyalty brings its greatest rewards. Deep love connections form. Work picks up in Q3.',
      ja: '誠実さが最大の報酬をもたらします。深い愛の絆が生まれる年。',
    },
  },
  {
    index: 11, emoji: '🐷',
    ko: '돼지', hanja: '亥',
    en: 'Pig', ja: 'いのしし',
    years: [1959,1971,1983,1995,2007,2019,2031],
    traits: { en: 'Generous, diligent, optimistic', ja: '寛大で勤勉、楽天的' },
    lucky: { color: { en: 'Yellow, Gray', ja: 'イエロー、グレー' }, number: '2, 5' },
    fortune2026: {
      overall: 4, love: 4, career: 4, health: 3,
      en: 'Abundance flows your way. Generosity attracts wealth. Balance work and rest.',
      ja: '豊かさがやってきます。寛大さが富を引き寄せます。仕事と休息のバランスを。',
    },
  },
]

// 생년으로 간지 계산
export function getZodiacByYear(year) {
  const idx = ((year - 4) % 12 + 12) % 12
  return ZODIAC[idx]
}

// 별점 → 이모지
export function starsToEmoji(n) {
  return '★'.repeat(n) + '☆'.repeat(5 - n)
}
