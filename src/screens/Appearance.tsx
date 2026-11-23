import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Moon, Sun } from 'lucide-react'
import { SubScreen, useApp } from '../components'
import './sub.css'

type L = 'vi' | 'en' | 'ja'

export default function Appearance() {
  const { t, i18n } = useTranslation()
  const { theme, setTheme, toast } = useApp()
  const [th, setTh] = useState(theme)
  const [lang, setLang] = useState<L>(i18n.language === 'en' ? 'en' : 'vi')

  const apply = async () => {
    if (lang === 'ja') {
      toast(t('appearance.jaSoon'))
      return
    }
    setTheme(th)
    await i18n.changeLanguage(lang)
    toast(i18n.t('common.saved'))
  }

  return (
    <SubScreen tab="/profile" title={t('appearance.title')}>
      <div className="ap">
        <section className="ap-card">
          <div className="row ap-h">
            <h3>{t('appearance.theme')}</h3>
            <p>{t('appearance.themeHint1')}<b>{t('appearance.themeHint2')}</b>{t('appearance.themeHint3')}</p>
          </div>
          <button className={'ap-opt' + (th === 'light' ? ' on' : '')} onClick={() => setTh('light')}>
            <span className="ic light"><Sun size={22} /></span>
            <div><b>{t('appearance.light')}</b><small>{t('appearance.lightSub')}</small></div>
            <i className="radio" />
          </button>
          <button className={'ap-opt' + (th === 'dark' ? ' on' : '')} onClick={() => setTh('dark')}>
            <span className="ic dark"><Moon size={22} /></span>
            <div><b>{t('appearance.dark')}</b><small>{t('appearance.darkSub')}</small></div>
            <i className="radio" />
          </button>
        </section>

        <section className="ap-card ap-prev">
          <h3>{t('appearance.preview')}</h3>
          <div className={'pv ' + th}>
            <div className="pv-card"><b>RentMe</b><span>{t('brand.slogan')}</span></div>
            <i className="l1" />
            <i className="l2" />
          </div>
        </section>

        <section className="ap-lang">
          <h3>{t('appearance.language')}</h3>
          {(['vi', 'en', 'ja'] as const).map((l) => (
            <label key={l} className="ap-radio">
              <input type="radio" name="lang" checked={lang === l} onChange={() => setLang(l)} />
              <i />
              {t('appearance.' + l)}
            </label>
          ))}
        </section>
        <button className="ap-apply btn" onClick={apply}>{t('common.apply')}</button>
      </div>
    </SubScreen>
  )
}
