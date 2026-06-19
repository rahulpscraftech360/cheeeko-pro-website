import { Routes, Route, useLocation } from 'react-router'
import { useEffect } from 'react'
import Home from './pages/Home'
import Shipping from './pages/Shipping'
import Returns from './pages/Returns'
import Help from './pages/Help'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import Refund from './pages/Refund'
import Privacy from './pages/Privacy'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/help" element={<Help />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </>
  )
}
