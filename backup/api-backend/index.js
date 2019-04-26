const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const PORT = 4000;

const db = require('./queries');

app.get('/users', db.getUsers);

app.post('/auth/login', db.login);

/*app.get("/user", (req, res) => {
  res.send("You fetched an user!");
})

app.post("/users", (req, res) => {
  res.send("You added an user!");
})*/

app.listen(PORT, () => {
  console.log("Server is listening on port: " + PORT);
})
