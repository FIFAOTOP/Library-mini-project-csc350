var express = require('express')
var cors = require('cors')
require('dotenv').config()

const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)

var app = express()
app.use(cors())
app.use(express.json())

app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})


app.get('/books', function (req, res, next) {
  connection.query(
    'SELECT * FROM `books`',
    function(err, results, fields) {
      res.json(results);
    }
  );
})

app.get('/books/:id', function (req, res, next) {
  const id = req.params.id;
  connection.query(
    'SELECT * FROM `books` WHERE `id` = ?',
    [id],
    function(err, results) {
      res.json(results);
    }
  );
})

app.post('/books', function (req, res, next) {
  connection.query(
    'INSERT INTO `books`(`book_number`, `book_name`, `status`, `number_of_book`, `image`) VALUES (?, ?, ?, ?, ?)',
    [req.body.book_number, req.body.book_name, req.body.status, req.body.number_of_book, req.body.image],
    function(err, results) {
      res.json(results);
    }
  );
})


app.put('/books', function (req, res, next) {
  connection.query(
    'UPDATE `books` SET `book_number`= ?, `book_name`= ?, `status`= ?, `number_of_book`= ?, `image`= ? WHERE id = ?',
    [req.body.book_number, req.body.book_name, req.body.status, req.body.number_of_book, req.body.image, req.body.id],
    function(err, results) {
      res.json(results);
    }
  );
})

app.delete('/books', function (req, res, next) {
  connection.query(
    'DELETE FROM `books` WHERE id = ?',
    [req.body.id],
    function(err, results) {
      res.json(results);
    }
  );
})

app.get('/users', function (req, res, next) {
  connection.query(
    'SELECT * FROM `users`',
    function(err, results, fields) {
      res.json(results);
    }
  );
})