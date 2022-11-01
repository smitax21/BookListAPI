const createError = require("http-errors");

let booklist = [];
let idno = 0;

exports.index = function (req, res) {
  res.send(booklist);
};
exports.create = function (req, res, next) {
  if (!req.body.title) {
    return next(createError(400, "title is required"));
  }
  if (!req.body.author) {
    return next(createError(400, "author is required"));
  }
  if (!req.body.read == "true") {
    return next(createError(400, "book not read"));
  }
  booklist.push({
    id: idno,
    title: req.body.title,
    author: req.body.author,
    read: req.body.read,
  });
  res.send({ result: true });
  idno++;
};

exports.show = function (req, res, next) {
  const bookitem = booklist.find((book) => book.id == req.params.id);
  if (!bookitem) {
    return next(createError(404, "no book with that id"));
  }
  res.send(bookitem);
};

exports.delete = function (req, res, next) {
  const bookitem = booklist.find((book) => book.id == req.params.id);
  if (!bookitem) {
    return next(createError(404, "no book with that id"));
  }
  booklist = booklist.filter((book) => book.id != req.params.id);
  res.send({ result: true });
};

exports.update = function (req, res, next) {
  const bookitem = booklist.find((book) => book.id == req.params.id);
  if (!req.body.title) {
    return next(createError(400, "title is required"));
  }
  if (!req.body.author) {
    return next(createError(400, "author is required"));
  }
  if (!req.body.read) {
    return next(createError(400, "read is required"));
  }

  booklist = booklist.map((book) => {
    if (book.id == req.params.id) {
      book.title = req.body.title;
      book.author = req.body.author;
      book.read = req.body.read;
    }
    return book;
  });
  res.send({ result: true });
};
