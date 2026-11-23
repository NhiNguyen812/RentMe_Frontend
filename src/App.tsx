import { useEffect, useLayoutEffect, useState, type ReactNode } from 'react'
import { HashRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { AppProvider, StatusBar } from './components'
import { img } from './data'
import Home from './screens/Home'
import News from './screens/News'
import Lend from './screens/Lend'
import Borrow from './screens/Borrow'
import Profile from './screens/Profile'
import ProductDetail from './screens/ProductDetail'
import Checkout from './screens/Checkout'
import OrderStatus from './screens/OrderStatus'
import Review from './screens/Review'
import ReturnStatus from './screens/ReturnStatus'
import Messages from './screens/Messages'
import Chat from './screens/Chat'
import Notifications from './screens/Notifications'
import Chatbot from './screens/Chatbot'
import PostItem from './screens/PostItem'
import Appearance from './screens/Appearance'
import Personal from './screens/Personal'

const DESIGN_W = 390

/** Scales the 390px-wide design to the device (or to a 440×956 phone frame on desktop). */
function Stage({ children }: { children: ReactNode }) {
  const calc = () => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const framed = vw > 600 && vh > 640
    if (framed) {
      const h = Math.min(956, vh - 48)
      const w = Math.min(440, Math.round(h * 0.46))
      return { framed, w, h, zoom: w / DESIGN_W }
    }
    return { framed, w: vw, h: vh, zoom: vw / DESIGN_W }
  }
  const [s, setS] = useState(calc)
  useLayoutEffect(() => {
    const on = () => setS(calc())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return (
    <div className={'stage' + (s.framed ? ' framed' : '')}>
      <div className="device" style={{ width: s.w, height: s.h }}>
        <div className="app" style={{ zoom: s.zoom, height: s.h / s.zoom }}>
          {s.framed && <StatusBar />}
          {children}
        </div>
      </div>
    </div>
  )
}

function Splash() {
  const nav = useNavigate()
  useEffect(() => {
    const id = setTimeout(() => nav('/home', { replace: true }), 1400)
    return () => clearTimeout(id)
  }, [nav])
  return (
    <div className="screen" style={{ background: 'var(--card)', alignItems: 'center', justifyContent: 'center' }}>
      <div className="spinner" />
      <img src={img('logo')} alt="" style={{ display: 'none' }} />
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <AppProvider>
        <Stage>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/home" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/lend" element={<Lend />} />
            <Route path="/borrow" element={<Borrow />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/order-status" element={<OrderStatus />} />
            <Route path="/review" element={<Review />} />
            <Route path="/return-status" element={<ReturnStatus />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/post-item" element={<PostItem />} />
            <Route path="/settings/appearance" element={<Appearance />} />
            <Route path="/settings/personal" element={<Personal />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </Stage>
      </AppProvider>
    </HashRouter>
  )
}
