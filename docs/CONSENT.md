FriendScan Consent Model

Target alur:

Request
   ↓
Owner grants
   ↓
Consent active
   ↓
Authorized access
   ↓
Owner revokes
   ↓
Access denied

Consent harus diperiksa oleh backend.

UI checkbox saja tidak dianggap sebagai enforcement.

Prinsip

- scope harus spesifik
- consent dapat dicabut
- akses setelah revoke harus ditolak
- data hanya dibuka sesuai scope
- akses dicatat untuk audit

Model ini adalah desain target dan belum merupakan bukti implementasi.
