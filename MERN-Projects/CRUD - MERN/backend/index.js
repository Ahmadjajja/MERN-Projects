require("dotenv").config();   //Deployment Related Line Understand Carefully
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors"); //cors uses for connection between two servers 
//for example local host and our data server in this project

const UserModel = require("./user");
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://ahmad:ahmad@cluster0.5ktso.mongodb.net/studentData?retryWrites=true&w=majority")

app.get("/getUsers", (request, response) => {
    UserModel.find({}, (err, result) => {
        if (!err) {
            response.json(result)
        } else {
            response.json(err)
        }
    })
})

app.post("/createUser", async (req, res) => {
    const user = req.body;

    console.log(user)

    const newUser = new UserModel(user);
    await newUser.save();
    res.json(user);
})

app.put("/updateUser", (req, res) => {

    const { id, product, company, price, date, time } = req.body    //Confusion
    
    try {
        UserModel.findById(id, (err, user) => {
            console.log(user)
            user.product = product 
            user.company = company 
            user.price = price 
            user.date = date 
            user.time = time 
            user.save() 
            res.send("User has been successfully updated in DB")
        })
    }
    catch (err) {
        res.send("Getting error from server")
    }
})

app.delete("/deleteUser/:id", async (req, res) => {
    const id = req.params.id

    await UserModel.findByIdAndRemove(id).exec()
    res.send("User has been successfully deleted from DB")
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running perfectly on port ${PORT}`)
})