const mysql = require('mysql');

var state = {
    db: null
};

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
});

exports.connect = function(done) {
    if(state.db) {
        return done();
    }

    db.connect((err) => {
        if(err) {
            return done(err);
        }
        state.db = db;
        return done();
    });
}

exports.get = function() {
    return state.db;
}