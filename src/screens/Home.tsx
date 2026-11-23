import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, CircleCheck, DollarSign, MapPin, Star, User } from 'lucide-react'
import { TabScreen } from '../components'
import { featured, img, useL } from '../data'
import './home.css'

const banners = ['banner-1', 'banner-2', 'banner-3']

export default function Home() {
  const { t } = useTranslation()
  const L = useL()
  const nav = useNavigate()
  const track = useRef<HTMLDivElement>(null)
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % banners.length), 3500)
    return () => clearInterval(id)
  }, [])
  useEffect(() => {
    const el = track.current
    if (el) el.scrollTo({ left: slide * 328, behavior: 'smooth' })
  }, [slide])

  const stats = [
    { icon: <DollarSign size={30} strokeWidth={1.3} />, label: t('home.revenue'), value: '130.841.529 ₫' },
    { icon: <User size={30} strokeWidth={1.3} />, label: t('home.users'), value: '12,430' },
    { icon: <Box size={30} strokeWidth={1.3} />, label: t('home.renting'), value: '4,200' },
    { icon: <Star size={30} strokeWidth={1.3} />, label: t('home.rating'), value: '4.8 / 5.0' },
  ]
  const cats = [
    { img: 'cat-clothes', label: t('home.catClothes') },
    { img: 'cat-tech', label: t('home.catTech') },
    { img: 'cat-home', label: t('home.catHome') },
    { img: 'cat-clothes', label: t('home.catClothes') },
  ]

  return (
    <TabScreen>
      <div className="h-carousel hscroll" ref={track} onScroll={(e) => {
        const i = Math.round(e.currentTarget.scrollLeft / 328)
        if (i !== slide && Math.abs(e.currentTarget.scrollLeft - i * 328) < 2) setSlide(i)
      }}>
        {banners.map((b) => (
          <div className="h-slide" key={b}>
            <img src={img(b)} alt="" />
            <div className="h-slide-btns">
              <button className="pill-cream" onClick={() => nav('/borrow')}>{t('home.rentNow')}</button>
              <button className="pill-dark" onClick={() => nav('/post-item')}>{t('home.lendOut')}</button>
            </div>
          </div>
        ))}
      </div>

      <div className="h-stats">
        {stats.map((s) => (
          <div className="h-stat" key={s.label}>
            <span className="ic">{s.icon}</span>
            <div>
              <div className="lb">{s.label}</div>
              <div className="vl">{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="h-title">{t('home.categories')}</h3>
      <div className="h-cats hscroll">
        {cats.map((c, i) => (
          <button className="h-cat" key={i} onClick={() => nav('/borrow')}>
            <img src={img(c.img)} alt="" />
            <span>{c.label}</span>
          </button>
        ))}
      </div>

      <div className="h-how">
        <b>{t('home.howTitle')}</b>
        <p>{t('home.how1')}</p>
        <p>{t('home.how2')}</p>
        <p>{t('home.how3')}</p>
      </div>

      <button className="h-newsletter" onClick={() => nav('/news')}>
        <span>{t('home.newsletter')}</span>
        <img src={img('mascot-wave')} alt="" />
      </button>

      <h3 className="h-title">{t('home.featured')}</h3>
      <div className="h-feat-wrap">
        <div className="h-feat hscroll">
          {featured.map((f) => (
            <button className="h-fcard" key={f.image} onClick={() => nav('/product/' + f.pid)}>
              <div className="im"><img src={img(f.image)} alt="" /></div>
              <div className="bd">
                <div className="nm"><span>{L(f.name)}</span><CircleCheck size={9} color="#22a584" /></div>
                <div className="cd">{t('home.condition')}: {L(f.cond)}</div>
                <div className="km"><span><MapPin size={7} /> {f.km}</span><span>HCM</span></div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="h-cta">
        <p>{t('home.ctaTitle')}</p>
        <button className="pill-cream" onClick={() => nav('/post-item')}>{t('home.ctaBtn')}</button>
      </div>
      <div style={{ height: 8 }} />
    </TabScreen>
  )
}
