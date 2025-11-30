import express from "express";

const router = express.Router();

// GET /api/category/:category?q=iphone
router.get("/:category", async (req, res) => {
  const { category } = req.params;
  const { q, limit = 100 } = req.query; // default limit 100

  try {
    // Native fetch in Node 18+
    const apiRes = await fetch(`https://dummyjson.com/products/category/${category}`);
    const data = await apiRes.json();

    let products = data.products || [];

    // Filter by search query
    if (q) {
      products = products.filter((p) =>
        p.title.toLowerCase().includes(q.toLowerCase())
      );
    }

    // Limit results
    products = products.slice(0, limit);

    res.status(200).json({ products });
  } catch (error) {
    console.error("Category error:", error);
    res.status(500).json({ error: "Failed to fetch category" });
  }
});

export default router;
