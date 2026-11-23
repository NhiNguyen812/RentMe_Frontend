import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Camera, ChevronDown, Lightbulb, X } from 'lucide-react'
import { SubScreen, useApp } from '../components'
import './sub.css'

export default function PostItem() {
  const { t } = useTranslation()
  const nav = useNavigate()
  const { toast } = useApp()
  const [photos, setPhotos] = useState<string[]>([])
  const [cond, setCond] = useState<'new' | 'likeNew' | 'used'>('new')

  return (
    <SubScreen tab="/lend" title={t('post.title')}>
      <form className="pi" onSubmit={(e) => { e.preventDefault(); toast(t('post.success')); setTimeout(() => nav('/lend'), 900) }}>
        <section className="pi-card">
          <b className="lb">{t('post.images')}</b>
          <small>{t('post.imagesHint')}</small>
          <div className="pi-photos">
            {photos.map((p, i) => (
              <div className="ph" key={p}>
                <img src={p} alt="" />
                <button type="button" onClick={() => setPhotos((s) => s.filter((_, j) => j !== i))} aria-label="remove"><X size={12} /></button>
              </div>
            ))}
            {photos.length < 5 && (
              <label className="add">
                <Camera size={22} strokeWidth={1.6} />
                <span>{t('post.addPhoto')}</span>
                <input type="file" accept="image/*" multiple hidden onChange={(e) => {
                  const fs = Array.from(e.target.files ?? []).slice(0, 5 - photos.length)
                  setPhotos((s) => [...s, ...fs.map((f) => URL.createObjectURL(f))])
                }} />
              </label>
            )}
          </div>
        </section>

        <section className="pi-card">
          <b className="lb">{t('post.name')}</b>
          <input className="in" placeholder={t('post.namePh')} required />
          <b className="lb">{t('post.category')}</b>
          <label className="sel">
            <select defaultValue="" required>
              <option value="" disabled>{t('post.categoryPh')}</option>
              <option>{t('borrow.camera')}</option>
              <option>{t('borrow.gaming')}</option>
              <option>{t('borrow.sport')}</option>
              <option>{t('borrow.accessory')}</option>
              <option>{t('borrow.fashion')}</option>
            </select>
            <ChevronDown size={26} strokeWidth={1.4} />
          </label>
          <div className="row two">
            <div>
              <b className="lb">{t('post.price')}</b>
              <label className="in money"><input inputMode="numeric" placeholder={t('post.pricePh')} /><span>VNĐ</span></label>
            </div>
            <div>
              <b className="lb">{t('post.deposit')}</b>
              <label className="in money"><input inputMode="numeric" placeholder={t('post.depositPh')} /><span>VNĐ</span></label>
            </div>
          </div>
          <b className="lb">{t('post.condition')}</b>
          <div className="row conds">
            {(['new', 'likeNew', 'used'] as const).map((c) => (
              <button type="button" key={c} className={cond === c ? 'on' : ''} onClick={() => setCond(c)}>{t('post.' + c)}</button>
            ))}
          </div>
          <b className="lb">{t('post.desc')}</b>
          <textarea className="in ta" placeholder={t('post.descPh')} />
          <small className="hint">{t('post.descHint')}</small>
        </section>

        <section className="pi-tips">
          <b><Lightbulb size={16} fill="#f5c400" color="#e0a800" /> {t('post.tipsTitle')}</b>
          <p>{t('post.tip1')}</p>
          <p>{t('post.tip2')}</p>
        </section>

        <button className="pi-submit btn" type="submit">{t('post.submit')}</button>
        <p className="pi-terms">{t('post.terms')}</p>
      </form>
    </SubScreen>
  )
}
