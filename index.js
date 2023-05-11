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


app.get('/concerts', function (req, res, next) {
  connection.query(
    'SELECT * FROM `list_concert`',
    function(err, results, fields) {
      res.json(results);
    }
  );
})

app.post('/concert/buy', function (req, res, next) {
  connection.query(
    'INSERT INTO `buy_tickets_trans`(`user_id`, `con_id`, `count_ticket`, `total_price`) VALUES (?, ?, ?, ?)',
    [req.body.userId, req.body.conId, req.body.amount, req.body.totalPrice],
    function(err, results) {
      res.json(results);
    }
  );
})


app.put('/user/decreas', function (req, res, next) {
  connection.query(
    'UPDATE `users` SET `fname`= ?, `lname`= ?, `username`= ?, `password`= ?, `amount_money`= ?, `avatar`= ? WHERE id = ?',
    [req.body.fname, req.body.lname, req.body.username, req.body.password, req.body.amount_money, req.body.avatar, req.body.id],
    function(err, results) {
      res.json(results);
    }
  );
})

app.put('/concert/decreas', function (req, res, next) {
  connection.query(
    'UPDATE `list_concert` SET `name`= ?, `loc`= ?, `show_date`= ?, `amount_of_ticket`= ?, `image`= ?, `price`= ? WHERE id = ?',
    [req.body.name, req.body.loc, req.body.show_date, req.body.amount_of_ticket, req.body.image, req.body.price, req.body.id],
    function(err, results) {
      res.send(results);
    }
  );
})

app.delete('/concert', function (req, res, next) {
  connection.query(
    'DELETE FROM `list_concert` WHERE id = ?',
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

app.get('/users/:id', function (req, res, next) {
  const id = req.params.id;
  connection.query(
    'SELECT * FROM `users` WHERE `id` = ?',
    [id],
    function(err, results) {
      res.json(results);
    }
  );
})

// http://localhost:5000/users
app.post('/users', function(request, response) {
  // Capture the input fields
  let username = request.body.username;
  let password = request.body.password;
  // Ensure the input fields exists and are not empty
  if (username && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
      // If there is an issue with the query, output the error
      if (error) throw error;
      // If the account exists
      if (results.length > 0) {
        // Authenticate the user
          //request.session.loggedin = true;
          //request.session.username = username;
        // Redirect to home page
        response.send(results);
      } else {
        response.send('Incorrect Username and/or Password!');
      }     
      response.end();
    });
  } else {
    response.send('Please enter Username and Password!');
    response.end();
  }
});

app.get('/users/:id/lists', function (req, res, next) {
  const id = req.params.id;
  connection.query(
    'SELECT * FROM `buy_tickets_trans` WHERE `user_id` = ?',
    [id],
    function(err, results) {
      res.send(results);
    }
  );
})