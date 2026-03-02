import { motion as Motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { FaReact, FaNodeJs, FaPython, FaDocker, FaPhp, FaHtml5, FaCss3, FaJs, FaBootstrap } from 'react-icons/fa'
import { SiMysql, SiTailwindcss, SiPostgresql } from 'react-icons/si'

const skillIcons = [
  { name: 'React', icon: FaReact, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
  { name: 'Node.js', icon: FaNodeJs, color: 'text-green-400', bg: 'bg-green-400/10' },
  { name: 'MySQL', icon: SiMysql, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { name: 'Python', icon: FaPython, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  { name: 'Docker', icon: FaDocker, color: 'text-sky-400', bg: 'bg-sky-400/10' },
  { name: 'PHP', icon: FaPhp, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
  { name: 'HTML', icon: FaHtml5, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { name: 'CSS', icon: FaCss3, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { name: 'JavaScript', icon: FaJs, color: 'text-yellow-300', bg: 'bg-yellow-300/10' },
  { name: 'Tailwind', icon: SiTailwindcss, color: 'text-cyan-300', bg: 'bg-cyan-300/10' },
  { name: 'Bootstrap', icon: FaBootstrap, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-blue-600', bg: 'bg-blue-600/10' },
]

const stats = [
  { value: 5, suffix: '+', label: { en: 'End-to-end Projects', id: 'Project End-to-end' } },
  { value: 3, suffix: '', label: { en: 'ML / Forecasting Systems', id: 'Sistem ML / Forecasting' } },
  { value: 1, suffix: '', label: { en: 'Production-Ready Architecture', id: 'Arsitektur Siap Produksi' } },
]

const principles = [
  {
    icon: '⬡',
    title: { en: 'Maintainable Code', id: 'Maintainable Code' },
    desc: { en: 'Readable, clean, and scalable.', id: 'Terbaca, bersih, dan terukur.' },
  },
  {
    icon: '◈',
    title: { en: 'Systems over Features', id: 'Systems over Features' },
    desc: { en: 'Building architecture, not just tasks.', id: 'Membangun arsitektur, bukan sekadar tugas.' },
  },
  {
    icon: '◎',
    title: { en: 'Data-Driven Thinking', id: 'Data-Driven Thinking' },
    desc: { en: 'Decisions backed by metrics.', id: 'Keputusan didasarkan pada metrik.' },
  },
  {
    icon: '⬧',
    title: { en: 'Production Mindset', id: 'Production Mindset' },
    desc: { en: 'Ready for real-world traffic.', id: 'Siap untuk trafik dunia nyata.' },
  },
]

// Animated counter hook
function useCountUp(target, duration = 1500, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

function StatCard({ stat, language, isDark, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const count = useCountUp(stat.value, 1000 + index * 200, inView)

  return (
    <Motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -3 }}
      className={`group relative overflow-hidden rounded-2xl border p-5 text-center transition-all duration-300 cursor-default ${isDark
        ? 'border-slate-700/60 bg-slate-900/60 hover:border-cyan-500/40 hover:bg-slate-800/80'
        : 'border-slate-200 bg-white hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/5'
        }`}
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      </div>
      <span className="block text-4xl font-black tracking-tight text-cyan-400 tabular-nums">
        {count}{stat.suffix}
      </span>
      <span className={`mt-1.5 block text-xs font-medium leading-snug ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        {stat.label[language] ?? stat.label.en}
      </span>
    </Motion.div>
  )
}

function About({ isDark = true, language = 'en' }) {
  const sectionBg = isDark ? 'bg-slate-950' : 'bg-slate-50'
  const titleColor = isDark ? 'text-white' : 'text-slate-900'
  const bodyColor = isDark ? 'text-slate-400' : 'text-slate-600'
  const cardBg = isDark
    ? 'bg-slate-900/70 border-slate-800/70'
    : 'bg-white border-slate-200'
  const principleCardBg = isDark
    ? 'bg-slate-900/40 border-slate-800/50 hover:border-cyan-500/30 hover:bg-slate-800/60'
    : 'bg-white border-slate-200 hover:border-cyan-400/40 hover:shadow-md'

  return (
    <section className={`relative overflow-hidden border-t ${isDark ? 'border-slate-800' : 'border-slate-200'} ${sectionBg}`}>
      {/* Subtle background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#fff' : '#000'} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 lg:px-8">
        {/* ── Top: label ── */}
        <Motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400"
        >
          {language === 'en' ? 'About Me' : 'Tentang Saya'}
        </Motion.p>

        {/* ── Main grid: heading + skill card ── */}
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          {/* Left — Heading & Bio */}
          <div className="space-y-6">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem] ${titleColor}`}
            >
              {language === 'en' ? (
                <>Building Scalable Systems<br /><span className="text-cyan-400">with Data and Code</span></>
              ) : (
                <>Fresh graduate yang serius<br /><span className="text-cyan-400">membangun karier di tech</span></>
              )}
            </Motion.h2>

            <Motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="space-y-4"
            >
              <p className={`text-sm leading-relaxed sm:text-[0.9375rem] ${bodyColor}`}>
                {language === 'en'
                  ? 'I am Salman Alfarisi Rizwana, a Technology/IT graduate from Politeknik Negeri Medan with a strong focus on web engineering and machine learning. I build end-to-end applications — from designing APIs and managing databases to developing machine learning and forecasting models that can be integrated into real-world systems.'
                  : 'Saya Salman Alfarisi Rizwana, fresh graduate Politeknik Negeri Medan jurusan Teknologi/IT dengan minat utama di web development, data science, dan machine learning. Saya terbiasa membangun aplikasi berbasis data yang tidak hanya menarik secara UI, tetapi juga menjawab kebutuhan bisnis secara konkret.'}
              </p>
              {/* Highlight quote */}
              <blockquote className={`border-l-2 border-cyan-400 pl-4 text-sm italic ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {language === 'en'
                  ? '"Clean architecture, reproducible workflows, and solutions ready to scale beyond prototypes."'
                  : '"Arsitektur bersih, workflow yang reproducible, dan solusi yang siap melampaui prototipe."'}
              </blockquote>
              <p className={`text-sm leading-relaxed sm:text-[0.9375rem] ${bodyColor}`}>
                {language === 'en'
                  ? 'I enjoy working end-to-end: understanding the problem, collecting and cleaning data, building ML or forecasting models, and integrating them into web apps real users can work with. Currently exploring scalable ML deployment and production-oriented system design.'
                  : 'Saya menyukai proses end-to-end: memahami problem, mengumpulkan data, membangun model ML atau forecasting, dan mengintegrasikannya ke dalam aplikasi web. Saat ini mengeksplorasi deployment ML yang scalable dan desain sistem berorientasi produksi.'}
              </p>
            </Motion.div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {stats.map((stat, i) => (
                <StatCard key={i} stat={stat} language={language} isDark={isDark} index={i} />
              ))}
            </div>
          </div>

          {/* Right — Skill Highlights */}
          <Motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className={`rounded-2xl border p-6 shadow-2xl ${isDark ? 'shadow-black/40' : 'shadow-slate-200'} ${cardBg}`}
          >
            <p className={`mb-6 text-xs font-bold uppercase tracking-[0.2em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              Skill Highlights
            </p>

            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {skillIcons.map((item, i) => (
                <Motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                  whileHover={{ y: -4, scale: 1.08 }}
                  className="flex flex-col items-center gap-2 cursor-default"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${isDark ? 'border-slate-700/80' : 'border-slate-200'} ${item.bg} transition-all duration-200 hover:shadow-md`}>
                    <item.icon className={`text-2xl ${item.color}`} />
                  </div>
                  <span className={`text-[0.6rem] font-semibold tracking-wide ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {item.name}
                  </span>
                </Motion.div>
              ))}
            </div>

            {/* Divider */}
            <div className={`my-6 h-px ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`} />

            {/* Additional skills tags */}
            <p className={`mb-3 text-xs font-bold uppercase tracking-[0.2em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              Also worked with
            </p>
            <div className="flex flex-wrap gap-2">
              {['Scikit-learn', 'Pandas', 'FastAPI', 'Tailwind', 'Git', 'Linux'].map((tag) => (
                <span
                  key={tag}
                  className={`rounded-md px-2.5 py-1 text-[0.65rem] font-medium transition-colors ${isDark
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </Motion.div>
        </div>

        {/* ── Engineering Principles ── */}
        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-14"
        >
          <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
            {language === 'en' ? 'Engineering Principles' : 'Prinsip Engineering'}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={{ y: -3 }}
                className={`group relative rounded-2xl border p-5 transition-all duration-300 cursor-default ${principleCardBg}`}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                </div>
                <span className="mb-3 block text-xl text-cyan-400">{p.icon}</span>
                <span className={`block text-sm font-bold ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                  {p.title[language] ?? p.title.en}
                </span>
                <span className={`mt-1 block text-xs leading-relaxed ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                  {p.desc[language] ?? p.desc.en}
                </span>
              </Motion.div>
            ))}
          </div>
        </Motion.div>
      </div>
    </section>
  )
}

export default About