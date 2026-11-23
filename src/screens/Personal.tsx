import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Camera, Check, House, Mail, Phone, SquarePen, UserPen, CalendarDays } from 'lucide-react'
import { SubScreen, useApp } from '../components'
import { img } from '../data'
import './sub.css'

export default function Personal() {
  const { t, i18n } = useTranslation()
  const { toast } = useApp()
  const [edit, setEdit] = useState(false)
  const [v, setV] = useState({
    name: 'Lê Nguyễn Hồng Phong',
    phone: '0901234567',
    email: 'hongphong@gmail.com',
    dob: '15/03/1995',
    address: i18n.language === 'en' ? 'Thu Duc, HCMC' : 'Thủ Đức, TP HCM',
  })
  const fields = [
    { k: 'name', icon: <UserPen size={30} strokeWidth={1.4} />, label: t('personal.name') },
    { k: 'phone', icon: <Phone size={30} strokeWidth={1.4} />, label: t('personal.phone') },
    { k: 'email', icon: <Mail size={34} strokeWidth={1.4} />, label: t('personal.email') },
    { k: 'dob', icon: <CalendarDays size={32} strokeWidth={1.4} />, label: t('personal.dob') },
    { k: 'address', icon: <House size={32} fill="currentColor" strokeWidth={1} />, label: t('personal.address') },
  ] as const

  return (
    <SubScreen tab="/profile" title={t('personal.title')}>
      <div className="ps">
        <section className="ps-card ps-top">
          <div className="av">
            <img src={img('avatar-user-lg')} alt="" />
            <span className="cam"><Camera size={14} /></span>
          </div>
          <span className="vf"><Check size={18} strokeWidth={3} /> {t('user.verified')}</span>
        </section>
        <section className="ps-card ps-info">
          <div className="row hd">
            <b>{t('personal.detail')}</b>
            <button onClick={() => { if (edit) toast(t('common.saved')); setEdit(!edit) }}>
              {edit ? <Check size={16} /> : <SquarePen size={16} />} {edit ? t('personal.save') : t('common.edit')}
            </button>
          </div>
          {fields.map((f) => (
            <div className="fr" key={f.k}>
              <span className="ic">{f.icon}</span>
              <div>
                <small>{f.label}</small>
                {edit ? <input value={v[f.k]} onChange={(e) => setV((s) => ({ ...s, [f.k]: e.target.value }))} /> : <b>{v[f.k]}</b>}
              </div>
            </div>
          ))}
        </section>
      </div>
    </SubScreen>
  )
}
