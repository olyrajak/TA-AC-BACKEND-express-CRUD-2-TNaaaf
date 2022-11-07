var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    pages: { type: Number, required: true },
    publication: String,
    cover_image: String,
    authorId: { type: Schema.Types.ObjectId, ref: "Author" },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
}, { timestamps: true });

var Book = mongoose.model("Book", bookSchema);

module.exports = Book;