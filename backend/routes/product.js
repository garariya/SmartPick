import express from "express"
const router = express.Router()

router.get("/:id", async(req,res)=>{
  const id = req.params.id

  try {
    const apiRes = await fetch(`https://dummyjson.com/products/${id}`)
    const data = await apiRes.json()
    res.status(200).json(data)
  } catch(e) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
})

export default router;