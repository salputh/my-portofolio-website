# Portfolio – Salman Alfarisi Rizwana

Website portfolio profesional dan interaktif untuk fresh graduate lulusan Politeknik Negeri Medan (Jurusan Teknologi/IT) dengan fokus pada:

- Web Development
- Data Science
- Machine Learning
- Forecasting / Time Series ML

Website ini ditujukan untuk kebutuhan personal branding dan memudahkan recruiter/HR atau client melihat major projects dan skillset utama.

## Tech Stack

- React + Vite
- Tailwind CSS (v4) melalui PostCSS
- Framer Motion (animasi halus dan profesional)
- JavaScript (ESNext)

## Fitur Utama

- Hero section dengan efek typing pada tagline
- About Me yang profesional dan relevan dengan industri
- Major Projects dengan 4 kategori:
  - Web Development
  - Data Science
  - Machine Learning
  - Forecasting ML
- Setiap project card memiliki:
  - Judul project
  - Deskripsi singkat
  - Tech stack
  - Fitur utama
  - Tombol Demo (dummy)
  - Tombol GitHub (dummy namun realistis)
- Skills section dengan skill bar animasi:
  - Frontend
  - Backend
  - Data & ML
  - Tools
- Contact section:
  - Email
  - LinkedIn (dummy realistis)
  - GitHub (dummy realistis)
  - Contact form (UI-only, tanpa backend)
- Dark mode toggle
- Smooth scroll dan navbar fixed dengan highlight active section
- Desain modern, clean, responsive, dengan card dan soft shadow

## Struktur Folder

Struktur utama project:

```text
my-portfolio/
├─ public/
│  └─ vite.svg
├─ src/
│  ├─ assets/
│  │  └─ react.svg
│  ├─ components/
│  │  ├─ Navbar.jsx
│  │  ├─ Hero.jsx
│  │  ├─ About.jsx
│  │  ├─ Projects.jsx
│  │  ├─ Skills.jsx
│  │  └─ Contact.jsx
│  ├─ App.jsx
│  ├─ main.jsx
│  ├─ index.css
│  └─ App.css (tidak lagi digunakan, bisa dihapus jika ingin)
├─ index.html
├─ package.json
├─ postcss.config.mjs
├─ vite.config.js
└─ README.md
```

Penjelasan singkat:

- `src/App.jsx`  
  Root layout yang menggabungkan semua section dan mengatur:
  - Dark mode state
  - Active section (untuk highlight navbar)
  - Scroll ke setiap section

- `src/components/Navbar.jsx`  
  Navbar fixed dengan:
  - Brand / nama
  - Link ke tiap section
  - Highlight active section
  - Dark mode toggle
  - Mobile menu (hamburger) untuk layar kecil

- `src/components/Hero.jsx`  
  Hero section dengan:
  - Nama besar
  - Tagline dengan efek typing
  - CTA “View Projects” (scroll ke projects)
  - CTA “Download CV” (dummy link)
  - Highlight area fokus: Web, Data Science, ML, Forecasting

- `src/components/About.jsx`  
  About Me profesional (2 paragraf) dengan:
  - Penjelasan singkat profil
  - Cara kerja dan mindset engineering
  - Skill highlights dalam bentuk badge/card

- `src/components/Projects.jsx`  
  Major projects dengan 4 kategori dan project card yang interaktif (hover effect).

- `src/components/Skills.jsx`  
  Skills dibagi menjadi:
  - Frontend
  - Backend
  - Data & ML
  - Tools  
  Dengan animated skill bar menggunakan Framer Motion.

- `src/components/Contact.jsx`  
  Contact info + contact form UI, serta footer singkat.

## Cara Menjalankan Project

Pastikan sudah meng-install Node.js (versi LTS direkomendasikan).

1. Install dependencies:

   ```bash
   npm install
   ```

2. Jalankan development server:

   ```bash
   npm run dev
   ```

3. Buka URL yang muncul di terminal, biasanya:

   ```text
   http://localhost:5173/
   ```

## Build untuk Production

Untuk membuat build production:

```bash
npm run build
```

Hasil build akan muncul di folder `dist/`.

## Linting

Project ini sudah menggunakan ESLint bawaan template Vite React.

Jalankan:

```bash
npm run lint
```

## Konfigurasi Tailwind CSS

Tailwind v4 diintegrasikan melalui PostCSS.

- File konfigurasi PostCSS: `postcss.config.mjs`
- Import Tailwind: `src/index.css`

```css
@import 'tailwindcss';
```

Sebagian besar styling menggunakan class Tailwind langsung di JSX.

## Mengubah Konten Portfolio

Beberapa lokasi penting untuk editing konten:

- Profile & teks utama:
  - `src/components/Hero.jsx`
  - `src/components/About.jsx`

- Daftar project dan detailnya:
  - `src/components/Projects.jsx`

- Skill dan level bar:
  - `src/components/Skills.jsx`

- Contact info:
  - `src/components/Contact.jsx`

## Mengganti Link Download CV

Saat ini, tombol **Download CV** di Hero mengarah ke path:

```text
/Salman-Alfarisi-Rizwana-CV.pdf
```

Untuk membuatnya bekerja:

1. Simpan file CV dalam format PDF dengan nama yang sama.
2. Letakkan file tersebut di folder `public/`.

Setelah itu, tombol **Download CV** akan mengunduh file CV tersebut.

## Catatan Akhir

Layout, copywriting, dan struktur code dibuat agar:

- Terlihat profesional di mata recruiter/HR tech
- Mudah dikembangkan lagi menjadi portfolio pribadi yang sesungguhnya
- Menggambarkan image fresh graduate yang serius ingin masuk industri teknologi, bukan sekadar tugas kuliah.
