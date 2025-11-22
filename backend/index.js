import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js';
dotenv.config();


const app= express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', chatRoutes);

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