import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChartNoAxesColumnIncreasing, Check, Plus, UserCheck } from 'lucide-react'
import { SubScreen } from '../components'
import './sub.css'

export default function Review() {
  const { t } = useTranslation()
  const nav = useNavigate()
  const [checks, setChecks] = useState([false, false, false, false])
  const [score, setScore] = useState('')
  const [text, setText] = useState('')
  const [files, setFiles] = useState<string[]>([])
  const total = Math.min(100, checks.filter(Boolean).length * 20 + Math.min(20, Math.max(0, Number(score) || 0)))

  return (
    <SubScreen tab="/borrow" title={t('review.title')}>
      <div className="rv-wrap">
        <h3 className="rv-t"><span className="medal">🏅</span>{t('review.trust')}</h3>
        <div className="row rv-ov"><span>{t('review.overall')}</span><b>{total}/100</b></div>
        <div className="rv-bar"><i style={{ width: total + '%' }} /></div>

        <h4 className="rv-h"><ChartNoAxesColumnIncreasing size={22} strokeWidth={2.4} /> {t('review.basic')}</h4>
        {[t('review.c1'), t('review.c2'), t('review.c3'), t('review.c4')].map((c, i) => (
          <label className="rv-check" key={i}>
            <input type="checkbox" checked={checks[i]} onChange={() => setChecks((s) => s.map((v, j) => (j === i ? !v : v)))} />
            <span className="box">{checks[i] && <Check size={16} strokeWidth={3} />}</span>
            {c}
          </label>
        ))}

        <h4 className="rv-h"><UserCheck size={22} strokeWidth={2.4} /> {t('review.fromUser')}</h4>
        <div className="row rv-score">
          <b>{t('review.score')}</b>
          <input inputMode="numeric" maxLength={2} value={score} onChange={(e) => setScore(e.target.value.replace(/\D/g, ''))} />
        </div>
        <div className="row rv-text">
          <b>{t('review.comment')}</b>
          <textarea value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div className="rv-media-t">{t('review.addMedia')}</div>
        <div className="rv-media">
          {[0, 1, 2].map((i) => (
            <label className="ph add" key={i}>
              {files[i] ? <img src={files[i]} alt="" /> : <Plus size={22} strokeWidth={3} />}
              <input type="file" accept="image/*" hidden onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) setFiles((s) => { const n = [...s]; n[i] = URL.createObjectURL(f); return n })
              }} />
            </label>
          ))}
        </div>
        <button className="rv-submit btn" onClick={() => nav('/return-status', { replace: true })}>{t('common.confirm')}</button>
      </div>
    </SubScreen>
  )
}
