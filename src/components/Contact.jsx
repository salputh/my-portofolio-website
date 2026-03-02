import { useState } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'

function EmailIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.338c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}

const contactLinks = [
  {
    icon: EmailIcon,
    label: 'Email',
    value: 'salmanalfarisirizwana@gmail.com',
    href: 'mailto:salmanalfarisirizwana@gmail.com',
    short: 'salmanalfarisirizwana@gmail.com',
  },
  {
    icon: LinkedInIcon,
    label: 'LinkedIn',
    value: 'linkedin.com/in/salman-alfarisi-rizwana',
    href: 'https://www.linkedin.com/in/salman-alfarisi-rizwana',
    short: '/in/salman-alfarisi-rizwana',
  },
  {
    icon: GithubIcon,
    label: 'GitHub',
    value: 'github.com/salman-alfarisi-rizwana',
    href: 'https://github.com/salman-alfarisi-rizwana',
    short: '/salman-alfarisi-rizwana',
  },
]

function Contact({ isDark, language }) {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormState((v) => ({ ...v, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const sectionBg = isDark ? 'bg-slate-950' : 'bg-slate-50'
  const titleColor = isDark ? 'text-white' : 'text-slate-900'
  const bodyColor = isDark ? 'text-slate-400' : 'text-slate-500'
  const cardBg = isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
  const inputBg = isDark
    ? 'bg-slate-800/80 border-slate-700 text-slate-100 placeholder:text-slate-600 focus:border-cyan-400 focus:bg-slate-800'
    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white'
  const labelColor = isDark ? 'text-slate-300' : 'text-slate-700'
  const divider = isDark ? 'border-slate-800' : 'border-slate-200'
  const footerText = isDark ? 'text-slate-600' : 'text-slate-400'
  const linkHover = isDark ? 'hover:text-cyan-400 hover:border-cyan-400/40' : 'hover:text-cyan-600 hover:border-cyan-400/40'

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
      {/* Ambient glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 lg:px-8">

        {/* ── Header ── */}
        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
            {language === 'en' ? 'Get in Touch' : 'Hubungi Saya'}
          </p>
          <h2 className={`text-3xl font-black tracking-tight sm:text-4xl ${titleColor}`}>
            {language === 'en' ? (
              <>Let's build<br /><span className="text-cyan-400">something together</span></>
            ) : (
              <>Mari<br /><span className="text-cyan-400">berkolaborasi</span></>
            )}
          </h2>
          <p className={`mx-auto mt-4 max-w-lg text-sm leading-relaxed sm:text-base ${bodyColor}`}>
            {language === 'en'
              ? 'Open to internship opportunities, entry-level roles, and project collaborations. Let\'s talk.'
              : 'Terbuka untuk internship, posisi entry-level, dan kolaborasi project. Yuk ngobrol.'}
          </p>
        </Motion.div>

        {/* ── Two column layout ── */}
        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-start">

          {/* Left — contact links + availability badge */}
          <Motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Availability pill */}
            <div className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-xs font-semibold ${isDark ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' : 'border-emerald-500/30 bg-emerald-50 text-emerald-600'}`}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {language === 'en' ? 'Available for opportunities' : 'Tersedia untuk peluang baru'}
            </div>

            {/* Contact cards */}
            <div className="space-y-3">
              {contactLinks.map((link, i) => (
                <Motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  whileHover={{ x: 4 }}
                  className={`group flex items-center gap-4 rounded-2xl border p-4 transition-all duration-200 ${cardBg} ${linkHover} hover:shadow-lg ${isDark ? 'hover:shadow-black/30' : 'hover:shadow-slate-200'}`}
                >
                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border transition-colors ${isDark ? 'border-slate-700 bg-slate-800 text-slate-400 group-hover:border-cyan-400/50 group-hover:text-cyan-400' : 'border-slate-200 bg-slate-50 text-slate-500 group-hover:border-cyan-400/50 group-hover:text-cyan-500'}`}>
                    <link.icon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[0.65rem] font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                      {link.label}
                    </p>
                    <p className={`truncate text-xs font-medium sm:text-sm ${isDark ? 'text-slate-200 group-hover:text-cyan-400' : 'text-slate-700 group-hover:text-cyan-600'} transition-colors`}>
                      {link.short}
                    </p>
                  </div>
                  <ArrowIcon />
                </Motion.a>
              ))}
            </div>

            {/* CV download */}
            <Motion.a
              href="/Salman-Alfarisi-Rizwana-CV.pdf"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -2 }}
              className={`flex items-center justify-between rounded-2xl border p-4 transition-all duration-200 ${isDark ? 'border-slate-700 bg-slate-800/60 hover:border-cyan-400/40' : 'border-slate-200 bg-slate-100 hover:border-cyan-400/40'}`}
            >
              <div>
                <p className={`text-xs font-bold ${titleColor}`}>
                  {language === 'en' ? 'Download CV' : 'Unduh CV'}
                </p>
                <p className={`text-[0.65rem] ${bodyColor}`}>PDF · {language === 'en' ? 'Updated 2025' : 'Diperbarui 2025'}</p>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400 text-slate-950">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
            </Motion.a>
          </Motion.div>

          {/* Right — contact form */}
          <Motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className={`rounded-2xl border p-6 shadow-xl ${cardBg} ${isDark ? 'shadow-black/30' : 'shadow-slate-200'}`}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <Motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h3 className={`mb-1 text-sm font-bold ${titleColor}`}>
                    {language === 'en' ? 'Send a message' : 'Kirim pesan'}
                  </h3>
                  <p className={`mb-5 text-xs ${bodyColor}`}>
                    {language === 'en'
                      ? "I'll get back to you as soon as possible."
                      : 'Saya akan membalas secepatnya.'}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label htmlFor="name" className={`block text-xs font-semibold ${labelColor}`}>
                          {language === 'en' ? 'Name' : 'Nama'}
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formState.name}
                          onChange={handleChange}
                          className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-cyan-400/20 ${inputBg}`}
                          placeholder={language === 'en' ? 'Your name' : 'Nama kamu'}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="email" className={`block text-xs font-semibold ${labelColor}`}>
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-cyan-400/20 ${inputBg}`}
                          placeholder="email@company.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="message" className={`block text-xs font-semibold ${labelColor}`}>
                        {language === 'en' ? 'Message' : 'Pesan'}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formState.message}
                        onChange={handleChange}
                        className={`w-full resize-none rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-cyan-400/20 ${inputBg}`}
                        placeholder={
                          language === 'en'
                            ? 'Tell me about the opportunity or project...'
                            : 'Ceritakan peluang atau project yang ada...'
                        }
                      />
                    </div>

                    <Motion.button
                      type="submit"
                      whileHover={{ y: -2, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/25 transition-all hover:bg-cyan-300"
                    >
                      {language === 'en' ? 'Send Message' : 'Kirim Pesan'}
                      <ArrowIcon />
                    </Motion.button>
                  </form>
                </Motion.div>
              ) : (
                <Motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                  className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/15 text-3xl">
                    ✓
                  </div>
                  <div>
                    <p className={`text-lg font-black ${titleColor}`}>
                      {language === 'en' ? 'Message received!' : 'Pesan terkirim!'}
                    </p>
                    <p className={`mt-1 text-sm ${bodyColor}`}>
                      {language === 'en'
                        ? "Thanks for reaching out — I'll get back to you soon."
                        : 'Terima kasih sudah menghubungi — saya akan segera membalas.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setSubmitted(false); setFormState({ name: '', email: '', message: '' }) }}
                    className={`text-xs font-semibold text-cyan-400 hover:underline`}
                  >
                    {language === 'en' ? 'Send another message' : 'Kirim pesan lain'}
                  </button>
                </Motion.div>
              )}
            </AnimatePresence>
          </Motion.div>
        </div>

        {/* ── Footer ── */}
        <Motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className={`mt-16 flex flex-col items-center gap-2 border-t pt-8 text-center ${divider}`}
        >
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-cyan-400 to-blue-500 text-[0.6rem] font-black text-slate-950">
              SR
            </div>
            <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Salman Alfarisi Rizwana
            </span>
          </div>
          <p className={`text-[0.65rem] ${footerText}`}>
            © {new Date().getFullYear()} · {language === 'en' ? 'Built with' : 'Dibangun dengan'} React, Tailwind CSS & Framer Motion
          </p>
        </Motion.div>
      </div>
    </section>
  )
}

export default Contact