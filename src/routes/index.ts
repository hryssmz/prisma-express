import { Router } from "express";
import { home } from "../controllers/indexControllers";

const router = Router();

router.get("/", home);

export default router;
