import { Request, Response } from "express";
import passport from "passport";

import prisma from "../utils/prisma";
import { localStrategy } from "../utils/password";

passport.use(localStrategy);

passport.serializeUser((expressUser, callback) => {
  return callback(null, expressUser.id);
});

passport.deserializeUser(async (id: number, callback) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (user === null) {
    return callback(null, false);
  }

  const expressUser: Express.User = { id, username: user.username };
  return callback(null, expressUser);
});

export const loginGet = async (req: Request, res: Response) => {
  return res.render("login");
};

export const loginPassword = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});
