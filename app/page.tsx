'use client'

import { useState } from 'react'

// ───────────────────────────────────────────
// Types
// ───────────────────────────────────────────
type EventKind =
  | 'train'
  | 'car'
  | 'walk'
  | 'pool'
  | 'balloon'
  | 'adventure'
  | 'onsen'
  | 'meal'
  | 'hotel'
  | 'castle'
  | 'shopping'
  | 'fuel'
  | 'start'
  | 'arrive'
  | 'sleep'

interface Event {
  time: string
  endTime?: string
  kind: EventKind
  title: string
  sub?: string
  note?: string
  highlight?: boolean
  isTransport?: boolean
  from?: string
  to?: string
}

interface Day {
  id: number
  date: string
  label: string
  heading: string
  sub: string
  color: string        // Tailwind bg class for header
  accent: string       // hex for timeline line
  lightBg: string      // Tailwind bg class for section
  events: Event[]
}

// ───────────────────────────────────────────
// Icon map
// ───────────────────────────────────────────
const ICONS: Record<EventKind, string> = {
  train:     '🚄',
  car:       '🚗',
  walk:      '🚶',
  pool:      '🏊',
  balloon:   '🎈',
  adventure: '🧗',
  onsen:     '♨️',
  meal:      '🍽️',
  hotel:     '🏨',
  castle:    '🏯',
  shopping:  '🛍️',
  fuel:      '⛽',
  start:     '🏁',
  arrive:    '📍',
  sleep:     '🌙',
}

const KIND_COLOR: Record<EventKind, string> = {
  train:     'bg-blue-500',
  car:       'bg-orange-500',
  walk:      'bg-lime-500',
  pool:      'bg-cyan-500',
  balloon:   'bg-pink-500',
  adventure: 'bg-green-600',
  onsen:     'bg-red-400',
  meal:      'bg-yellow-500',
  hotel:     'bg-purple-500',
  castle:    'bg-stone-500',
  shopping:  'bg-rose-400',
  fuel:      'bg-gray-500',
  start:     'bg-emerald-500',
  arrive:    'bg-teal-500',
  sleep:     'bg-indigo-500',
}

// ───────────────────────────────────────────
// Itinerary data
// ───────────────────────────────────────────
const DAYS: Day[] = [
  {
    id: 1,
    date: '5月5日（火）',
    label: 'DAY 1',
    heading: '出発！松本経由で白馬へ',
    sub: '武蔵境 → 電車 → 松本 → レンタカー → ラーラ松本プール → 白馬',
    color: 'from-orange-400 to-yellow-400',
    accent: '#F97316',
    lightBg: 'bg-orange-50',
    events: [
      {
        time: '08:22',
        kind: 'start',
        title: '武蔵境駅 出発！',
        sub: '中央線で国分寺・立川で乗換',
        note: '忘れ物チェック！チケット・着替え・おやつ',
        highlight: false,
      },
      {
        time: '08:22',
        endTime: '11:27',
        kind: 'train',
        title: '特急あずさ',
        sub: '武蔵境 → 松本',
        note: '国分寺・立川で乗換。車窓から富士山が見えるかも🗻',
        isTransport: true,
        from: '武蔵境',
        to: '松本',
      },
      {
        time: '11:27',
        kind: 'arrive',
        title: '松本駅 到着',
        sub: '駅周辺でちょっと休憩',
      },
      {
        time: '12:00',
        kind: 'car',
        title: 'レンタカー受取',
        sub: '松本駅周辺のレンタカー店',
        note: '免許証・予約確認書を忘れずに！',
        highlight: true,
      },
      {
        time: '12:20',
        endTime: '15:30',
        kind: 'pool',
        title: 'ラーラ松本 プール・休憩',
        sub: '松本市総合体育館横のプール施設',
        note: 'みんなでぱしゃぱしゃ🌊 水着・タオル・ゴーグル必須！',
        highlight: true,
      },
      {
        time: '15:45',
        endTime: '17:30',
        kind: 'car',
        title: '松本 → 白馬へドライブ',
        sub: '約1時間45分 北アルプスの山々を眺めながら',
        isTransport: true,
        from: '松本',
        to: '白馬',
      },
      {
        time: '17:30',
        endTime: '18:00',
        kind: 'hotel',
        title: '宿到着・チェックイン',
        sub: '白馬の宿でひと息',
        note: '荷物を置いてさっぱり準備！',
      },
      {
        time: '夜',
        kind: 'meal',
        title: '夕食・のんびり休憩',
        sub: '明日に備えてゆっくり就寝',
      },
    ],
  },
  {
    id: 2,
    date: '5月6日（水・祝）',
    label: 'DAY 2',
    heading: 'アクティビティ全力の日！',
    sub: '熱気球 → アドベンチャー → ジャイアントスウィング → 温泉',
    color: 'from-sky-400 to-blue-500',
    accent: '#0EA5E9',
    lightBg: 'bg-sky-50',
    events: [
      {
        time: '05:45',
        endTime: '06:00',
        kind: 'start',
        title: '起床・出発準備',
        sub: '早起きするぞ〜！めざましかけよう⏰',
      },
      {
        time: '06:00',
        endTime: '07:00',
        kind: 'balloon',
        title: '熱気球 係留体験',
        sub: '白馬の朝焼けを空中から満喫！',
        note: '雨・強風の場合は中止あり。当日確認を🌤',
        highlight: true,
      },
      {
        time: '07:15',
        endTime: '08:30',
        kind: 'hotel',
        title: '宿に戻って朝食・休憩',
        sub: 'しっかり食べて午前のアクティビティに備える',
      },
      {
        time: '09:00',
        endTime: '11:30',
        kind: 'adventure',
        title: '白馬EXアドベンチャー',
        sub: 'ジップライン・クライミング・アスレチック',
        note: '動きやすい服装で！水分補給忘れずに💪',
        highlight: true,
      },
      {
        time: '11:45',
        endTime: '12:45',
        kind: 'meal',
        title: '昼食',
        sub: 'お腹ぺこぺこ！がっつり食べよう🍜',
      },
      {
        time: '13:00',
        kind: 'car',
        title: '白馬岩岳マウンテンリゾートへ移動',
        sub: '車で数分',
        isTransport: true,
        from: '昼食場所',
        to: '白馬岩岳',
      },
      {
        time: '13:00',
        endTime: '15:30',
        kind: 'adventure',
        title: '白馬岩岳マウンテンリゾート',
        sub: 'ゴンドラで山頂へ',
        note: '北アルプスの絶景！写真撮りまくり📸',
        highlight: true,
      },
      {
        time: '13:30',
        endTime: '14:30',
        kind: 'adventure',
        title: 'ジャイアントスウィング・山頂散策',
        sub: '超高所ブランコ！スリル満点🎢',
        note: '勇気を出してチャレンジ！めっちゃ怖いけど最高らしい',
        highlight: true,
      },
      {
        time: '15:30',
        endTime: '16:00',
        kind: 'car',
        title: '下山・移動',
        sub: 'ゴンドラで降りて温泉へ',
        isTransport: true,
        from: '岩岳山頂',
        to: '温泉',
      },
      {
        time: '16:00',
        endTime: '17:00',
        kind: 'onsen',
        title: '温泉でほっこり♨️',
        sub: '疲れた体を癒す至福のひととき',
        note: 'タオル・着替えを準備しておこう',
        highlight: true,
      },
      {
        time: '夜',
        kind: 'sleep',
        title: '夕食・宿泊',
        sub: 'ぐっすり眠って明日に備えよう😴',
      },
    ],
  },
  {
    id: 3,
    date: '5月7日（木）',
    label: 'DAY 3',
    heading: '松本城・お土産・帰宅',
    sub: '白馬 → 松本城 → お土産 → 武蔵境',
    color: 'from-green-500 to-emerald-500',
    accent: '#16A34A',
    lightBg: 'bg-green-50',
    events: [
      {
        time: '08:00',
        kind: 'start',
        title: '白馬の宿を出発',
        sub: 'チェックアウト・忘れ物チェック！',
      },
      {
        time: '08:00',
        endTime: '09:45',
        kind: 'car',
        title: '白馬 → 松本ドライブ',
        sub: '約1時間45分',
        isTransport: true,
        from: '白馬',
        to: '松本城周辺',
      },
      {
        time: '09:45',
        endTime: '10:00',
        kind: 'arrive',
        title: '松本城周辺 到着・駐車',
        sub: '周辺の駐車場を利用',
      },
      {
        time: '10:00',
        endTime: '11:15',
        kind: 'castle',
        title: '松本城 観光',
        sub: '国宝！日本最古の五重六階の天守閣🏯',
        note: '天守の中は急な階段。小さい子注意！',
        highlight: true,
      },
      {
        time: '11:15',
        endTime: '11:45',
        kind: 'shopping',
        title: 'なわて通り・軽い散策',
        sub: 'カエルグッズが有名な商店街。かわいいお土産を探そう🐸',
        note: 'アイスや甘いものも食べ歩きしよう',
      },
      {
        time: '11:45',
        endTime: '12:15',
        kind: 'fuel',
        title: '給油・レンタカー返却準備',
        sub: '返却前に満タン給油を忘れずに！',
      },
      {
        time: '12:30',
        kind: 'car',
        title: 'レンタカー返却',
        sub: 'ありがとう相棒！キズ・忘れ物チェック',
      },
      {
        time: '12:30',
        endTime: '13:30',
        kind: 'meal',
        title: '松本駅で昼食・お土産・トイレ',
        sub: '信州そば・山賊焼きなど🍜 お土産もここで！',
        note: '信州そば or 山賊焼きがおすすめ',
        highlight: true,
      },
      {
        time: '13:45',
        kind: 'train',
        title: '松本駅 出発',
        sub: '特急あずさで帰宅',
        highlight: false,
      },
      {
        time: '13:45',
        endTime: '16:20',
        kind: 'train',
        title: '特急あずさ',
        sub: '松本 → 武蔵境',
        note: 'お疲れ様！車内でお土産の品定めをしながら帰ろう🎁',
        isTransport: true,
        from: '松本',
        to: '武蔵境',
      },
      {
        time: '16:20',
        kind: 'arrive',
        title: '武蔵境 到着！',
        sub: '楽しかった〜！また行こうね🌟',
        highlight: true,
      },
    ],
  },
]

// ───────────────────────────────────────────
// Components
// ───────────────────────────────────────────

function Bunting() {
  const colors = [
    'bg-red-400', 'bg-orange-400', 'bg-yellow-400',
    'bg-green-400', 'bg-blue-400', 'bg-purple-400',
    'bg-pink-400', 'bg-red-400', 'bg-orange-400',
    'bg-yellow-400', 'bg-green-400', 'bg-blue-400',
    'bg-purple-400', 'bg-pink-400', 'bg-red-400',
    'bg-orange-400',
  ]
  return (
    <div className="flex justify-center items-end gap-0 overflow-hidden h-12 px-2">
      {/* rope line */}
      <svg className="absolute w-full" style={{ height: 48, top: 0, left: 0 }} preserveAspectRatio="none">
        <path
          d={`M 0 8 Q 50 24 100 8 Q 150 0 200 8 Q 250 20 300 8 Q 400 0 500 8 Q 600 20 700 8 Q 800 0 900 8 Q 1000 20 1100 8 Q 1200 0 1300 8 Q 1400 20 1500 8`}
          fill="none"
          stroke="#888"
          strokeWidth="1.5"
        />
      </svg>
      {colors.map((c, i) => (
        <div
          key={i}
          className={`bunting-flag w-8 h-10 ${c} opacity-90`}
          style={{
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            animationDelay: `${i * 0.15}s`,
            marginTop: i % 2 === 0 ? '0px' : '4px',
          }}
        />
      ))}
    </div>
  )
}

function TransportBand({ event, accent }: { event: Event; accent: string }) {
  return (
    <div className="flex gap-3 my-1">
      <div className="flex flex-col items-center w-16 flex-shrink-0">
        <span className="text-xs font-bold text-gray-500">{event.time}</span>
        <div className="w-1 flex-1 rounded-full mt-1" style={{ backgroundColor: accent, minHeight: 40 }} />
        <span className="text-xs font-bold text-gray-500">{event.endTime}</span>
      </div>
      <div
        className="flex-1 rounded-2xl p-4 flex items-center gap-3 shadow-sm my-1"
        style={{ backgroundColor: `${accent}18` }}
      >
        <div className="flex-1">
          <div className="font-bold text-gray-800">{event.title}</div>
          {event.from && event.to && (
            <div className="flex items-center gap-1 text-sm mt-1">
              <span className="font-semibold text-gray-700">{event.from}</span>
              <span className="text-gray-400">→</span>
              <span className="font-semibold text-gray-700">{event.to}</span>
            </div>
          )}
          {event.sub && <div className="text-sm text-gray-600 mt-0.5">{event.sub}</div>}
        </div>
      </div>
    </div>
  )
}

function EventCard({ event, accent }: { event: Event; accent: string }) {
  const dotColor = KIND_COLOR[event.kind]
  return (
    <div className="flex gap-3 my-1">
      <div className="flex flex-col items-center w-16 flex-shrink-0">
        <span className="text-xs font-bold text-gray-600 leading-tight text-center">{event.time}</span>
        {event.endTime && (
          <>
            <div className="w-0.5 flex-1 bg-gray-200 mt-1 rounded-full" style={{ minHeight: 16 }} />
            <span className="text-xs text-gray-400 leading-tight">{event.endTime}</span>
          </>
        )}
      </div>
      <div
        className={`event-card flex-1 rounded-2xl p-3 shadow-sm pb-1 ${
          event.highlight
            ? 'border-2 bg-white'
            : 'bg-white/70 border border-gray-100'
        }`}
        style={event.highlight ? { borderColor: accent } : {}}
      >
        <div className="flex items-start gap-2">
          <div className={`w-8 h-8 rounded-full ${dotColor} flex items-center justify-center flex-shrink-0 shadow-sm`}>
            <span className="text-base leading-none">{ICONS[event.kind]}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-gray-800 leading-tight">{event.title}</div>
            {event.sub && <div className="text-sm text-gray-600 mt-0.5">{event.sub}</div>}
          </div>
        </div>
        {event.note && (
          <div className="mt-2 flex items-start gap-1.5 bg-yellow-50 rounded-xl p-2">
            <span className="text-sm">📝</span>
            <span className="text-xs text-gray-700 leading-relaxed">{event.note}</span>
          </div>
        )}
      </div>
    </div>
  )
}

function DaySection({ day, active }: { day: Day; active: boolean }) {
  if (!active) return null
  return (
    <section className={`${day.lightBg} rounded-3xl p-4 md:p-6 shadow-inner`}>
      {/* Day header */}
      <div className={`bg-gradient-to-r ${day.color} rounded-2xl p-4 md:p-6 mb-6 text-white shadow-lg`}>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="bg-white/30 backdrop-blur-sm text-white font-black text-xl px-4 py-1 rounded-full">
            {day.label}
          </span>
          <span className="font-bold text-lg">{day.date}</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-black mt-2 leading-tight">{day.heading}</h2>
        <p className="text-white/80 text-sm mt-1">{day.sub}</p>
      </div>

      {/* Timeline */}
      <div className="space-y-1">
        {day.events.map((event, i) => {
          if (event.isTransport) {
            return <TransportBand key={i} event={event} accent={day.accent} />
          }
          return <EventCard key={i} event={event} accent={day.accent} />
        })}
      </div>
    </section>
  )
}

// ───────────────────────────────────────────
// Main page
// ───────────────────────────────────────────
function CoverImage() {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <div className="relative w-full">
      {/* Fallback: always rendered, hidden only when real image loaded */}
      <div
        className="w-full flex flex-col items-center justify-center text-center px-6 py-14 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(160deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #533483 100%)',
          opacity: imgLoaded ? 0 : 1,
          position: imgLoaded ? 'absolute' : 'relative',
          inset: 0,
          pointerEvents: imgLoaded ? 'none' : 'auto',
        }}
      >
        {/* Stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {['⭐','🌟','✨','💫','⭐','🌟','✨','💫','⭐','🌟'].map((s, i) => (
            <span
              key={i}
              className="absolute text-xl sparkle"
              style={{
                left: `${(i * 11 + 5) % 100}%`,
                top: `${(i * 17 + 8) % 80}%`,
                animationDelay: `${i * 0.3}s`,
                opacity: 0.7,
              }}
            >{s}</span>
          ))}
        </div>

        {/* Bunting flags row */}
        <div className="flex gap-1 mb-6 flex-wrap justify-center">
          {['#FF6B6B','#FFD93D','#6BCB77','#4D96FF','#FF6B6B','#C77DFF','#FFD93D','#6BCB77'].map((c, i) => (
            <div
              key={i}
              className="w-6 h-8"
              style={{ backgroundColor: c, clipPath: 'polygon(0 0, 100% 0, 50% 100%)', opacity: 0.9 }}
            />
          ))}
        </div>

        <p className="text-white/80 text-sm font-bold tracking-widest mb-1">家族でたのしむ！</p>
        <h1 className="font-black leading-none mb-3" style={{
          fontSize: 'clamp(2.5rem, 12vw, 4.5rem)',
          background: 'linear-gradient(90deg, #FFD700, #FF8C00, #FF69B4, #00BFFF, #7FFF00)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))',
        }}>
          ぶっ飛べ！<br />
          <span style={{ fontSize: '0.85em' }}>ゴールデンウィーク</span><br />
          <span style={{ fontSize: '1.2em', letterSpacing: '-0.02em' }}>2026</span>
        </h1>

        <div className="flex gap-3 mt-3 flex-wrap justify-center">
          {[
            { label: '白馬', en: 'HAKUBA', emoji: '🏔️' },
            { label: '松本', en: 'MATSUMOTO', emoji: '🏯' },
          ].map((p) => (
            <div
              key={p.label}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-white"
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1.5px solid rgba(255,255,255,0.3)' }}
            >
              <span className="text-xl">{p.emoji}</span>
              <div className="text-left leading-tight">
                <div className="text-base">{p.label}</div>
                <div className="text-xs opacity-70">{p.en}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3 text-2xl">
          {['🎈','🚗','🏊','🧗','♨️','🏯'].map((e, i) => (
            <span key={i} className="animate-bounce-slow" style={{ animationDelay: `${i * 0.15}s` }}>{e}</span>
          ))}
        </div>

        <p className="text-white/60 text-sm mt-5 font-bold">一緒に冒険！がちゃ ＆ わちゃ 🌟</p>
      </div>

      {/* Real image: loads silently, shown on success */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/cover.jpg"
        alt="ぶっ飛べ！ゴールデンウィーク2026"
        className="w-full h-auto object-cover transition-opacity duration-500"
        style={{ opacity: imgLoaded ? 1 : 0, display: 'block' }}
        onLoad={() => setImgLoaded(true)}
        onError={() => {/* keep fallback */}}
      />
    </div>
  )
}

export default function Home() {
  const [activeDay, setActiveDay] = useState(1)

  const tabColors = [
    { active: 'bg-orange-500 text-white shadow-lg shadow-orange-200', inactive: 'bg-white text-orange-500 border-2 border-orange-300 hover:bg-orange-50' },
    { active: 'bg-sky-500 text-white shadow-lg shadow-sky-200', inactive: 'bg-white text-sky-500 border-2 border-sky-300 hover:bg-sky-50' },
    { active: 'bg-green-600 text-white shadow-lg shadow-green-200', inactive: 'bg-white text-green-600 border-2 border-green-300 hover:bg-green-50' },
  ]

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #FFFBF0 0%, #FFF5E4 100%)' }}>

      {/* ── Hero / Cover ── */}
      <div className="relative overflow-hidden">
        {/* Bunting */}
        <div className="relative bg-gradient-to-b from-sky-100 to-transparent pt-2 pb-0 z-10">
          <Bunting />
        </div>

        {/* Cover image */}
        <div className="relative w-full max-w-2xl mx-auto px-4 pt-2 pb-0">
          <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <CoverImage />
          </div>
        </div>

        {/* Trip stats bar */}
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="bg-white rounded-2xl shadow-md p-4 flex flex-wrap justify-around gap-3 text-center">
            {[
              { emoji: '📅', label: '5月5日〜7日', sub: '3日間' },
              { emoji: '📍', label: '白馬・松本', sub: '長野県' },
              { emoji: '👨‍👩‍👧‍👦', label: '家族4人', sub: 'がちゃ＆わちゃ' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <span className="text-2xl">{s.emoji}</span>
                <span className="font-bold text-sm text-gray-800">{s.label}</span>
                <span className="text-xs text-gray-500">{s.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-2xl mx-auto px-4 pb-12">

        {/* Day tabs */}
        <div className="sticky top-2 z-20 mb-4">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-2 shadow-lg flex gap-2">
            {DAYS.map((day, i) => (
              <button
                key={day.id}
                onClick={() => setActiveDay(day.id)}
                className={`flex-1 py-2.5 px-2 rounded-xl font-bold text-sm transition-all duration-200 ${
                  activeDay === day.id ? tabColors[i].active : tabColors[i].inactive
                }`}
              >
                <div className="text-xs opacity-80">{day.date.split('（')[0]}</div>
                <div>{day.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Day sections */}
        {DAYS.map((day) => (
          <DaySection key={day.id} day={day} active={activeDay === day.id} />
        ))}

        {/* Footer fun */}
        <div className="mt-8 text-center">
          <div className="text-4xl mb-2 flex justify-center gap-2">
            <span className="sparkle">⭐</span>
            <span className="sparkle">🎉</span>
            <span className="sparkle">⭐</span>
          </div>
          <p className="font-black text-xl text-gray-700">楽しいGWにしようね！！</p>
          <p className="text-gray-500 text-sm mt-1">がちゃ＆わちゃと一緒に大冒険 🌟</p>
          <div className="mt-4 text-3xl flex justify-center gap-3 animate-bounce-slow">
            <span>🏔️</span><span>🚗</span><span>🏊</span><span>🎈</span><span>♨️</span><span>🏯</span>
          </div>
        </div>
      </div>
    </div>
  )
}
