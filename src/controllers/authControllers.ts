import { Request, Response } from "express";

export const loginGet = async (req: Request, res: Response) => {
  return res.render("login");
};
