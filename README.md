# API Manajemen Produk

REST API CRUD untuk manajemen produk, dibuat dengan Node.js dan Express.
Data disimpan di memori (array), jadi akan reset saat server restart.

## Struktur Data Produk

| Field     | Tipe    | Keterangan                        |
| --------- | ------- | --------------------------------- |
| id        | number  | Dibuat otomatis oleh server       |
| nama      | string  | Nama produk, wajib                |
| harga     | number  | Harga, wajib, tidak negatif       |
| stok      | integer | Jumlah stok, wajib, tidak negatif |
| kategori  | string  | Kategori produk, wajib            |
| deskripsi | string  | Deskripsi produk, wajib           |

## Instalasi

```bash
git clone https://github.com/rizkilabs/api-produk.git
cd api-produk
npm install
npm run dev
```

Server jalan di `http://localhost:3000`.

## Endpoint

| Method | Endpoint      | Keterangan                      | Status sukses |
| ------ | ------------- | ------------------------------- | ------------- |
| GET    | /products     | Ambil semua produk              | 200           |
| GET    | /products/:id | Ambil satu produk               | 200           |
| POST   | /products     | Tambah produk baru              | 201           |
| PUT    | /products/:id | Ubah produk (semua field wajib) | 200           |
| DELETE | /products/:id | Hapus produk                    | 200           |

Status error: `400` (data/ID tidak valid), `404` (produk atau route tidak ditemukan), `500` (error server).

## Contoh Request

Tambah produk:

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"nama":"Teh Hijau 100g","harga":30000,"stok":50,"kategori":"Minuman","deskripsi":"Teh hijau kualitas premium."}'
```

Response `201`:

```json
{
  "message": "Produk berhasil ditambahkan",
  "data": {
    "id": 4,
    "nama": "Teh Hijau 100g",
    "harga": 30000,
    "stok": 50,
    "kategori": "Minuman",
    "deskripsi": "Teh hijau kualitas premium."
  }
}
```

## Struktur Project

```
api-produk/
├── controllers/productController.js
├── data/products.js
├── routes/products.js
├── index.js
└── package.json
```
