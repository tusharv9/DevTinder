const express = require('express');

const app = express();

app.use((req,res)=>{
    res.send("Namaste from the server");
})

app.listen(7777, ()=>{
    console.log("Server is successfully running on port 7777...");
}); 