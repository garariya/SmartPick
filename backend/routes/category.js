import express from "express";

const router = express.Router();


router.get("/:category", async (req, res) => {
  const category = req.params.category;
  const limit = req.query.limit || 100;

  try {
    const apiRes = await fetch(
      `https://dummyjson.com/products/category/${category}?limit=${limit}`
    );
    const data = await apiRes.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Category error:", error);
    res.status(500).json({ error: "Failed to fetch category" });
  }
});

export default router;
