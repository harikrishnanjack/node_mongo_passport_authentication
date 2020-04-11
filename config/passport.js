const mongoose = require('mongoose')
const jwtStrategy = require('passport-jwt').Strategy
const extractjwt = require('passport-jwt').ExtractJwt

const keys = require('./keys')
const users = require('../models/users')
const opts={}
opts.jwtFromRequest=extractjwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey=keys.secretOrKey;

module.exports=passport=>{
    passport.use(
        new jwtStrategy(opts,(jwtPayload,done)=>{
users.findById(jwtPayload.id).then((user)=>{
    if(user){
        return done(null,user)
    }
    return done(null,false)
}).catch((err)=>{console.log(err)})
        })
    )
}