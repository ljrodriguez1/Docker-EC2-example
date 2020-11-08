const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const groups = require("./routes/api/groups");
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", users);
app.use("/api/groups", groups);

const port = process.env.AUTH_PORT || 5000;

app.listen(port, () => console.log(`Auth Server up and running on port ${port} !`));

