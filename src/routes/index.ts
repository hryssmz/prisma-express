import { Router } from "express";
import {
  loginGet,
  loginPassword,
  logout,
  signupGet,
  signup,
} from "../controllers/authControllers";
import {
  allTodos,
  activeTodos,
  completedTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  completeTodos,
  clearCompletedTodos,
} from "../controllers/indexControllers";

const router = Router();

// authControllers
router.get("/login", loginGet);
router.post("/login/password", loginPassword);
router.get("/signup", signupGet);
router.post("/signup", signup);

// indexControllers
router.get("/", allTodos);
router.get("/active", activeTodos);
router.get("/completed", completedTodos);
router.post("/new", createTodo);
router.post("/todo/:id(\\d+)", updateTodo);
router.post("/todo/:id(\\d+)/delete", deleteTodo);
router.post("/toggle-all", completeTodos);
router.post("/clear-completed", clearCompletedTodos);
router.post("/logout", logout);

export default router;
