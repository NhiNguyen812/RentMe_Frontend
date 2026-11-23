import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Check } from 'lucide-react'
import { SubScreen } from '../components'
import { Timeline } from './Timeline'
import './sub.css'

export default function OrderStatus() {
  const { t } = useTranslation()
  const nav = useNavigate()
  // number of completed steps; steps 1–3 advance automatically like the prototype
  const [done, setDone] = useState(1)
  useEffect(() => {
    if (done >= 3) return
    const id = setTimeout(() => setDone((d) => d + 1), 1600)
    return () => clearTimeout(id)
  }, [done])

  const confirmed = done >= 4
  const steps = [
    { title: t('status.s1t'), desc: t('status.s1d') },
    { title: t('status.s2t'), desc: t('status.s2d') },
    { title: t('status.s3t'), desc: done >= 3 ? t('status.s3dDone') : t('status.s3d') },
    {
      title: t('status.s4t'),
      desc: t('status.s4d'),
      extra: confirmed ? (
        <button className="tl-btn ok center" disabled><Check size={14} /> {t('common.confirmed')}</button>
      ) : (
        <button className={'tl-btn' + (done >= 3 ? ' active' : '')} disabled={done < 3} onClick={() => setDone(4)}>{t('common.confirm')}</button>
      ),
    },
    {
      title: t('status.s5t'),
      desc: <>{t('status.s5d')}<b className="teal">RentMe</b>.</>,
      extra: <button className={'tl-btn' + (confirmed ? ' active' : '')} disabled={!confirmed} onClick={() => nav('/review')}>{t('common.review')}</button>,
    },
  ]
  return (
    <SubScreen tab="/borrow" title={t('status.title')} fab>
      <Timeline steps={steps} done={done} />
    </SubScreen>
  )
}
