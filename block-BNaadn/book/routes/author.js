var express = require("express");
var router = express.Router();
var Author = require("../models/author");
var Book = require("../models/book");
var Category = require("../models/category");
var express = require('express');
var path = require('path');


router.get("/new", function(req, res, next) {
    res.render("addauthor");
});
router.post("/", (req, res, next) => {
    Author.create(req.body, (err, createauthor) => {
        // console.log(req.body);
        if (err) {
            return next(err);
        }
        res.redirect("authors");
    });
});
router.get("/:id", (req, res, next) => {
    var id = req.params.id;
    Author.findById(id).populate('bookId').exec((err, author) => {
        console.log(author);
        if (err) return next(err);
        res.render("singleauthor", { author: author });

    });
});
router.get("/:id/edit", (req, res) => {
    var id = req.params.id;
    Author.findById(id, (err, editauthor) => {
        if (err) return next(err);
        res.render("editauthor", { author: editauthor });

    })
});
router.post("/:id", (req, res, next) => {
    var id = req.params.id;
    Author.findByIdAndUpdate(id, req.body, (err, authors) => {
        if (err) return next(err);
        res.redirect("/authors/" + id)
    });
});
router.get("/", (req, res) => {
    Author.find({}, (err, authors) => {
        // console.log(err, authors);
        if (err) return next(err);
        res.render("authors", { authors: authors });

    });

});
router.post("/:id/category", (req, res, next) => {
    var id = req.params.id;

    req.body.articleId = id;
    Category.create(req.body, (err, category) => {
        if (err) return next(err);
        Book.findByIdAndUpdate(id, { $push: { categories: category._id } }, (err, updateBook) => {
            if (err) return next(err);
            res.redirect("/authors/" + id)


        })
    })
});
router.post("/:id/createbook", (req, res, next) => {
    var id = req.params.id;

    req.body.articleId = id;
    Book.create(req.body, (err, book) => {
        if (err) return next(err);
        Author.findByIdAndUpdate(id, { $push: { bookId: book._id } }, (err, updateBook) => {
            if (err) return next(err);
            res.redirect("/authors/" + id)


        })
    })
});
module.exports = router;