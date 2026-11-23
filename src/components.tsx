import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Bell, ChevronLeft, FileText, House, MessageCircle, ShoppingBag, ShoppingCart, CircleUserRound } from 'lucide-react'
import { img } from './data'

/* ---------- Toast + theme context ---------- */
type Ctx = { toast: (m: string) => void; theme: 'light' | 'dark'; setTheme: (t: 'light' | 'dark') => void }
const AppCtx = createContext<Ctx>({ toast: () => {}, theme: 'light', setTheme: () => {} })
export const useApp = () => useContext(AppCtx)

export function AppProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState<string | null>(null)
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => (localStorage.getItem('rentme.theme') === 'dark' ? 'dark' : 'light'))
  const toast = useCallback((m: string) => {
    setMsg(m)
    window.clearTimeout((toast as unknown as { t?: number }).t)
    ;(toast as unknown as { t?: number }).t = window.setTimeout(() => setMsg(null), 1800)
  }, [])
  const setTheme = (t: 'light' | 'dark') => {
    setThemeState(t)
    localStorage.setItem('rentme.theme', t)
  }
  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])
  return (
    <AppCtx.Provider value={{ toast, theme, setTheme }}>
      {children}
      {msg && <div className="toast">{msg}</div>}
    </AppCtx.Provider>
  )
}

/* ---------- iOS status bar (only inside desktop frame) ---------- */
export function StatusBar() {
  return (
    <div className="statusbar">
      <span>9:41</span>
      <div className="island" />
      <div className="icons">
        <svg width="18" height="12" viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1" fill="currentColor" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" fill="currentColor" /><rect x="10" y="3" width="3" height="9" rx="1" fill="currentColor" /><rect x="15" y="0" width="3" height="12" rx="1" fill="currentColor" /></svg>
        <svg width="16" height="12" viewBox="0 0 16 12"><path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.2-1.2A10 10 0 0 0 8 .5 10 10 0 0 0 .8 3.4L2 4.6a8.5 8.5 0 0 1 6-2.4Zm0 3.4c1.4 0 2.6.5 3.6 1.4l1.2-1.2A6.8 6.8 0 0 0 8 3.9a6.8 6.8 0 0 0-4.8 1.9L4.4 7c1-.9 2.2-1.4 3.6-1.4Zm0 3.4c-.6 0-1.1.2-1.5.6L8 11.1l1.5-1.5A2 2 0 0 0 8 9Z" fill="currentColor" /></svg>
        <svg width="27" height="13" viewBox="0 0 27 13"><rect x=".5" y=".5" width="23" height="12" rx="3.5" stroke="currentColor" opacity=".4" fill="none" /><rect x="2" y="2" width="20" height="9" rx="2" fill="currentColor" /><path d="M25 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2Z" fill="currentColor" opacity=".5" /></svg>
      </div>
    </div>
  )
}

/* ---------- RentMe header ---------- */
export function AppHeader() {
  const { t } = useTranslation()
  return (
    <header className="header">
      <img className="logo" src={img('logo')} alt="RentMe" />
      <div className="brand">
        <b><span className="r">Rent</span><span className="m">Me</span></b>
        <small>{t('brand.slogan')}</small>
      </div>
      <div className="actions">
        <Link to="/messages" className="sq-btn" aria-label="messages"><MessageCircle size={19} strokeWidth={2} /></Link>
        <Link to="/notifications" className="sq-btn" aria-label="notifications"><Bell size={19} strokeWidth={2} /></Link>
      </div>
    </header>
  )
}

export function TopBar({ title, center, right, onBack }: { title: string; center?: boolean; right?: ReactNode; onBack?: () => void }) {
  const nav = useNavigate()
  return (
    <div className={'topbar' + (center ? ' center' : '')}>
      <button onClick={onBack ?? (() => nav(-1))} aria-label="back" style={{ display: 'grid', zIndex: 1 }}>
        <ChevronLeft size={26} strokeWidth={2} />
      </button>
      <h1>{title}</h1>
      {right && <div style={{ marginLeft: 'auto', zIndex: 1 }}>{right}</div>}
    </div>
  )
}

/* ---------- bottom navigation ---------- */
export function BottomNav({ active }: { active?: string }) {
  const { t } = useTranslation()
  const items = [
    { to: '/news', icon: FileText, label: t('nav.news') },
    { to: '/lend', icon: ShoppingBag, label: t('nav.lend') },
    { to: '/home', icon: House, label: t('nav.home') },
    { to: '/borrow', icon: ShoppingCart, label: t('nav.borrow') },
    { to: '/profile', icon: CircleUserRound, label: t('nav.user') },
  ]
  return (
    <nav className="bottomnav">
      {items.map(({ to, icon: Icon, label }) => (
        <NavLink key={to} to={to} className={({ isActive }) => (isActive || active === to ? 'active' : '')}>
          {({ isActive: a }) => {
            const isActive = a || active === to
            return (
            <>
              <Icon size={24} strokeWidth={isActive ? 2.3 : 1.6} />
              <span>{label}</span>
            </>
            )
          }}
        </NavLink>
      ))}
    </nav>
  )
}

export function Fab() {
  return (
    <Link to="/chatbot" className="fab" aria-label="RentMe assistant">
      <img src={img('mascot-fab')} alt="" />
    </Link>
  )
}

/** Standard tab screen: header + scroll content + bottom nav + mascot */
export function TabScreen({ children, fab = true }: { children: ReactNode; fab?: boolean }) {
  return (
    <div className="screen">
      <AppHeader />
      <div className="scroll fade-enter">{children}</div>
      {fab && <Fab />}
      <BottomNav />
    </div>
  )
}

/** Sub page: back top bar + content (+ optional bottom nav) */
export function SubScreen({ title, children, nav = true, center, right, footer, fab, tab }: { title: string; children: ReactNode; nav?: boolean; center?: boolean; right?: ReactNode; footer?: ReactNode; fab?: boolean; tab?: string }) {
  return (
    <div className="screen">
      <TopBar title={title} center={center} right={right} />
      <div className="scroll fade-enter">{children}</div>
      {footer}
      {fab && <Fab />}
      {nav && <BottomNav active={tab} />}
    </div>
  )
}
