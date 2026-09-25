FriendScan Architecture

Versi awal

Browser
   |
   | HTTP
   v
Frontend
   |
   | API request
   v
Backend API
   |
   v
Demo data

Versi awal belum menggunakan database.

Arsitektur target

Client
  |
  v
API Gateway
  |
  +--> Authentication
  |
  +--> Token Service
  |
  +--> Consent Service
  |
  +--> Disclosure Engine
  |
  +--> Audit Logger
  |
  v
Database

Arsitektur target bukan berarti komponen tersebut sudah diimplementasikan.

Setiap komponen harus diuji secara terpisah sebelum klaim keamanan dibuat.
