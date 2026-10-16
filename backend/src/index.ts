import "dotenv/config";
import express from "express";
import cors from "cors";
import { askGemini } from "./gemini";
import { errorHandler } from "./errorHandler";
import { AppError } from "./error";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

const MAX_MESSAGE_LENGTH = 2000;

app.post("/chat", async (req, res, next) => {
  try {
    const message = req.body?.message;

    if (typeof message !== "string") {
      throw new AppError(400, "message must be a string");
    }

    const trimmed = message.trim();

    if (trimmed.length === 0) {
      throw new AppError(400, "message is empty");
    }

    if (trimmed.length > MAX_MESSAGE_LENGTH) {
      throw new AppError(
        400,
        `message must be at most ${MAX_MESSAGE_LENGTH} characters`
      );
    }

    const reply = await askGemini(trimmed);
    res.json({ reply });
  } catch (error) {
    next(error);
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});