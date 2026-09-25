import express from "express";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    service: "friendscan-api",
  });
});

app.get("/", (_req, res) => {
  res.status(200).json({
    name: "FriendScan API",
    status: "running",
  });
});

app.listen(PORT, () => {
  console.log(`FriendScan API running on port ${PORT}`);
});
