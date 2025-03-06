let express = require('express');
let cors = require('cors');
let path = require('path');
let fs = require('fs');
const mongoose = require("mongoose");

let app = express();
app.use(cors());
app.use(express.json());

app.use(require("./routes/cart.route"))
app.use(require("./routes/user.route"))

mongoose.connect('mongodb+srv://algo-crm:AlgoSalSabil2024@algo-crm.m4ao4.mongodb.net/', {}).then(() =>
    console.log("Connected to the database!"))
    .catch((err) => console.log("DB Err", err));
app.listen(8080, () => {
    console.log("Server started on port 8080");
});
