import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, CirclePlus, Smile, SlidersHorizontal } from 'lucide-react'
import { chatThread, contacts, img, products, useL, type ChatMsg } from '../data'
import './sub.css'

export default function Chat() {
  const { id } = useParams()
  const { t } = useTranslation()
  const L = useL()
  const nav = useNavigate()
  const c = contacts.find((x) => x.id === id) ?? contacts[0]
  const p = products[0]
  const [msgs, setMsgs] = useState<ChatMsg[]>(chatThread)
  const [text, setText] = useState('')
  const end = useRef<HTMLDivElement>(null)
  useEffect(() => { end.current?.scrollIntoView({ block: 'end' }) }, [msgs])

  const send = () => {
    if (!text.trim()) return
    const now = new Date()
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`
    setMsgs((m) => [...m, { me: true, text: { vi: text, en: text }, time }])
    setText('')
  }

  return (
    <div className="screen ch">
      <div className="ch-top">
        <button onClick={() => nav(-1)} aria-label="back"><ChevronLeft size={28} color="#22a584" /></button>
        <img src={img(c.avatar)} alt="" />
        <div>
          <b>{c.name}</b>
          <span><i /> {t('messages.active')}</span>
        </div>
        <SlidersHorizontal size={20} style={{ marginLeft: 'auto' }} />
      </div>
      <div className="scroll ch-body">
        <button className="ch-prod" onClick={() => nav('/product/' + p.id)}>
          <img src={img(p.image)} alt="" />
          <div><b>{L(p.name)}</b><span>100.000</span></div>
        </button>
        {msgs.map((m, i) => (
          <div className={'ch-msg' + (m.me ? ' me' : '')} key={i}>
            <span className="bub">{L(m.text)}</span>
            <small>{m.time}</small>
          </div>
        ))}
        <div ref={end} />
      </div>
      <form className="ch-input" onSubmit={(e) => { e.preventDefault(); send() }}>
        <CirclePlus size={22} color="#22a584" />
        <label>
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder={t('messages.placeholder')} />
          <Smile size={20} color="#22a584" />
        </label>
      </form>
    </div>
  )
}
