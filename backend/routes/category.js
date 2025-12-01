import express from "express";

const router = express.Router();


router.get("/:category", async (req, res) => {
  const { category } = req.params;
  const {limit = 5 } = req.query; 

  try {

    const apiRes = await fetch(`https://dummyjson.com/products/category/${category}`);
    const data = await apiRes.json();

    let products = data.products || [];


    products = products.slice(0, limit);

    res.status(200).json({ products });
  } catch (error) {
    console.error("Category error:", error);
    res.status(500).json({ error: "Failed to fetch category" });
  }
});

export default router;
