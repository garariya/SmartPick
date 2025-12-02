import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Add a product (Admin Only)
router.post("/add", authMiddleware, async (req, res) => {
  try {

    if (req.user.email.trim().toLowerCase() !== "johnwick@gmail.com") {
      return res.status(403).json({ message: "Access denied" , user: req.user});
    }

    const response = await fetch(`https://dummyjson.com/products/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to add product" });
  }
});

// Update a product (Admin Only)
router.put("/update/:id", authMiddleware, async(req,res)=>{
  try {
    if (req.user.email.trim().toLowerCase() !== "johnwick@gmail.com") {
      return res.status(403).json({ message: "Access denied" , user: req.user});
    }

    const {id} = req.params;

    const response = await fetch(`https://dummyjson.com/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch(e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to update product" });
  }
})


// Delete a product (Admin Only)
router.delete("/delete/:id", authMiddleware, async(req,res)=>{
  try {
    if (req.user.email.trim().toLowerCase() !== "johnwick@gmail.com") {
      return res.status(403).json({ message: "Access denied" , user: req.user});
    }

    const {id} = req.params;

    const response = await fetch(`https://dummyjson.com/products/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch(e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to delete product" });
  }
})

export default router;
