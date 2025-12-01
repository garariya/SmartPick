import express from "express";
const router = express.Router();

router.get("/:category", async (req, res) => {
  const { category } = req.params;
  const limit = parseInt(req.query.limit) || 50;

  try {
    // Fetch full dataset ONCE
    const apiRes = await fetch("https://dummyjson.com/products?limit=200");
    const data = await apiRes.json();
    let products = data.products || [];

    // Filter by category
    products = products.filter(
      (p) => p.category?.toLowerCase() === category.toLowerCase()
    );

    // Apply LIMIT
    products = products.slice(0, limit);

    res.json({ products });
  } catch (error) {
    console.error("CATEGORY ERROR:", error);
    res.status(500).json({ error: "Category failed" });
  }
});

export default router;
