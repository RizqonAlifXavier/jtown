# JTown Mall - Cara Update Events Bulanan

## 📝 Update Events Setiap Bulan

Untuk mengupdate events setiap bulan, Anda hanya perlu mengedit **1 file**:

### File: `src/data/events.json`

**Lokasi:** `d:\Program IT\Jtown_mirror\src\data\events.json`

### Format Event

Setiap event memiliki struktur berikut:

```json
{
  "id": 1,
  "title": "Nama Event",
  "subtitle": "Deskripsi singkat event",
  "date": "Tanggal | Waktu",
  "endDate": "YYYY-MM-DD",
  "badge": "Kategori Badge",
  "gradient": "linear-gradient(...)",
  "image": "URL gambar hero",
  "detailImage": "URL gambar detail (opsional)",
  "detailBanner": "URL banner detail (opsional)",
  "category": "Kategori Event",
  "location": "Lokasi Event",
  "fullDescription": "Deskripsi lengkap event",
  "terms": ["Syarat 1", "Syarat 2", "..."]
}
```

**Field Baru untuk Event Detail:**

- `detailImage` - Gambar yang ditampilkan di atas deskripsi event (max height: 500px)
- `detailBanner` - Banner horizontal yang ditampilkan paling atas (max height: 300px)
- Kedua field ini **opsional** - jika tidak ada, tidak akan ditampilkan

### Langkah-langkah Update:

1. **Buka file** `src/data/events.json`
2. **Tambah event baru** - Copy salah satu event, ubah semua field
3. **Hapus event lama** - Hapus event yang sudah lewat
4. **Update event** - Edit field yang perlu diubah
5. **Save file**
6. **Refresh browser** - Perubahan langsung terlihat!

### Contoh Menambah Event Baru:

```json
{
  "id": 7,
  "title": "Event Baru Maret 2026",
  "subtitle": "Deskripsi event baru",
  "date": "15 Maret 2026 | 14:00 - 18:00",
  "endDate": "2026-03-15",
  "badge": "New Event",
  "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "image": "https://images.unsplash.com/photo-xxx",
  "detailImage": "https://images.unsplash.com/photo-xxx?w=800&h=500",
  "detailBanner": "https://images.unsplash.com/photo-xxx?w=1200&h=300",
  "category": "Entertainment",
  "location": "Atrium Lantai 1",
  "fullDescription": "Deskripsi lengkap event...",
  "terms": ["Gratis untuk semua pengunjung", "Syarat dan ketentuan berlaku"]
}
```

### Tips:

- **ID harus unik** - Gunakan nomor yang belum terpakai
- **endDate format** - Harus `YYYY-MM-DD` (contoh: `2026-03-15`)
- **Image URL** - Gunakan URL gambar dari Unsplash atau upload ke hosting
- **detailImage** - Gambar utama event (800x500px recommended)
- **detailBanner** - Banner horizontal (1200x300px recommended)
- **Gradient** - Pilih warna gradient yang sesuai tema event

### Gradient Colors Suggestions:

- Purple: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Green: `linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)`
- Blue: `linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)`
- Orange: `linear-gradient(135deg, #fa709a 0%, #fee140 100%)`

## 🚀 Deploy ke Vercel

Setelah update events:

1. **Commit changes:**

   ```bash
   git add src/data/events.json
   git commit -m "Update events untuk bulan [nama bulan]"
   git push
   ```

2. **Vercel auto-deploy** - Vercel akan otomatis deploy perubahan

3. **Cek website** - Tunggu 1-2 menit, events baru akan muncul

## ⚡ Performance Optimization

Website sudah dioptimasi dengan:

- ✅ **Lazy Loading** - Gambar hanya load saat terlihat
- ✅ **Image Caching** - Gambar di-cache untuk loading lebih cepat
- ✅ **Async Decoding** - Decode gambar tanpa block rendering
- ✅ **External JSON** - Events terpisah untuk update mudah

Tidak perlu khawatir tentang performance, semua sudah dioptimasi! 🎉
