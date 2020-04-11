const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const UserModel = require('./models/users');
const users = require('./routes/users');

const app=express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var db=require('./config/keys').mongoURL;


mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});

require('./config/passport')(passport)
app.use(passport.initialize());
app.use('/users',users)



const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log("server listen @",port)
})
