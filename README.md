FriendScan

FriendScan adalah aplikasi web untuk memindai QR code dan menampilkan informasi yang memang disediakan atau telah diberikan izin oleh pemiliknya.

Scope versi awal

Versi awal hanya mencakup:

- QR scanner di browser
- token QR
- endpoint API sederhana
- profil publik minimal
- validasi input dasar
- pemisahan frontend dan backend

Belum termasuk:

- reverse lookup nomor telepon
- pencarian identitas berdasarkan email/WhatsApp/Instagram tanpa izin
- pelacakan lokasi
- akses perangkat pengguna
- CCTV
- identity graph
- data pribadi tersembunyi

Struktur

apps/web       frontend
apps/api       backend API
packages/shared tipe bersama
docs           dokumentasi
tests          rencana pengujian

Menjalankan

Install dependency:

npm install

Jalankan frontend:

npm run dev:web

Jalankan API:

npm run dev:api

Status

Proyek ini masih tahap awal.

Kode yang tersedia tidak dianggap sebagai bukti bahwa sistem sudah aman, teruji, atau compliant sebelum pengujian yang sesuai dilakukan.
