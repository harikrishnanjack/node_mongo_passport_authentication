const mongoose = require('mongoose')
const isEmpty = require('is-empty')
const validator = require('validator')

module.exports.loginValidator=this.loginValidator=function validateLoginInput(data){
    const errors={}
    data.email=!(isEmpty(data.email))?data.email:"";
    data.password=!(isEmpty(data.password))?data.password:"";
if(validator.isEmpty(data.email)){
errors.email="email is required"
}
if(validator.isEmpty(data.password)){
    errors.password="password is required"
    }
    if(!validator.isEmail(data.email)){
        errors.email="provide valid email id"
        }
return {
    errors:errors,
    isValid:isEmpty(errors)
}
}

module.exports.registerValidator=this.registerValidator=function validateRegisterInput(data){
    const errors={}
    data.email=!(isEmpty(data.email))?data.email:"";
    data.password=!(isEmpty(data.password))?data.password:"";
    data.name=!(isEmpty(data.name))?data.name:"";

if(validator.isEmpty(data.email)){
errors.email="email is required"
}
if(validator.isEmpty(data.password)){
    errors.password="password is required"
    }
    if(validator.isEmpty(data.name)){
        errors.name=" name is required"
        }
    if(!validator.isEmail(data.email)){
        errors.email="provide valid email id"
        }
return {
    errors:errors,
    isValid:isEmpty(errors)
}
}



