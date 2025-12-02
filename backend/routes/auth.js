import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client.js';
import authMiddleware from '../middleware/authMiddleware.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();



// SIGNUP ROUTE
router.post('/signup', async (req, res) => {
  console.log("Received signup request:", req.body);
  const { email, password, name } = req.body;

  try {
    console.log("Checking for existing user...");
    const existingUser = await prisma.user.findUnique({ where: { email } });
    console.log("Existing user check result:", existingUser);

    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ message: 'User already exists' });
    }

    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed:", hashedPassword);

    console.log("Creating new user in DB...");
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    const token = jwt.sign({userId: newUser.id, email: newUser.email}, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })

    console.log("New user created successfully:", newUser);

    return res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      },
    });
  } catch (error) {
    console.error("Signup error details:", error);
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
      stack: error.stack
    });
  }
});





// LOGIN ROUTE
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });


    return res.json({ 
      message: 'Login successful', 
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

//logout route
router.post("/logout", (req, res) => {
  return res.json({ message: "Logged out" });
});

//delete route
router.delete("/delete-account", authMiddleware, async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: req.user.userId }
    });

    return res.json({ message: "Account deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});




router.get('/me', authMiddleware,  async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.json({ 
      id: user.id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



export default router;
