const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, "products.json");

app.use(cors());
app.use(express.json());

// ---------- Helpers: read/write the "database" (JSON file) ----------
function readProducts() {
  const raw = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(raw || "[]");
}

function writeProducts(products) {
  fs.writeFileSync(DB_FILE, JSON.stringify(products, null, 2), "utf-8");
}

function getNextId(products) {
  return products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
}

// ---------- Routes: CRUD ----------

// CREATE
app.post("/api/products", (req, res) => {
  const { name, price, description } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({ error: "name و price مطلوبين" });
  }

  const products = readProducts();
  const newProduct = {
    id: getNextId(products),
    name,
    price: Number(price),
    description: description || "",
  };

  products.push(newProduct);
  writeProducts(products);

  res.status(201).json(newProduct);
});

// READ (all)
app.get("/api/products", (req, res) => {
  const products = readProducts();
  res.json(products);
});

// READ (one)
app.get("/api/products/:id", (req, res) => {
  const products = readProducts();
  const product = products.find((p) => p.id === Number(req.params.id));

  if (!product) {
    return res.status(404).json({ error: "المنتج غير موجود" });
  }

  res.json(product);
});

// UPDATE
app.put("/api/products/:id", (req, res) => {
  const products = readProducts();
  const index = products.findIndex((p) => p.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: "المنتج غير موجود" });
  }

  const { name, price, description } = req.body;
  products[index] = {
    ...products[index],
    name: name ?? products[index].name,
    price: price !== undefined ? Number(price) : products[index].price,
    description: description ?? products[index].description,
  };

  writeProducts(products);
  res.json(products[index]);
});

// DELETE
app.delete("/api/products/:id", (req, res) => {
  const products = readProducts();
  const index = products.findIndex((p) => p.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: "المنتج غير موجود" });
  }

  const deleted = products.splice(index, 1);
  writeProducts(products);

  res.json({ message: "تم الحذف بنجاح", product: deleted[0] });
});

app.listen(PORT, () => {
  console.log(`✅ السيرفر شغال على http://localhost:${PORT}`);
});
