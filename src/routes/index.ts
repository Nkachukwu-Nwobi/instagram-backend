import { Router } from "express";

const router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Hello world");
});

export default router;
