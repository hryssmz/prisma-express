import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const home = async (req: Request, res: Response) => {
  if (req.user === undefined) {
    return res.render("home");
  }
  const todos = await prisma.todo.findMany({
    where: { ownerId: req.user.id },
  });
  const activeCount = todos.filter(todo => !todo.completed).length;
  return res.render("index", {
    user: req.user,
    filter: null,
    todos: todos.map(todo => ({ ...todo, url: `/${todo.id}` })),
    activeCount,
    completedCount: (todos.length = activeCount),
  });
};
