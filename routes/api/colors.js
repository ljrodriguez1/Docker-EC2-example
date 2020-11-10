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
            res.json(color[0].actual);
        } else {
            res.json('#ababab');
        }
    })
});

router.get('/pending', (req, res)=>{
    Color.find({state: "pending"})
    .then(color => {
        res.json(color);

    })
});

router.put('/validate', (req, res) => {
    console.log(req.body)
    console.log('aqui esta mi log')
    Color.findById(req.body.colorId, (err, color) => {
        if (color) {
            color.state = req.body.colorState;
            if (req.body.colorState === "true") {
                color.actual = color.color
            }
            color.save()
        }
    })
})

module.exports = router;