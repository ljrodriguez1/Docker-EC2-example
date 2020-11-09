const express = require("express");
const router = express.Router();

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

module.exports = router;