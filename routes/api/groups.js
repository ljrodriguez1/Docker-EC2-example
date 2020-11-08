const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load Group model
const Group = require("../../models/group");

router.post("/deleteGroup", (req, res) => {
    console.log("postDeleteGroup")
    const groupId= req.body.groupId;
    Group.findOneAndDelete({ _id: groupId }, function (err) {
        if(err) console.log(err);
        console.log("Successful group deletion");
    });
})

router.get("/groups", (req, res) => {
    res.send("funciona")
  })

module.exports = router;