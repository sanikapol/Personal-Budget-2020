require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.port || 3000;
const cors = require('cors');
const compression = require('compression');

const mongoose = require('mongoose')
const budgetsModel = require('./models/budget_schema.js')
const usersModel = require('./models/user_schema.js')
const bodyParser = require('body-parser')
const jwt = require("jsonwebtoken");

let url = 'mongodb://localhost:27017/personal_budget_2020';
app.use(bodyParser.json())
app.use(cors());
app.use(compression());

let refreshTokens = []


app.get('/', async(req,res) =>{
    res.send("Its working");
});

//Sign up a new User
app.post('/user/signup', async (req,res) => {  
    mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true} )
        .then(async()=> {
            // console.log("Connected to DB from signup");
            // console.log(req.body);
            let user = new usersModel(req.body);
            user.password = await user.hashPassword(req.body.password);
            //console.log(user);
            usersModel.insertMany(user)
                      .then((user) =>{
                          //console.log(user);
                          res.status(200).json({"msg":"User created successfully"});
                          mongoose.connection.close();
                          
                      })
                      .catch((connectionError) =>{
                          //console.log(connectionError);
                          res.status(400).send();
                      })
        })
        .catch((connectionError) => {
            //console.log(connectionError);
            res.status(400).send();
        })
    
});

app.post('/user/login',async (req,res) => {  
    mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true} )
        .then(async()=> {
            //console.log("Connected to DB from login");
            const login = {
                username: req.body.username,
                password: req.body.password
            }         
            let user = await usersModel.findOne({
                username: login.username
            });
            //check if user exit
            if (!user) {
                res.status(400).json({
                    type: "Not Found",
                    msg: "Wrong Login Details"
                })
            }

            let match = await user.compareUserPassword(login.password, user.password);
            if (match) {
                let token = await user.generateJwtToken({
                    user
                }, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: '20s'
                })
                let refreshToken = await user.generateJwtRefreshToken({
                    user
                }, process.env.REFRESH_TOKEN_SECRET, {
                    expiresIn: '1y'
                })
                refreshTokens.push(refreshToken);
                res.status(200).json({
                    success: true,
                    token: token,
                    refreshToken: refreshToken,
                    userCredentials: user
                })
            } else {
                res.status(400).json({
                    type: "Not Found",
                    msg: "Wrong Login Details"
                })
            }
        })
        .catch((connectionError) => {
            //console.log(connectionError);
            res.status(400).send();
        })
    
});

app.post('/token', async (req, res) => {
    //console.log(req.body);
    const refreshToken = req.body.token
    mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true} )
    .then(async () => {
        let user = await usersModel.findOne({
            username: req.body.username
        });
        if (!user) {
            res.status(400).json({
                type: "Not Found",
                msg: "Wrong Login Details"
            })
        }
        if (refreshToken == null) return res.sendStatus(401)
        if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
         
        try {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            let accesstoken = await user.generateJwtToken({
                user
                }, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: '20s'
                })
                // console.log("accesstoken");
                // console.log(accesstoken);
              res.json({ token: accesstoken })
        } catch (error) {
            console.log(error);
            return  res.sendStatus(403)
        }
            
        
    })
    .catch((connectionError) => {
        //console.log(connectionError);
        res.status(400).send();
    })
    
    
  });


//Get yearly budget for a particular user
app.get('/budget', authenticateToken, async(req,res) =>{
    
    mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true} )
    .then(()=> {
        //console.log("Connected to DB");
        budgetsModel.aggregate([
            { "$match": { user: req.userData.user.username } },
            { "$group": { "_id": "$title", "total": { $sum: "$budget" } } }
            ]).then((data) =>{
                //console.log(data);
                res.send(data);
                mongoose.connection.close();
            })
            .catch((connectionError) =>{
                console.log(connectionError);
            })
    })
    .catch((connectionError) => {
        console.log(connectionError);
    })
    
});

//Get month wise expenses for a user
app.get('/expenses/', authenticateToken,async(req,res) =>{
    mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true} )
    .then(()=> {
        //console.log("Connected to DB");
        budgetsModel.aggregate([
            { "$match": { user: req.userData.user.username } },
            { "$group": { "_id": "$month", "total": { $sum: "$expense" } } }
         ]).then((data) =>{
                //console.log(data);
                res.send(data);
                mongoose.connection.close();
            })
            .catch((connectionError) =>{
                console.log(connectionError);
            })
    })
    .catch((connectionError) => {
        //console.log(connectionError);
    })
    
    
});

// Get budget and expense for that item for whole year
app.get('/budget-expenses/', authenticateToken,async(req,res) =>{
    mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true} )
        .then(()=> {
            //console.log("Connected to DB");
            budgetsModel.aggregate([
                { "$match": { user: req.userData.user.username } },
                { "$group": { "_id": "$month", "totalBudget": { $sum: "$budget" }, "totalExpense": { $sum: "$expense" } } }
             ]).then((data) =>{
                    //console.log(data);
                    res.send(data);
                    mongoose.connection.close();
                })
                .catch((connectionError) =>{
                    //console.log(connectionError);
                })
        })
        .catch((connectionError) => {
            //console.log(connectionError);
        })
    
});

//Adding a new budget 
app.post('/addbudget', authenticateToken, async (req,res) => { 
    mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true} )
        .then(()=> {
            //console.log("Connected to DB from add budget");
            let data = new budgetsModel(req.body);
            data.user = req.userData.user.username;
            //console.log(data);
            budgetsModel.insertMany(data)
                      .then((data) =>{
                          //console.log(data);
                          res.status(200).json({"msg":"Data inserted Successfully"});
                          mongoose.connection.close();
                      })
                      .catch((connectionError) =>{
                          console.log(connectionError);
                          res.status(400).send();
                      })
        })
        .catch((connectionError) => {
            console.log(connectionError);
            res.status(400).send();
        })
    
});

//Changing an expense
//To do...what if data does not exist
app.put('/editbudget/:id', authenticateToken,async (req,res) => { 
    mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true} )
    .then(()=> {
        let dataToUpdate = {$set: {budget: req.body.budget, expense: req.body.expense}};
        budgetsModel.updateMany({_id: req.params.id}, dataToUpdate)
                  .then((data) =>{
                      //console.log(data);
                      res.status(200).json({"msg":"Budget updated Successfully"});
                      mongoose.connection.close();
                  })
                  .catch((connectionError) =>{
                      console.log(connectionError);
                  })
    })
    .catch((connectionError) => {
        //console.log(connectionError);
        res.status(400).send();
    })
    
});

//Get table data
app.get('/tabledata', authenticateToken,async(req,res) =>{
    
    mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true} )
        .then(()=> {
            //console.log("Connected to DB from tabledata");
            budgetsModel.find({user:req.userData.user.username})
                .then((data) =>{
                    //console.log(data);
                    res.send(data);
                    mongoose.connection.close();
                })
                .catch((connectionError) =>{
                    console.log(connectionError);
                })
        })
        .catch((connectionError) => {
            console.log(connectionError);
        })
    
});

app.delete('/deletebudget/:id', authenticateToken,async(req,res) => {
    mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true} )
    .then(()=> {
        // console.log("Connected to DB from deletebugdet");
        // console.log(req.params.id)
        budgetsModel.deleteOne({_id: req.params.id })
            .then((data) =>{
                //console.log(data);
                res.send(data);
                mongoose.connection.close();
            })
            .catch((connectionError) =>{
                console.log(connectionError);
            })
    })
    .catch((connectionError) => {
        console.log(connectionError);
    })
})

function authenticateToken(req, res, next) {
    
    const token = req.headers.authorization.replace("Bearer ", "");
    if (token == null) return res.status(401).json({
        message: "Authentification Failed"
    });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).json({
            message: "Authentification Failed"
        });
        req.userData = user
        next()
    })
  }

  app.listen(port, () => {
    console.log(`API serverd at http//:localhost${port}`)
  });
