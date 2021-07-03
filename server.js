var express = require('express');
var app = express();

const db = require('./db');

db.connect(function (err) {
    if(err) {
        throw err;
    }
    app.listen(3012, "127.0.0.1" , function () {
        console.log("api start");
    })
});

app.get('/connettodb', (req, res) => {
    let sql = "use js_test";
    db.get().query(sql, (err) => {
        if(err) {
            throw err;
        }
        res.send("use js_test");
    })
});

app.get('/', function (req, res) {
    res.send("hello world45");
});
