import { useEffect, useState } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import CafeProjectDetail from './components/CafeProjectDetail.jsx'

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark'
  try {
    const stored = window.localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  } catch { return 'dark' }
}

const getInitialLanguage = () => {
  if (typeof window === 'undefined') return 'id'
  try {
    const stored = window.localStorage.getItem('language')
    if (stored === 'id' || stored === 'en') return stored
    return 'id'
  } catch { return 'id' }
}

function SplashScreen({ isDark, language, onComplete }) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((v) => {
        if (v >= 100) {
          clearInterval(interval)
          if (onComplete) onComplete()
          return 100
        }
        return v + (v < 70 ? 3 : v < 90 ? 1.5 : 0.8)
      })
    }, 18)
    return () => clearInterval(interval)
  }, [onComplete])

  const bg = isDark ? 'bg-slate-950' : 'bg-slate-50'
  const textPrimary = isDark ? 'text-slate-50' : 'text-slate-900'
  const textMuted = isDark ? 'text-slate-600' : 'text-slate-400'
  const trackBg = isDark ? 'bg-slate-800' : 'bg-slate-200'

  return (
    <Motion.div
      initial={{ opacity: 1 }} animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden ${bg}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: `linear-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#fff' : '#000'} 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/8 blur-[120px]" />

      {/* Corner labels — hidden on mobile */}
      <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className={`absolute left-6 top-6 hidden sm:block text-[0.6rem] font-bold uppercase tracking-[0.25em] ${textMuted}`}>
        Portfolio · {new Date().getFullYear()}
      </Motion.div>
      <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className={`absolute bottom-6 right-6 hidden sm:block text-[0.6rem] font-bold uppercase tracking-[0.25em] ${textMuted}`}>
        Web · Data · ML
      </Motion.div>

      <div className="relative flex w-full flex-col items-center gap-10 px-6 text-center sm:px-0">
        {/* Spinning badge */}
        <Motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative flex h-20 w-20 items-center justify-center">
          <Motion.div animate={{ rotate: 360 }} transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
            className="absolute inset-0 rounded-full"
            style={{ background: 'conic-gradient(from 0deg, transparent 0deg, #22d3ee 120deg, transparent 180deg)', borderRadius: '50%', padding: '1.5px' }}>
            <div className={`h-full w-full rounded-full ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`} />
          </Motion.div>
          <div className={`absolute inset-[3px] rounded-full border ${isDark ? 'border-slate-800' : 'border-slate-200'}`} />
          <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-sm font-black text-slate-950 shadow-lg shadow-cyan-500/40">SR</div>
        </Motion.div>

        {/* Name + subtitle */}
        <div className="flex flex-col items-center gap-2 overflow-hidden">
          <Motion.h1 initial={{ y: 32, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl ${textPrimary}`}>
            Salman <span className="text-cyan-400">Alfarisi</span> Rizwana
          </Motion.h1>
          <Motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}
            className="flex items-center justify-center gap-2">
            <div className="h-px w-5 flex-shrink-0 bg-cyan-400/60" />
            <p className={`text-[0.6rem] font-bold uppercase tracking-[0.18em] sm:text-[0.65rem] sm:tracking-[0.25em] ${textMuted}`}>
              Web Dev · Data Science · ML
            </p>
            <div className="h-px w-5 flex-shrink-0 bg-cyan-400/60" />
          </Motion.div>
        </div>

        {/* Progress bar */}
        <Motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="flex w-full max-w-[280px] flex-col items-center gap-2 sm:max-w-sm sm:w-80">
          <div className={`h-[2px] w-full overflow-hidden rounded-full ${trackBg}`}>
            <Motion.div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex w-full items-center justify-between">
            <span className={`text-[0.6rem] font-semibold uppercase tracking-widest ${textMuted}`}>
              {progress < 100 ? (language === 'en' ? 'Loading' : 'Memuat') : (language === 'en' ? 'Ready' : 'Siap')}
            </span>
            <span className="text-[0.6rem] font-black tabular-nums text-cyan-400">{Math.floor(progress)}%</span>
          </div>
        </Motion.div>
      </div>
    </Motion.div>
  )
}

// ── Page IDs ─────────────────────────────────────────────────────────────────
const PAGE_HOME = 'home'
const PAGE_CAFE = 'cafe-detail'

function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [activeSection, setActiveSection] = useState('hero')
  const [showSplash, setShowSplash] = useState(true)
  const [language, setLanguage] = useState(getInitialLanguage)
  const [currentPage, setCurrentPage] = useState(PAGE_HOME)

  useEffect(() => { window.localStorage.setItem('theme', theme) }, [theme])
  useEffect(() => { window.localStorage.setItem('language', language) }, [language])

  // Scroll to top when entering a detail page
  useEffect(() => {
    if (currentPage !== PAGE_HOME) window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  // Intersection observer only active on home page
  useEffect(() => {
    if (currentPage !== PAGE_HOME) return
    const sectionIds = ['hero', 'about', 'projects', 'skills', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.2) {
            setActiveSection(e.target.id)
          }
        })
      },
      { threshold: [0.2, 0.5, 0.8], rootMargin: '-10% 0px -10% 0px' },
    )
    sectionIds.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [currentPage])

  useEffect(() => {
    // Show splash when page changes, but for home page only on initial load (handled by initial state)
    if (currentPage === PAGE_CAFE) {
      setShowSplash(true)
      const timeout = setTimeout(() => setShowSplash(false), 2200)
      return () => clearTimeout(timeout)
    }
  }, [currentPage])

  // Initial splash screen
  useEffect(() => {
    const timeout = setTimeout(() => setShowSplash(false), 2200)
    return () => clearTimeout(timeout)
  }, [])

  const scrollToSection = (id) => {
    // From detail page → go home first, then scroll
    if (currentPage !== PAGE_HOME) {
      setCurrentPage(PAGE_HOME)
      setShowSplash(true) // Show splash when returning to home from cafe detail
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 2350) // Wait for splash + slight delay
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleBackFromDetail = () => {
    setCurrentPage(PAGE_HOME)
    setShowSplash(true) // Show splash when returning to home
    setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 2350) // Wait for splash + slight delay
  }

  const isDark = theme === 'dark'
  const baseBg = isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'

  return (
    <div className={`${baseBg} min-h-screen transition-colors duration-300`}>
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen
            key="splash"
            isDark={isDark}
            language={language}
            onComplete={() => setShowSplash(false)}
          />
        )}
      </AnimatePresence>

      <Navbar
        activeSection={activeSection}
        onNavClick={scrollToSection}
        isDark={isDark}
        onToggleTheme={() => setTheme(isDark ? 'light' : 'dark')}
        language={language}
        onLanguageChange={setLanguage}
      />

      <main className={`pt-15 transition-opacity duration-500 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
        <AnimatePresence mode="wait">

          {currentPage === PAGE_HOME && (
            <Motion.div key="home"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <section id="hero" className="relative">
                <Hero isDark={isDark} language={language} onViewProjects={() => scrollToSection('projects')} />
              </section>
              <section id="about">
                <About isDark={isDark} language={language} />
              </section>
              <section id="projects">
                <Projects
                  isDark={isDark}
                  language={language}
                  onViewCafeDetail={() => setCurrentPage(PAGE_CAFE)}
                />
              </section>
              <section id="skills">
                <Skills isDark={isDark} language={language} />
              </section>
              <section id="contact">
                <Contact isDark={isDark} language={language} />
              </section>
            </Motion.div>
          )}

          {currentPage === PAGE_CAFE && (
            <Motion.div key="cafe-detail"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <CafeProjectDetail
                isDark={isDark}
                language={language}
                onBack={handleBackFromDetail}
              />
            </Motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  )
}

export default App