var express = require('express');
var router = express.Router();
var con = require('../moduls/DB/connection').getPool();
var httpRespons = require('../moduls/httpRespons/httpRespons');
var vacation_list = [];



// get vacations lists
router.post('/vacation', async function (req, res, next) {
  var respons = new httpRespons;
  var user_id = req.body.id;
  vacation_list = [];
  if (req.session.connected) {
    con.query('SELECT vacationid FROM `user_to_vacation` WHERE userid = ?', [user_id], function (err, folowing, fields) {
      if (err) {
        respons.success = false;
        respons.error = true;
        respons.message = "There Was an Error...";
        respons.data = err;
        res.json(respons);
        return;
      }

      con.query('SELECT * FROM vacation', async function (err, result, fields) {
        if (err) {
          respons.success = false;
          respons.error = true;
          respons.message = "There Was an Error...";
          respons.data = err;
          res.json(respons);
          return;
        }
        for (let i = 0; i < folowing.length; i++) {
          // let temp_vac = result;
          result.map((obj, index) => {
            if (obj.id == folowing[i].vacationid) {
              obj.like_ = 1
              vacation_list.unshift(obj)
              result.splice(index, 1)
            }
          })
        }
        result.map((obj) => {
          vacation_list.push(obj);
        })
        if (true) {
          vacation_list.map((obj, i) => {
            con.query('SELECT COUNT(*) FROM user_to_vacation  WHERE vacationid = ?', [obj.id], function (err, num_folowing, fields) {
              if (err) {
                respons.success = false;
                respons.error = true;
                respons.message = "There Was an Error...";
                respons.data = err;
                res.json(respons);
                return;
              }
              let num_folow = Object.values(num_folowing[0])
              obj.number_followers = num_folow[0];
            })
          })
        }
        await wait(1 * 1000);
        respons.success = true;
        respons.error = false;
        respons.message = "vacation list...";
        respons.data = vacation_list;
        res.json(respons);
      })
    });
  } else {
    respons.success = false;
    respons.error = true;
    respons.message = "you are not loggedin!!!";
    respons.data = [];
    res.json(respons);
    return;
  }
});


// /* add vacation */
router.put('/vacation', function (req, res, next) {
  var respons = new httpRespons;

  let description = req.body.description;
  let target = req.body.target;
  let img = req.body.img;
  let startDate = req.body.startDate;
  let endDate = req.body.endDate;
  let price = req.body.price;
  con.query(`INSERT INTO vacation (description,target,img,start_date,end_date,price,number_followers) VALUES (?,?,?,?,?,?,0)`, [description, target, img, startDate, endDate, price], function (err, vacation, fields) {
    if (err) {
      respons.success = false;
      respons.error = true;
      respons.message = "ERRORE:" + err;
      respons.data = null;
      res.json(respons);
      return;
    }
    respons.success = true;
    respons.error = false;
    respons.message = "vacation adedd successfuly!!!";
    respons.data = null;
    res.json(respons);
  })
})



// /* update vacation */
router.post('/Update', function (req, res, next) {
  var respons = new httpRespons;
  // console.log(req.body);

  let description = req.body.description;
  let target = req.body.target;
  let img = req.body.img;
  let startDate = req.body.startDate;
  let endDate = req.body.endDate;
  let price = req.body.price;
  let id = req.body.id;
  con.query(`UPDATE vacation SET description=?, target=?,img=?,start_date=?,end_date=?,price=? WHERE id =?`, [description, target, img, startDate, endDate, price, id], function (err, vacation, fields) {
    if (err) {
      respons.success = false;
      respons.error = true;
      respons.message = "ERRORE:" + err;
      respons.data = null;
      res.json(respons);
      return;
    }
    respons.success = true;
    respons.error = false;
    respons.message = "vacation updated successfuly!!!";
    respons.data = null;
    res.json(respons);
  })
})





// delete vacation */
router.delete('/vacation', function (req, res, next) {
  var respons = new httpRespons;
  let id = req.body.id;
  // console.log(req.body);

  con.query(`DELETE FROM vacation WHERE id = ${id}`, function (err, result, fields) {
    if (err) {
      respons.success = false;
      respons.error = true;
      respons.message = "There Was an Error...";
      respons.data = err;
      res.json(respons);
      return;
    }
    // console.log(id);
    respons.success = true;
    respons.error = false;
    respons.message = "vacation deleted!!!";
    respons.data = null;
    res.send(respons);
  })
})


// /* folowing */
router.put('/folow', function (req, res, next) {
  var respons = new httpRespons;
  let id_user = req.body.id_user;
  let id_vacation = req.body.id_vacation;
  let obj_id = null;
  let exist = false;
  con.query(`SELECT * FROM user_to_vacation WHERE userid = ?`, [id_user], function (err, objs, fields) {
    if (err) {
      respons.success = false;
      respons.error = true;
      respons.message = "ERRORE:" + err;
      respons.data = null;
      res.json(respons);
      return;
    }
    objs.map((obj) => {
      if (obj.userid == id_user && obj.vacationid == id_vacation) {
        exist = true;
        obj_id = obj.id;
      }
    })
    if (exist) {
      con.query(`DELETE FROM user_to_vacation WHERE userid=? AND vacationid=?`, [id_user, id_vacation], function (err, vacation, fields) {
        if (err) {
          respons.success = false;
          respons.error = true;
          respons.message = "ERRORE:" + err;
          respons.data = null;
          res.json(respons);
          return;
        }
        respons.success = true;
        respons.error = false;
        respons.message = "folowing deleted successfuly!!!";
        respons.data = 1;
        res.json(respons);
      })
    } else {
      con.query(`INSERT INTO user_to_vacation (userid,vacationid) VALUES (?,?)`, [id_user, id_vacation], function (err, vacation, fields) {
        if (err) {
          respons.success = false;
          respons.error = true;
          respons.message = "ERRORE:" + err;
          respons.data = null;
          res.json(respons);
          return;
        }
        respons.success = true;
        respons.error = false;
        respons.message = " folowing added successfuly!!!";
        respons.data = 0;
        res.json(respons);
      })
    }
  })
})


async function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  });
}

module.exports = router;


