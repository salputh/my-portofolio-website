import { useState, useEffect } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'

const sections = {
  id: [
    { id: 'hero', label: 'Beranda' },
    { id: 'about', label: 'Tentang' },
    { id: 'projects', label: 'Proyek' },
    { id: 'skills', label: 'Skill' },
    { id: 'contact', label: 'Kontak' },
  ],
  en: [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ],
}

function Navbar({ activeSection, onNavClick, isDark, onToggleTheme, language, onLanguageChange }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.classList.add('mobile-menu-open')
    } else {
      document.body.classList.remove('mobile-menu-open')
    }
    return () => document.body.classList.remove('mobile-menu-open')
  }, [open])

  const handleNavClick = (id) => {
    setOpen(false)
    document.body.classList.remove('mobile-menu-open')
    setTimeout(() => {
      if (onNavClick) onNavClick(id)
    }, 100)
  }

  // Dynamic styles
  const headerBg = isDark
    ? scrolled
      ? 'border-slate-800/80 bg-slate-950/90 shadow-xl shadow-black/20'
      : 'border-slate-800/40 bg-slate-950/80'
    : scrolled
      ? 'border-slate-200/80 bg-white/95 shadow-lg shadow-slate-200/60'
      : 'border-slate-200/60 bg-white/90'

  const textPrimary = isDark ? 'text-slate-50' : 'text-slate-900'
  const textMuted = isDark ? 'text-slate-500' : 'text-slate-400'
  const navBg = isDark
    ? 'bg-slate-900/80 border-slate-700/60'
    : 'bg-slate-100/90 border-slate-200'
  const navInactive = isDark
    ? 'text-slate-400 hover:text-slate-100'
    : 'text-slate-500 hover:text-slate-900'
  const controlBg = isDark
    ? 'bg-slate-900/80 border-slate-700/60 text-slate-300'
    : 'bg-slate-100/90 border-slate-200 text-slate-600'
  const mobilePanelBg = isDark
    ? 'bg-slate-950/98 border-slate-800'
    : 'bg-white/98 border-slate-200'

  return (
    <Motion.header
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-30 border-b backdrop-blur-xl transition-all duration-300 ${headerBg} pointer-events-auto`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">

        {/* ── Logo ── */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleNavClick('hero')
          }}
          className="group flex items-center gap-2.5 mobile-nav-button"
        >
          <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border border-cyan-400/30">
            <img
              src="./salman-profile.jpeg"
              alt="Salman Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className={`text-sm font-bold tracking-tight ${textPrimary}`}>
              Salman<span className="text-cyan-400">.</span>
            </span>
            <span className={`text-[0.6rem] font-medium ${textMuted}`}>
              Web · Data · ML
            </span>
          </div>
        </button>

        {/* ── Desktop Nav ── */}
        <div className="hidden items-center gap-2 lg:flex">
          {/* Nav links pill group */}
          <div className={`flex items-center gap-0.5 rounded-full border px-1.5 py-1.5 text-xs font-semibold backdrop-blur-sm ${navBg}`}>
            {sections[language].map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleNavClick(item.id)
                  }}
                  className={`relative rounded-full px-3.5 py-1.5 transition-all duration-200 mobile-nav-button ${isActive
                    ? 'text-slate-950 shadow-lg shadow-cyan-500/30'
                    : navInactive
                    }`}
                >
                  {isActive && (
                    <Motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-cyan-400"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              )
            })}
          </div>

          {/* Controls group */}
          <div className={`flex items-center gap-0.5 rounded-full border px-1.5 py-1.5 text-xs font-bold backdrop-blur-sm ${controlBg}`}>
            {['id', 'en'].map((code) => {
              const isActive = language === code
              return (
                <button
                  key={code}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    if (onLanguageChange) onLanguageChange(code)
                  }}
                  className={`relative rounded-full px-3 py-1.5 uppercase tracking-wider transition-all duration-200 ${isActive ? 'text-slate-950 shadow-lg shadow-cyan-500/30' : `${navInactive}`
                    }`}
                >
                  {isActive && (
                    <Motion.span
                      layoutId="lang-active-pill"
                      className="absolute inset-0 rounded-full bg-cyan-400"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{code}</span>
                </button>
              )
            })}

            <span className={`mx-1 h-4 w-px ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`} />

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onToggleTheme()
              }}
              className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200 hover:text-cyan-400 ${navInactive}`}
              title={isDark ? 'Switch to Light' : 'Switch to Dark'}
            >
              <AnimatePresence mode="wait" initial={false}>
                <Motion.span
                  key={isDark ? 'moon' : 'sun'}
                  initial={{ scale: 0.5, opacity: 0, rotate: -30 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.5, opacity: 0, rotate: 30 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm"
                >
                  {isDark ? '☾' : '☀︎'}
                </Motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* ── Mobile: right controls ── */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Theme icon */}
          <button
            type="button"
            onClick={onToggleTheme}
            className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm transition touch-manipulation mobile-nav-button ${controlBg}`}
          >
            {isDark ? '☾' : '☀︎'}
          </button>

          {/* Hamburger */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setOpen((v) => !v)
            }}
            className={`relative flex h-8 w-8 items-center justify-center rounded-full border transition touch-manipulation mobile-nav-button ${controlBg}`}
          >
            <span className="relative flex h-4 w-4 items-center justify-center">
              <Motion.span
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                className={`absolute block h-0.5 w-4 rounded-full ${isDark ? 'bg-slate-300' : 'bg-slate-600'}`}
              />
              <Motion.span
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.15 }}
                className={`absolute block h-0.5 w-4 rounded-full ${isDark ? 'bg-slate-300' : 'bg-slate-600'}`}
              />
              <Motion.span
                animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                className={`absolute block h-0.5 w-4 rounded-full ${isDark ? 'bg-slate-300' : 'bg-slate-600'}`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* ── Mobile Panel ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 lg:hidden cursor-pointer"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setOpen(false)
              }}
            />

            {/* Panel */}
            <Motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className={`overflow-hidden border-t backdrop-blur-xl lg:hidden relative z-40 ${mobilePanelBg}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 py-4">

                {/* ── Nav links — vertical list ── */}
                <div className={`flex flex-col gap-1 mb-4 p-1.5 rounded-2xl border ${navBg}`}>
                  {sections[language].map((item, i) => {
                    const isActive = activeSection === item.id
                    return (
                      <Motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleNavClick(item.id)
                        }}
                        className={`relative flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 touch-manipulation ${isActive
                          ? 'text-slate-950 shadow-lg shadow-cyan-500/20'
                          : isDark
                            ? 'text-slate-400 hover:text-slate-100'
                            : 'text-slate-500 hover:text-slate-900'
                          }`}
                      >
                        {isActive && (
                          <Motion.span
                            layoutId="mobile-nav-active-pill"
                            className="absolute inset-0 rounded-xl bg-cyan-400"
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">{item.label}</span>
                      </Motion.button>
                    )
                  })}
                </div>

                {/* ── Divider ── */}
                <div className={`h-px mb-4 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`} />

                {/* ── Language toggle — pill (same as desktop) ── */}
                <div className="flex items-center justify-between">
                  <span className={`text-[0.6rem] font-bold uppercase tracking-widest ${textMuted}`}>
                    Language
                  </span>
                  <div className={`flex items-center gap-0.5 rounded-full border px-1.5 py-1.5 text-xs font-bold backdrop-blur-sm ${controlBg}`}>
                    {['id', 'en'].map((code) => {
                      const isActive = language === code
                      return (
                        <button
                          key={code}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            if (onLanguageChange) onLanguageChange(code)
                          }}
                          className={`relative rounded-full px-3.5 py-1.5 uppercase tracking-wider transition-all duration-200 touch-manipulation ${isActive ? 'text-slate-950 shadow-lg shadow-cyan-500/30' : navInactive
                            }`}
                        >
                          {isActive && (
                            <Motion.span
                              layoutId="mobile-lang-active-pill"
                              className="absolute inset-0 rounded-full bg-cyan-400"
                              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            />
                          )}
                          <span className="relative z-10">{code}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

              </div>
            </Motion.div>
          </>
        )}
      </AnimatePresence>
    </Motion.header>
  )
}

export default Navbar