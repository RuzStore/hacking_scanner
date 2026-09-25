import express from "express";
import cors from "cors";

const app = express();
const port = Number(process.env.API_PORT ?? 3000);
const webOrigin = process.env.WEB_ORIGIN ?? "http://localhost:5173";

app.use(cors({
  origin: webOrigin
}));

app.use(express.json({ limit: "16kb" }));

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "friendscan-api"
  });
});

app.get("/api/scan/:token", (req, res) => {
  const token = req.params.token;

  if (!token || token.length > 512) {
    return res.status(400).json({
      error: "invalid_token"
    });
  }

  return res.json({
    token,
    profile: {
      displayName: "Demo User",
      public: true
    }
  });
});

app.use((_req, res) => {
  res.status(404).json({
    error: "not_found"
  });
});

app.listen(port, () => {
  console.log(`FriendScan API listening on port ${port}`);
});
