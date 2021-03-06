const express        = require("express");
const exphbs         = require("express-handlebars");
const bodyParser     = require("body-parser");
const methodOverride = require("method-override");
const mysql          = require("mysql");

const app  = express();
const PORT = process.env.PORT || 3000;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Override with POST that has ?_method=PUT or ?_method=DELETE
app.use(methodOverride("_method"));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({"extended": false}));

app.engine("handlebars", exphbs({"defaultLayout": "main"}));
app.set("view engine", "handlebars");

const connection = mysql.createConnection({
    "host"    : "localhost",
    "user"    : "root",
    "password": "",
    "database": "movie_planner_db"
});

connection.connect(error => {
    if (error) {
        return console.error("error connecting: " + error.stack);
    }

    console.log("connected as id " + connection.threadId);
});

app.get("/", (req, res) => {
    const sql_command = "SELECT * FROM movies;";

    connection.query(sql_command, (error, results) => {
        if (error) throw error;

        res.render("index", {"movies": results});
    });
});

app.post("/", (req, res) => {
    const sql_command = `INSERT INTO movies (title) VALUES ("${req.body.title}");`;

    connection.query(sql_command, (error, results) => {
        if (error) throw error;

        res.redirect("/");
    });
});

app.put("/", (req, res) => {
    const sql_command = `UPDATE movies SET title = "${req.body.title}" WHERE id = ${req.body.id};`;

    connection.query(sql_command, (error, results) => {
        if (error) throw error;

        res.redirect("/");
    });
});

app.delete("/:id", (req, res) => {
    const sql_command = `DELETE FROM movies WHERE id = ${req.params.id};`;
    
    connection.query(sql_command, (error, results) => {
        if (error) throw error;

        res.redirect("/");
    });
});

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));