import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronRight, MapPin, MessageCircle, Phone } from 'lucide-react'
import { SubScreen, useApp } from '../components'
import { contacts, fmtVnd, img, products, useL } from '../data'
import './sub.css'

export default function ProductDetail() {
  const { id } = useParams()
  const { t } = useTranslation()
  const L = useL()
  const nav = useNavigate()
  const { toast } = useApp()
  const p = products.find((x) => x.id === id) ?? products[0]
  const owner = contacts.find((c) => c.id === p.owner) ?? contacts[0]
  const [days, setDays] = useState(1)

  const crit = [
    { k: t('detail.c1'), v: 95 },
    { k: t('detail.c2'), v: 90 },
    { k: t('detail.c3'), v: 93 },
    { k: t('detail.c4'), v: 92 },
  ]

  return (
    <SubScreen
      title={L(p.short)}
      center
      nav={false}
      right={
        <svg width="22" height="24" viewBox="0 0 22 24" aria-hidden>
          <path d="M6.5 8V6a4.5 4.5 0 0 1 9 0v2" fill="none" stroke="#22a584" strokeWidth="2" strokeLinecap="round" />
          <path d="M2.6 7.5h16.8l1.1 13.6a2 2 0 0 1-2 2.2H3.5a2 2 0 0 1-2-2.2z" fill="#22a584" />
          <path d="M7 11.5a4 4 0 0 0 8 0" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      }
      footer={
        <div className="pd-foot">
          <button className="btn btn-grad" onClick={() => nav(`/checkout/${p.id}?days=${days}`)}>{t('detail.borrowNow')}</button>
        </div>
      }
    >
      <img className="pd-img" src={img(p.image)} alt="" />
      <div className="pd-body">
        <div className="row pd-h">
          <h2>{L(p.name)}</h2>
          <b className="pr">{fmtVnd(p.price)}đ<small>{t('common.perDay')}</small></b>
        </div>
        <div className="row pd-h2">
          <span>🏅 {t('borrow.trust')} <em>{p.trust}/100</em> <small>({t('detail.reviews', { n: 10 })})</small></span>
          <span>{t('common.deposit')}: <em>{fmtVnd(p.deposit)}đ</em></span>
        </div>

        <div className="row pd-owner">
          <img src={img(owner.avatar)} alt="" />
          <div>
            <b>{owner.name}</b>
            <span>{t('detail.student')}</span>
            <small><MapPin size={10} /> {L(p.location)}</small>
          </div>
          <button className="circ" onClick={() => nav('/chat/' + owner.id)} aria-label="chat"><MessageCircle size={18} fill="#22a584" color="#22a584" /></button>
          <button className="circ" onClick={() => toast('0901 234 567')} aria-label="call"><Phone size={17} fill="#22a584" color="#22a584" /></button>
        </div>

        <div className="pd-sec">{t('detail.chooseTime')}</div>
        <div className="pd-days">
          {[1, 2, 3, 4, 5, 6].map((d) => (
            <button key={d} className={days === d ? 'on' : ''} onClick={() => setDays(d)}>{(d === 1 ? t('detail.day1') : t('detail.days', { n: d }))}</button>
          ))}
        </div>

        <div className="pd-trust">
          <div className="row hd">
            <b>🏅90 <span>{t('detail.trustReview')}</span> <small>(10)</small></b>
            <button onClick={() => toast(t('common.comingSoon'))}>{t('common.seeMore')}<ChevronRight size={12} /></button>
          </div>
          {crit.map((c) => (
            <div className="cr" key={c.k}>
              <span>{c.k}</span>
              <div className="row"><div className="bar"><i style={{ width: c.v + '%' }} /></div><em>{c.v}%</em></div>
            </div>
          ))}
        </div>
      </div>
    </SubScreen>
  )
}
