const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const bodyParser = require('body-parser');
const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.mongoose.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

app.get("/", (req, res) => {
    res.json({ message: "Backend Assessment Test." });
});

// const connection = mongoose.connection;

// connection.once('open', () => {
//     console.log("Mongoose connected!");
// });

require('./app/routes/user.route')(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});