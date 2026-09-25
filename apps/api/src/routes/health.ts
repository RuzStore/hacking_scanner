import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json({
    ok: true,
    service: "friendscan-api",
    status: "healthy",
  });
});

export default router;
