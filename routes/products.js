const express = require("express");
const { products } = require("../data/products");

const router = express.Router();

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

module.exports = router;
