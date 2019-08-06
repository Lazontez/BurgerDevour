
module.exports = (app)
//Spark a connection to the express module store that in a variable called express
var express = require("express");
//make a variable called app and store the value of that to the express function
var app = express();
//Spark a connection to the express handle bars module called exphbs
var exphbs = require("express-handlebars");
//connect to the path module
var path = require("path");
//connects to the orm.js file 
var orm = require("../config/orm");

//middleware
app.use(express.json())

app.use(express.urlencoded({ extended: true }));

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set('views', path.join(__dirname + '/..', 'views'));

console.log(path.join(__dirname + '/..'))

//specify the port to talk to the server on
var port = process.env.PORT||8080;

//sets up server to be able to handle request to the server with the url of "/"
app.get("/", function (req, res) {
    //Call on the select all function in the orm file pass the result through 
    orm.selectAll(function (result) {
        //create a object array name burgers
        var burgersData = {
            burger : []
        };
        
        // console.log(data)
        // console.log(result.burger_name);

        //run a loop through the results from the selectAll function
        for (z = 0; z < result.length; z++) {
            //store the current result index in a variable called burger
            var burger = result[z];
            
            //validate that the name isnt null or blank
            if (burger.burger_name != null) {
                //push the burger to the burgersData object
                burgersData.burger.push(burger);
            };
        };
        
        //render the handlebars to the page
        res.render("index",
             burgersData)

    });
});

//sets up server to be able to handle a POST request to the server with the url of "/api/burgers"
app.post("/api/burgers/", function (req, res) {
    //store the burger_name from the request body in a variable called burgerName
    var burgerName = req.body.burger_name;
    //run the insertOne function from the orm fle and pass through the burgerName
    orm.insertOne(burgerName);
    //send back the request body to the user
    res.send(req.body);
});

//sets up server to be able to handle a DELETE request to the server with the url of "/api/burger/:id"
app.delete("/api/burgers/:id", function (req, res) {
    //set a variable called id to equal the id paramater from the url 
    var id = req.params.id;
    //run the delete function  from the orm file and pass through the id
    orm.delete(id);
    //send back th request body
    res.send(req.body);
});

//sets up server to be able to handle a PUT request to the server with the url of "/api/bugers/:id/:value"
app.put("/api/burgers/:id/:value/", function (req, res) {
    //sets the id to equal the id paramater from the url
    var id = req.params.id;
    //sets the value paramater equal to a variable called value
    var value = req.params.value;
    //run the updateOne from the orm file pass through the id and value variables
    orm.updateOne(id, value)
});




//Start the server
app.listen(port, function () {
    console.log("App listening on http:localhost:" + port);
});