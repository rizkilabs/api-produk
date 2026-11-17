const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware biar bisa baca body JSON
app.use(express.json());

// Route tes
app.get("/", (req, res) => {
  res.json({ message: "API Manajemen Produk berjalan" });
});

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
