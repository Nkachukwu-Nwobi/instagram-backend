import { Router } from "express";
import { registerUser, login } from "../controller/user";

const router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Hello world");
});

router.post("/register", registerUser);
router.post("/", login);

export default router;
