const express =require("express");
const cors = require("cors");
require('./db/config');
const User = require('./db/User');
const { default: mongoose } = require("mongoose");
const app = express(); 
app.use(express.json());
app.use(cors());



app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    resp.send(result)
})



app.get("/getall", async (req, resp) => {
    let user = new User(req.body);
    let journeys = user.journeys; // a sorted array
    resp.send(journeys)
})

app.post("/post-a-journey", async (req, resp) => {
    let user = new User(req.body);
    let title = req.body.title 
    let description = req.body.description 
    let date = req.body.date 
    let journey = new Journey();
    journey.date = date
    journey.title = title
    journey.description = description
    // mongoose.save(journey at its correct postion to make it soretd array)
    

//     resp.send("successfully added a new journey")
 })


app.listen(5000);