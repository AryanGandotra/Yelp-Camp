const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
  res.render("Auth/register");
};

module.exports.register = async (req, res, next) => {
  try {
    const { email, username, password, password2 } = req.body;
    if (password !== password2) {
      req.flash("error", "Passwords do not match!");
      return res.redirect("/register");
    }
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    // console.log(registeredUser);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Yelp Camp!");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("Auth/login");
};

module.exports.login = (req, res) => {
  req.flash("success", "Welcome back!");
  const redirectUrl = res.locals.returnTo || "/campgrounds";
  delete res.locals.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Goodbye!");
    res.redirect("/login");
  });
};
