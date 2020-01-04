const router = require("express").Router();
let User = require("../../models/user.model");
var bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');


require("dotenv").config(); 


router.route("/").post((req, res)=>{
    const email = req.body.email;
    const psw = req.body.password;
    console.log(email + "    " + psw )

    User.findOne({email: email})
        .then(user =>{
            if(bcrypt.compareSync(psw, user.password)){
                var token = jwt.sign({ user: email }, process.env.SECRET);
                console.log("Password corretta... restituisco il token:" + token)
                res.status(200).json({authToken: token});
            }else{
                res.status(400).json("Wrong password... Retry!");
            }
        })
        .catch(err =>{
            res.status(400).json("Cannot find email...");
        })
  
    
}); 



router.route("/lol").get((req, res)=>{
   res.status(200).json("loool")
    
}); 




module.exports = router;