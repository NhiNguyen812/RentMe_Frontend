import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, ChevronRight, CircleHelp, FileText, Hand, History, Lock, LogOut, MapPin, MessageSquareText, MonitorCog, PenLine, ReceiptText, Settings, ShieldHalf, Star, TrendingUp, TriangleAlert, User, Wallet, Headset, Coins, Award } from 'lucide-react'
import { TabScreen, useApp } from '../components'
import { img, useL } from '../data'
import './profile.css'

export default function Profile() {
  const { t } = useTranslation()
  const nav = useNavigate()
  const { toast } = useApp()
  const L = useL()
  const soon = () => toast(t('common.comingSoon'))

  return (
    <TabScreen>
      <div className="p-wrap">
        <section className="p-card p-id">
          <div className="av">
            <img src={img('avatar-user')} alt="" />
            <button className="ed" onClick={() => nav('/settings/personal')} aria-label="edit"><PenLine size={8} /></button>
          </div>
          <div className="nm">Lê Nguyễn Hồng Phong <span className="vf">{t('user.verified')}</span></div>
          <div className="lc"><MapPin size={14} fill="#e2232a" color="#e2232a" stroke="#fff" /> {L({ vi: 'Thủ Đức, TP. HCM', en: 'Thu Duc, HCMC' })}</div>
          <div className="jn">{t('user.joined')}</div>
        </section>

        <section className="p-card p-trust">
          <h3><span className="medal">🏅</span>{t('user.trust')}</h3>
          <div className="row ov"><span>{t('user.overall')}</span><b>96/100</b></div>
          <div className="bar"><i style={{ width: '96%' }} /></div>
          <div className="tiles">
            <div className="tile t1"><span className="row"><ReceiptText size={20} /> {t('user.transactions')}</span><b>120</b></div>
            <div className="tile t2"><span className="row"><TrendingUp size={20} /> {t('user.onTime')}</span><b>97%</b></div>
            <div className="tile t3"><span className="row"><Coins size={20} /> {t('user.borrowOrders')}</span><b>8</b></div>
            <div className="tile t4"><span className="row"><MessageSquareText size={20} /> {t('user.reviews')}</span><b>103</b></div>
          </div>
          <div className="bdg-t">{t('user.badges')}</div>
          <div className="bdgs">
            <span><Award size={11} /> {t('user.badge1')}</span>
            <span><Award size={11} /> {t('user.badge2')}</span>
            <span><Award size={11} /> {t('user.badge3')}</span>
          </div>
        </section>

        <section className="p-card p-recent">
          <div className="row hd">
            <h3><History size={24} strokeWidth={2} /> {t('user.recent')}</h3>
            <button className="teal" onClick={soon}>{t('common.seeAll')} <ChevronRight size={12} /></button>
          </div>
          {[
            { icon: <Hand size={18} />, t: t('user.a1t'), s: t('user.a1s'), d: '11/11/2025' },
            { icon: <Star size={18} />, t: t('user.a2t'), s: t('user.a2s'), d: '01/11/2025' },
            { icon: <Box size={18} />, t: t('user.a3t'), s: t('user.a3s'), d: '29/10/2025' },
          ].map((a) => (
            <div className="act" key={a.t}>
              <span className="ic">{a.icon}</span>
              <div><b>{a.t}</b><small>{a.s}</small></div>
              <em>{a.d}</em>
            </div>
          ))}
        </section>

        <section className="p-card p-list">
          <h3><Settings size={24} color="#22a584" /> {t('user.settings')}</h3>
          <button onClick={() => nav('/settings/personal')}><User size={22} /> <span>{t('user.personal')}</span><ChevronRight size={20} /></button>
          <button onClick={() => nav('/settings/appearance')}><MonitorCog size={22} /> <span>{t('user.appearance')}</span><ChevronRight size={20} /></button>
          <button onClick={soon}><Wallet size={22} /> <span>{t('user.account')}</span><ChevronRight size={20} /></button>
          <button onClick={soon}><Lock size={22} /> <span>{t('user.security')}</span><ChevronRight size={20} /></button>
        </section>

        <section className="p-card p-list">
          <h3><Headset size={24} /> {t('user.support')}</h3>
          <button onClick={soon}><ShieldHalf size={22} fill="currentColor" /> <span>{t('user.privacy')}</span><ChevronRight size={20} /></button>
          <button onClick={soon}><FileText size={22} /> <span>{t('user.terms')}</span><ChevronRight size={20} /></button>
          <button onClick={soon}><CircleHelp size={22} /> <span>{t('user.help')}</span><ChevronRight size={20} /></button>
        </section>

        <div className="p-btns">
          <button className="out" onClick={soon}><LogOut size={18} /> {t('user.logout')}</button>
          <button className="del" onClick={soon}><TriangleAlert size={18} /> {t('user.deleteAccount')}</button>
        </div>
        <div className="p-ver">
          <b>{t('user.version')}</b>
          <span>{t('user.versionSub')}</span>
        </div>
      </div>
    </TabScreen>
  )
}
