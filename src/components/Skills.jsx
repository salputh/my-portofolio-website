import { useState } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'

// ── Data ──────────────────────────────────────────────────────────────────────
const skillGroups = [
  {
    id: 'frontend',
    label: { en: 'Frontend', id: 'Frontend' },
    icon: '⬡',
    accent: 'cyan',
    desc: { en: 'Modern, responsive UIs', id: 'UI modern dan responsif' },
    skills: [
      { name: 'React & Hooks', level: 80 },
      { name: 'Tailwind CSS', level: 80 },
      { name: 'Responsive UI Design', level: 75 },
      { name: 'Next.js', level: 65 },
    ],
  },
  {
    id: 'backend',
    label: { en: 'Backend', id: 'Backend' },
    icon: '◎',
    accent: 'blue',
    desc: { en: 'APIs & database design', id: 'API & desain database' },
    skills: [
      { name: 'Node.js, Express, PHP', level: 80 },
      { name: 'RESTful API Design', level: 75 },
      { name: 'SQL & Relational DB', level: 70 },
      { name: 'Auth (JWT)', level: 70 },
    ],
  },
  {
    id: 'data',
    label: { en: 'Data & ML', id: 'Data & ML' },
    icon: '◈',
    accent: 'violet',
    desc: { en: 'From raw data to deployed models', id: 'Dari data mentah ke model siap pakai' },
    skills: [
      { name: 'Python + Pandas + NumPy', level: 80 },
      { name: 'Scikit-learn', level: 75 },
      { name: 'Time Series & Forecasting', level: 75 },
      { name: 'TensorFlow & Keras', level: 65 },
      { name: 'Excel, Google Sheets, CSV, Power BI', level: 80 },
    ],
  },
  {
    id: 'tools',
    label: { en: 'Tools', id: 'Tools' },
    icon: '⬧',
    accent: 'emerald',
    desc: { en: 'Daily workflow & DevOps basics', id: 'Workflow harian & dasar DevOps' },
    skills: [
      { name: 'Git & GitHub', level: 80 },
      { name: 'TRAE Code Editor', level: 80 },
      { name: 'Postman / API Client', level: 75 },
      { name: 'Terminal & Command Line', level: 70 },
      { name: 'Docker', level: 60 },
    ],
  },
]

const accentMap = {
  cyan: { bar: 'from-cyan-400 to-cyan-500', text: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/30', activeBorder: 'border-cyan-400/60', dot: 'bg-cyan-400' },
  blue: { bar: 'from-blue-400 to-blue-500', text: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/30', activeBorder: 'border-blue-400/60', dot: 'bg-blue-400' },
  violet: { bar: 'from-violet-400 to-violet-500', text: 'text-violet-400', bg: 'bg-violet-400/10', border: 'border-violet-400/30', activeBorder: 'border-violet-400/60', dot: 'bg-violet-400' },
  emerald: { bar: 'from-emerald-400 to-emerald-500', text: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/30', activeBorder: 'border-emerald-400/60', dot: 'bg-emerald-400' },
}

// Label for skill levels
function levelLabel(level, language) {
  if (level >= 80) return language === 'en' ? 'Proficient' : 'Mahir'
  if (level >= 70) return language === 'en' ? 'Comfortable' : 'Terbiasa'
  if (level >= 60) return language === 'en' ? 'Familiar' : 'Familiar'
  return language === 'en' ? 'Learning' : 'Belajar'
}

function SkillRow({ skill, accent, isDark, language, index }) {
  const a = accentMap[accent]
  const labelColor = isDark ? 'text-slate-200' : 'text-slate-700'
  const trackBg = isDark ? 'bg-slate-800' : 'bg-slate-200'
  const badgeBg = isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'

  return (
    <Motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="group space-y-1.5"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${a.dot}`} />
          <span className={`text-xs font-medium sm:text-sm ${labelColor}`}>{skill.name}</span>
        </div>
        <span className={`rounded-md px-2 py-0.5 text-[0.6rem] font-semibold ${badgeBg}`}>
          {levelLabel(skill.level, language)}
        </span>
      </div>
      <div className={`h-1.5 w-full overflow-hidden rounded-full ${trackBg}`}>
        <Motion.div
          className={`h-full rounded-full bg-gradient-to-r ${a.bar}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: index * 0.06 + 0.15, duration: 0.7, ease: 'easeOut' }}
        />
      </div>
    </Motion.div>
  )
}

function Skills({ isDark, language }) {
  const [activeTab, setActiveTab] = useState('frontend')
  const activeGroup = skillGroups.find((g) => g.id === activeTab)
  const a = accentMap[activeGroup.accent]

  const sectionBg = isDark ? 'bg-slate-950' : 'bg-slate-50'
  const titleColor = isDark ? 'text-white' : 'text-slate-900'
  const bodyColor = isDark ? 'text-slate-400' : 'text-slate-500'
  const tabBase = isDark ? 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200' : 'border-slate-200 bg-white text-slate-500 hover:text-slate-800'
  const cardBg = isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
  const divider = isDark ? 'border-slate-800' : 'border-slate-200'

  // All skills flattened for the "all" overview bar
  const allSkillCount = skillGroups.reduce((acc, g) => acc + g.skills.length, 0)

  return (
    <section className={`relative border-t ${isDark ? 'border-slate-800' : 'border-slate-200'} ${sectionBg}`}>
      {/* Grid bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#fff' : '#000'} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 lg:px-8">

        {/* ── Section Header ── */}
        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
            {language === 'en' ? 'Skills' : 'Keahlian'}
          </p>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className={`text-3xl font-black tracking-tight sm:text-4xl ${titleColor}`}>
              {language === 'en' ? (
                <>Built on<br /><span className="text-cyan-400">strong foundations</span></>
              ) : (
                <>Dibangun di atas<br /><span className="text-cyan-400">fondasi yang kuat</span></>
              )}
            </h2>
            <p className={`max-w-sm text-sm leading-relaxed ${bodyColor}`}>
              {language === 'en'
                ? `${allSkillCount} skills across frontend, backend, data, and tooling — built through real projects.`
                : `${allSkillCount} skill di frontend, backend, data, dan tooling — dibangun lewat project nyata.`}
            </p>
          </div>
        </Motion.div>

        {/* ── Summary stat row ── */}
        <Motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className={`mb-10 grid grid-cols-2 divide-x divide-y rounded-2xl border sm:grid-cols-4 sm:divide-y-0 overflow-hidden ${divider} ${isDark ? 'bg-slate-900/40 divide-slate-800' : 'bg-white divide-slate-200'}`}
        >
          {skillGroups.map((g) => {
            const ga = accentMap[g.accent]
            const avg = Math.round(g.skills.reduce((a, s) => a + s.level, 0) / g.skills.length)
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => setActiveTab(g.id)}
                className={`flex flex-col items-center gap-1 py-5 px-4 transition-all duration-200 ${activeTab === g.id ? ga.bg : 'hover:bg-white/5'}`}
              >
                <span className={`text-lg ${ga.text}`}>{g.icon}</span>
                <span className={`text-xs font-bold ${activeTab === g.id ? ga.text : (isDark ? 'text-slate-300' : 'text-slate-700')}`}>
                  {g.label[language]}
                </span>
                <span className={`text-[0.6rem] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  avg {avg}%
                </span>
              </button>
            )
          })}
        </Motion.div>

        {/* ── Main layout: tabs + detail ── */}
        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">

          {/* Left: vertical tab list (desktop) / hidden on mobile */}
          <div className="hidden lg:flex flex-col gap-2">
            {skillGroups.map((g) => {
              const ga = accentMap[g.accent]
              const isActive = activeTab === g.id
              return (
                <Motion.button
                  key={g.id}
                  type="button"
                  onClick={() => setActiveTab(g.id)}
                  whileHover={{ x: 2 }}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 ${isActive
                    ? `${ga.bg} ${ga.activeBorder}`
                    : `${tabBase} ${isDark ? 'border-slate-800' : 'border-slate-200'}`
                    }`}
                >
                  <span className={`text-base ${isActive ? ga.text : (isDark ? 'text-slate-500' : 'text-slate-400')}`}>
                    {g.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold ${isActive ? ga.text : ''}`}>
                      {g.label[language]}
                    </p>
                    <p className={`text-[0.6rem] truncate ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                      {g.desc[language]}
                    </p>
                  </div>
                  <span className={`text-[0.6rem] font-black tabular-nums ${isActive ? ga.text : (isDark ? 'text-slate-600' : 'text-slate-300')}`}>
                    {g.skills.length.toString().padStart(2, '0')}
                  </span>
                </Motion.button>
              )
            })}
          </div>

          {/* Right: skill detail panel */}
          <AnimatePresence mode="wait">
            <Motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className={`rounded-2xl border p-6 shadow-lg ${cardBg}`}
            >
              {/* Panel header */}
              <div className={`mb-6 flex items-center justify-between pb-4 border-b ${divider}`}>
                <div className="flex items-center gap-3">
                  <span className={`text-2xl ${a.text}`}>{activeGroup.icon}</span>
                  <div>
                    <h3 className={`text-base font-black ${titleColor}`}>
                      {activeGroup.label[language]}
                    </h3>
                    <p className={`text-xs ${bodyColor}`}>{activeGroup.desc[language]}</p>
                  </div>
                </div>
                <div className={`rounded-xl border px-3 py-1.5 text-center ${a.bg} ${a.border}`}>
                  <p className={`text-lg font-black leading-none ${a.text}`}>
                    {Math.round(activeGroup.skills.reduce((acc, s) => acc + s.level, 0) / activeGroup.skills.length)}
                    <span className="text-xs">%</span>
                  </p>
                  <p className={`text-[0.55rem] font-semibold uppercase tracking-wide ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>avg</p>
                </div>
              </div>

              {/* Skill bars */}
              <div className="space-y-4">
                {activeGroup.skills.map((skill, i) => (
                  <SkillRow
                    key={skill.name}
                    skill={skill}
                    accent={activeGroup.accent}
                    isDark={isDark}
                    language={language}
                    index={i}
                  />
                ))}
              </div>

              {/* Level legend */}
              <div className={`mt-6 flex flex-wrap gap-3 pt-4 border-t ${divider}`}>
                {[
                  { label: language === 'en' ? 'Proficient' : 'Mahir', range: '≥80%' },
                  { label: language === 'en' ? 'Comfortable' : 'Terbiasa', range: '70–79%' },
                  { label: language === 'en' ? 'Familiar' : 'Familiar', range: '60–69%' },
                  { label: language === 'en' ? 'Learning' : 'Belajar', range: '<60%' },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${a.dot}`} />
                    <span className={`text-[0.6rem] font-medium ${bodyColor}`}>{l.label}</span>
                    <span className={`text-[0.55rem] ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>{l.range}</span>
                  </div>
                ))}
              </div>
            </Motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default Skills