// apps/api/src/server.ts
import express from "express";
import cors from "cors";
import healthRouter from "./routes/health.js";
import tokensRouter from "./routes/tokens.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json({ limit: "100kb" }));

app.use("/health", healthRouter);
app.use("/api/tokens", tokensRouter);

app.get("/", (_req, res) => {
  res.status(200).json({
    name: "FriendScan API",
    status: "running",
    version: "0.1.0",
  });
});

app.use((_req, res) => {
  res.status(404).json({
    ok: false,
    error: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`FriendScan API running on port ${PORT}`);
});
