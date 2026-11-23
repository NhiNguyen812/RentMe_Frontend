import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Search } from 'lucide-react'
import { SubScreen } from '../components'
import { contacts, img, useL } from '../data'
import './sub.css'
import './borrow.css'

export default function Messages() {
  const { t } = useTranslation()
  const L = useL()
  const nav = useNavigate()
  const [q, setQ] = useState('')
  const list = contacts.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()))
  return (
    <SubScreen title={t('messages.title')} nav={false}>
      <div className="ms-wrap">
        <label className="b-search ms-search">
          <Search size={20} strokeWidth={2} color="#22a584" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('common.search')} />
        </label>
        {list.map((c) => (
          <button className="ms-row" key={c.id} onClick={() => nav('/chat/' + c.id)}>
            <img src={img(c.avatar)} alt="" />
            <div>
              <b>{c.name}</b>
              <span>{L(c.last)}</span>
            </div>
            <i className="dot" />
          </button>
        ))}
      </div>
    </SubScreen>
  )
}
