import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js';
import homepage from './routes/category.js';
import productRoutes from './routes/product.js';

dotenv.config();


const app= express({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', chatRoutes);
app.use('/api/category', homepage);
app.use('/api/product', productRoutes);


app.get("/", (req,res)=> {
  res.send("API is running...")
})

const PORT = process.env.PORT || 5001;

app.get("/test", (req, res) => {
  res.json({ message: "Backend working fine!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});