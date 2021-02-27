const bcrypt = require("bcryptjs");
const user = require("../models/user");

exports.signIn = (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    }
    res.render("login", {
        error: false
    });
};
exports.signUp = (req, res) => {
    res.render("register");
};
exports.dashboard = (req, res) => {
    if (req.session.userId) {
        user.findOne({
            _id: req.session.userId
        }).then((user) => {
            console.log("user", [user]);
            if (user) {
                res.render("index", {
                    user: user
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    } else {
        res.render("index", { user: null });
    }
};

// login and register
exports.login = (req, res) => {
    const username = req.body.inputUserame;
    const password = req.body.inputPassword;
    // check whether the username is existed or not
    user.find({ username: username })
        .then((result) => {
            if (result) {
                // if user existed, check the given password with the encrypted password
                bcrypt.compare(
                    password, result[0].password, (err, passwordIsMatch) => {
                        if (passwordIsMatch) {
                            // if password is correct, return success, with cookie save
                            res.cookie("username", username, { expire: 3600 * 1000 });
                            res.cookie("logged-time", new Date().toISOString(), {
                                expire: 3600 * 1000,
                            });
                            // store user info
                            req.session.userId = result[0]._id;
                            res.redirect("/");
                        } else {
                            res.render("login", {
                                error: true,
                                message: "Incorrect password !!!!",
                            });
                        }
                    }
                );
            } else {
                
            }
        }).catch((err) => {
            console.log(err);
        });
};
exports.register = (req, res) => {
    const username = req.body.inputUserame;
    const email = req.body.inputEmail;
    const password = req.body.inputPassword;;
    const confirm = req.body.inputConfirmPassword;
    const salt = bcrypt.genSaltSync(10);
    const date = new Date();
    if (password === confirm) {
        const user = new user({
            username: username,
            email: email,
            password: bcrypt.hashSync(password, salt),
            registerAt: date.toISOString(),
        }).save()
            .then((result) => {
                res.redirect("/signIn");
            }).catch((err) => {
                res.render("register", { message: "Register fail, try again" });
            });
    } else {
        res.render("register", { message: "Register fail, try again" });
    }
}
exports.logout = (req, res) => {
  // clear session
    req.session.destroy();
  // redirect to sigin
    res.redirect("/login");
};