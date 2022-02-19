import { Request, Response } from "express";
import { body } from "express-validator";
import prisma from "../utils/prisma";

const fetchTodos = async (ownerId: number) => {
  const todos = await prisma.todo.findMany({ where: { ownerId } });
  const activeCount = todos.filter(todo => !todo.completed).length;
  return {
    todos: todos.map(todo => ({ ...todo, url: `/todo/${todo.id}` })),
    activeCount,
    completedCount: todos.length - activeCount,
  };
};

export const allTodos = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.render("home");
  }
  const { todos, activeCount, completedCount } = await fetchTodos(req.user.id);
  return res.render("index", {
    user: req.user,
    todos,
    activeCount,
    completedCount,
  });
};

export const activeTodos = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  const { todos, activeCount, completedCount } = await fetchTodos(req.user.id);
  return res.render("index", {
    user: req.user,
    filter: "active",
    todos: todos.filter(todo => !todo.completed),
    activeCount,
    completedCount,
  });
};

export const completedTodos = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  const { todos, activeCount, completedCount } = await fetchTodos(req.user.id);
  return res.render("index", {
    user: req.user,
    filter: "completed",
    todos: todos.filter(todo => todo.completed),
    activeCount,
    completedCount,
  });
};

export const createTodo = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  await body("title").trim().run(req);
  if (req.body.title === "") {
    return res.redirect(`/${req.body.filter || ""}`);
  }
  await prisma.todo.create({
    data: {
      title: req.body.title,
      completed: !!req.body.completed,
      owner: {
        connect: {
          id: req.user.id,
        },
      },
    },
  });
  return res.redirect(`/${req.body.filter || ""}`);
};

export const updateTodo = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  await body("title").trim().run(req);
  const id = Number(req.params.id);
  if (req.body.title === "") {
    await prisma.todo.delete({ where: { id } });
  }
  await prisma.todo.update({
    where: { id },
    data: {
      title: req.body.title,
      completed: !!req.body.completed,
    },
  });
  return res.redirect(`/${req.body.filter || ""}`);
};

export const deleteTodo = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  const id = Number(req.params.id);
  await prisma.todo.delete({ where: { id } });
  return res.redirect(`/${req.body.filter || ""}`);
};

export const completeTodos = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  await prisma.todo.updateMany({
    where: { ownerId: req.user.id },
    data: { completed: true },
  });
  return res.redirect(`/${req.body.filter || ""}`);
};

export const clearCompletedTodos = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  await prisma.todo.deleteMany({
    where: { ownerId: req.user.id, completed: true },
  });
  return res.redirect(`/${req.body.filter || ""}`);
};
