import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
dotenv.config();


const app= express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get("/", (req,res)=> {
  res.send("API is running...");
})

const PORT = process.env.PORT || 5001;

app.get("/test", (req, res) => {
  res.json({ message: "Backend working fine!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})