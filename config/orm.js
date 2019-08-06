//connect to the connections file
var connection = require("../config/connection");
//  These are the methods you will need to use in order to retrieve and store data in your database.
var orm = {

    //      * `selectAll()`
    selectAll: function (cb) {
        connection.query("SELECT * FROM burgers", function (err, result) {
            if (err) throw err;
            cb(result);
            // return response.json(res);
        });
    },
    //      * `insertOne()`
    insertOne: function (burgerName) {
        connection.query("INSERT INTO burgers(burger_name)" + "VALUES(?)", [burgerName], function (err, res) {
            // return res.json(res)
            if (err) throw err;
            console.log(res);
        })

    },
    delete: function (burgerId) {
        connection.query("Delete FROM burgers WHERE id=?", [burgerId], function (err, res) {
            if (err) throw err;
            console.log(res);

        })
    },
    //      * `updateOne()`
    updateOne: function (burgerId, attribute, newValue, burgerName) {

        connection.query("UPDATE burgers SET devoured = ? WHERE id=? ", [attribute,burgerId], function (err, res) {
            if (err) throw err;
            console.log(res)

        })

    }

};


//    * Export the ORM object in `module.exports`.
module.exports = orm;

