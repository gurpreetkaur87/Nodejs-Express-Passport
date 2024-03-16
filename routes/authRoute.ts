import express from "express";
import passport from 'passport';
import { forwardAuthenticated, ensureAuthenticatedAdmin } from "../middleware/checkAuth";

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => 
  res.render("login", {
    //@ts-ignore
    failureMessage: req.session.messages?req.session.messages.slice(-1):'',
  })
  );

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureMessage: true,
    /* FIX ME: 😭 failureMsg needed when login fails. FIXED 😊*/
  })
);

/* GET /auth/github
  Use passport.authenticate() as route middleware to authenticate the
  request.  The first step in GitHub authentication will involve redirecting
  the user to github.com.  After authorization, GitHub will redirect the user
  back to this application at /auth/github/callback */
router.get('/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }),
  function(req, res){
    /* The request will be redirected to GitHub for authentication, so this
    function will not be called. */
  });

/*   GET /auth/github/callback
  Use passport.authenticate() as route middleware to authenticate the
  request.  If authentication fails, the user will be redirected back to the
  login page.  Otherwise, the primary route function will be called,
  which, in this example, will redirect the user to the home page. */
router.get('/github/callback', 
passport.authenticate('github', { failureRedirect: '/auth/login' }),
function(req, res) {
  res.redirect('/dashboard');
});


router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

router.get("/revoke/sid/:sid", ensureAuthenticatedAdmin, (req, res) => {
  const sessionID = req.params.sid;
  req.sessionStore.destroy(sessionID, (err) => {
    // callback function. If an error occurs, it will be accessible here.
    if(err){
      return console.error(err)
    }
    //console.log("The session has been destroyed!")
  })
  res.redirect("/admin");
});

export default router;
