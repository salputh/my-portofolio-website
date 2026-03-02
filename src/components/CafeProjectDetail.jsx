import { motion as Motion, AnimatePresence } from 'framer-motion'
import { FaPython } from 'react-icons/fa'

// ── Raw data sample (dirty) ───────────────────────────────────────────────────
const rawSample = [
    { id: 'TXN_4271903', item: 'Cookie', qty: '4', price: '1.0', total: 'ERROR', payment: 'Credit Card', location: 'In-store', date: '2023-07-19' },
    { id: 'TXN_7034554', item: 'Salad', qty: '2', price: '5.0', total: '10.0', payment: 'UNKNOWN', location: 'UNKNOWN', date: '2023-04-27' },
    { id: 'TXN_4433211', item: 'UNKNOWN', qty: '3', price: '3.0', total: '9.0', payment: 'ERROR', location: 'Takeaway', date: '2023-10-06' },
    { id: 'TXN_4717867', item: '', qty: '5', price: '3.0', total: '15.0', payment: '', location: 'Takeaway', date: '2023-07-28' },
    { id: 'TXN_3522028', item: 'Smoothie', qty: 'ERROR', price: '4.0', total: '20.0', payment: 'Cash', location: 'In-store', date: '2023-04-04' },
    { id: 'TXN_8876618', item: 'Cake', qty: '5', price: '3.0', total: '15.0', payment: 'Cash', location: 'ERROR', date: '2023-03-25' },
    { id: 'TXN_3051279', item: 'Sandwich', qty: '2', price: '4.0', total: '8.0', payment: 'Credit Card', location: 'Takeaway', date: 'ERROR' },
]

// ── Clean data sample ─────────────────────────────────────────────────────────
const cleanSample = [
    { id: 'TXN_4271903', item: 'Cookie', qty: '4', price: '1', total: '4', payment: 'Credit Card', location: 'In-store', date: '19/07/23' },
    { id: 'TXN_7034554', item: 'Salad', qty: '2', price: '5', total: '10', payment: 'Digital Wallet', location: 'Takeaway', date: '27/04/23' },
    { id: 'TXN_2064365', item: 'Sandwich', qty: '5', price: '4', total: '20', payment: 'Digital Wallet', location: 'In-store', date: '31/12/23' },
    { id: 'TXN_2548360', item: 'Salad', qty: '5', price: '5', total: '25', payment: 'Cash', location: 'Takeaway', date: '07/11/23' },
    { id: 'TXN_3522028', item: 'Smoothie', qty: '5', price: '4', total: '20', payment: 'Cash', location: 'In-store', date: '04/04/23' },
    { id: 'TXN_8876618', item: 'Cake', qty: '5', price: '3', total: '15', payment: 'Cash', location: 'Takeaway', date: '25/03/23' },
    { id: 'TXN_5132361', item: 'Sandwich', qty: '3', price: '4', total: '12', payment: 'Digital Wallet', location: 'Takeaway', date: '01/12/23' },
]

// ── Dashboard URL (file lives in /public/cafe_dashboard.html) ────────────────
const DASHBOARD_URL = './cafe_dashboard.html'

// ── Stats ─────────────────────────────────────────────────────────────────────
const statsEn = [
    { value: '8,593', label: 'Net Transactions', sub: 'After cleaning' },
    { value: '$76,831', label: 'Total Revenue', sub: 'FY 2023' },
    { value: '$8.94', label: 'Avg. Order Value', sub: 'Per transaction' },
    { value: 'Salad', label: 'Best-Selling Item', sub: '$16,575 revenue' },
]

const statsId = [
    { value: '8,593', label: 'Total Transaksi', sub: 'Setelah cleaning' },
    { value: '$76,831', label: 'Total Pendapatan', sub: 'FY 2023' },
    { value: '$8.94', label: 'Rata-rata Order', sub: 'Per transaksi' },
    { value: 'Salad', label: 'Item Terlaris', sub: '$16,575 revenue' },
]

// ── Cleaning steps ────────────────────────────────────────────────────────────
const cleaningStepsEn = [
    { step: '01', title: 'Identify Dirty Values', desc: 'Scanned all columns for ERROR, UNKNOWN, empty strings, and type mismatches across 8 fields.' },
    { step: '02', title: 'Standardize & Impute', desc: 'Replaced invalid payment/location values with modal imputation. Recalculated Total Spent from Qty × Price.' },
    { step: '03', title: 'Drop Critical Nulls', desc: 'Removed rows where Item, Transaction ID, or Date were unrecoverable — preserving data integrity.' },
    { step: '04', title: 'Reformat & Validate', desc: 'Normalized date format to DD/MM/YY, cast numeric columns, and ran final validation checks.' },
]

const cleaningStepsId = [
    { step: '01', title: 'Identifikasi Data Kotor', desc: 'Memindai semua kolom untuk nilai ERROR, UNKNOWN, string kosong, dan ketidakcocokan tipe data di 8 field.' },
    { step: '02', title: 'Standardisasi & Imputasi', desc: 'Mengganti nilai payment/location tidak valid dengan imputasi modus. Menghitung ulang Total Spent dari Qty × Price.' },
    { step: '03', title: 'Hapus Null Kritis', desc: 'Menghapus baris di mana Item, Transaction ID, atau Date tidak dapat dipulihkan — menjaga integritas data.' },
    { step: '04', title: 'Reformat & Validasi', desc: 'Menormalisasi format tanggal ke DD/MM/YY, mengubah kolom numerik, dan menjalankan validasi akhir.' },
]

// ── Helpers ───────────────────────────────────────────────────────────────────
function isDirtyCell(val) {
    return val === '' || val === 'ERROR' || val === 'UNKNOWN'
}

function GithubIcon() {
    return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.338c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
        </svg>
    )
}

function BackIcon() {
    return (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
    )
}

// ── Main Component ────────────────────────────────────────────────────────────
function CafeProjectDetail({ isDark, language, onBack }) {

    const bg = isDark ? 'bg-slate-950' : 'bg-slate-50'
    const cardBg = isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
    const titleColor = isDark ? 'text-white' : 'text-slate-900'
    const bodyColor = isDark ? 'text-slate-400' : 'text-slate-500'
    const divider = isDark ? 'border-slate-800' : 'border-slate-200'
    const tableHead = isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-100 text-slate-600'
    const tableRow = isDark ? 'border-slate-800 text-slate-300 odd:bg-slate-900/40' : 'border-slate-100 text-slate-700 odd:bg-slate-50/80'
    const stepBg = isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'

    const stats = language === 'en' ? statsEn : statsId
    const cleaningSteps = language === 'en' ? cleaningStepsEn : cleaningStepsId
    const tableHeaders = language === 'en'
        ? ['Transaction ID', 'Item', 'Qty', 'Price', 'Total', 'Payment', 'Location', 'Date']
        : ['ID Transaksi', 'Item', 'Qty', 'Harga', 'Total', 'Pembayaran', 'Lokasi', 'Tanggal']

    return (
        <div className={`relative min-h-screen ${bg}`}>

            {/* Grid bg */}
            <div
                className="pointer-events-none fixed inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#fff' : '#000'} 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="relative mx-auto max-w-7xl px-4 py-12 lg:px-8">

                {/* ── Back button ── */}
                <Motion.button
                    type="button"
                    onClick={onBack}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ x: -3 }}
                    className={`mb-10 flex items-center gap-2 text-xs font-semibold transition-colors cursor-pointer ${isDark ? 'text-slate-500 hover:text-cyan-400' : 'text-slate-400 hover:text-cyan-600'}`}
                >
                    <BackIcon />
                    {language === 'en' ? 'Back to Projects' : 'Kembali ke Proyek'}
                </Motion.button>

                {/* ── Hero header ── */}
                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-14"
                >
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-emerald-400/15 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-emerald-400">
                            {language === 'en' ? 'Data Cleaning' : 'Data Cleaning'}
                        </span>
                        <span className="rounded-md bg-cyan-400/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-cyan-400">
                            {language === 'en' ? 'Visualization' : 'Visualisasi'}
                        </span>
                        <span className={`text-[0.65rem] ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>· Python · Pandas · Matplotlib · Seaborn</span>
                    </div>

                    <h1 className={`text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl ${titleColor}`}>
                        {language === 'en' ? 'Café Sales' : 'Penjualan Kafe'}<br />
                        <span className="text-emerald-400">Data Cleaning</span>{' '}
                        <span className={titleColor}>{language === 'en' ? '& Insights' : '& Insight'}</span>
                    </h1>

                    <p className={`mt-4 max-w-2xl text-sm leading-relaxed sm:text-base ${bodyColor}`}>
                        {language === 'en'
                            ? 'End-to-end pipeline that takes a messy real-world transaction CSV, cleans it using rule-based imputation and validation, then produces a fully interactive analytics dashboard revealing $76K in annual revenue insights.'
                            : 'Pipeline end-to-end yang mengambil CSV transaksi berantakan, membersihkannya dengan imputasi berbasis rule dan validasi, lalu menghasilkan dashboard analitik interaktif yang mengungkap insight revenue $76K tahunan.'}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <a
                            href={DASHBOARD_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-300"
                        >
                            {language === 'en' ? 'View Dashboard' : 'Lihat Dashboard'}
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                        <a
                            href="https://github.com/salputh"
                            className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold transition ${isDark ? 'border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white' : 'border-slate-300 text-slate-600 hover:border-slate-500 hover:text-slate-900'}`}
                        >
                            <GithubIcon />
                            GitHub
                        </a>
                    </div>
                </Motion.div>

                {/* ── Stats row ── */}
                <Motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className={`mb-14 grid grid-cols-2 divide-x divide-y rounded-2xl border overflow-hidden sm:grid-cols-4 sm:divide-y-0 ${divider} ${isDark ? 'bg-slate-900/40 divide-slate-800' : 'bg-white divide-slate-100'}`}
                >
                    {stats.map((s, i) => (
                        <div key={i} className="flex flex-col items-center py-6 px-4 text-center">
                            <span className={`text-xl font-black sm:text-2xl ${i === 3 ? 'text-emerald-400' : 'text-emerald-400'}`}>{s.value}</span>
                            <span className={`mt-0.5 text-xs font-bold ${titleColor}`}>{s.label}</span>
                            <span className={`text-[0.6rem] ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>{s.sub}</span>
                        </div>
                    ))}
                </Motion.div>

                {/* ── Section: The Problem ── */}
                <Motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-14"
                >
                    <div className={`mb-5 flex items-center gap-3 pb-3 border-b ${divider}`}>
                        <span className="text-lg text-rose-400">⚠</span>
                        <h2 className={`text-base font-black sm:text-lg ${titleColor}`}>
                            {language === 'en' ? 'The Problem: Dirty Raw Data' : 'Masalah: Data Mentah yang Kotor'}
                        </h2>
                    </div>
                    <p className={`mb-4 text-xs sm:text-sm ${bodyColor}`}>
                        {language === 'en'
                            ? 'The source CSV contained ERROR values, UNKNOWN placeholders, empty fields, miscalculated totals, and inconsistent date formats — making it unusable for analysis.'
                            : 'CSV sumber mengandung nilai ERROR, placeholder UNKNOWN, kolom kosong, total yang salah hitung, dan format tanggal tidak konsisten — tidak bisa langsung dianalisis.'}
                    </p>

                    {/* Dirty data table */}
                    <div className={`overflow-x-auto rounded-2xl border ${cardBg}`}>
                        <div className={`flex items-center gap-2 px-4 py-3 border-b text-[0.65rem] font-bold uppercase tracking-widest ${divider} ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                            <span className="h-2 w-2 rounded-full bg-rose-400" />
                            {language === 'en' ? 'Raw data — before cleaning' : 'Data Mentah — Sebelum Pembersihan'}
                        </div>
                        <table className="min-w-full border-collapse text-[0.68rem]">
                            <thead className={tableHead}>
                                <tr>
                                    {tableHeaders.map(h => (
                                        <th key={h} className="px-3 py-2.5 text-left font-semibold whitespace-nowrap">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rawSample.map((row) => (
                                    <tr key={row.id} className={`border-t ${tableRow}`}>
                                        {[row.id, row.item, row.qty, row.price, row.total, row.payment, row.location, row.date].map((val, ci) => (
                                            <td
                                                key={ci}
                                                className={`px-3 py-2 whitespace-nowrap font-mono text-[0.65rem] ${isDirtyCell(val)
                                                    ? 'bg-rose-500/15 text-rose-400 font-bold'
                                                    : ''
                                                    }`}
                                            >
                                                {val === '' ? <span className="italic opacity-40">empty</span> : val}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className={`px-4 py-2.5 flex items-center gap-2 border-t text-[0.65rem] ${divider} ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                            <span className="inline-block h-2 w-3 rounded-sm bg-rose-500/30" />
                            {language === 'en' ? 'Highlighted cells = invalid / missing values' : 'Sel yang disorot = nilai tidak valid / hilang'}
                        </div>
                    </div>
                </Motion.section>

                {/* ── Section: Cleaning Process ── */}
                <Motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-14"
                >
                    <div className={`mb-5 flex items-center gap-3 pb-3 border-b ${divider}`}>
                        <span className="text-lg text-cyan-400">⚙</span>
                        <h2 className={`text-base font-black sm:text-lg ${titleColor}`}>
                            {language === 'en' ? 'Cleaning Pipeline' : 'Pipeline Pembersihan'}
                        </h2>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        {cleaningSteps.map((s, i) => (
                            <Motion.div
                                key={i}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07, duration: 0.4 }}
                                className={`flex gap-4 rounded-2xl border p-4 ${stepBg}`}
                            >
                                <span className="text-2xl font-black text-cyan-400/30 leading-none mt-0.5 flex-shrink-0">{s.step}</span>
                                <div>
                                    <p className={`text-sm font-bold ${titleColor}`}>{s.title}</p>
                                    <p className={`mt-1 text-xs leading-relaxed ${bodyColor}`}>{s.desc}</p>
                                </div>
                            </Motion.div>
                        ))}
                    </div>
                </Motion.section>

                {/* ── Section: Clean Result ── */}
                <Motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-14"
                >
                    <div className={`mb-5 flex items-center gap-3 pb-3 border-b ${divider}`}>
                        <span className="text-lg text-emerald-400">✓</span>
                        <h2 className={`text-base font-black sm:text-lg ${titleColor}`}>
                            {language === 'en' ? 'The Result: Clean Dataset' : 'Hasil: Dataset Bersih'}
                        </h2>
                    </div>
                    <p className={`mb-4 text-xs sm:text-sm ${bodyColor}`}>
                        {language === 'en'
                            ? 'After cleaning: all invalid values resolved, totals recalculated, dates standardized, and dataset ready for analysis.'
                            : 'Setelah cleaning: semua nilai invalid diselesaikan, total dihitung ulang, tanggal diseragamkan, dan dataset siap dianalisis.'}
                    </p>

                    <div className={`overflow-x-auto rounded-2xl border ${cardBg}`}>
                        <div className={`flex items-center gap-2 px-4 py-3 border-b text-[0.65rem] font-bold uppercase tracking-widest ${divider} ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            {language === 'en' ? 'Clean data — ready for analysis' : 'Data bersih — siap dianalisis'}
                        </div>
                        <table className="min-w-full border-collapse text-[0.68rem]">
                            <thead className={tableHead}>
                                <tr>
                                    {tableHeaders.map(h => (
                                        <th key={h} className="px-3 py-2.5 text-left font-semibold whitespace-nowrap">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {cleanSample.map((row) => (
                                    <tr key={row.id} className={`border-t ${tableRow}`}>
                                        {[row.id, row.item, row.qty, row.price, row.total, row.payment, row.location, row.date].map((val, ci) => (
                                            <td key={ci} className="px-3 py-2 whitespace-nowrap font-mono text-[0.65rem]">{val}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Motion.section>

                {/* ── Section: Dashboard ── */}
                <Motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-14"
                >
                    <div className={`mb-3 flex items-center justify-between pb-3 border-b ${divider}`}>
                        <div className="flex items-center gap-3">
                            <span className="text-lg text-amber-400">◎</span>
                            <h2 className={`text-base font-black sm:text-lg ${titleColor}`}>
                                {language === 'en' ? 'Analytics Dashboard' : 'Dashboard Analitik'}
                            </h2>
                        </div>
                        {/* Open in new tab */}
                        <a
                            href={DASHBOARD_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${isDark ? 'border-slate-700 text-slate-400 hover:border-amber-400/50 hover:text-amber-400' : 'border-slate-200 text-slate-500 hover:border-amber-400/50 hover:text-amber-600'}`}
                        >
                            {language === 'en' ? 'Open fullscreen' : 'Buka layar penuh'}
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>

                    <p className={`mb-4 text-xs sm:text-sm ${bodyColor}`}>
                        {language === 'en'
                            ? 'Interactive dashboard built from the cleaned dataset — explore sales trends, payment methods, and location breakdown.'
                            : 'Dashboard interaktif yang dibangun dari dataset bersih — eksplorasi tren penjualan, metode pembayaran, dan breakdown lokasi.'}
                    </p>

                    {/* iframe embed */}
                    <Motion.div
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className={`overflow-hidden rounded-2xl border shadow-xl ${cardBg} ${isDark ? 'shadow-black/40' : 'shadow-slate-200'}`}
                    >
                        {/* Browser chrome bar */}
                        <div className={`flex items-center gap-2 px-4 py-3 border-b ${divider} ${isDark ? 'bg-slate-800/60' : 'bg-slate-50'}`}>
                            <div className="flex gap-1.5">
                                <span className="h-3 w-3 rounded-full bg-rose-400/70" />
                                <span className="h-3 w-3 rounded-full bg-amber-400/70" />
                                <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
                            </div>
                            <div className={`flex-1 rounded-md px-3 py-1 text-center text-[0.6rem] font-mono ${isDark ? 'bg-slate-900 text-slate-500' : 'bg-white text-slate-400 border border-slate-200'}`}>
                                cafe_dashboard.html
                            </div>
                        </div>

                        <iframe
                            src={DASHBOARD_URL}
                            title="Café Sales Analytics Dashboard"
                            className="w-full"
                            style={{ height: '1000px', border: 'none' }}
                            loading="lazy"
                        />
                    </Motion.div>
                </Motion.section>

                {/* ── Section: Tech Stack ── */}
                <Motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-14"
                >
                    <div className={`mb-5 flex items-center gap-3 pb-3 border-b ${divider}`}>
                        <span className="text-lg text-violet-400">⬧</span>
                        <h2 className={`text-base font-black sm:text-lg ${titleColor}`}>
                            {language === 'en' ? 'Tech Stack' : 'Teknologi'}
                        </h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { name: 'Python 3.14', icon: FaPython, color: 'text-purple-400 bg-purple-400/10 border-purple-400/20' },
                            { name: 'Pandas', color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
                            { name: 'NumPy', color: 'text-blue-300 bg-blue-300/10 border-blue-300/20' },
                            { name: 'Matplotlib', color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20' },
                            { name: 'Seaborn', color: 'text-violet-400 bg-violet-400/10 border-violet-400/20' },
                            { name: 'TRAE', color: 'text-orange-400 bg-orange-400/10 border-orange-400/20' },
                            { name: 'ChartJS', color: 'text-pink-400 bg-pink-400/10 border-pink-400/20' },
                        ].map((t) => (
                            <span key={t.name} className={`rounded-xl border px-3 py-1.5 text-xs font-bold ${t.color}`}>
                                {t.name}
                            </span>
                        ))}
                    </div>
                </Motion.section>

                {/* ── Bottom CTA ── */}
                <Motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`flex flex-col items-center gap-4 rounded-2xl border p-8 text-center ${cardBg}`}
                >
                    <p className={`text-xs font-bold uppercase tracking-widest text-emerald-400`}>
                        {language === 'en' ? 'Full project available' : 'Project lengkap tersedia'}
                    </p>
                    <h3 className={`text-lg font-black ${titleColor}`}>
                        {language === 'en' ? 'See the complete notebook & dashboard' : 'Lihat notebook & dashboard lengkap'}
                    </h3>
                    <div className="flex gap-3">
                        <a
                            href={DASHBOARD_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-emerald-300 transition"
                        >
                            {language === 'en' ? 'Live Dashboard' : 'Dashboard Live'}
                        </a>
                        <a
                            href="#"
                            className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold transition ${isDark ? 'border-slate-700 text-slate-300 hover:border-slate-500' : 'border-slate-200 text-slate-700 hover:border-slate-400'}`}
                        >
                            <GithubIcon />
                            {language === 'en' ? 'Source Code' : 'Kode Sumber'}
                        </a>
                    </div>
                </Motion.div>
            </div>
        </div>
    )
}

export default CafeProjectDetail