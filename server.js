import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

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

app.get("/cards", async (req, res) => {
  try {
    const cards = await prisma.card.findMany();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cards" });
  }
});

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

app.post("/cards", async (req, res) => {
  const { userId, boardId, cardtitle, carddescription, image, likes } =
    req.body;
  try {
    const card = await prisma.card.create({
      data: {
        userId: parseInt(userId),
        boardId: parseInt(boardId),
        cardtitle,
        carddescription,
        image,
        likes,
      },
    });
    res.json(card);
  } catch (error) {
    console.error("Failed to add card:", error);
    res
      .status(500)
      .json({ error: "Failed to add card", details: error.message });
  }
});

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

app.delete("/boards/:boardId/cards", async (req, res) => {
  const { boardId } = req.params;
  try {
    await prisma.card.deleteMany({
      where: { boardId: parseInt(boardId) },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting cards from board ID:", error);
    res.status(500).json({ error: "Failed to delete cards from board ID" });
  }
});

app.delete("/boards/:boardId", async (req, res) => {
  const { boardId } = req.params;
  try {
    await prisma.board.delete({
      where: { boardid: parseInt(boardId) },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting board:", error);
  }
});

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

app.delete("/boards/:id", async (req, res) => {
  console.log("trying to delete");
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

app.get("/boards", async (req, res) => {
  try {
    const boards = await prisma.board.findMany({
      include: {
        user: true,
        cards: true,
      },
    });
    res.json(boards);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch boards" });
  }
});

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

app.post("/cards/:id/like", async (req, res) => {
  const { id } = req.params;
  const { likes } = req.body;

  try {
    const updatedCard = await prisma.card.update({
      where: { cardid: parseInt(id) },
      data: { likes },
    });
    res.json(updatedCard);
  } catch (error) {
    res.status(500).json({ error: "Failed to update likes" });
  }
});

app.get("/cards/:id/likes", async (req, res) => {
  const { id } = req.params;
  try {
    // Ensure the id is a valid number
    const cardId = parseInt(id);
    if (isNaN(cardId)) {
      return res.status(400).json({ error: "Invalid card ID" });
    }

    const card = await prisma.card.findUnique({
      where: { cardid: cardId },
      select: { likes: true },
    });

    if (card) {
      res.json({ likes: card.likes });
    } else {
      res.status(404).json({ error: "Card not found" });
    }
  } catch (error) {
    console.error("Failed to fetch likes:", error); // Log the error for debugging
    res.status(500).json({ error: "Failed to fetch likes from card ID" });
  }
});

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

app.get("/boards/:boardId/cards", async (req, res) => {
  const { boardId } = req.params;
  try {
    const cards = await prisma.card.findMany({
      where: { boardId: parseInt(boardId) },
    });
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cards from board ID" });
  }
});



app.post("/cards/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Comment text is required" });
  }

  try {
    const cardExists = await prisma.card.findUnique({
      where: { cardid: parseInt(id) },
    });

    if (!cardExists) {
      return res.status(404).json({ error: "Card not found" });
    }

    const comment = await prisma.comment.create({
      data: {
        comment: text,
        cardid: parseInt(id),
      },
    });
    res.json(comment);
  } catch (error) {
    console.error("Failed to add comment:", error);
    res.status(500).json({ error: "Failed to add comment", details: error });
  }
});
    

app.get("/cards/:cardId/comments", async (req, res) => {
  const { cardId } = req.params;

  try {
    const comments = await prisma.comment.findMany({
      where: { cardid: parseInt(cardId) }, 
    });
    res.json(comments);
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    res.status(500).json({ error: "Failed to fetch comments", details: error.message });
  }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
