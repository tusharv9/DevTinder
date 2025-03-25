const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User =require("./models/user");

app.use(express.json());

app.post("/signup", async(req,res)=>{
    const user = new User(req.body);
    try{
        await user.save();
    res.send("User added successfully");
    }catch(err){
        res.status(400).send("Error saving the user"+err.message);
    }
});

//GET user by email
app.get("/user",async(req,res)=>{
    const userEmail=req.body.emailId;

    try{
        const users = await User.find({emailId:userEmail});
        if(users.length===0){
            res.status(400).send("User not found");
        }
        else{
            res.send(users);
        }
        
    }
    catch(err){
        res.status(400).send("Error fetching email");
    }
})

//get all the users from the database
app.get("/feed",async(req,res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }catch(err){
        res.status(400).send("Something went wrong");
    }
});

//delete user from the database
app.delete("/user",async(req,res)=>{
    const userId=req.body.userId;
    try{
        const user= await User.findByIdAndDelete(userId);
        res.send("user deleted successfully");
    }catch(err){
        res.status(400).send("Something went wrong");
    }
});

//update data of the user
app.patch("/user",async(req,res)=>{
    const userId=req.body.userId;
    const data=req.body;
    try{
        await User.findByIdAndUpdate({_id:userId},data,{
            runValidators:true,
        });
        res.send("data updated successfully");
    }catch(err){
        res.status(400).send("UPDATE FAILED "+err.message);
    }
});

connectDB()
.then(()=>{
console.log("Database connection established...");
app.listen(7777, ()=>{
    console.log("Server is successfully running on port 7777...");
}); 
})
.catch(err=>{
console.error("Database cannot be connected...");
});
