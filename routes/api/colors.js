const express = require("express");
const Color = require('../../models/colors');
const router = express.Router();

router.get('/', async (req, res)=>{
    const color = await Color.find({user_name: req.body.user_name});
    if (color.length != 0){
        res.json(color[0]);
    } else {
        res.json({color: 'white'});
    }
});

module.exports = router;