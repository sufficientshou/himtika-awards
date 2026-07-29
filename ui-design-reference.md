# 🎨 UI Design System & Panduan Vibe Coding - HIMTIKA Awards

Dokumen ini disusun sebagai **referensi desain UI** dan **panduan prompt (Vibe Coding)** untuk pengembangan antarmuka website **HIMTIKA Awards**. Gunakan dokumen ini sebagai acuan gaya, token warna, komponen, dan *context prompt* saat melakukan coding bersama AI (Vibe Coding).

---

## 1. 📌 Konsep & Tema Design

| Parameter | Spesifikasi |
| :--- | :--- |
| **Tema Utama** | Mengikuti tema existing website HIMTIKA (Modern Academic, Clean, & Tech Community) |
| **Kesan / Impression** | **Formal, Elegan, Premium, & Trustworthy** (Memberikan impresi sebuah gelaran penghargaan akademis & komunitas yang megah) |
| **Target Pengguna** | Mahasiswa Informatika, Dosen, Alumni, dan Tamu Undangan |
| **Layout Style** | Spacious, Responsive Grid, Soft Glassmorphism, Rounded Cards, Clean Margins |

---

## 2. 🎨 Palette Warna (Color System)

Skema warna berbasis **Monochromatic Sage & Evergreen Green** yang dipadukan dengan aksen netral yang bersih.

### 2.1 Ringkasan Kode Warna (Color Tokens)

| Peran Warna | Nama Warna | Hex Code | RGB | Rekomendasi Penggunaan |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Color** | **Hijau Botol / Evergreen** | `#344C3D` | `rgb(52, 76, 61)` | Main brand color, Navbar header, Primary CTA button, Hero title highlight, Footer, High contrast card borders |
| **Secondary Accent** | **Sage Green** | `#8EA58C` | `rgb(142, 165, 140)` | Active navigation link, secondary buttons, tags/badges, icons, hover border states |
| **Supporting Tone** | **Moss Green** | `#738A6E` | `rgb(115, 138, 110)` | Subtitles, muted badges, icon backgrounds, secondary text |
| **Light Accent** | **Mint Green** | `#BFD5C6` | `rgb(191, 213, 198)` | Soft background highlight, pill badges, selected card background overlay |
| **Very Light Accent** | **Sage Hint** | `#EBF2EA` | `rgb(235, 242, 234)` | Light card hover fill, subtle badge fill, search bar focus background |
| **Base Surface / BG** | **White Smoke** | `#F5F5F5` | `rgb(245, 245, 245)` | Background utama halaman web (Body background) |
| **Card Surface** | **Pure White** | `#FFFFFF` | `rgb(255, 255, 255)` | Container card, modal popup, input text background |
| **Border / Divider** | **Silver** | `#C0C0C0` | `rgb(192, 192, 192)` | Line dividers, default card borders, outline buttons |
| **Text Dark** | **Deep Forest Dark** | `#1A261F` | `rgb(26, 38, 31)` | Body text utama, Heading text (High readability) |

---

### 2.2 Ready-to-Use CSS Variables (`:root`)

Tambahkan snippet CSS ini ke file CSS utama Anda (`assets/css/style.css`):

```css
:root {
  /* Brand Colors */
  --color-primary: #344C3D;        /* Hijau Botol / Evergreen */
  --color-secondary: #8EA58C;      /* Sage Green */
  --color-moss: #738A6E;           /* Moss Green */
  --color-mint: #BFD5C6;           /* Mint Green */
  --color-sage-hint: #EBF2EA;      /* Sage Hint / Very Light Green */
  
  /* Neutral Colors */
  --color-bg-main: #F5F5F5;        /* White Smoke */
  --color-surface: #FFFFFF;        /* Pure White */
  --color-silver: #C0C0C0;         /* Silver Divider/Border */
  --color-text-dark: #1A261F;      /* Main Text Dark */
  --color-text-muted: #5A6B5E;     /* Secondary Text */

  /* Shadows & Elevation */
  --shadow-sm: 0 2px 8px rgba(52, 76, 61, 0.06);
  --shadow-md: 0 4px 16px rgba(52, 76, 61, 0.10);
  --shadow-lg: 0 8px 30px rgba(52, 76, 61, 0.15);
  
  /* Border Radius */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-full: 9999px;
  
  /* Transitions */
  --transition-fast: all 0.2s ease-in-out;
  --transition-normal: all 0.3s ease-in-out;
}
```

---

## 3. ✒️ Tipografi & Hierarki Teks

* **Primary Font Family**: `'Figtree'`, `'Montserrat'`, sans-serif
* **Headings (`h1`, `h2`, `h3`)**: Font Weight 700 / 800, Color: `#344C3D` atau `#1A261F`
* **Body Text (`p`, `span`)**: Font Weight 400 / 500, Color: `#1A261F`, Line Height: 1.6
* **Subtitles & Captions**: Font Weight 500, Color: `#738A6E` / `#5A6B5E`

---

## 4. 🧩 Panduan Komponen UI (UI Components Spec)

### 4.1 Header & Navigation
- **Background**: White Smoke (`#F5F5F5`) atau Semi-transparent White (`rgba(255,255,255,0.9)`) dengan `backdrop-filter: blur(10px)`.
- **Nav Links**: Color `#344C3D`, Hover state beralih ke `#8EA58C` dengan underline indikator smooth.
- **Top Announcement Bar**: Background `#344C3D`, Text White (`#FFFFFF`) / Accent Sage (`#BFD5C6`).

### 4.2 Buttons (Tombol)
- **Primary Button**:
  - Background: `#344C3D` (Hijau Botol)
  - Text Color: `#FFFFFF`
  - Hover State: Background `#8EA58C` (Sage), shadow bertambah lembut, `transform: translateY(-2px)`.
  - Border Radius: `var(--radius-md)` (12px) atau `var(--radius-full)` (Pill Shape).
- **Secondary / Outline Button**:
  - Background: Transparent / White
  - Border: 2px solid `#344C3D` atau `#C0C0C0`
  - Text Color: `#344C3D`
  - Hover State: Background `#EBF2EA`, Border Color `#8EA58C`.

### 4.3 Cards (Nominasi / Award Categories)
- **Background**: `#FFFFFF` (Pure White) dengan Subtle Shadow (`var(--shadow-sm)`).
- **Border**: `1px solid #C0C0C0` atau `1px solid rgba(142, 165, 140, 0.3)`.
- **Card Hover Effect**: Border beralih ke `#8EA58C`, `transform: translateY(-4px)`, shadow beralih ke `var(--shadow-md)`.
- **Badge Category**: Background `#EBF2EA` / `#BFD5C6`, Text `#344C3D`, font-weight 600.

### 4.4 Form & Input Fields
- **Background**: `#FFFFFF`
- **Border**: `1px solid #C0C0C0`
- **Focus State**: Border `2px solid #8EA58C`, Box Shadow `0 0 0 3px rgba(142, 165, 140, 0.2)`.

---

---

## 6. 📝 Catatan Penting Penggunaan
1. **Consistency First**: Jangan gunakan warna hijau acak (seperti `#00FF00` atau `#008000`), selalu gunakan variabel warna resmi yang tertera di atas (`#344C3D`, `#8EA58C`, `#738A6E`, `#BFD5C6`, `#EBF2EA`).
2. **Kontras & Accessibility**: Pastikan teks di atas warna `#344C3D` selalu berwarna putih (`#FFFFFF`) atau mint (`#BFD5C6`) agar mudah dibaca.
3. **Responsiveness**: Semua komponen harus bersifat mobile-friendly dengan padding dan grid fleksibel.
