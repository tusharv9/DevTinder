const mongoose = require("mongoose");

const connectDB = async () =>{
    await mongoose.connect(
        "mongodb+srv://tusharvashisht:Sh5ZrHBQSmqqNr9P@namastenode.faysd.mongodb.net/devTinder"
    );
}

module.exports = connectDB;

