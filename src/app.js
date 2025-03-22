const express = require('express');

const app = express();

app.use(
    "/user",
    (req,res,next)=>{
    res.send("Route Handler 1");
    // next();
},
(req,res)=>{
    res.send("Route Handler 2");
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