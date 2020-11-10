const express = require('express');
const app = express();
const port = process.env.port || 3000;

const mongoose = require('mongoose')
const budgetsModel = require('./models/budget_schema.js')
const bodyParser = require('body-parser')

let url = 'mongodb://localhost:27017/personal_budget_2020';
app.use(bodyParser.json())

app.listen(port, () => {
    console.log(`API serverd at http//:localhost${port}`)
});

app.get('/', async(req,res) =>{
    res.send("Its working");
});

//Get data for a particular user
app.get('/budget/:userId', async(req,res) =>{
    mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true} )
        .then(()=> {
            console.log("Connected to DB");
            budgetsModel.find({user: req.params.userId})
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

//Adding a new budget 
app.post('/addbudget', (req,res) => { 
    mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true} )
        .then(()=> {
            console.log("Connected to DB");
            let data = new budgetsModel(req.body);
            console.log(data);
            budgetsModel.insertMany(data)
                      .then((data) =>{
                          console.log(data);
                          res.status(200).send("Data inserted Successfully");
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
app.post('/addexpense', (req,res) => { 
    mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true} )
        .then(()=> {
            //console.log("Connected to DB");
            let dataToUpdate = {$set: {expense: req.body.expense}};
            budgetsModel.updateMany({user: req.body.user, month: req.body.month, title: req.body.title}, dataToUpdate)
                      .then((data) =>{
                          console.log(data);
                          res.status(200).send("Expense added Successfully");
                          mongoose.connection.close();
                      })
                      .catch((connectionError) =>{
                          console.log(connectionError);
                      })
        })
        .catch((connectionError) => {
            console.log(connectionError);
            res.status(400).send();
        })
    
});
