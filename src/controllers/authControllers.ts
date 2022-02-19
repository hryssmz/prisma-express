import { Request, Response, NextFunction } from "express";
import passport from "passport";

import prisma from "../utils/prisma";
import { localStrategy, generateUser } from "../utils/password";

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

export const logout = (req: Request, res: Response) => {
  req.logout();
  return res.redirect("/");
};

export const signupGet = async (req: Request, res: Response) => {
  return res.render("signup");
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, username } = await generateUser(
    req.body.username,
    req.body.password
  );
  const expressUser: Express.User = { id, username };
  return req.login(expressUser, err => {
    if (err) return next(err);
    return res.redirect("/");
  });
};
