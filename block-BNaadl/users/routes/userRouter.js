var express = require("express");
var router = express.Router();
var User = require("../models/users");


router.get("/new", (req, res) => {
    res.render("userform.ejs");
});

router.post("/", (req, res, next) => {
    User.create(req.body, (err, createduser) => {
        console.log(req.body);
        if (err) {
            return next(err);
        }
        res.redirect("/users");
    });
});

router.get("/", (req, res) => {
    User.find({}, (err, user) => {
        // console.log(err, user);
        if (err) return next(err);
        res.render("users", { users: user });

    });

});

router.get("/:id", (req, res, next) => {
    var id = req.params.id;
    User.findById(id, (err, user) => {
        console.log(err, user);
        if (err) return next(err);
        res.render("singleuser", { user: user });

    });
});

router.get("/:id/edit", (req, res) => {
    var id = req.params.id;
    User.findById(id, (err, nextuser) => {
        if (err) return next(err);
        res.render("editUserForm", { user: nextuser });

    })
});

router.post("/:id", (req, res) => {
    var id = req.params.id;
    User.findByIdAndUpdate(id, (err, nextuser) => {
        if (err) return next(err);
        res.render("/users/" + id)
    });

})

router.delete("/:id", (req, res) => {});

module.exports = router;