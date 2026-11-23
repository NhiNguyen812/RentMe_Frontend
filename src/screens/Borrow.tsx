import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronDown, Heart, MapPin, Search, Users } from 'lucide-react'
import { TabScreen } from '../components'
import { fmtVnd, img, products, useL, type Product } from '../data'
import './borrow.css'

type Cat = 'all' | Product['category']

export default function Borrow() {
  const { t } = useTranslation()
  const L = useL()
  const nav = useNavigate()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState<Cat>('all')
  const [sort, setSort] = useState<'popular' | 'newest' | 'priceLow'>('popular')
  const [liked, setLiked] = useState<Record<string, boolean>>({})

  const cats: { k: Cat; label: string }[] = [
    { k: 'all', label: t('borrow.all') },
    { k: 'camera', label: t('borrow.camera') },
    { k: 'gaming', label: t('borrow.gaming') },
    { k: 'sport', label: t('borrow.sport') },
    { k: 'accessory', label: t('borrow.accessory') },
    { k: 'fashion', label: t('borrow.fashion') },
  ]

  const list = useMemo(() => {
    let l = products.filter((p) => (cat === 'all' || p.category === cat) && (L(p.name).toLowerCase().includes(q.toLowerCase()) || p.name.vi.toLowerCase().includes(q.toLowerCase())))
    if (sort === 'priceLow') l = [...l].sort((a, b) => a.price - b.price)
    if (sort === 'newest') l = [...l].reverse()
    return l
  }, [cat, q, sort, L])

  return (
    <TabScreen>
      <div className="b-top">
        <label className="b-search">
          <Search size={20} strokeWidth={2} color="#22a584" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('common.search')} />
        </label>
        <div className="row b-cat-row">
          <span>{t('borrow.category')}</span>
          <label className="b-sort">
            <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}>
              <option value="popular">{t('borrow.popular')}</option>
              <option value="newest">{t('borrow.newest')}</option>
              <option value="priceLow">{t('borrow.priceLow')}</option>
            </select>
            <ChevronDown size={18} color="#3d9c84" />
          </label>
        </div>
        <div className="b-chips hscroll">
          {cats.map((c) => (
            <button key={c.k} className={cat === c.k ? 'on' : ''} onClick={() => setCat(c.k)}>{c.label}</button>
          ))}
        </div>
      </div>

      <div className="b-grid">
        {list.map((p) => (
          <div className="b-card" key={p.id} onClick={() => nav('/product/' + p.id)} role="button">
            <div className="im">
              <img src={img(p.image)} alt="" />
              <button className={'heart' + (liked[p.id] ? ' on' : '')} onClick={(e) => { e.stopPropagation(); setLiked((s) => ({ ...s, [p.id]: !s[p.id] })) }} aria-label="like">
                <Heart size={12} fill={liked[p.id] ? '#f36' : '#e8e8e8'} color={liked[p.id] ? '#f36' : '#e8e8e8'} />
              </button>
              <span className="cnt"><Users size={7} /> {t('borrow.borrows', { n: p.borrows })}</span>
            </div>
            <div className="nm">{L(p.name)}</div>
            <div className="tr">🏅 {t('borrow.trust')} <span>{p.trust}/100</span></div>
            <div className="lc"><MapPin size={8} /> {L(p.location)}</div>
            <div className="pr">{fmtVnd(p.price)}đ{t('common.perDay')}</div>
            <div className="dp">{t('borrow.depositShort', { v: fmtVnd(p.deposit) + 'đ' })}</div>
          </div>
        ))}
        {list.length === 0 && <p className="b-empty">{t('borrow.empty')}</p>}
      </div>
    </TabScreen>
  )
}
