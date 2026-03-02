import { useEffect, useState } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { FaArrowRight, FaDownload, FaReact, FaJs, FaNodeJs, FaPhp, FaHtml5, FaCss3 } from 'react-icons/fa'
import { SiMysql } from 'react-icons/si'

const taglinesByLanguage = {
  id: [
    'Membangun sistem cerdas berbasis data dan kode',
    'Dari data mentah menjadi insight yang bisa dieksekusi',
    'Fresh graduate yang siap menghadapi tantangan dunia kerja tech',
  ],
  en: [
    'Building intelligent systems with data & code',
    'From raw data to actionable insight',
    'Fresh graduate ready for real-world tech challenges',
  ],
}

const roles = {
  en: ['Web Engineer', 'ML Developer', 'Data Builder'],
  id: ['Web Engineer', 'ML Developer', 'Data Builder'],
}

function Hero({ isDark = true, onViewProjects, language = 'en' }) {
  const [taglineIndex, setTaglineIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [charIndex, setCharIndex] = useState(0)
  const [roleIndex, setRoleIndex] = useState(0)

  // Typewriter effect
  useEffect(() => {
    const list = taglinesByLanguage[language] || taglinesByLanguage.en
    const current = list[taglineIndex % list.length]
    if (charIndex < current.length) {
      const timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex + 1))
        setCharIndex((v) => v + 1)
      }, 45)
      return () => clearTimeout(timeout)
    }
    const pauseTimeout = setTimeout(() => {
      setCharIndex(0)
      setDisplayed('')
      setTaglineIndex((v) => (v + 1) % list.length)
    }, 2200)
    return () => clearTimeout(pauseTimeout)
  }, [charIndex, taglineIndex, language])

  // Role switcher
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((v) => (v + 1) % roles[language].length)
    }, 2000)
    return () => clearInterval(interval)
  }, [language])

  const bg = isDark ? 'bg-slate-950' : 'bg-slate-50'
  const titleColor = isDark ? 'text-white' : 'text-slate-900'
  const bodyColor = isDark ? 'text-slate-400' : 'text-slate-500'
  const chipBg = isDark ? 'bg-slate-800/80 text-slate-300 border-slate-700' : 'bg-white text-slate-600 border-slate-200'
  const secondaryBtn = isDark
    ? 'border-slate-700 text-slate-300 hover:border-cyan-400 hover:text-cyan-300 bg-transparent'
    : 'border-slate-300 text-slate-700 hover:border-cyan-500 hover:text-cyan-600 bg-white'

  return (
    <section className={`relative min-h-screen overflow-hidden ${bg}`}>

      {/* ── Background: mesh + grid ── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#fff' : '#000'} 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Glows */}
        <div className="absolute -top-32 left-1/3 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/8 blur-[100px]" />
        {/* Top accent line */}
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-20 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_0.8fr]">

          {/* ── Left: Content ── */}
          <div className="space-y-8">

            {/* Badge */}
            <Motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex"
            >
              <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold ${chipBg}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_2px_rgba(34,211,238,0.6)]" />
                Politeknik Negeri Medan · Technology/IT · 2025
              </span>
            </Motion.div>

            {/* Name */}
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <h1 className={`text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl ${titleColor}`}>
                Salman<br />
                <span className="text-cyan-400">Alfarisi</span>{' '}
                <span className={titleColor}>Rizwana</span>
              </h1>
            </Motion.div>

            {/* Animated role pill */}
            <Motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className={`h-px w-8 bg-cyan-400`} />
              <div className="relative h-7 overflow-hidden">
                <AnimatePresence mode="wait">
                  <Motion.span
                    key={roleIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute whitespace-nowrap text-sm font-bold uppercase tracking-[0.2em] text-cyan-400"
                  >
                    {roles[language][roleIndex]}
                  </Motion.span>
                </AnimatePresence>
              </div>
            </Motion.div>

            {/* Typewriter tagline */}
            <Motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`min-h-[1.75rem] text-lg font-medium sm:text-xl ${isDark ? 'text-slate-200' : 'text-slate-700'}`}
            >
              {displayed}
              <span className="ml-0.5 inline-block h-[1.1em] w-[2px] animate-pulse bg-cyan-400 align-middle" />
            </Motion.p>

            {/* Body text */}
            <Motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className={`max-w-lg text-sm leading-relaxed sm:text-base ${bodyColor}`}
            >
              {language === 'en'
                ? 'Developing web applications integrated with real-world data, processing data into actionable insights, and building machine learning models ready for production deployment.'
                : 'Mengembangkan aplikasi web yang terintegrasi dengan data nyata, mengolah data menjadi insight actionable, serta membangun model machine learning yang siap diimplementasikan di lingkungan produksi.'}
            </Motion.p>

            {/* CTA Buttons */}
            <Motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <Motion.button
                type="button"
                onClick={onViewProjects}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/30 transition-all hover:bg-cyan-300"
              >
                <span>{language === 'en' ? 'View Projects' : 'Lihat Proyek'}</span>
                <FaArrowRight className="h-3.5 w-3.5" />
              </Motion.button>

              <Motion.a
                href="/Salman-Alfarisi-Rizwana-CV.pdf"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-bold transition-all ${secondaryBtn}`}
              >
                <FaDownload className="h-3.5 w-3.5" />
                {language === 'en' ? 'Download CV' : 'Unduh CV'}
              </Motion.a>
            </Motion.div>

            {/* Skill chips */}
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="flex flex-wrap gap-2"
            >
              {['Web Development', 'Data Science', 'Machine Learning', 'Forecasting'].map((tag, i) => (
                <Motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.55 + i * 0.05 }}
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${chipBg}`}
                >
                  {tag}
                </Motion.span>
              ))}
            </Motion.div>
          </div>

          {/* ── Right: Photo ── */}
          <Motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
            className="relative flex items-center justify-center"
          >
            {/* ── Orbit system container ── */}
            <div className="absolute inset-0 flex items-center justify-center">

              {/* ── Orbit Ring 1 — tilted 0deg (equatorial), slow ── */}
              <Motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
                className="absolute"
                style={{
                  width: 520, height: 520,
                  border: '1px solid rgba(34,211,238,0.18)',
                  borderRadius: '50%',
                  transform: 'rotateX(72deg)',
                }}
              >
                {/* Node on ring 1 */}
                <div
                  style={{
                    position: 'absolute', top: '50%', left: '-6px',
                    transform: 'translateY(-50%)',
                    width: 12, height: 12,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #22d3ee, #0891b2)',
                    boxShadow: '0 0 12px 4px rgba(34,211,238,0.7)',
                  }}
                />
                {/* Opposing small dot */}
                <div
                  style={{
                    position: 'absolute', top: '50%', right: '-4px',
                    transform: 'translateY(-50%)',
                    width: 6, height: 6,
                    borderRadius: '50%',
                    background: '#22d3ee',
                    opacity: 0.5,
                  }}
                />
              </Motion.div>

              {/* ── Orbit Ring 2 — tilted 60deg, medium speed, reverse ── */}
              <Motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 13, ease: 'linear', repeat: Infinity }}
                className="absolute"
                style={{
                  width: 480, height: 480,
                  border: '1px solid rgba(34,211,238,0.12)',
                  borderRadius: '50%',
                  transform: 'rotateX(72deg) rotateZ(60deg)',
                }}
              >
                {/* Node on ring 2 — gold tinted */}
                <div
                  style={{
                    position: 'absolute', top: '-6px', left: '50%',
                    transform: 'translateX(-50%)',
                    width: 10, height: 10,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #f0abfc, #a855f7)',
                    boxShadow: '0 0 10px 3px rgba(168,85,247,0.65)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute', bottom: '-4px', left: '50%',
                    transform: 'translateX(-50%)',
                    width: 5, height: 5,
                    borderRadius: '50%',
                    background: '#a855f7',
                    opacity: 0.45,
                  }}
                />
              </Motion.div>

              {/* ── Orbit Ring 3 — tilted 120deg, fast ── */}
              <Motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 9, ease: 'linear', repeat: Infinity }}
                className="absolute"
                style={{
                  width: 440, height: 440,
                  border: '1px solid rgba(34,211,238,0.10)',
                  borderRadius: '50%',
                  transform: 'rotateX(72deg) rotateZ(120deg)',
                }}
              >
                {/* Node on ring 3 — teal tinted */}
                <div
                  style={{
                    position: 'absolute', top: '50%', right: '-5px',
                    transform: 'translateY(-50%)',
                    width: 8, height: 8,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #5eead4, #0d9488)',
                    boxShadow: '0 0 8px 3px rgba(94,234,212,0.65)',
                  }}
                />
              </Motion.div>

              {/* ── Outer static decorative ring ── */}
              <div
                style={{
                  position: 'absolute',
                  width: 580, height: 580,
                  border: '1px dashed rgba(34,211,238,0.08)',
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }}
              />

            </div>

            {/* ── Floating ambient particles ── */}
            {[
              { size: 3, top: '12%', left: '18%', delay: 0, duration: 4.2, color: '#22d3ee' },
              { size: 2, top: '78%', left: '14%', delay: 1.1, duration: 3.6, color: '#a855f7' },
              { size: 4, top: '20%', left: '82%', delay: 0.5, duration: 5.0, color: '#5eead4' },
              { size: 2, top: '68%', left: '80%', delay: 1.8, duration: 3.9, color: '#22d3ee' },
              { size: 3, top: '88%', left: '50%', delay: 0.3, duration: 4.5, color: '#f0abfc' },
              { size: 2, top: '8%', left: '52%', delay: 2.1, duration: 3.3, color: '#22d3ee' },
            ].map((p, i) => (
              <Motion.div
                key={i}
                animate={{ y: [0, -10, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: p.top, left: p.left,
                  width: p.size, height: p.size,
                  borderRadius: '50%',
                  background: p.color,
                  boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
                  pointerEvents: 'none',
                }}
              />
            ))}

            {/* ── Glow behind photo ── */}
            <div className="absolute h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl lg:h-96 lg:w-96" />

            {/* ── Photo container ── */}
            <Motion.div
              animate={{ y: [0, -6, 0, 5, 0] }}
              transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
              className="relative z-10"
            >
              <div className={`relative h-72 w-72 overflow-hidden rounded-full border-2 border-cyan-400/50 shadow-2xl sm:h-80 sm:w-80 lg:h-[380px] lg:w-[380px] ${isDark ? 'shadow-cyan-500/20' : 'shadow-cyan-500/15'}`}>
                {/* Top shine */}
                <div className="absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-cyan-400/10 to-transparent" />
                {/* Inner ring overlay */}
                <div className="absolute inset-0 z-10 rounded-full ring-1 ring-inset ring-cyan-400/20" />
                <img
                  src="./salman-ceo.jpg"
                  alt="Salman Alfarisi Rizwana"
                  className="h-full w-full object-cover scale-150"
                />
              </div>

              {/* ── Floating badges ── */}
              <Motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className={`absolute -left-4 top-1/4 flex items-center gap-2 rounded-xl border px-3 py-2 shadow-lg backdrop-blur-md lg:-left-14 ${isDark ? 'border-slate-700 bg-slate-900/90' : 'border-slate-200 bg-white/95'}`}
              >
                <span className="text-lg">⚡</span>
                <div>
                  <p className="text-[0.6rem] font-bold uppercase tracking-wide text-cyan-400">Full Stack</p>
                  <p className={`text-[0.55rem] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Web + ML</p>
                </div>
              </Motion.div>

              <Motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className={`absolute -right-4 bottom-1/4 flex items-center gap-2 rounded-xl border px-3 py-2 shadow-lg backdrop-blur-md lg:-right-14 ${isDark ? 'border-slate-700 bg-slate-900/90' : 'border-slate-200 bg-white/95'}`}
              >
                <span className="text-lg">🚀</span>
                <div>
                  <p className="text-[0.6rem] font-bold uppercase tracking-wide text-cyan-400">5+ Projects</p>
                  <p className={`text-[0.55rem] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Production Ready</p>
                </div>
              </Motion.div>

              {/* ── React — kiri atas ── */}
              <Motion.div
                initial={{ opacity: 0, x: -16, y: -16 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className={`absolute -left-6 top-[-20%] flex items-center gap-2 rounded-xl border px-3 py-2 shadow-lg backdrop-blur-md lg:-left-20 ${isDark ? 'border-slate-700 bg-slate-900/90' : 'border-slate-200 bg-white/95'}`}
              >
                <FaReact className="h-6 w-6 text-[#61dafb]" />
                <div>
                  <p className="text-[0.6rem] font-bold uppercase tracking-wide" style={{ color: '#61dafb' }}>React</p>
                  <p className={`text-[0.5rem] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Frontend</p>
                </div>
              </Motion.div>

              {/* ── JavaScript — kanan atas ── */}
              <Motion.div
                initial={{ opacity: 0, x: 16, y: -16 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.85, duration: 0.4 }}
                className={`absolute -right-[-90%] top-[-5%] flex items-center gap-2 rounded-xl border px-3 py-2 shadow-lg backdrop-blur-md lg:-right-16 ${isDark ? 'border-slate-700 bg-slate-900/90' : 'border-slate-200 bg-white/95'}`}
              >
                <FaJs className="h-6 w-6 text-[#f7df1e]" />
                <div>
                  <p className="text-[0.6rem] font-bold uppercase tracking-wide" style={{ color: '#d4b900' }}>JavaScript</p>
                  <p className={`text-[0.5rem] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Language</p>
                </div>
              </Motion.div>

              {/* ── Node.js — kanan tengah ── */}
              <Motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                className={`absolute -right-6 top-[25%] flex items-center gap-2 rounded-xl border px-3 py-2 shadow-lg backdrop-blur-md lg:-right-22 ${isDark ? 'border-slate-700 bg-slate-900/90' : 'border-slate-200 bg-white/95'}`}
              >
                <FaNodeJs className="h-6 w-6 text-[#339933]" />
                <div>
                  <p className="text-[0.6rem] font-bold uppercase tracking-wide" style={{ color: '#339933' }}>Node.js</p>
                  <p className={`text-[0.5rem] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Runtime</p>
                </div>
              </Motion.div>

              {/* ── PHP — kiri tengah ── */}
              <Motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.88, duration: 0.4 }}
                className={`absolute -left-[-20%] top-[44%] flex items-center gap-2 rounded-xl border px-3 py-2 shadow-lg backdrop-blur-md lg:-left-18 ${isDark ? 'border-slate-700 bg-slate-900/90' : 'border-slate-200 bg-white/95'}`}
              >
                <FaPhp className="h-6 w-6 text-[#777BB3]" />
                <div>
                  <p className="text-[0.6rem] font-bold uppercase tracking-wide" style={{ color: '#9b9ee0' }}>PHP</p>
                  <p className={`text-[0.5rem] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Backend</p>
                </div>
              </Motion.div>

              {/* ── HTML — kanan bawah ── */}
              <Motion.div
                initial={{ opacity: 0, x: 16, y: 16 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.92, duration: 0.4 }}
                className={`absolute -right-12 bottom-[44%] flex items-center gap-2 rounded-xl border px-3 py-2 shadow-lg backdrop-blur-md lg:-right-20 ${isDark ? 'border-slate-700 bg-slate-900/90' : 'border-slate-200 bg-white/95'}`}
              >
                <FaHtml5 className="h-6 w-6 text-[#E34F26]" />
                <div>
                  <p className="text-[0.6rem] font-bold uppercase tracking-wide" style={{ color: '#E44D26' }}>HTML</p>
                  <p className={`text-[0.5rem] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Markup</p>
                </div>
              </Motion.div>

              {/* ── CSS — kiri bawah ── */}
              <Motion.div
                initial={{ opacity: 0, x: -16, y: 16 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.95, duration: 0.4 }}
                className={`absolute -left-[-10%] bottom-[22%] flex items-center gap-2 rounded-xl border px-3 py-2 shadow-lg backdrop-blur-md lg:-left-20 ${isDark ? 'border-slate-700 bg-slate-900/90' : 'border-slate-200 bg-white/95'}`}
              >
                <FaCss3 className="h-6 w-6 text-[#1572B6]" />
                <div>
                  <p className="text-[0.6rem] font-bold uppercase tracking-wide" style={{ color: '#33A9DC' }}>CSS</p>
                  <p className={`text-[0.5rem] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Styling</p>
                </div>
              </Motion.div>

              {/* ── MySQL — bawah tengah ── */}
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.98, duration: 0.4 }}
                className={`absolute top-[-15%] left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-xl border px-3 py-2 shadow-lg backdrop-blur-md ${isDark ? 'border-slate-700 bg-slate-900/90' : 'border-slate-200 bg-white/95'}`}
              >
                <SiMysql className="h-6 w-6 text-[#00758F]" />
                <div>
                  <p className="text-[0.6rem] font-bold uppercase tracking-wide" style={{ color: '#00758F' }}>MySQL</p>
                  <p className={`text-[0.5rem] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Database</p>
                </div>
              </Motion.div>

            </Motion.div>
          </Motion.div>
        </div>

        {/* ── Bottom scroll indicator ── */}
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className={`text-[0.6rem] uppercase tracking-[0.2em] ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>Scroll</span>
          <Motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="h-5 w-[1px] bg-gradient-to-b from-cyan-400/60 to-transparent"
          />
        </Motion.div>
      </div >
    </section >
  )
}

export default Hero