let booklist = [];
let idno = 0;
exports.index = function (req, res) {
  res.send(booklist);
};
exports.create = function (req, res, next) {
  if (!req.body.name) {
    return next(createError(400, "name is required"));
  }
  booklist.push({ id: idno, name: req.body.name });
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
  if (!req.body.name) {
    return next(createError(400, "name is required"));
  }
  if (!bookitem) {
    return next(createError(404, "no book with that id"));
  }
  booklist = booklist.map((book) => {
    if (book.id == req.params.id) {
      book.name = req.body.name;
    }
    return book;
  });
  res.send({ result: true });
};
