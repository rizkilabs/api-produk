const express = require("express");
const productRoutes = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Manajemen Produk berjalan" });
});

app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
