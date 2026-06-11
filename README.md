# 🌸 Bank Soal Ayumi

Aplikasi web bank soal bahasa Jepang (gaya JLPT) untuk program Ayumi. Berjalan sepenuhnya di **GitHub Pages** — gratis, tanpa server, dan murid bisa mengakses **tanpa akun apa pun**.

## Isi repository

| File/Folder | Fungsi |
|---|---|
| `index.html` | Halaman **murid**: kerjakan ujian, nilai otomatis, pembahasan |
| `guru.html` | Halaman **guru**: tambah/edit soal, gambar, impor Excel, unduh `soal.json` |
| `data/soal.json` | **Bank soal** — satu-satunya file yang perlu diganti saat memperbarui soal |
| `assets/logo.png` | Logo Ayumi |
| `css/`, `js/` | Tampilan dan logika aplikasi |

## Cara memasang (sekali saja, ±10 menit)

1. **Buat akun GitHub** di [github.com](https://github.com) (gratis) bila belum punya.
2. Klik tombol **+** di kanan atas → **New repository**.
   - Repository name: `bank-soal-ayumi`
   - Pilih **Public**
   - Klik **Create repository**
3. Di halaman repository baru, klik **uploading an existing file** (atau **Add file → Upload files**).
4. **Seret seluruh isi folder ini** (index.html, guru.html, folder data, assets, css, js, README.md) ke area unggah. Pastikan struktur foldernya ikut terbawa.
5. Klik **Commit changes**.
6. Aktifkan GitHub Pages: buka **Settings → Pages** (menu kiri) →
   - Source: **Deploy from a branch**
   - Branch: **main**, folder **/(root)** → **Save**
7. Tunggu 1–2 menit, lalu buka alamat:

```
https://NAMA-AKUN.github.io/bank-soal-ayumi/
```

Itulah alamat yang dibagikan ke murid. Halaman guru ada di `.../bank-soal-ayumi/guru.html`.

## Cara memperbarui soal

1. Buka `guru.html` (lewat alamat GitHub Pages).
2. Tambah/edit soal lewat formulir, atau **📥 Impor Excel/CSV** dari template kontributor. Draf tersimpan otomatis di browser.
3. Klik **💾 Unduh soal.json**.
4. Di GitHub: buka folder **data** → klik **Add file → Upload files** → unggah `soal.json` yang baru → **Commit changes** (file lama otomatis tertimpa).
5. Tunggu ±1 menit — soal baru langsung tampil di halaman murid.

## Alur ujian (lewat link dari guru)

1. Guru membuka `guru.html` → masukkan **PIN guru** (bawaan: `ayumi123` — ganti di `data/config.json`).
2. Di kartu **🔗 Buat Link Ujian**, atur: judul, level, kategori, jumlah soal, acak, pembahasan, **waktu (menit)**, dan **file audio 聴解** (opsional) → klik **Buat link** → salin/kirim via WhatsApp.
   - Acuan waktu JLPT: N5 語彙20/文法読解40/聴解30 · N4 25/55/35 · N3 30/70/40 · N2 105/50 · N1 110/55 (menit).
   - Audio: unggah MP3 ke folder `audio/` di GitHub, lalu tulis namanya, mis. `audio/uts-n4.mp3`. Audio diputar **satu kali** tanpa jeda; saat audio selesai, jawaban murid **otomatis terkumpul**. Waktu habis juga mengumpulkan otomatis.
3. Murid membuka **link tersebut** (halaman utama tanpa link hanya menampilkan pesan "minta link dari guru") → isi **nama + kelas/angkatan** → kerjakan → nilai muncul otomatis → kirim hasil ke guru via WhatsApp/salin/screenshot.

### Mengganti PIN guru
Buka file `data/config.json` di GitHub → klik ikon pensil (Edit) → ubah nilai `pinGuru` → Commit changes.

## Hal yang perlu diketahui

- PIN dan token link adalah pengaman praktis untuk kelas, bukan keamanan tingkat tinggi — **kunci jawaban tetap ada di `soal.json`** yang bersifat publik. Murid yang paham teknis bisa melihatnya — gunakan untuk latihan/kuis, bukan ujian berisiko tinggi.
- **Nilai tidak tersimpan di server** (GitHub Pages tidak punya database). Rekap dilakukan dari laporan WhatsApp/screenshot murid. Bila kelak butuh rekap otomatis, bisa ditambah integrasi Google Sheets/Apps Script.
- Soal dengan **gambar** (pilihan bergambar untuk 聴解 dsb.) diinput lewat `guru.html`; gambar otomatis dikompres dan tersimpan di dalam `soal.json`.
- Draf di halaman guru tersimpan di browser (localStorage) — gunakan **📂 Muat soal.json** untuk melanjutkan pekerjaan di perangkat lain.

がんばってください！🌸
