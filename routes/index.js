import { Router } from "express";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    let number = 3;
    return res.status(200).json({ name: "indra kumar sahu" });
  } catch (error) {
    console.log(error, "error");
    next(error);
  }
});

export default router;
