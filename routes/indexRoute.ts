import express from "express";
const router = express.Router();
import { ensureAuthenticated, ensureAuthenticatedAdmin } from "../middleware/checkAuth";
import { json } from "stream/consumers";

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/admin", ensureAuthenticatedAdmin, (req, res) => {    
  res.render("admin", {
    store: req.sessionStore,
    user: req.user,
  });
});

export default router;
