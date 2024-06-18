import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

// Fetch all users
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      include: {
        cards: true,
        boards: true,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Fetch all cards
app.get("/cards", async (req, res) => {
  try {
    const cards = await prisma.card.findMany();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cards" });
  }
});

// Add a new user
app.post("/users", async (req, res) => {
  const { name } = req.body;
  try {
    const user = await prisma.users.create({
      data: { name },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to add user" });
  }
});

// Add a new card
app.post("/cards", async (req, res) => {
  const { userId, boardId, cardtitle, carddescription, image } = req.body;
  try {
    const card = await prisma.card.create({
      data: { userId, boardId, cardtitle, carddescription, image },
    });
    res.json(card);
  } catch (error) {
    res.status(500).json({ error: "Failed to add card" });
  }
});

// Delete a card
app.delete("/cards/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.card.delete({
      where: { cardid: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete card" });
  }
});

// Add a new board
app.post("/boards", async (req, res) => {
  const { type, title, image, userId } = req.body;
  try {
    const board = await prisma.board.create({
      data: { type, title, image, userId },
    });
    res.json(board);
  } catch (error) {
    res.status(500).json({ error: "Failed to add board" });
  }
});

// Delete a board
app.delete("/boards/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.board.delete({
      where: { boardid: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete board" });
  }
});

// Fetch all boards
app.get("/boards", async (req, res) => {
  try {
    const boards = await prisma.board.findMany({
      include: {
        user: true, // Include the user details associated with each board
        cards: true, // Include the cards associated with each board
      },
    });
    res.json(boards);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch boards" });
  }
});

// Delete a user
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.users.delete({
      where: { userid: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});
// Get User ID from Card ID
app.get("/cards/:id/user", async (req, res) => {
  const { id } = req.params;
  try {
    const card = await prisma.card.findUnique({
      where: { cardid: parseInt(id) },
      select: { userId: true },
    });
    if (card) {
      res.json({ userId: card.userId });
    } else {
      res.status(404).json({ error: "Card not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user ID from card ID" });
  }
});

// Get User from Board ID
app.get("/boards/:id/user", async (req, res) => {
  const { id } = req.params;
  try {
    const board = await prisma.board.findUnique({
      where: { boardid: parseInt(id) },
      include: { user: true },
    });
    if (board) {
      res.json(board.user);
    } else {
      res.status(404).json({ error: "Board not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user from board ID" });
  }
});

// Get Cards from User ID
app.get("/users/:id/cards", async (req, res) => {
  const { id } = req.params;
  try {
    const cards = await prisma.card.findMany({
      where: { userId: parseInt(id) },
    });
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cards from user ID" });
  }
});

// Get Boards from User ID
app.get("/users/:id/boards", async (req, res) => {
  const { id } = req.params;
  try {
    const boards = await prisma.board.findMany({
      where: { userId: parseInt(id) },
    });
    res.json(boards);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch boards from user ID" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
