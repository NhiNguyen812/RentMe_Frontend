import { useTranslation } from 'react-i18next'
import { Check, Plus } from 'lucide-react'
import { SubScreen } from '../components'
import { img } from '../data'
import { Timeline } from './Timeline'
import './sub.css'

export default function ReturnStatus() {
  const { t } = useTranslation()
  const steps = [
    {
      title: t('ret.s1t'),
      desc: t('ret.s1d'),
      extra: (
        <div className="tl-media">
          <div className="ph"><img src={img('ship-label')} alt="" /></div>
          <div className="ph empty" />
          <div className="ph empty" />
        </div>
      ),
    },
    {
      title: t('ret.s2t'),
      desc: t('ret.s2d'),
      extra: (
        <div className="tl-media">
          <div className="ph"><img src={img('ord-canon60d')} alt="" /></div>
          <label className="ph add"><Plus size={22} strokeWidth={3} /><input type="file" accept="image/*,video/*" hidden /></label>
          <label className="ph add"><Plus size={22} strokeWidth={3} /><input type="file" accept="image/*,video/*" hidden /></label>
        </div>
      ),
    },
    { title: t('ret.s3t'), desc: t('ret.s3d'), extra: <button className="tl-btn ok center" disabled><Check size={14} /> {t('common.confirmed')}</button> },
    { title: t('ret.s4t'), desc: <>{t('ret.s4d')}<b className="teal">RentMe</b>.</>, extra: <button className="tl-btn ok center" disabled><Check size={14} /> {t('common.reviewed')}</button> },
  ]
  return (
    <SubScreen tab="/lend" title={t('ret.title')} fab>
      <Timeline steps={steps} done={4} />
    </SubScreen>
  )
}
