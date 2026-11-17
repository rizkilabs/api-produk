// Struktur satu produk:
// {
//   id: number,
//   nama: string,
//   harga: number,
//   stok: number,
//   kategori: string,
//   deskripsi: string
// }

const products = [
  {
    id: 1,
    nama: "Kopi Arabika 250g",
    harga: 85000,
    stok: 40,
    kategori: "Minuman",
    deskripsi: "Biji kopi arabika sangrai medium, aroma fruity.",
  },
  {
    id: 2,
    nama: "Mouse Wireless",
    harga: 125000,
    stok: 25,
    kategori: "Elektronik",
    deskripsi: "Mouse wireless 2.4GHz dengan baterai tahan lama.",
  },
  {
    id: 3,
    nama: "Buku Tulis A5",
    harga: 12000,
    stok: 100,
    kategori: "Alat Tulis",
    deskripsi: "Buku tulis 80 halaman, kertas 70 gsm.",
  },
];

let nextId = products.length + 1;

// Dipakai saat POST untuk bikin ID baru yang auto increment
function generateId() {
  return nextId++;
}

module.exports = { products, generateId };
