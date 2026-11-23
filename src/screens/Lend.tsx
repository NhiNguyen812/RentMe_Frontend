import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Bell, CalendarDays, Check, CircleCheck, CircleX, MapPin, MessageCircle, MessageSquareMore } from 'lucide-react'
import { TabScreen, useApp } from '../components'
import { img, useL } from '../data'
import type { LText } from '../i18n'
import './lend.css'

type Tab = 'overview' | 'requests' | 'orders'

const thuDuc: LText = { vi: 'Thủ Đức, TP.HCM', en: 'Thu Duc, HCMC' }

export default function Lend() {
  const { t } = useTranslation()
  const [params, setParams] = useSearchParams()
  const tab = (params.get('tab') as Tab) || 'overview'
  const setTab = (v: Tab) => setParams({ tab: v }, { replace: true })

  return (
    <TabScreen>
      <div className="l-stats">
        <div className="l-stat s1">
          <div className="t"><span className="ico">🧾</span>{t('lend.totalIncome')}</div>
          <div className="v">28.000.000 VNĐ</div>
        </div>
        <div className="l-stat s2">
          <div className="t"><span className="ico">💰</span>{t('lend.thisMonth')}</div>
          <div className="v">2.800.000 VNĐ</div>
          <div className="up">⬆16.6%</div>
        </div>
        <div className="l-stat s3">
          <div className="t"><span className="ico">💼</span>{t('lend.pending')}</div>
          <div className="v">180.000 VNĐ</div>
        </div>
        <div className="l-stat s4">
          <div className="t"><span className="ico">📦</span>{t('lend.totalItems')}</div>
          <div className="v">15</div>
        </div>
      </div>

      <div className="l-panel">
        <div className="l-tabs">
          <button className={tab === 'overview' ? 'on' : ''} onClick={() => setTab('overview')}><span className="ti">📊</span>{t('lend.tabOverview')}</button>
          <button className={tab === 'requests' ? 'on' : ''} onClick={() => setTab('requests')}><span className="ti">🧾</span>{t('lend.tabRequests')}{tab !== 'requests' && <i className="dot">2</i>}</button>
          <button className={tab === 'orders' ? 'on' : ''} onClick={() => setTab('orders')}><span className="ti">📋</span>{t('lend.tabOrders')}</button>
        </div>
        {tab === 'overview' && <Overview onRequests={() => setTab('requests')} onOrders={() => setTab('orders')} />}
        {tab === 'requests' && <Requests />}
        {tab === 'orders' && <Orders />}
      </div>
      <div style={{ height: 16 }} />
    </TabScreen>
  )
}

function Overview({ onRequests, onOrders }: { onRequests: () => void; onOrders: () => void }) {
  const { t } = useTranslation()
  const L = useL()
  const nav = useNavigate()
  return (
    <div className="l-body">
      <div className="row l-head">
        <b>{t('lend.recentOrders')}</b>
        <button className="teal" onClick={onOrders}>{t('common.seeAll')} &gt;</button>
      </div>
      {[0, 1, 2, 3].map((i) => (
        <button className="l-order" key={i} onClick={onOrders}>
          <span className="av">T</span>
          <div className="info">
            <b>Nguyễn Thảo</b>
            <span>{L({ vi: 'Máy ảnh Canon 5D', en: 'Canon 5D Camera' })}</span>
            <span>14/10 - 17/10</span>
          </div>
          <div className="pr">
            <b>450K</b>
            <span className="badge">{t('lend.days3')}</span>
          </div>
        </button>
      ))}
      <button className="l-alert" onClick={onRequests}>
        <b><Bell size={13} fill="#f5b400" color="#f5b400" /> {t('lend.alertTitle')}</b>
        <span>{t('lend.alertSub')}</span>
      </button>
      <button className="l-post btn" onClick={() => nav('/post-item')}>{t('lend.postNew')}</button>
    </div>
  )
}

function Requests() {
  const { t } = useTranslation()
  const L = useL()
  const nav = useNavigate()
  const { toast } = useApp()
  const [state, setState] = useState<'pending' | 'accepted' | 'rejected'>('pending')
  return (
    <div className="l-body">
      <div className="l-all">{t('lend.all')} (1)</div>
      <div className="l-req">
        <div className="hd">
          <span className="av">NY</span>
          <div>
            <b>Phương Linh</b>
            <div className="meta"><span>{t('lend.trustPct', { v: 85 })}</span><span>☰ {t('lend.rentCount', { v: 23 })}</span></div>
          </div>
          <button className="chat" onClick={() => nav('/chat/binh')} aria-label="chat"><MessageCircle size={20} /></button>
        </div>
        <div className="bd">
          <h4>{L({ vi: 'Máy ảnh Canon EOS 800D', en: 'Canon EOS 800D Camera' })}</h4>
          <div className="ln"><CalendarDays size={12} color="#f29a70" /> 20/10/2025 - 22/10/2025 <span className="teal">({L({ vi: '3 ngày', en: '3 days' })})</span></div>
          <div className="ln"><MapPin size={12} color="#e2483d" fill="#e2483d" stroke="#fff" /> {L({ vi: 'Thủ Đức, TP.HCM', en: 'Thu Duc, HCMC' })}</div>
          <p className="note">{L({ vi: '"Em cần mượn máy ảnh để chụp sự kiện lớn ở trường. Em hứa sẽ bảo quản máy ảnh cẩn thận ạ!"', en: '"I need a camera to shoot a big event at school. I promise to take good care of it!"' })}</p>
          <div className="price">
            <div className="r1"><span>{t('lend.borrowPrice', { n: 3 })}</span><b>300.000 VNĐ</b></div>
            <div className="r2"><span>{t('lend.pricePerDay', { v: '100.000 VNĐ' })}</span><span>{t('lend.depositVal', { v: '500.000 VNĐ' })}</span></div>
          </div>
          {state === 'pending' ? (
            <div className="acts">
              <button className="ok" onClick={() => { setState('accepted'); toast(t('lend.accepted')) }}><CircleCheck size={20} /> {t('lend.accept')}</button>
              <button className="no" onClick={() => { setState('rejected'); toast(t('lend.rejected')) }}><CircleX size={20} /> {t('lend.reject')}</button>
            </div>
          ) : (
            <div className={'result ' + state}>{state === 'accepted' ? <><Check size={16} /> {t('lend.accepted')}</> : <><CircleX size={16} /> {t('lend.rejected')}</>}</div>
          )}
        </div>
      </div>
      <div style={{ height: 120 }} />
    </div>
  )
}

type Order = { name: string; avatar: string; trust: string; item: LText; image: string; days?: number; progress?: number; done?: boolean; price: string }

const orders: Order[] = [
  { name: 'Tấn Phát', avatar: 'av-tanphat', trust: '85/100', item: { vi: 'Máy ảnh FUJIFILM X-A5', en: 'FUJIFILM X-A5 Camera' }, image: 'ord-fuji', days: 1, progress: 75, price: '300.000 VNĐ' },
  { name: 'Phong Phú', avatar: 'av-phongphu', trust: '85%', item: { vi: 'Túi Xách Neutral "Mơ" HAPAS', en: 'HAPAS "Mơ" Neutral Handbag' }, image: 'ord-bag', days: 2, progress: 50, price: '300.000 VNĐ' },
  { name: 'Quốc Thịnh', avatar: 'av-quocthinh', trust: '', item: { vi: 'Chuột gaming Logitech G403 Hero', en: 'Logitech G403 Hero Gaming Mouse' }, image: 'ord-mouse', done: true, price: '300.000 VNĐ' },
  { name: 'Như Lê', avatar: 'av-nhule', trust: '', item: { vi: 'Tai nghe Baseus Bass 35 Max', en: 'Baseus Bass 35 Max Headphones' }, image: 'ord-headphone', done: true, price: '300.000 VNĐ' },
  { name: 'Hữu Huy', avatar: 'av-huuhuy', trust: '', item: { vi: 'Máy ảnh Canon EOS 60D', en: 'Canon EOS 60D Camera' }, image: 'ord-canon60d', done: true, price: '300.000 VNĐ' },
]

function Orders() {
  const { t } = useTranslation()
  const L = useL()
  const nav = useNavigate()
  const [f, setF] = useState<'all' | 'active' | 'done'>('all')
  const list = orders.filter((o) => (f === 'all' ? true : f === 'active' ? !o.done : o.done))
  return (
    <div className="l-body orders">
      <div className="l-filter">
        <button className={f === 'all' ? 'on' : ''} onClick={() => setF('all')}>{t('lend.filterAll', { n: 6 })}</button>
        <button className={f === 'active' ? 'on' : ''} onClick={() => setF('active')}>{t('lend.filterBorrowing', { n: 2 })}</button>
        <button className={f === 'done' ? 'on' : ''} onClick={() => setF('done')}>{t('lend.filterDone', { n: 2 })}</button>
      </div>
      {list.map((o) => (
        <div className="l-oc" key={o.name}>
          <div className="hd">
            <img src={img(o.avatar)} alt="" />
            <div>
              <b>{o.name}</b>
              <span>{o.done ? t('lend.returned', { d: '22/10/2025' }) : t('lend.trustOf', { v: o.trust })}</span>
            </div>
            <span className="tag">{o.done ? <><Check size={11} strokeWidth={3} />{t('lend.done')}</> : <>😊{(o.days === 1 ? t('lend.daysLeft1') : t('lend.daysLeft', { n: o.days }))}</>}</span>
          </div>
          <div className="bd">
            <div className="item">
              <img src={img(o.image)} alt="" />
              <div className="tx">
                <h4>{L(o.item)}</h4>
                <div className="ln"><CalendarDays size={11} color="#f29a70" /> 20/10/2025 - {o.done ? '22' : o.days === 1 ? '24' : '22'}/10/2025</div>
                <div className="ln"><MapPin size={11} color="#e2483d" fill="#e2483d" stroke="#fff" /> {L(thuDuc)}</div>
              </div>
              <b className={'pr' + (o.done ? ' teal' : '')}>{o.price}</b>
            </div>
            {o.done ? (
              <div className="rv">
                <div><b>{t('lend.yourReview')}</b> <span className="teal">{t('lend.trustScore', { v: 95 })}</span></div>
                <p>{t('lend.reviewText')}</p>
              </div>
            ) : (
              <>
                <div className="pg-l"><span>{t('lend.progress')}</span><span>{o.progress}%</span></div>
                <div className="pg"><i style={{ width: o.progress + '%' }} /></div>
                <div className="acts">
                  <button className="chat" onClick={() => nav('/chat/tanphat')}><MessageSquareMore size={18} /> {t('common.chat')}</button>
                  <button className="view" onClick={() => nav('/return-status')}>{t('common.view')}</button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
      <div style={{ height: 6 }} />
    </div>
  )
}
