const express = require('express');

const app = express();

app.get("/getUserData",userAuth,(req,res)=>{
    //Logic of DB call and get user data

        res.send("User Data Send");
    });

app.listen(7777, ()=>{
    console.log("Server is successfully running on port 7777...");
}); 

// app.get('/user',(req,res)=>{
//     // console.log(req.query);
//     res.send({firstName:"Tushar",lastName:"Vashisht"});
// });

// app.post("/user",(req,res)=>{
//     res.send("Data successfully saved to the database");
// })

// app.delete("/user",(req,res)=>{
//     res.send("Delete successfully");
// })

// app.use("/",(req,res)=>{
//     res.send("Namaste from the server");
// })

// app.use("/hello",(req,res)=>{
//     res.send("hello hello hello");
// })

// const {adminAuth , userAuth} =require("./middlewares/auth");
// //Handle Auth Middlewares for all GET ,POST ,... requests
// app.use("/admin",adminAuth);

// app.get("/user",userAuth,(req,res)=>{
//     res.send("User Data Send");
// })
// app.get("/admin/getAllData",(req,res)=>{
//     res.send("All Data Send");
// });

// app.get("/admin/deleteUser",(req,res)=>{
//     res.send("Deleted a User");
// });
// app.get("/admin/getAllData",(req,res)=>{
//     const token="xyz";
//     const isAdminAuthorized = token === "xyz";
//     if(isAdminAuthorized){
//         res.send("All Data Send");
//     }
//     else{
//         res.status(401).send("Unauthorized request");
//     }
// });

// app.get("/admin/delete User",(req,res)=>{
//     const token="xyz";
//     const isAdminAuthorized = token === "xyz";
//     if(isAdminAuthorized){
//         res.send("Deleted a User");
//     }
//     else{
//         res.status(401).send("Unauthorized request");
//     }
// });

// app.use(
//     "/user",
//     (req,res,next)=>{
//     res.send("Route Handler 1");
//     // next();
// },
// (req,res)=>{
//     res.send("Route Handler 2");
// });