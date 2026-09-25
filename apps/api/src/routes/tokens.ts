import { Router } from "express";
import crypto from "node:crypto";

const router = Router();

router.post("/", (req, res) => {
  const { profileId } = req.body ?? {};

  if (
    typeof profileId !== "string" ||
    profileId.trim().length === 0 ||
    profileId.length > 100
  ) {
    return res.status(400).json({
      ok: false,
      error: "profileId must be a valid string",
    });
  }

  const token = crypto.randomBytes(24).toString("hex");

  return res.status(201).json({
    ok: true,
    token,
    profileId: profileId.trim(),
    expiresIn: 300,
  });
});

export default router;
