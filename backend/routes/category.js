import express from "express";


const router = express.Router();

router.get("/:category", async (req, res) => {
  const category = req.params.category;

  try {
    const apiRes = await fetch(`https://dummyjson.com/products/category/${category}`);
    const data = await apiRes.json();

    res.status(200).json(data);
  } catch (e) {
    console.log("Category error:", e);
    res.status(500).json({ error: "Failed to fetch category" });
  }
});

export default router;
