import { Router } from "express";
import { loginGet } from "../controllers/authControllers";
import { home } from "../controllers/indexControllers";

const router = Router();

router.get("/", home);
router.get("/login", loginGet);

export default router;
