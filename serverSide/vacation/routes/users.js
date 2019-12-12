var express = require('express');
var router = express.Router();
var con = require('.././moduls/DB/connection').getPool();
var httpRespons = require('../moduls/httpRespons/httpRespons');


////////////////* login *///////////////////
router.post('/user', function (req, res, next) {
  let respons = new httpRespons;
  let username = req.body.username;
  let password = req.body.password;
  let data = {};
  con.query('SELECT * FROM users', function (err, users, fields) {
    if (err) {
      respons.success = false;
      respons.error = true;
      respons.message = 'ERRORE:' + err;
      respons.data = null;
      res.json(respons);
      return;
    }
    users.map((obj) => {
      if (obj.username != username && obj.password != password || obj.username != username && obj.password == password || obj.username == username && obj.password != password) {
        console.log('obj', obj.username, obj.password, '!=', username, password);
        // req.session.connected = false
        // respons.success = false;
        // respons.error = true;
        // respons.message = 'you are not loggedin!!!';
        // respons.data = null;
      }
      if (obj.username == username && obj.password == password) {
        data = {
          id_user: obj.id,
          username: username,
          role:obj.role
        }
        // req.session.connected = true;
        // req.session.username = username;
        // respons.success = true;
        // respons.error = false;
        // respons.message = 'you are loggedin!!!';
        // respons.data = data;
        // return
      }
    })
    if(data.id_user && data.username){
      console.log('success',data);
      
      req.session.connected = true;
      req.session.username = username;
      respons.success = true;
      respons.error = false;
      respons.message = 'you are loggedin!!!';
      respons.data = data;
    }else{
      console.log('error',data);

      req.session.connected = false
      respons.success = false;
      respons.error = true;
      respons.message = 'you are not loggedin!!!';
      respons.data = null;
    }
    res.json(respons);
  })
});



/* GET users listing. */
router.get('/users', function (req, res, next) {
  var respons = new httpRespons;
  con.query('SELECT * FROM users', function (err, users, fields) {
    if (err) {
      respons.success = false;
      respons.error = true;
      respons.message = "There Was an Error...";
      respons.data = err;
      res.json(respons);
      return;
    }
    respons.success = true;
    respons.error = false;
    respons.message = "users list...";
    respons.data = users;
    res.json(respons);
  })
});

/* add user */
router.put('/user', function (req, res, next) {
  var respons = new httpRespons;
  let Fname = req.body.firstName;
  let Lname = req.body.lastName;
  let username = req.body.username;
  let password = req.body.password;
  con.query(`SELECT * FROM users WHERE username='${username}'`, function (err, users, fields) {
    if (err) {
      respons.success = false;
      respons.error = true;
      respons.message = "There Was an Error...";
      respons.data = err;
      res.json(respons);
      return;
    }
    let arrusers = users;
    if (arrusers.length > 0) {
      respons.success = false;
      respons.error = true;
      respons.message = "user already exist!!!";
      respons.data = users;
      res.json(respons);
      return;
    }
    con.query(`INSERT INTO users (first_name, last_name, username, password, role)VALUES(?,?,?,?,1)`, [Fname, Lname, username, password], function (err, users, fields) {
      if (err) {
        respons.success = false;
        respons.error = true;
        respons.message = "There Was an Error...";
        respons.data = err;
        res.json(respons);
        return;
      }
      respons.success = true;
      respons.error = false;
      respons.message = "user added!!!";
      respons.data = users;
      res.json(respons);

    })
  });
});


// delete user */
router.delete('/user', function (req, res, next) {
  var respons = new httpRespons;
  let username = req.body.username;
  con.query(`DELETE FROM users WHERE username='${username}'`, function (err, user, fields) {
    if (err) {
      respons.success = false;
      respons.error = true;
      respons.message = "There Was an Error...";
      respons.data = err;
      res.json(respons);
      return;
    }
    respons.success = true;
    respons.error = false;
    respons.message = "user deleted!!!";
    respons.data = null;
    res.json(respons);
  })
})

module.exports = router;
