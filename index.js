const express = require("express");
const productRoutes = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Manajemen Produk berjalan" });
});

app.use("/products", productRoutes);

// Route tidak ditemukan
app.use((req, res) => {
  res.status(404).json({ message: "Route tidak ditemukan" });
});

// Error handler global (termasuk JSON body yang rusak)
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Format JSON tidak valid" });
  }

  console.error(err);
  res.status(500).json({ message: "Terjadi kesalahan pada server" });
});

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
