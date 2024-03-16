import { NextFunction, Request, Response } from "express";

/*
FIX ME (types) 😭 FIXED 😊
*/
export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
}

/*
FIX ME (types) 😭 FIXED 😊
*/
export const forwardAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/dashboard");
}

export const ensureAuthenticatedAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    if(req.user.role === 'admin'){
      const store = req.sessionStore;
      return next();
    }
  }
  res.redirect("/dashboard");
}