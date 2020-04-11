const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const keys = require('../config/keys')
const passport = require('../config/passport')
const users = require('../models/users')
const validators = require('../validators/validators')

var router=express.Router()

router.post('/login',(req,res)=>{
    const {errors,isValid}=validators.loginValidator(req.body);
    if(!isValid){
        res.json(errors)
    }
    users.findOne({email:req.body.email}).then((user)=>{
        if(!user)
            res.json({"email":"email id doesnt exist"})
        bcrypt.compare(req.body.password,user.password)
        .then((isMatch)=>{
if(!isMatch)
res.json({"password":"password do not match"})
else{
    const payload={
        id:user.id,
        name:user.name
    }
    jwt.sign(
        payload,keys.secretOrKey,
        {
            expiresIn:2155926
        },
        (err,token)=>{
            res.json({
                success:true,
                token:"bearer token: "+token
            })
        }
    )
}


        })
    })
})















router.post('/register',(req,res)=>{
    const {errors,isValid}=validators.registerValidator(req.body);
    if(!isValid){
        res.json(errors)
    }
    users.findOne({email:req.body.email}).then((user)=>{
        if(user){
            res.json({"email":'email id is already taken'})
        }
        else{
            const registerUser=new users({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            })
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(registerUser.password,salt,(err,hash)=>{
                    if(err) throw err;
                    registerUser.password=hash;
                    registerUser.save().then((user)=>{
                        res.json(user)
                    }).catch((err)=>{console.log(err)})
                })
            })
        }
    })
})



module.exports=router;
