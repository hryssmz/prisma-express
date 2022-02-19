import { Router } from "express";
import { loginGet, loginPassword } from "../controllers/authControllers";
import { home } from "../controllers/indexControllers";

const router = Router();

// authControllers
router.get("/login", loginGet);
router.post("/login/password", loginPassword);

// indexControllers
router.get("/", home);

export default router;
