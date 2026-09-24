# HACKING SCANNER

> FriendScan — QR Scanner & Public Information Dashboard

## 📡 About

HACKING SCANNER adalah proyek scanner berbasis web yang dirancang untuk membaca QR/barcode dan menampilkan informasi yang memang tersedia atau telah diberikan izin oleh pemilik data.

Proyek ini berfokus pada:

- 📷 Camera Scanner
- 🖼️ Image / Photo Scanner
- 🔳 QR & Barcode Detection
- 👤 FriendScan Profile
- 🆔 User ID
- 📱 Connected Accounts
- 📍 Location Sharing dengan izin pengguna
- 🗺️ Map Integration
- 🌐 Public Information
- 📡 Authorized Public Camera Sources
- 🔐 Privacy & Permission Control

## 🧩 Main Concept

```text
QR / BARCODE
     │
     ▼
 SCANNER
     │
     ▼
 IDENTIFY DATA
     │
     ▼
 PRIVACY CHECK
     │
     ├─── ❌ NOT ALLOWED
     │
     └─── ✅ ALLOWED
              │
              ▼
       INFORMATION ENGINE
              │
       ┌──────┼──────┐
       ▼      ▼      ▼
    PROFILE  MAP   PUBLIC DATA
       │      │      │
       └──────┼──────┘
              ▼
         DASHBOARD
