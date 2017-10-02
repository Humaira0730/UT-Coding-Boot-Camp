// TODO: Make four routes that display results from your zoo collection
// 0: Root: Displays a simple "Hello World" message (no mongo required)
app.get("/", (req, res) => {
    res.sendFile("index");
});

// 1: All: Send JSON response with all animals
app.get("/all", (req, res) => {
    // Query: In our database, go to the animals collection, then "find" everything
    db.animals.find((err, docs) => {
        // Log any errors if the server encounters one
        if (err) {
            console.log(err);
        }
        // Otherwise, send the result of this query to the browser
        else {
            res.json(docs);
        }
    });
});

// 2: Name: Send JSON response sorted by name in ascending order
app.get("/name", (req, res) => {
    db.animals.find().sort({"name": 1}, (err, docs) => {
        if (err) {
            console.log(err);

        } else {
            res.json(docs);

        }
    });
});

// 3: Weight: Send JSON response sorted by weight in descending order
app.get("/weight", (req, res) => {
    db.animals.find().sort({"weight": -1}, (err, docs) => {
        if (err) {
            console.log(err);

        } else {
            res.json(docs);
            
        }
    });
});