// packages needed: express, body-parser, path
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var tables = [];
var waitlist = [];

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/view", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

// Route to api/tables
app.get("/api/tables", function(req, res) {
    res.json(tables);
});

// Route to api/waitlist
app.get("/api/waitlist", function(req, res) {
    res.json(waitlist);
});


// Route to create reservation
app.post("/api/tables", function(req, res) {
    var newTable = req.body;
    var listType;
    console.log(newTable);
    if (tables.length < 5) {
        listType = 'reservation';
        tables.push(newTable);
    } else {
        listType = 'waitlist';
        waitlist.push(newTable);
    }

    console.log('Tables: ' + JSON.stringify(tables));
    console.log('Waitlist: ' + JSON.stringify(waitlist));
    res.send(listType);

});

app.get('/clear', function(req, res) {
    tables = [];
    waitlist = [];
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
