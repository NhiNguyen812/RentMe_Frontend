import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Camera, ChevronLeft, CircleUserRound, RefreshCw } from 'lucide-react'
import { img } from '../data'
import './sub.css'

type Chip = { key: string }
type Msg = { from: 'bot' | 'me'; key: string; params?: Record<string, string>; chips?: Chip[]; refresh?: boolean; link?: { key: string; to: string } }

const MENU: Chip[] = [{ key: 'bot.borrow' }, { key: 'bot.lend' }, { key: 'bot.search' }, { key: 'bot.guide' }]
const TYPES: Chip[] = [{ key: 'bot.electronics' }, { key: 'bot.household' }, { key: 'bot.books' }, { key: 'bot.clothes' }, { key: 'bot.sports' }]
const LISTS: Record<string, { key: string; chips: Chip[] }> = {
  'bot.electronics': { key: 'bot.electronicsList', chips: [{ key: 'bot.phone' }, { key: 'bot.speaker' }, { key: 'bot.ipod' }] },
  'bot.household': { key: 'bot.householdList', chips: [{ key: 'home.catHome' }] },
  'bot.books': { key: 'bot.booksList', chips: [{ key: 'bot.books' }] },
  'bot.clothes': { key: 'bot.clothesList', chips: [{ key: 'home.catClothes' }] },
  'bot.sports': { key: 'bot.sportsList', chips: [{ key: 'borrow.sport' }] },
}

export default function Chatbot() {
  const { t } = useTranslation()
  const nav = useNavigate()
  const [msgs, setMsgs] = useState<Msg[]>([{ from: 'bot', key: 'bot.hello', chips: MENU }])
  const [text, setText] = useState('')
  const end = useRef<HTMLDivElement>(null)
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }) }, [msgs])

  const reply = (chip: string) => {
    const me: Msg = { from: 'me', key: chip }
    let bot: Msg
    if (chip === 'bot.borrow') bot = { from: 'bot', key: 'bot.whichType', chips: TYPES, refresh: true }
    else if (chip === 'bot.lend') bot = { from: 'bot', key: 'bot.lendAnswer', link: { key: 'bot.goLend', to: '/post-item' } }
    else if (chip === 'bot.search') bot = { from: 'bot', key: 'bot.searchAnswer', link: { key: 'bot.goBorrow', to: '/borrow' } }
    else if (chip === 'bot.guide') bot = { from: 'bot', key: 'bot.guideAnswer' }
    else if (LISTS[chip]) bot = { from: 'bot', key: LISTS[chip].key, chips: LISTS[chip].chips, refresh: true }
    else bot = { from: 'bot', key: 'bot.pickAnswer', params: { v: t(chip) }, link: { key: 'bot.goBorrow', to: '/borrow' } }
    setMsgs((m) => [...m, me, bot])
  }

  return (
    <div className="screen bot">
      <div className="bot-top">
        <button onClick={() => nav(-1)} aria-label="back"><ChevronLeft size={24} color="#fff" /></button>
        <h1>RentMe</h1>
      </div>
      <div className="scroll bot-body">
        <img className="bot-hero" src={img('mascot-wave')} alt="" />
        {msgs.map((m, i) =>
          m.from === 'bot' ? (
            <div className="bot-msg" key={i}>
              <img className="bot-av" src={img('mascot-fab')} alt="" />
              <div className="row">
                <span className="bub">{m.params ? t(m.key, m.params) : t(m.key)}</span>
                {m.refresh && <button className="rf" onClick={() => setMsgs([{ from: 'bot', key: 'bot.hello', chips: MENU }])} aria-label="restart"><RefreshCw size={20} color="#22a584" /></button>}
              </div>
              {m.chips && (
                <div className="chips">
                  {m.chips.map((c) => <button key={c.key} onClick={() => reply(c.key)}>{t(c.key)}</button>)}
                </div>
              )}
              {m.link && <div className="chips"><button onClick={() => nav(m.link!.to)}>{t(m.link.key)}</button></div>}
            </div>
          ) : (
            <div className="me-msg" key={i}>
              <CircleUserRound size={30} strokeWidth={1.6} color="#2a7a6a" />
              <span className="bub">{t(m.key)}</span>
            </div>
          ),
        )}
        <div ref={end} style={{ height: 10 }} />
      </div>
      <form className="bot-input" onSubmit={(e) => {
        e.preventDefault()
        if (!text.trim()) return
        setMsgs((m) => [...m, { from: 'me', key: text }, { from: 'bot', key: 'bot.typed', chips: MENU }])
        setText('')
      }}>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <Camera size={18} />
      </form>
    </div>
  )
}
