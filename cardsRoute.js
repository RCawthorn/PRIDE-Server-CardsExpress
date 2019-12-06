var express = require('express');
var session = require('express-session');
var app = express();
var sql = require('./db');
var con = sql();
var router = express.Router();
var bodyparser = require('body-parser');
var cors = require('cors');

/**
 * We will be using sessions when login information received from chris, the below is awaiting that.
 */
app.use(session({ secret: "secrets" }));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

/**
 * This endpoint will get the latest 24 cards from sql db and provide them in descending order by senddate
 * and send them to PRIDEWall
 */
router.get("/home", (req, res) => {
    con.query(`SELECT * FROM cards ORDER BY senddate DESC LIMIT 24`, (err, result, fields) => {
        console.log(result);
        if (err) {
            throw err;
        }
        else {
            res.send(result);
        }
    })
})

/**
 * This endpoint will get all cards from sql db relating to a user and send them to MyPride.
 */
router.post("/user", (req, res) => {
    var empno = req.body.rempno;
    con.query(`select * from cards where rempno='${empno}' ORDER BY senddate DESC`, (err, result, fields) => {
        if (err) {
            throw err;
        }
        else {
            res.send(result);
        }
    })
})

/**
 * This endpoint will take a new card in the req parameter and send it to the sql db.
 * Returns a message saying "Pride card submitted."
 */
router.post("/newCard", (req, res) => {
    var rempno = req.body.rempno;
    var rmempno = req.body.rmempno;
    var sempno = req.body.sempno;
    var category = req.body.category;
    var senddate = req.body.senddate;
    var message = req.body.message;
    var picurl = req.body.picurl;

    con.query(`insert into cards values('${rempno}', '${rmempno}',
    '${sempno}', '${category}', '${senddate}', '${message}', '${picurl}')`, (err, result) => {
        if (err) {
            throw err;
        } else {

        }
    })

    res.send("Pride card submitted");
})

router.get("/cardNumbers", (req, res) => {
    var rempno = 'P04967'; //Needs to be obtained via login session object

    async function getValues() {
        var p = await countCards('P', rempno);
        var r = await countCards('R', rempno);
        var i = await countCards('I', rempno);
        var d = await countCards('D', rempno);
        var e = await countCards('E', rempno);
        var values = { "P": p, "R": r, "I": i, "D": d, "E": e }
        res.send(values);
    }
    getValues();
})

/**
 * This endpoint will retrieve all one users sent cards and send them back to MySentCards on front end.
 */
router.post("/mySentCards", (req, res) => {
    var empno = req.body.sempno;
    con.query(`SELECT * FROM cards where sempno='${empno}' ORDER BY senddate DESC`, (err, result, fields) => {
        console.log(result);
        if (err) {
            throw err;
        }
        else {
            res.send(result);
        }
    })
})

function countCards(cardCategory, rempno) {
    return new Promise(function (resolve, reject) {
        con.query(`select count(rempno) as cardCount from cards where category='${cardCategory}' and rempno='${rempno}'`, function (error, result) {
            if (result) {
                let res = result[0].cardCount;
                resolve(res);
            }
            else {
                reject("Error");
            }
        });
    })
}

module.exports = router