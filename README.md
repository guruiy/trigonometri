# MPI Trigonometri dalam Kehidupan — Literasi Numerasi Kelas X

Multimedia Pembelajaran Interaktif (MPI) untuk materi penerapan trigonometri kelas X SMA. Proyek ini dibuat sebagai **website statis** dan dapat dipublikasikan melalui GitHub Pages.

## Isi MPI

- Pengantar konsep sisi depan, sisi samping, sisi miring, sinus, kosinus, dan tangen.
- Simulasi kalkulator tinggi objek dengan pengaturan sudut elevasi, jarak mendatar, dan tinggi mata.
- Tiga studi kasus kontekstual:
  1. Mengukur tinggi tiang bendera.
  2. Membandingkan rancangan jalur miring menuju perpustakaan.
  3. Menghitung kabel penyangga tiang jaringan.
- Dua belas pertanyaan numerasi interaktif dengan pemeriksaan jawaban dan umpan balik pembahasan.
- Skor sementara dan penyimpanan jawaban di `localStorage` browser (tidak dikirim ke server).
- Tiga lembar soal bergambar PNG F4 (216 × 330 mm, 300 dpi) dan sumber SVG.
- Cetak semua lembar melalui browser, dengan halaman cetak F4.
- Panduan guru terpisah berisi kunci jawaban, hasil acuan, dan saran alur pembelajaran.
- Mode terang/gelap, tombol layar penuh, serta tampilan responsif untuk komputer, tablet, dan ponsel.

## Identitas guru

- **Nama:** IDA YUNIAR TRYASTUTI, S.Pd.
- **NIP:** 199206142022212009
- **Jabatan:** Guru Matematika
- **Instansi:** SMA Negeri 1 Pagerbarang

## Menjalankan secara lokal

1. Ekstrak folder proyek.
2. Buka `index.html` di browser modern (Chrome, Edge, Firefox, atau Safari).
3. Pastikan folder `assets/lembar-f4/` tetap berada di lokasi yang sama dengan `index.html`.

Website tidak memerlukan instalasi paket, Node.js, database, PHP, maupun backend.

## Publikasi ke GitHub Pages

1. Buat repository baru di GitHub.
2. Unggah **seluruh isi folder ini** ke direktori utama repository (root), bukan hanya file `index.html`.
3. Buka **Settings → Pages** pada repository.
4. Pada bagian *Build and deployment*, pilih *Deploy from a branch*.
5. Pilih branch `main` dan folder `/ (root)`, lalu simpan.
6. Tunggu proses publikasi GitHub Pages selesai, kemudian buka URL publik yang ditampilkan GitHub.

> Jangan memindahkan `index.html` tanpa `styles.css`, `app.js`, dan folder `assets`. Semua jalur aset telah menggunakan path relatif agar berjalan di GitHub Pages, termasuk pada repository project site.

## Simbol dan persamaan matematika

Simbol matematika ditulis menggunakan karakter Unicode standar, teks HTML, dan SVG lokal. Tidak ada ketergantungan pada MathJax, KaTeX, font eksternal, CDN, atau layanan API. Dengan demikian, persamaan seperti `sin θ`, `cos θ`, `tan θ`, `38°`, `√`, `÷`, dan `×` tetap dirender oleh browser secara langsung.

## Data dan privasi

- Tidak ada backend dan tidak ada pengiriman data siswa ke layanan eksternal.
- Jawaban dan tema hanya disimpan di penyimpanan lokal browser melalui `localStorage` pada perangkat yang sedang digunakan.
- Jika siswa menggunakan browser/perangkat berbeda, progres tidak otomatis tersinkron.
- Menghapus data situs/browser akan menghapus progres lokal tersebut.

## Struktur folder

```text
MPI_Trigonometri_Literasi_Numerasi/
├── index.html
├── styles.css
├── app.js
├── README.md
├── PANDUAN_GURU.md
├── .nojekyll
├── build_assets.py
└── assets/
    └── lembar-f4/
        ├── kasus-01-tiang-bendera.png
        ├── kasus-01-tiang-bendera.svg
        ├── kasus-02-jalur-miring.png
        ├── kasus-02-jalur-miring.svg
        ├── kasus-03-kabel-penyangga.png
        └── kasus-03-kabel-penyangga.svg
```

## Catatan pembelajaran

Hasil hitung pada studi kasus merupakan estimasi sesuai data dan pembulatan yang dinyatakan. Pada kasus jalur miring, pemilihan rancangan A hanya berdasarkan batas ruang mendatar 7 m; kelayakan teknis dan keselamatan jalur perlu dinilai terpisah sesuai ketentuan yang berlaku.
