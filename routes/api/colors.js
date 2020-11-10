const express = require("express");
const Color = require('../../models/colors');
const router = express.Router();

router.post('/', (req, res)=>{
    console.log(req.body)
    console.log('here i am in colors')
    Color.find({user_name: req.body.user_name})
    .then(color => {
        console.log(color)
        if (color.length != 0){
            res.json(color[0].color);
        } else {
            res.json({color: '#ababab'});
        }
    })
});

module.exports = router;