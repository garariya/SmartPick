import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// GET /api/category/:category?q=iphone
router.get("/:category", async (req, res) => {
  const { category } = req.params;
  const { q, limit = 100 } = req.query; // limit defaults to 100

  try {
    // Fetch all products for the category from dummyjson
    const apiRes = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    const data = await apiRes.json();
    let products = data.products || [];

    // Filter products by search query if `q` exists
    if (q) {
      products = products.filter((p) =>
        p.title.toLowerCase().includes(q.toLowerCase())
      );
    }

    // Limit the number of products returned
    products = products.slice(0, limit);

    res.status(200).json({ products });
  } catch (error) {
    console.error("Category error:", error);
    res.status(500).json({ error: "Failed to fetch category" });
  }
});

export default router;
