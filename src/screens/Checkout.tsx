import { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronRight, MapPin } from 'lucide-react'
import { SubScreen } from '../components'
import { fmtVnd, img, products, useL } from '../data'
import './sub.css'

export default function Checkout() {
  const { id } = useParams()
  const [sp] = useSearchParams()
  const days = Number(sp.get('days') || 1)
  const { t } = useTranslation()
  const L = useL()
  const nav = useNavigate()
  const p = products.find((x) => x.id === id) ?? products[0]
  const [msg, setMsg] = useState('')
  const rent = p.price * days
  const total = rent + p.deposit

  return (
    <SubScreen
      title={t('checkout.title')}
      nav={false}
      footer={
        <div className="co-foot">
          <div className="row"><span>{t('checkout.totalItems')} <small>{t('checkout.itemsCount', { n: 1 })}</small></span><b>{fmtVnd(total)}đ</b></div>
          <button className="btn btn-grad" onClick={() => nav('/order-status', { replace: true })}>{t('checkout.placeOrder')}</button>
        </div>
      }
    >
      <div className="co-wrap">
        <button className="co-card co-addr" onClick={() => nav('/settings/personal')}>
          <MapPin size={20} fill="#ef5a3c" color="#ef5a3c" stroke="#fff" />
          <div>
            <div><b>Lê Nguyễn Hồng Phong</b>&nbsp;&nbsp;&nbsp;(+84)901234567</div>
            <span>{L({ vi: 'Thủ Đức, TP. Hồ Chí Minh', en: 'Thu Duc, Ho Chi Minh City' })}</span>
          </div>
          <ChevronRight size={22} />
        </button>

        <div className="co-card co-item">
          <h4>{L(p.short)}</h4>
          <div className="row it">
            <img src={img(p.image)} alt="" />
            <div className="tx">
              <div className="nm">{L(p.name)}</div>
              <div className="cl">{t('checkout.color')}</div>
              <div className="du">{t('checkout.duration')} <span>{(days === 1 ? t('detail.day1') : t('detail.days', { n: days }))}</span></div>
              <div className="row pr"><b>{fmtVnd(rent)}đ</b><span>{t('common.deposit')}: <em>{fmtVnd(p.deposit)}đ</em></span></div>
            </div>
          </div>
          <input className="msg" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder={t('checkout.message')} />
          <div className="ship">
            <div className="row"><b>{t('checkout.receive')}</b><em>{t('checkout.free')}</em></div>
            <span>{t('checkout.shipping')}</span>
          </div>
        </div>

        <div className="co-card co-sum">
          <h4>{t('checkout.summary')}</h4>
          <div className="row"><span>{t('checkout.itemsTotal')}</span><span>{fmtVnd(total)}đ</span></div>
          <div className="row sub"><span>{t('checkout.rentPrice')}</span><em>{fmtVnd(rent)}đ</em></div>
          <div className="row sub"><span>{t('checkout.deposit')}</span><em>{fmtVnd(p.deposit)}đ</em></div>
          <div className="row"><span>{t('checkout.shipFee')}</span><span>0đ</span></div>
          <div className="row tot"><b>{t('checkout.total')}</b><b>{fmtVnd(total)}đ</b></div>
        </div>

        <div className="co-pay row"><b>{t('checkout.payMethod')}</b><b>{t('checkout.wallet')}</b></div>
        <div className="co-terms">{t('checkout.terms1')}<b>{t('checkout.terms2')}</b></div>
      </div>
    </SubScreen>
  )
}
