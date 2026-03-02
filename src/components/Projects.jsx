import { useState } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'

const categoryMeta = {
  'Web Development': { color: 'cyan', icon: '⬡', accent: 'text-cyan-400', dot: 'bg-cyan-400', border: 'hover:border-cyan-400/60', glow: 'group-hover:shadow-cyan-500/10' },
  'Data Science': { color: 'amber', icon: '◎', accent: 'text-amber-400', dot: 'bg-amber-400', border: 'hover:border-amber-400/60', glow: 'group-hover:shadow-amber-500/10' },
  'Data Cleaning & Multipurpose Insights': { color: 'emerald', icon: '◈', accent: 'text-emerald-400', dot: 'bg-emerald-400', border: 'hover:border-emerald-400/60', glow: 'group-hover:shadow-emerald-500/10' },
  'Machine Learning': { color: 'violet', icon: '⬧', accent: 'text-violet-400', dot: 'bg-violet-400', border: 'hover:border-violet-400/60', glow: 'group-hover:shadow-violet-500/10' },
  'Forecasting ML': { color: 'rose', icon: '◇', accent: 'text-rose-400', dot: 'bg-rose-400', border: 'hover:border-rose-400/60', glow: 'group-hover:shadow-rose-500/10' },
}

const projectDataByLanguage = {
  id: [
    {
      category: 'Web Development',
      description: 'Aplikasi web modern dengan fokus pada UX yang bersih dan integrasi API yang rapi.',
      items: [
        { title: 'Smart Internship Portal', description: 'Platform manajemen magang untuk kampus dengan dashboard mahasiswa, dosen, dan mitra industri.', techStack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'JWT'], features: ['Role-based access control', 'Monitoring progres magang real-time', 'Laporan otomatis dalam format PDF/Excel'], demoUrl: '#', githubUrl: 'https://github.com/salman-portfolio/smart-internship-portal' },
        { title: 'Campus Activity Management', description: 'Aplikasi untuk mengelola event kampus, registrasi peserta, dan feedback digital.', techStack: ['React', 'TypeScript', 'REST API', 'Tailwind CSS'], features: ['Dashboard panitia dan peserta terpisah', 'QR-based attendance', 'Export data ke format laporan'], demoUrl: '#', githubUrl: 'https://github.com/salman-portfolio/campus-activity-management' },
      ],
    },
    {
      category: 'Data Science',
      description: 'Eksplorasi data, visualisasi, dan pemodelan untuk menjawab pertanyaan bisnis yang spesifik.',
      items: [
        { title: 'Customer Churn Analytics', description: 'Analisis data pelanggan untuk memprediksi risiko churn dan segmentasi behavior.', techStack: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Seaborn'], features: ['EDA terstruktur dengan notebook yang rapi', 'Feature engineering berbasis domain', 'Dashboard insight utama untuk tim bisnis'], demoUrl: '#', githubUrl: 'https://github.com/salman-portfolio/customer-churn-analytics' },
        { title: 'Student Performance Insights', description: 'Analisis faktor-faktor yang memengaruhi performa akademik mahasiswa di kampus.', techStack: ['Python', 'Pandas', 'Seaborn', 'Plotly'], features: ['Visualisasi interaktif faktor utama', 'Analisis korelasi multi-variabel', 'Rekomendasi actionable untuk pengelola program studi'], demoUrl: '#', githubUrl: 'https://github.com/salman-portfolio/student-performance-insights' },
      ],
    },
    {
      category: 'Data Cleaning & Multipurpose Insights',
      description: 'Proses pembersihan data transaksi dan pembuatan insight multipurpose yang bisa dipakai ulang.',
      items: [
        { id: 'cafe-data-cleaning', title: 'Cafe Sales Data Cleaning & Insights', description: 'Project end-to-end untuk membersihkan data penjualan cafe yang berantakan, memvalidasi angka, dan menghasilkan insight bisnis.', techStack: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'], features: ['Standardisasi nilai invalid dan perbaikan tipe data', 'Rekalkulasi Total Spent berbasis rule konsisten', 'Visualisasi revenue, transaksi, AOV, dan tren item'], demoUrl: 'cafe_dashboard.html', githubUrl: 'https://github.com/salputh', hasDetail: true },
      ],
    },
    {
      category: 'Forecasting ML',
      description: 'Model forecasting time series untuk kebutuhan perencanaan kapasitas dan pengambilan keputusan.',
      items: [
        { title: 'Energy Consumption Forecasting', description: 'Model forecasting konsumsi listrik harian untuk kampus guna optimasi penggunaan energi.', techStack: ['Python', 'Pandas', 'Prophet', 'Plotly'], features: ['Handling pola musiman dan hari libur', 'Visualisasi forecast vs aktual', 'Scenario analysis untuk pengambil keputusan'], demoUrl: '#', githubUrl: 'https://github.com/salman-portfolio/energy-consumption-forecasting' },
        { title: 'Student Admissions Forecast', description: 'Perkiraan jumlah pendaftar mahasiswa baru per program studi untuk beberapa periode ke depan.', techStack: ['Python', 'Statsmodels', 'ARIMA', 'Seaborn'], features: ['Evaluasi beberapa model forecasting', 'Perbandingan error metric', 'Laporan insight dalam bentuk notebook dan slide'], demoUrl: '#', githubUrl: 'https://github.com/salman-portfolio/student-admissions-forecast' },
      ],
    },
  ],
  en: [
    {
      category: 'Web Development',
      description: 'Modern web applications with clean UX and well-structured API integrations.',
      items: [
        { title: 'Smart Internship Portal', description: 'Internship management platform for universities with dashboards for students, lecturers, and industry partners.', techStack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'JWT'], features: ['Role-based access control', 'Real-time internship progress monitoring', 'Automatic report generation in PDF/Excel format'], demoUrl: '#', githubUrl: 'https://github.com/salman-portfolio/smart-internship-portal' },
        { title: 'Campus Activity Management', description: 'Application to manage campus events, participant registration, and digital feedback.', techStack: ['React', 'TypeScript', 'REST API', 'Tailwind CSS'], features: ['Separate dashboards for organizers and participants', 'QR-based attendance', 'Data export to report-ready formats'], demoUrl: '#', githubUrl: 'https://github.com/salman-portfolio/campus-activity-management' },
      ],
    },
    {
      category: 'Data Science',
      description: 'Data exploration, visualization, and modeling to answer specific business questions.',
      items: [
        { title: 'Customer Churn Analytics', description: 'Customer data analysis to predict churn risk and segment behavior.', techStack: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Seaborn'], features: ['Structured EDA with clean notebooks', 'Domain-driven feature engineering', 'Key insights dashboard for business teams'], demoUrl: '#', githubUrl: 'https://github.com/salman-portfolio/customer-churn-analytics' },
        { title: 'Student Performance Insights', description: "Analysis of factors that influence students' academic performance on campus.", techStack: ['Python', 'Pandas', 'Seaborn', 'Plotly'], features: ['Interactive visualization of main factors', 'Multi-variable correlation analysis', 'Actionable recommendations for program managers'], demoUrl: '#', githubUrl: 'https://github.com/salman-portfolio/student-performance-insights' },
      ],
    },
    {
      category: 'Data Cleaning & Multipurpose Insights',
      description: 'Cleaning noisy transaction data and creating multipurpose insights that can be reused.',
      items: [
        { id: 'cafe-data-cleaning', title: 'Cafe Sales Data Cleaning & Insights', description: 'End-to-end project to clean messy cafe sales data, validate numbers, and deliver business insights.', techStack: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'], features: ['Standardizing invalid values and fixing numeric types', 'Recalculating Total Spent with consistent rules', 'Visualizations for revenue, transactions, AOV, and item trends'], demoUrl: 'cafe_dashboard.html', githubUrl: 'https://github.com/salputh', hasDetail: true },
      ],
    },
    {
      category: 'Forecasting ML',
      description: 'Time series forecasting models for capacity planning and decision-making.',
      items: [
        { title: 'FCR Daily Forecasting - Broiler Poultry', description: 'Daily electricity consumption forecasting model for campus energy optimization.', techStack: ['Python', 'Pandas', 'Prophet', 'Plotly'], features: ['Handling seasonality and holidays', 'Visualization of forecast vs. actuals', 'Scenario analysis for decision makers'], demoUrl: '#', githubUrl: 'https://github.com/salman-portfolio/energy-consumption-forecasting' },
        { title: 'Student Admissions Forecast', description: 'Forecasting number of new student applicants per program for upcoming intakes.', techStack: ['Python', 'Statsmodels', 'ARIMA', 'Seaborn'], features: ['Evaluating multiple forecasting models', 'Comparing error metrics', 'Insight reports delivered as notebooks and slides'], demoUrl: '#', githubUrl: 'https://github.com/salman-portfolio/student-admissions-forecast' },
      ],
    },
  ],
}

function GithubIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.338c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}

function ProjectCard({ project, isDark, language, onViewCafeDetail, meta }) {
  const [expanded, setExpanded] = useState(false)

  const cardBg = isDark ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white border-slate-200'
  const titleColor = isDark ? 'text-slate-50' : 'text-slate-900'
  const bodyColor = isDark ? 'text-slate-400' : 'text-slate-500'
  const techBg = isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-100 text-slate-600'
  const featureBg = isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-slate-50 border-slate-200'
  const btnGhost = isDark
    ? 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'
    : 'border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-700'

  return (
    <Motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border shadow-lg transition-all duration-300 ${cardBg} ${meta.border} ${meta.glow} hover:shadow-xl`}
    >
      {/* Top accent line */}
      <div className={`h-[2px] w-full bg-gradient-to-r from-transparent ${meta.color === 'cyan' ? 'via-cyan-400' :
        meta.color === 'amber' ? 'via-amber-400' :
          meta.color === 'emerald' ? 'via-emerald-400' :
            meta.color === 'violet' ? 'via-violet-400' : 'via-rose-400'
        } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="flex flex-1 flex-col gap-4 p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className={`text-sm font-bold leading-snug sm:text-base ${titleColor}`}>
                {project.title}
              </h4>
              {project.hasDetail && (
                <span className={`inline-flex rounded-md px-1.5 py-0.5 text-[0.55rem] font-bold uppercase tracking-wider ${isDark ? 'bg-emerald-400/15 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
                  Case Study
                </span>
              )}
            </div>
            <p className={`mt-1 text-xs leading-relaxed sm:text-sm ${bodyColor}`}>
              {project.description}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-xs transition-all duration-200 ${btnGhost}`}
            title={expanded ? 'Collapse' : 'Show features'}
          >
            <Motion.span animate={{ rotate: expanded ? 45 : 0 }} transition={{ duration: 0.2 }} className="font-bold leading-none">
              +
            </Motion.span>
          </button>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span key={tech} className={`rounded-md px-2 py-0.5 text-[0.65rem] font-medium ${techBg}`}>{tech}</span>
          ))}
        </div>

        {/* Expandable features */}
        <AnimatePresence initial={false}>
          {expanded && (
            <Motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <ul className={`rounded-xl border p-3 space-y-2 ${featureBg}`}>
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs">
                    <span className={`mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full ${meta.dot}`} />
                    <span className={bodyColor}>{f}</span>
                  </li>
                ))}
              </ul>
            </Motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">

          {/* ── View Case Study — only for hasDetail projects ── */}
          {project.hasDetail && onViewCafeDetail && (
            <Motion.button
              type="button"
              onClick={onViewCafeDetail}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 rounded-full bg-emerald-400 px-3 py-1.5 text-xs font-bold text-slate-950 shadow-sm shadow-emerald-500/20 transition-all hover:bg-emerald-300"
            >
              {language === 'en' ? 'View Case Study' : 'Lihat Case Study'}
              <ArrowRightIcon />
            </Motion.button>
          )}

          {/* Demo button */}
          {project.demoUrl && project.demoUrl !== '#' && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${meta.accent} ${isDark ? 'border-current/30 hover:bg-white/5' : 'border-current/30 hover:bg-black/5'}`}
            >
              Demo <ExternalLinkIcon />
            </a>
          )}

          {/* GitHub button */}
          <a
            href={project.githubUrl !== '#' ? project.githubUrl : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={`ml-auto flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${project.githubUrl === '#'
              ? isDark ? 'border-slate-800 text-slate-600 cursor-not-allowed' : 'border-slate-200 text-slate-300 cursor-not-allowed'
              : btnGhost
              }`}
          >
            <GithubIcon /> GitHub
          </a>
        </div>
      </div>
    </Motion.article>
  )
}

function Projects({ isDark, language, onViewCafeDetail }) {
  const projectData = projectDataByLanguage[language] || projectDataByLanguage.id

  const sectionBg = isDark ? 'bg-slate-950' : 'bg-slate-50'
  const titleColor = isDark ? 'text-white' : 'text-slate-900'
  const bodyColor = isDark ? 'text-slate-400' : 'text-slate-500'
  const dividerColor = isDark ? 'border-slate-800' : 'border-slate-200'
  const categoryTitleColor = isDark ? 'text-slate-200' : 'text-slate-700'
  const categoryDescColor = isDark ? 'text-slate-500' : 'text-slate-400'

  return (
    <section className={`relative border-t ${isDark ? 'border-slate-800' : 'border-slate-200'} ${sectionBg}`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#fff' : '#000'} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
            {language === 'en' ? 'Selected Work' : 'Karya Pilihan'}
          </p>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className={`text-3xl font-black tracking-tight sm:text-4xl ${titleColor}`}>
              {language === 'en' ? (<>Projects that<br /><span className="text-cyan-400">ship & scale</span></>) : (<>Project yang<br /><span className="text-cyan-400">siap produksi</span></>)}
            </h2>
            <p className={`max-w-md text-sm leading-relaxed sm:text-base ${bodyColor}`}>
              {language === 'en'
                ? 'From web apps to ML pipelines — built end-to-end with real data and clean architecture.'
                : 'Dari web app hingga pipeline ML — dibangun end-to-end dengan data nyata dan arsitektur yang bersih.'}
            </p>
          </div>
        </Motion.div>

        <div className="space-y-16">
          {projectData.map((group, groupIndex) => {
            const meta = categoryMeta[group.category] || categoryMeta['Web Development']
            return (
              <Motion.div
                key={group.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: groupIndex * 0.05, duration: 0.5 }}
              >
                <div className={`mb-6 flex items-center gap-4 pb-4 border-b ${dividerColor}`}>
                  <span className={`text-xl ${meta.accent}`}>{meta.icon}</span>
                  <div className="flex-1">
                    <h3 className={`text-sm font-bold sm:text-base ${categoryTitleColor}`}>{group.category}</h3>
                    <p className={`text-xs ${categoryDescColor}`}>{group.description}</p>
                  </div>
                  <span className={`text-xs font-bold tabular-nums ${meta.accent}`}>
                    {group.items.length.toString().padStart(2, '0')}
                  </span>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {group.items.map((project) => (
                    <ProjectCard
                      key={project.title}
                      project={project}
                      isDark={isDark}
                      language={language}
                      meta={meta}
                      onViewCafeDetail={project.hasDetail ? onViewCafeDetail : undefined}
                    />
                  ))}
                </div>
              </Motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Projects