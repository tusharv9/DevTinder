const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User =require("./models/user");
const {validateSignUpData} =require("./utils/validation");
const bcrypt=require("bcrypt");

app.use(express.json());

app.post("/signup", async(req,res)=>{
   
    try{
        //validation of data
        validateSignUpData(req);

        const {firstName,lastName,emailId,password}=req.body;

        //encrypt the password
        const passwordHash=await bcrypt.hash(password,10);
        //console.log(passwordHash);

        //create a new instance of the user
        const user = new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash,
        });
        await user.save();
    res.send("User added successfully");
    }catch(err){
        res.status(400).send("ERROR: " +err.message);
    }
});

app.post("/login",async(req,res)=>{
    try{
        const {emailId,password}=req.body;

        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);

        if(isPasswordValid){
            res.send("Login successfull !!!");
        }
        else{
            throw new Error("Invalid credentials");
        }
        }catch(err){
        res.status(400).send("ERROR: "+err.message);
        }
})

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
app.patch("/user/:userId",async(req,res)=>{
    const userId=req.params?.userId;
    const data=req.body;
    
    try{
        const ALLOWED_UPDATES = ["photoUrl","about","gender","age","skills"];

        const isUpdateAllowed = Object.keys(data).every((k)=>
            ALLOWED_UPDATES.includes(k)
        );
        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }
        if(data?.skills.length>10){
            throw new Error("Skills cannot be more than 10");
        }
        const user = await User.findByIdAndUpdate({_id:userId},data,{
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
