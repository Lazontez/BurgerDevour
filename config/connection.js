const mysql = require("mysql");

const connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"Lazontez2780",
    database:"burgers_db"

});

connection.connect(function(err){
    if (err) throw err;
    console.log("connected")
})

module.exports = connection