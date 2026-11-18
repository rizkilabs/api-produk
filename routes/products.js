const express = require("express");
const { products, generateId } = require("../data/products");

const router = express.Router();

// Validasi body produk, return array berisi pesan error (kosong = valid)
function validateProduct(body) {
  const errors = [];
  const { nama, harga, stok, kategori, deskripsi } = body;

  if (typeof nama !== "string" || nama.trim() === "") {
    errors.push("nama wajib diisi dan berupa teks");
  }
  if (typeof harga !== "number" || !Number.isFinite(harga) || harga < 0) {
    errors.push("harga wajib berupa angka dan tidak boleh negatif");
  }
  if (!Number.isInteger(stok) || stok < 0) {
    errors.push("stok wajib berupa bilangan bulat dan tidak boleh negatif");
  }
  if (typeof kategori !== "string" || kategori.trim() === "") {
    errors.push("kategori wajib diisi dan berupa teks");
  }
  if (typeof deskripsi !== "string" || deskripsi.trim() === "") {
    errors.push("deskripsi wajib diisi dan berupa teks");
  }

  return errors;
}

// GET /products -> ambil semua produk
router.get("/", (req, res) => {
  res.status(200).json({
    message: "Berhasil mengambil data produk",
    data: products,
  });
});

// GET /products/:id -> ambil satu produk berdasarkan ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "ID harus berupa angka" });
  }

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Produk tidak ditemukan" });
  }

  res.status(200).json({
    message: "Berhasil mengambil data produk",
    data: product,
  });
});

// POST /products -> tambah produk baru
router.post("/", (req, res) => {
  const errors = validateProduct(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Data produk tidak valid",
      errors,
    });
  }

  const { nama, harga, stok, kategori, deskripsi } = req.body;

  const newProduct = {
    id: generateId(),
    nama: nama.trim(),
    harga,
    stok,
    kategori: kategori.trim(),
    deskripsi: deskripsi.trim(),
  };

  products.push(newProduct);

  res.status(201).json({
    message: "Produk berhasil ditambahkan",
    data: newProduct,
  });
});

// PUT /products/:id -> ubah data produk
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "ID harus berupa angka" });
  }

  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Produk tidak ditemukan" });
  }

  const errors = validateProduct(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Data produk tidak valid",
      errors,
    });
  }

  const { nama, harga, stok, kategori, deskripsi } = req.body;

  // ID tetap, field lain diganti
  products[index] = {
    id,
    nama: nama.trim(),
    harga,
    stok,
    kategori: kategori.trim(),
    deskripsi: deskripsi.trim(),
  };

  res.status(200).json({
    message: "Produk berhasil diubah",
    data: products[index],
  });
});

// DELETE /products/:id -> hapus produk
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "ID harus berupa angka" });
  }

  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Produk tidak ditemukan" });
  }

  const [deletedProduct] = products.splice(index, 1);

  res.status(200).json({
    message: "Produk berhasil dihapus",
    data: deletedProduct,
  });
});

module.exports = router;
