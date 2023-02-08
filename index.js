const express = require("express");
const cors = require("cors");
require('./db/config');
const jwt = require("jsonwebtoken");
// app.use(express.urlencoded())

const User = require('./db/User');
// const Journey = require('./db/Journey');
// const  bodyParser = require('body-parser');

const fs = require('fs');
const path = require('path');

const { default: mongoose } = require("mongoose");
const app = express();
app.use(express.json());
app.use(cors());

const authMiddleware = require('./auth_middleware')

const SECTRET_KEY_FOR_JWT = "SECRET_KEY"

function generateAccessToken(email) {
    return jwt.sign({ email: email }, SECTRET_KEY_FOR_JWT, { expiresIn: "24h" });
}



app.post("/register", async (req, res, next) => {
    const { name, email, password } = req.body;
    const newUser = User({
        name,
        email,
        password,
    });

    try {
        await newUser.save();
    } catch {
        const error = new Error("Error! Something went wrong.");
        return next(error);
    }
    let token;
    try {
        let token = generateAccessToken(email);

    } catch (err) {
        const error = new Error("Error! Something went wrong.");
        return next(error);
    }
    res
        .status(201)
        .json({
            success: true,
            data: {
                name: newUser.name,
                email: newUser.email,
                token: token
            },
        });
});



app.post("/login", async (req, res, next) => {
    let { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch {
        const error = new Error("Error! Something went wrong.");
        return next(error);
    }
    if (!existingUser || existingUser.password != password) {
        const error = Error("Wrong details please check at once");
        return next(error);
    }
    let token;
    try {
        //Creating jwt token
        token = generateAccessToken(email);
    } catch (err) {
        console.log(err);
        const error = new Error("Error! Something went wrong.");
        return next(error);
    }

    res
        .status(200)
        .json({
            success: true,
            data: {
                name: existingUser.name,
                email: existingUser.email,
                token: token,
            },
        });
});

app.get('/get-email', authMiddleware, (req, res) => {
    res.json({ message: req.objAfterToken.email })
});





const multer = require('multer');
const Journey = require("./db/Journey");




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ dest: 'uploads/' });

// app.post('/add', authMiddleware, upload.single('photo'), (req, res) => {
//     const photo = req.file.filename

// }




app.post('/add', authMiddleware, upload.single('image'), (req, res) => {
    const img = req.file.filename;
    const description = req.body.descr;
    const title = req.body.title;
    const date = req.body.date;
    const email = req.objAfterToken.email;
    const owner = User.findOne({ email: email });
    const new_journey = Journey(
        {
            title: title,
            description: description,
            date: date,
            img: img,
            owner: owner,
        }
    )
    new_journey.save();
    res.json({ message: "uploaded to user succesdfully" })

});










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



app.listen(5000);